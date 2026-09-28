create table if not exists public.social_conversations (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references public.players(id) on delete cascade,
  title text null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint social_conversations_title_length check (title is null or char_length(trim(title)) between 1 and 120)
);

create table if not exists public.social_conversation_members (
  conversation_id uuid not null references public.social_conversations(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  last_read_at timestamptz not null default timezone('utc', now()),
  joined_at timestamptz not null default timezone('utc', now()),
  primary key (conversation_id, player_id)
);

create table if not exists public.social_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.social_conversations(id) on delete cascade,
  sender_id uuid not null references public.players(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint social_messages_body_length check (char_length(trim(body)) between 1 and 4000)
);

create index if not exists social_conversation_members_player_idx on public.social_conversation_members(player_id, joined_at desc);
create index if not exists social_messages_conversation_created_idx on public.social_messages(conversation_id, created_at asc);

create table if not exists public.social_groups (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.players(id) on delete cascade,
  name text not null,
  description text not null default '',
  visibility text not null default 'public',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint social_groups_name_length check (char_length(trim(name)) between 2 and 80),
  constraint social_groups_description_length check (char_length(description) <= 1000),
  constraint social_groups_visibility check (visibility in ('public', 'private'))
);

create table if not exists public.social_group_members (
  group_id uuid not null references public.social_groups(id) on delete cascade,
  player_id uuid not null references public.players(id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default timezone('utc', now()),
  primary key (group_id, player_id),
  constraint social_group_member_role check (role in ('owner', 'admin', 'member'))
);

create table if not exists public.social_group_posts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.social_groups(id) on delete cascade,
  author_id uuid not null references public.players(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint social_group_posts_body_length check (char_length(trim(body)) between 1 and 5000)
);

create index if not exists social_groups_created_idx on public.social_groups(created_at desc);
create index if not exists social_group_members_player_idx on public.social_group_members(player_id, joined_at desc);
create index if not exists social_group_posts_group_created_idx on public.social_group_posts(group_id, created_at desc);

create or replace function public.social_touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = timezone('utc', now()); return new; end; $$;

drop trigger if exists social_conversations_updated_at on public.social_conversations;
create trigger social_conversations_updated_at before update on public.social_conversations for each row execute function public.social_touch_updated_at();
drop trigger if exists social_groups_updated_at on public.social_groups;
create trigger social_groups_updated_at before update on public.social_groups for each row execute function public.social_touch_updated_at();
drop trigger if exists social_group_posts_updated_at on public.social_group_posts;
create trigger social_group_posts_updated_at before update on public.social_group_posts for each row execute function public.social_touch_updated_at();

alter table public.social_conversations enable row level security;
alter table public.social_conversation_members enable row level security;
alter table public.social_messages enable row level security;
alter table public.social_groups enable row level security;
alter table public.social_group_members enable row level security;
alter table public.social_group_posts enable row level security;

create policy "conversation_select_member" on public.social_conversations for select to authenticated using (exists (select 1 from public.social_conversation_members m where m.conversation_id = id and m.player_id = (select auth.uid())));
create policy "conversation_insert_creator" on public.social_conversations for insert to authenticated with check (created_by = (select auth.uid()));
create policy "conversation_update_creator" on public.social_conversations for update to authenticated using (created_by = (select auth.uid())) with check (created_by = (select auth.uid()));

create policy "conversation_member_select_member" on public.social_conversation_members for select to authenticated using (player_id = (select auth.uid()) or exists (select 1 from public.social_conversation_members mine where mine.conversation_id = conversation_id and mine.player_id = (select auth.uid())));
create policy "conversation_member_insert_allowed" on public.social_conversation_members for insert to authenticated with check (player_id = (select auth.uid()) or exists (select 1 from public.social_conversations c where c.id = conversation_id and c.created_by = (select auth.uid())) or exists (select 1 from public.social_conversation_members mine where mine.conversation_id = conversation_id and mine.player_id = (select auth.uid())));
create policy "conversation_member_update_self" on public.social_conversation_members for update to authenticated using (player_id = (select auth.uid())) with check (player_id = (select auth.uid()));
create policy "conversation_member_delete_self" on public.social_conversation_members for delete to authenticated using (player_id = (select auth.uid()));

create policy "message_select_member" on public.social_messages for select to authenticated using (exists (select 1 from public.social_conversation_members m where m.conversation_id = conversation_id and m.player_id = (select auth.uid())));
create policy "message_insert_sender_member" on public.social_messages for insert to authenticated with check (sender_id = (select auth.uid()) and exists (select 1 from public.social_conversation_members m where m.conversation_id = conversation_id and m.player_id = (select auth.uid())));
create policy "message_delete_sender" on public.social_messages for delete to authenticated using (sender_id = (select auth.uid()));

create policy "group_select_public_or_member" on public.social_groups for select to authenticated using (visibility = 'public' or owner_id = (select auth.uid()) or exists (select 1 from public.social_group_members m where m.group_id = id and m.player_id = (select auth.uid())));
create policy "group_insert_owner" on public.social_groups for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "group_update_owner" on public.social_groups for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "group_delete_owner" on public.social_groups for delete to authenticated using (owner_id = (select auth.uid()));

create policy "group_member_select_member" on public.social_group_members for select to authenticated using (player_id = (select auth.uid()) or exists (select 1 from public.social_group_members mine where mine.group_id = group_id and mine.player_id = (select auth.uid())));
create policy "group_member_insert_self_or_admin" on public.social_group_members for insert to authenticated with check (player_id = (select auth.uid()) or exists (select 1 from public.social_groups g where g.id = group_id and g.owner_id = (select auth.uid())) or exists (select 1 from public.social_group_members admin where admin.group_id = group_id and admin.player_id = (select auth.uid()) and admin.role in ('owner','admin')));
create policy "group_member_update_admin" on public.social_group_members for update to authenticated using (exists (select 1 from public.social_group_members admin where admin.group_id = group_id and admin.player_id = (select auth.uid()) and admin.role in ('owner','admin'))) with check (exists (select 1 from public.social_group_members admin where admin.group_id = group_id and admin.player_id = (select auth.uid()) and admin.role in ('owner','admin')));
create policy "group_member_delete_self_or_admin" on public.social_group_members for delete to authenticated using (player_id = (select auth.uid()) or exists (select 1 from public.social_group_members admin where admin.group_id = group_id and admin.player_id = (select auth.uid()) and admin.role in ('owner','admin')));

create policy "group_post_select_member" on public.social_group_posts for select to authenticated using (exists (select 1 from public.social_groups g where g.id = group_id and (g.visibility = 'public' or exists (select 1 from public.social_group_members m where m.group_id = group_id and m.player_id = (select auth.uid())))));
create policy "group_post_insert_member" on public.social_group_posts for insert to authenticated with check (author_id = (select auth.uid()) and exists (select 1 from public.social_group_members m where m.group_id = group_id and m.player_id = (select auth.uid())));
create policy "group_post_update_owner" on public.social_group_posts for update to authenticated using (author_id = (select auth.uid())) with check (author_id = (select auth.uid()));
create policy "group_post_delete_owner" on public.social_group_posts for delete to authenticated using (author_id = (select auth.uid()));

grant select, insert, update, delete on public.social_conversations, public.social_conversation_members, public.social_messages, public.social_groups, public.social_group_members, public.social_group_posts to authenticated;
revoke all on public.social_conversations, public.social_conversation_members, public.social_messages, public.social_groups, public.social_group_members, public.social_group_posts from anon;
