import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/supabase/database.types";

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function getSupabasePublicConfig() {
  const url = cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
  const publishableKey =
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!url || !publishableKey) {
    return null;
  }

  return {
    url,
    publishableKey
  };
}

export async function updateSupabaseSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const publicConfig = getSupabasePublicConfig();

  if (!publicConfig) {
    return response;
  }

  const supabase = createServerClient<Database>(publicConfig.url, publicConfig.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        response = NextResponse.next({
          request: {
            headers: request.headers
          }
        });

        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      }
    }
  });

  await supabase.auth.getUser();

  return response;
}
