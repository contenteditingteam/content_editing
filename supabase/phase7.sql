-- Phase 7: record that a customer accepted the Terms at signup. Run once in Supabase -> SQL Editor.
-- The time is set by the database (now()), never taken from the browser.

alter table public.profiles add column if not exists terms_accepted_at timestamptz;

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare inv_role text;
begin
  select role into inv_role from public.staff_invites where lower(email) = lower(new.email);
  insert into public.profiles (id, email, full_name, role, terms_accepted_at)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data->>'full_name',''), coalesce(inv_role,'customer'),
          case when new.raw_user_meta_data->>'accepted_terms' = 'true' then now() end);
  delete from public.staff_invites where lower(email) = lower(new.email);
  return new;
end $$;
