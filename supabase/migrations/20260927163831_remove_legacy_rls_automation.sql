-- MORISE starts from a clean Supabase public schema.
-- Remove legacy automation that was present before MORISE initialization.

drop event trigger if exists ensure_rls;
drop function if exists public.rls_auto_enable();
