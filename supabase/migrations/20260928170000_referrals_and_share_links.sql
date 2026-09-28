create extension if not exists pgcrypto;

create table if not exists public.referral_codes (
  player_id uuid primary key references public.players(id) on delete cascade,
  code text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_id uuid not null references public.players(id) on delete cascade,
  referred_id uuid not null unique references public.players(id) on delete cascade,
  code text not null references public.referral_codes(code) on delete restrict,
  status text not null default 'joined' check (status in ('joined','activated','rewarded')),
  created_at timestamptz not null default timezone('utc', now()),
  activated_at timestamptz,
  rewarded_at timestamptz,
  constraint referrals_no_self_referral check (referrer_id <> referred_id)
);

create index if not exists referrals_referrer_created_idx
  on public.referrals (referrer_id, created_at desc);

alter table public.referral_codes enable row level security;
alter table public.referrals enable row level security;

grant select on public.referral_codes to authenticated;
grant select on public.referrals to authenticated;
revoke all on public.referral_codes from anon;
revoke all on public.referrals from anon;

drop policy if exists "referral_codes_select_own" on public.referral_codes;
create policy "referral_codes_select_own"
  on public.referral_codes
  for select to authenticated
  using ((select auth.uid()) = player_id);

drop policy if exists "referrals_select_involved" on public.referrals;
create policy "referrals_select_involved"
  on public.referrals
  for select to authenticated
  using ((select auth.uid()) = referrer_id or (select auth.uid()) = referred_id);

create or replace function public.generate_referral_code()
returns text
language plpgsql
set search_path = public
as $$
declare
  candidate text;
begin
  loop
    candidate := lower(substr(encode(gen_random_bytes(8), 'hex'), 1, 10));
    exit when not exists (select 1 from public.referral_codes where code = candidate);
  end loop;
  return candidate;
end;
$$;

create or replace function public.bootstrap_player_referral()
returns trigger
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  requested_code text;
  owner_id uuid;
begin
  insert into public.referral_codes(player_id, code)
  values (new.id, public.generate_referral_code())
  on conflict (player_id) do nothing;

  select lower(trim(coalesce(raw_user_meta_data ->> 'referral_code', '')))
    into requested_code
  from auth.users
  where id = new.id;

  if requested_code is not null and requested_code <> '' then
    select player_id into owner_id
    from public.referral_codes
    where code = requested_code;

    if owner_id is not null and owner_id <> new.id then
      insert into public.referrals(referrer_id, referred_id, code)
      values (owner_id, new.id, requested_code)
      on conflict (referred_id) do nothing;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists players_referral_bootstrap on public.players;
create trigger players_referral_bootstrap
after insert on public.players
for each row execute function public.bootstrap_player_referral();

revoke all on function public.generate_referral_code() from public;
revoke all on function public.bootstrap_player_referral() from public;
