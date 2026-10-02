import type { SessionContext } from "@/lib/m01/contracts";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function resolveSessionContext(): Promise<SessionContext> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return {
      actorId: null,
      sessionId: null,
      authenticated: false,
      email: null,
    };
  }

  return {
    actorId: data.user.id,
    sessionId: null,
    authenticated: true,
    email: data.user.email ?? null,
  };
}
