-- Phase 9: let a signed-in user change their own display name. Run once in Supabase -> SQL Editor.
-- Profiles can otherwise only be edited by an admin, so this is the one safe way to edit your own name.
-- It can change nothing else (never the role or email).

create or replace function public.update_my_name(p_name text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Please log in.'; end if;
  if p_name is null or char_length(trim(p_name)) < 1 or char_length(p_name) > 120 then
    raise exception 'Enter a name up to 120 characters.';
  end if;
  update public.profiles set full_name = trim(p_name) where id = auth.uid();
end $$;

revoke all on function public.update_my_name(text) from public, anon;
grant execute on function public.update_my_name(text) to authenticated;
