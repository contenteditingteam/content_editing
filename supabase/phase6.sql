-- Phase 6: contact form messages. Run once in Supabase -> SQL Editor.
-- Visitors can only ADD a message. Only managers and admins can read or update them.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 5 and 200 and email like '%_@_%._%'),
  topic text check (char_length(topic) <= 80),
  message text not null check (char_length(message) between 10 and 4000),
  handled boolean not null default false
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact anyone can send" on public.contact_messages;
create policy "contact anyone can send" on public.contact_messages for insert to anon, authenticated
  with check (handled = false);

drop policy if exists "contact staff read" on public.contact_messages;
create policy "contact staff read" on public.contact_messages for select to authenticated
  using (public.app_role() in ('admin','manager'));

drop policy if exists "contact staff update" on public.contact_messages;
create policy "contact staff update" on public.contact_messages for update to authenticated
  using (public.app_role() in ('admin','manager')) with check (public.app_role() in ('admin','manager'));

drop policy if exists "contact staff delete" on public.contact_messages;
create policy "contact staff delete" on public.contact_messages for delete to authenticated
  using (public.app_role() in ('admin','manager'));

-- Then add ONE more database webhook (Database -> Webhooks): table contact_messages, event Insert,
-- function send-email, header x-webhook-secret (same as the orders webhook). It emails your staff each new message.
