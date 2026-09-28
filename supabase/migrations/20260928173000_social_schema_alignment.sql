alter table public.social_conversations add column if not exists title text;
alter table public.social_conversations add constraint social_conversations_title_length check (title is null or char_length(trim(title)) between 1 and 120);

create table if not exists public.social_group_posts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.social_groups(id) on delete cascade,
  author_id uuid not null references public.players(id) on delete cascade,
  body text not null check (char_length(trim(body)) between 1 and 5000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists social_group_posts_group_created_idx on public.social_group_posts(group_id, created_at desc);
alter table public.social_group_posts enable row level security;

create or replace function public.social_touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = timezone('utc', now()); return new; end; $$;

drop trigger if exists social_conversations_updated_at on public.social_conversations;
create trigger social_conversations_updated_at before update on public.social_conversations for each row execute function public.social_touch_updated_at();
drop trigger if exists social_groups_updated_at on public.social_groups;
create trigger social_groups_updated_at before update on public.social_groups for each row execute function public.social_touch_updated_at();
drop trigger if exists social_group_posts_updated_at on public.social_group_posts;
create trigger social_group_posts_updated_at before update on public.social_group_posts for each row execute function public.social_touch_updated_at();

create or replace function public.is_social_conversation_member(p_conversation_id uuid, p_player_id uuid)
returns boolean language sql security definer stable set search_path = public
as $$ select exists (select 1 from public.social_conversation_members where conversation_id = p_conversation_id and player_id = p_player_id); $$;
create or replace function public.is_social_group_member(p_group_id uuid, p_player_id uuid)
returns boolean language sql security definer stable set search_path = public
as $$ select exists (select 1 from public.social_group_members where group_id = p_group_id and player_id = p_player_id); $$;
create or replace function public.is_social_group_admin(p_group_id uuid, p_player_id uuid)
returns boolean language sql security definer stable set search_path = public
as $$ select exists (select 1 from public.social_group_members where group_id = p_group_id and player_id = p_player_id and role in ('owner','admin')); $$;
revoke all on function public.is_social_conversation_member(uuid, uuid), public.is_social_group_member(uuid, uuid), public.is_social_group_admin(uuid, uuid) from public;
grant execute on function public.is_social_conversation_member(uuid, uuid), public.is_social_group_member(uuid, uuid), public.is_social_group_admin(uuid, uuid) to authenticated;

drop policy if exists social_group_members_read on public.social_group_members;
drop policy if exists social_group_members_join_public on public.social_group_members;
drop policy if exists social_group_members_leave on public.social_group_members;
drop policy if exists social_group_members_owner_manage on public.social_group_members;
drop policy if exists group_member_select on public.social_group_members;
drop policy if exists group_member_insert on public.social_group_members;
drop policy if exists group_member_update_admin on public.social_group_members;
drop policy if exists group_member_delete_self_or_admin on public.social_group_members;
create policy group_member_select on public.social_group_members for select to authenticated using (player_id = auth.uid() or public.is_social_group_member(group_id, auth.uid()));
create policy group_member_insert on public.social_group_members for insert to authenticated with check (player_id = auth.uid() or exists (select 1 from public.social_groups g where g.id = group_id and g.owner_id = auth.uid()) or public.is_social_group_admin(group_id, auth.uid()));
create policy group_member_update_admin on public.social_group_members for update to authenticated using (public.is_social_group_admin(group_id, auth.uid())) with check (public.is_social_group_admin(group_id, auth.uid()));
create policy group_member_delete_self_or_admin on public.social_group_members for delete to authenticated using (player_id = auth.uid() or public.is_social_group_admin(group_id, auth.uid()));

drop policy if exists social_conversation_members_member_read on public.social_conversation_members;
drop policy if exists social_conversation_members_self_insert on public.social_conversation_members;
drop policy if exists social_conversation_members_self_update on public.social_conversation_members;
drop policy if exists conversation_member_select on public.social_conversation_members;
drop policy if exists conversation_member_insert on public.social_conversation_members;
create policy conversation_member_select on public.social_conversation_members for select to authenticated using (player_id = auth.uid() or public.is_social_conversation_member(conversation_id, auth.uid()));
create policy conversation_member_insert on public.social_conversation_members for insert to authenticated with check (player_id = auth.uid() or exists (select 1 from public.social_conversations c where c.id = conversation_id and c.created_by = auth.uid()) or public.is_social_conversation_member(conversation_id, auth.uid()));

create policy group_post_select_member on public.social_group_posts for select to authenticated using (exists (select 1 from public.social_groups g where g.id = group_id and (g.visibility = 'public' or public.is_social_group_member(group_id, auth.uid()))));
create policy group_post_insert_member on public.social_group_posts for insert to authenticated with check (author_id = auth.uid() and public.is_social_group_member(group_id, auth.uid()));
create policy group_post_update_owner on public.social_group_posts for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy group_post_delete_owner on public.social_group_posts for delete to authenticated using (author_id = auth.uid());
grant select, insert, update, delete on public.social_group_posts to authenticated;
revoke all on public.social_group_posts from anon;
