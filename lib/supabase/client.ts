"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/supabase/database.types";

function getSupabaseBrowserConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return {
    url,
    publishableKey
  };
}

export function createSupabaseBrowserClient() {
  const { url, publishableKey } = getSupabaseBrowserConfig();
  return createBrowserClient<Database>(url, publishableKey);
}
