import "server-only";

import { NextResponse } from "next/server";

type RateLimitOptions = {
  maxRequests: number;
  windowMs: number;
};

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type LimitedJsonResult =
  | {
      ok: true;
      payload: unknown;
    }
  | {
      ok: false;
      response: NextResponse;
    };

const globalRateLimitState = globalThis as typeof globalThis & {
  __signalopsRateLimitBuckets?: Map<string, RateLimitBucket>;
};

const rateLimitBuckets =
  globalRateLimitState.__signalopsRateLimitBuckets ??
  new Map<string, RateLimitBucket>();

globalRateLimitState.__signalopsRateLimitBuckets = rateLimitBuckets;

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

  return (
    firstForwardedIp ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

export function enforceRateLimit(
  request: Request,
  scope: string,
  options: RateLimitOptions
) {
  const now = Date.now();
  const key = `${scope}:${getClientIp(request)}`;
  const currentBucket = rateLimitBuckets.get(key);

  if (!currentBucket || currentBucket.resetAt <= now) {
    rateLimitBuckets.set(key, {
      count: 1,
      resetAt: now + options.windowMs
    });
    return null;
  }

  currentBucket.count += 1;

  if (currentBucket.count <= options.maxRequests) {
    return null;
  }

  const retryAfterSeconds = Math.max(1, Math.ceil((currentBucket.resetAt - now) / 1000));

  return NextResponse.json(
    {
      error: "Too many requests. Please try again shortly."
    },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfterSeconds)
      }
    }
  );
}

export async function parseLimitedJsonBody(
  request: Request,
  maxBytes: number
): Promise<LimitedJsonResult> {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (Number.isFinite(contentLength) && contentLength > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Request payload is too large."
        },
        { status: 413 }
      )
    };
  }

  const bodyText = await request.text();
  const bodyBytes = new TextEncoder().encode(bodyText).byteLength;

  if (bodyBytes > maxBytes) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error: "Request payload is too large."
        },
        { status: 413 }
      )
    };
  }

  try {
    return {
      ok: true,
      payload: JSON.parse(bodyText)
    };
  } catch {
    return {
      ok: false,
      response: NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 })
    };
  }
}
