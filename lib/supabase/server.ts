import "server-only";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export type SupabaseDatabaseMode = "service-role" | "publishable";

type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

type SupabaseDatabaseClient = {
  client: SupabaseClient<Database>;
  mode: SupabaseDatabaseMode;
};

let adminClient: SupabaseClient<Database> | null = null;
let publishableServerClient: SupabaseClient<Database> | null = null;

function cleanEnv(value: string | undefined) {
  return value?.trim() || "";
}

function getSupabaseUrl() {
  return cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL).replace(/\/$/, "");
}

function getSupabasePublishableKey() {
  return (
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) ||
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}

function getSupabaseServiceRoleKey() {
  return cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabasePublicConfig(): SupabasePublicConfig | null {
  const url = getSupabaseUrl();
  const publishableKey = getSupabasePublishableKey();

  if (!url || !publishableKey) {
    return null;
  }

  return {
    url,
    publishableKey
  };
}

export function isSupabaseConfigured() {
  return getSupabasePublicConfig() !== null || isSupabaseAdminConfigured();
}

export function isSupabaseAdminConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey());
}

function createStatelessSupabaseClient(key: string) {
  const url = getSupabaseUrl();

  if (!url || !key) {
    throw new Error("Supabase URL and key are required.");
  }

  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false
    }
  });
}

export function getSupabaseAdminClient() {
  const serviceRoleKey = getSupabaseServiceRoleKey();

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured.");
  }

  adminClient ??= createStatelessSupabaseClient(serviceRoleKey);
  return adminClient;
}

export function getSupabaseDatabaseClient(): SupabaseDatabaseClient | null {
  if (isSupabaseAdminConfigured()) {
    return {
      client: getSupabaseAdminClient(),
      mode: "service-role"
    };
  }

  const publicConfig = getSupabasePublicConfig();

  if (!publicConfig) {
    return null;
  }

  publishableServerClient ??= createStatelessSupabaseClient(publicConfig.publishableKey);

  return {
    client: publishableServerClient,
    mode: "publishable"
  };
}

export async function createSupabaseServerClient() {
  const publicConfig = getSupabasePublicConfig();

  if (!publicConfig) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(publicConfig.url, publicConfig.publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot set cookies. Route Handlers and Server Actions can.
        }
      }
    }
  });
}
