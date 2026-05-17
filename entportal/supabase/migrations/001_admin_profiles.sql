-- Admin profiles linked to Supabase Auth users
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null default 'Dr. Koirala',
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;

drop policy if exists "Admins can view own profile" on public.admin_profiles;
create policy "Admins can view own profile"
  on public.admin_profiles
  for select
  to authenticated
  using (auth.uid() = id);

drop policy if exists "Admins can update own profile" on public.admin_profiles;
create policy "Admins can update own profile"
  on public.admin_profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
