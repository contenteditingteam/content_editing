-- Phase 5: real customer reviews. Run once in Supabase -> SQL Editor (after phase1-4).
-- Only customers with a COMPLETED order can review it (one review per order).
-- Reviews stay hidden until a manager or admin approves them.

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 10 and 1500),
  display_name text,                          -- "Priya S." (set by the system, not by the browser)
  approved boolean not null default false
);

alter table public.reviews enable row level security;

drop policy if exists "reviews customer insert" on public.reviews;
create policy "reviews customer insert" on public.reviews for insert to authenticated
  with check (
    customer_id = auth.uid() and approved = false
    and exists (select 1 from public.orders o
                where o.id = order_id and o.customer_id = auth.uid() and o.status = 'completed')
  );

drop policy if exists "reviews read own or staff" on public.reviews;
create policy "reviews read own or staff" on public.reviews for select to authenticated
  using (customer_id = auth.uid() or public.app_role() in ('admin','manager'));

drop policy if exists "reviews staff update" on public.reviews;
create policy "reviews staff update" on public.reviews for update to authenticated
  using (public.app_role() in ('admin','manager')) with check (public.app_role() in ('admin','manager'));

drop policy if exists "reviews staff delete" on public.reviews;
create policy "reviews staff delete" on public.reviews for delete to authenticated
  using (public.app_role() in ('admin','manager'));

-- On insert: always unapproved, and the public name comes from the profile ("First L.")
create or replace function public.reviews_before_insert()
returns trigger language plpgsql security definer set search_path = public as $$
declare n text;
begin
  select trim(full_name) into n from public.profiles where id = new.customer_id;
  new.approved := false;
  new.display_name := case
    when coalesce(n, '') = '' then 'Customer'
    when position(' ' in n) > 0 then split_part(n, ' ', 1) || ' ' || upper(left(split_part(n, ' ', 2), 1)) || '.'
    else n end;
  return new;
end $$;
drop trigger if exists reviews_before_insert on public.reviews;
create trigger reviews_before_insert before insert on public.reviews
  for each row execute function public.reviews_before_insert();

-- The public reads approved reviews ONLY through these functions, so customer ids and order ids are never exposed.
create or replace function public.public_reviews(p_limit int default 50)
returns table (rating int, body text, display_name text, created_at timestamptz)
language sql stable security definer set search_path = public as $$
  select r.rating, r.body, r.display_name, r.created_at
  from public.reviews r where r.approved
  order by r.created_at desc
  limit least(coalesce(p_limit, 50), 200)
$$;

create or replace function public.reviews_summary()
returns table (review_count int, avg_rating numeric)
language sql stable security definer set search_path = public as $$
  select count(*)::int, coalesce(round(avg(rating), 1), 0) from public.reviews where approved
$$;

grant execute on function public.public_reviews(int) to anon, authenticated;
grant execute on function public.reviews_summary() to anon, authenticated;
