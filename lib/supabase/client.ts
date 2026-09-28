import { createBrowserClient } from "@supabase/ssr";
import type { MoriseDatabase } from "@/lib/supabase/social.types";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return createBrowserClient<MoriseDatabase>(url, key);
}
