import { NextResponse } from "next/server";
import {
  getVisualAuditData,
  isValidVisualAuditKey,
  isVisualAuditEnabled
} from "@/lib/visual-audits";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key") ?? "";
  const run = url.searchParams.get("run") ?? undefined;

  if (!isVisualAuditEnabled() || !isValidVisualAuditKey(key)) {
    return NextResponse.json(
      {
        error: "Not found"
      },
      {
        status: 404
      }
    );
  }

  try {
    return NextResponse.json(await getVisualAuditData(run));
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Visual audit data could not be loaded."
      },
      {
        status: 500
      }
    );
  }
}
