revoke all on table public.players from public;
revoke all on table public.players from anon;
revoke all on table public.players from authenticated;
grant select, insert, update on table public.players to authenticated;
