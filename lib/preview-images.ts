import "server-only";

import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import type { PreviewData, PreviewVisualDraft } from "@/lib/preview-types";

const OPENAI_IMAGES_URL = "https://api.openai.com/v1/images/generations";
const DEFAULT_IMAGE_MODEL = "gpt-image-1-mini";
const DEFAULT_IMAGE_SIZE = "1024x1024";
const DEFAULT_IMAGE_QUALITY = "low";
const DEFAULT_IMAGE_FORMAT = "jpeg";
const DEFAULT_IMAGE_COMPRESSION = 72;
const PREVIEW_IMAGE_BUCKET = process.env.SUPABASE_PREVIEW_IMAGE_BUCKET || "preview-images";

type OpenAIImageResult = {
  b64_json?: string;
  revised_prompt?: string;
};

type OpenAIImageResponse = {
  data?: OpenAIImageResult[];
  error?: {
    message?: string;
  };
};

type GeneratedImage = {
  base64: string;
  revisedPrompt?: string;
  model: string;
  contentType: string;
  extension: string;
};

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function getOpenAIImageConfig() {
  const compression = Number(cleanEnv(process.env.OPENAI_IMAGE_COMPRESSION));

  return {
    apiKey: cleanEnv(process.env.OPENAI_API_KEY),
    model: cleanEnv(process.env.OPENAI_IMAGE_MODEL) || DEFAULT_IMAGE_MODEL,
    size: cleanEnv(process.env.OPENAI_IMAGE_SIZE) || DEFAULT_IMAGE_SIZE,
    quality: cleanEnv(process.env.OPENAI_IMAGE_QUALITY) || DEFAULT_IMAGE_QUALITY,
    format: cleanEnv(process.env.OPENAI_IMAGE_FORMAT) || DEFAULT_IMAGE_FORMAT,
    compression: Number.isFinite(compression) && compression > 0 ? Math.min(Math.round(compression), 100) : DEFAULT_IMAGE_COMPRESSION
  };
}

function getContentType(format: string) {
  if (format === "webp") {
    return {
      contentType: "image/webp",
      extension: "webp"
    };
  }

  if (format === "png") {
    return {
      contentType: "image/png",
      extension: "png"
    };
  }

  return {
    contentType: "image/jpeg",
    extension: "jpg"
  };
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    return typeof message === "string" && message.trim() ? message : "Unknown image generation error.";
  }

  return "Unknown image generation error.";
}

async function parseOpenAIResponse(response: Response) {
  try {
    return (await response.json()) as OpenAIImageResponse;
  } catch {
    return {} as OpenAIImageResponse;
  }
}

async function requestGeneratedImage(prompt: string): Promise<GeneratedImage> {
  const config = getOpenAIImageConfig();

  if (!config.apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const { contentType, extension } = getContentType(config.format);
  const body = {
    model: config.model,
    prompt,
    n: 1,
    size: config.size,
    quality: config.quality,
    output_format: config.format,
    output_compression: config.compression,
    moderation: "auto"
  };

  const response = await fetch(OPENAI_IMAGES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const payload = await parseOpenAIResponse(response);

  if (!response.ok) {
    throw new Error(payload.error?.message || `OpenAI image generation failed with status ${response.status}.`);
  }

  const image = payload.data?.[0];

  if (!image?.b64_json) {
    throw new Error("OpenAI image generation returned no image data.");
  }

  return {
    base64: image.b64_json,
    revisedPrompt: image.revised_prompt,
    model: config.model,
    contentType,
    extension
  };
}

async function ensurePreviewImageBucket() {
  if (!isSupabaseAdminConfigured()) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is required for preview image storage.");
  }

  const supabase = getSupabaseAdminClient();
  const existing = await supabase.storage.getBucket(PREVIEW_IMAGE_BUCKET);

  if (!existing.error) {
    return supabase;
  }

  const created = await supabase.storage.createBucket(PREVIEW_IMAGE_BUCKET, {
    public: true,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
    fileSizeLimit: 8_000_000
  });

  if (created.error) {
    throw created.error;
  }

  return supabase;
}

async function uploadPreviewImage({
  submissionId,
  draft,
  image
}: {
  submissionId: string;
  draft: PreviewVisualDraft;
  image: GeneratedImage;
}) {
  const supabase = await ensurePreviewImageBucket();
  const storagePath = `${submissionId}/${draft.id}.${image.extension}`;
  const buffer = Buffer.from(image.base64, "base64");
  const uploaded = await supabase.storage.from(PREVIEW_IMAGE_BUCKET).upload(storagePath, buffer, {
    cacheControl: "31536000",
    contentType: image.contentType,
    upsert: true
  });

  if (uploaded.error) {
    throw uploaded.error;
  }

  const publicUrl = supabase.storage.from(PREVIEW_IMAGE_BUCKET).getPublicUrl(storagePath);

  return {
    imageUrl: publicUrl.data.publicUrl,
    storagePath: `${PREVIEW_IMAGE_BUCKET}/${storagePath}`
  };
}

async function generateOnePreviewVisual(submissionId: string, draft: PreviewVisualDraft): Promise<PreviewVisualDraft> {
  try {
    const image = await requestGeneratedImage(draft.prompt);
    const uploaded = await uploadPreviewImage({ submissionId, draft, image });

    return {
      ...draft,
      ...uploaded,
      revisedPrompt: image.revisedPrompt,
      generatedAt: new Date().toISOString(),
      model: image.model,
      status: "Generated",
      error: undefined
    };
  } catch (error) {
    const message = getErrorMessage(error);
    console.warn(`SignalOps preview visual generation unavailable. ${draft.id}: ${message}`);

    return {
      ...draft,
      status: "Failed",
      error: message
    };
  }
}

export async function generatePreviewVisualImages({
  submissionId,
  previewData
}: {
  submissionId: string;
  previewData: PreviewData;
}) {
  const drafts = previewData.visualDrafts ?? [];

  if (drafts.length === 0) {
    return drafts;
  }

  if (process.env.PREVIEW_IMAGE_GENERATION === "disabled") {
    return drafts;
  }

  return Promise.all(drafts.map((draft) => generateOnePreviewVisual(submissionId, draft)));
}
