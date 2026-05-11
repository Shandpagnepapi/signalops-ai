import type { NextRequest } from "next/server";
import { updateSupabaseSession } from "@/lib/supabase/middleware";

const adminRealm = 'Basic realm="SignalOps Admin"';

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function isAdminPath(pathname: string) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/api/admin" ||
    pathname.startsWith("/api/admin/")
  );
}

function unauthorized(message: string) {
  return new Response(message, {
    status: 401,
    headers: {
      "WWW-Authenticate": adminRealm,
      "Cache-Control": "no-store"
    }
  });
}

function decodeBasicCredentials(headerValue: string) {
  const [scheme, encoded] = headerValue.split(" ");

  if (scheme?.toLowerCase() !== "basic" || !encoded) {
    return null;
  }

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

function validateAdminAuth(request: NextRequest) {
  const configuredUsername = cleanEnv(process.env.ADMIN_USERNAME);
  const configuredPassword = cleanEnv(process.env.ADMIN_PASSWORD);

  if (!configuredUsername || !configuredPassword) {
    return unauthorized("Admin access is not configured.");
  }

  const credentials = decodeBasicCredentials(request.headers.get("authorization") ?? "");

  if (!credentials) {
    return unauthorized("Admin credentials are required.");
  }

  if (
    credentials.username !== configuredUsername ||
    credentials.password !== configuredPassword
  ) {
    return unauthorized("Invalid admin credentials.");
  }

  return null;
}

export async function proxy(request: NextRequest) {
  if (isAdminPath(request.nextUrl.pathname)) {
    const unauthorizedResponse = validateAdminAuth(request);

    if (unauthorizedResponse) {
      return unauthorizedResponse;
    }
  }

  return updateSupabaseSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"
  ]
};
