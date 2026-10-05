-- Content Editing: roles, orders and security rules.
-- Run this whole file once in Supabase -> SQL Editor.
-- Roles: admin, manager, editor, customer (default for anyone who signs up).

-- 1. Profiles (one per auth user) -------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text default '',
  role text not null default 'customer' check (role in ('admin','manager','editor','customer')),
  created_at timestamptz default now()
);

-- 2. Staff invites: admin adds an email + role; the person then signs up with that email
create table if not exists public.staff_invites (
  email text primary key,
  role text not null check (role in ('manager','editor')),
  invited_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 3. Orders -------------------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  editor_id uuid references public.profiles(id) on delete set null,
  service text not null,
  word_count int check (word_count >= 0),
  instructions text,
  status text not null default 'new' check (status in ('new','assigned','in_progress','completed'))
);

-- 4. Helper: the signed-in user's role (security definer avoids RLS recursion) ---
create or replace function public.app_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

-- 5. New user -> profile. Role comes ONLY from staff_invites, never from user input.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare inv_role text;
begin
  select role into inv_role from public.staff_invites where lower(email) = lower(new.email);
  insert into public.profiles (id, email, full_name, role)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(inv_role,'customer'));
  delete from public.staff_invites where lower(email) = lower(new.email);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6. Row Level Security -------------------------------------------------------
alter table public.profiles       enable row level security;
alter table public.staff_invites  enable row level security;
alter table public.orders         enable row level security;

-- profiles: see your own; admin/manager see everyone; only admin changes roles
create policy "profiles read own or staff" on public.profiles for select to authenticated
  using (id = auth.uid() or public.app_role() in ('admin','manager'));
create policy "profiles admin update" on public.profiles for update to authenticated
  using (public.app_role() = 'admin') with check (public.app_role() = 'admin');

-- staff_invites: admin only
create policy "invites admin all" on public.staff_invites for all to authenticated
  using (public.app_role() = 'admin') with check (public.app_role() = 'admin');

-- orders
create policy "orders customer insert" on public.orders for insert to authenticated
  with check (customer_id = auth.uid() and status = 'new' and editor_id is null);
create policy "orders read" on public.orders for select to authenticated
  using (customer_id = auth.uid() or editor_id = auth.uid() or public.app_role() in ('admin','manager'));
create policy "orders manager update" on public.orders for update to authenticated
  using (public.app_role() in ('admin','manager')) with check (public.app_role() in ('admin','manager'));
create policy "orders editor update" on public.orders for update to authenticated
  using (editor_id = auth.uid()) with check (editor_id = auth.uid());

-- 7. Make YOURSELF the first admin ---------------------------------------------
-- Create your own account on the site first (login page -> Create account), then run:
--   update public.profiles set role = 'admin' where email = 'YOUR_ADMIN_EMAIL';
