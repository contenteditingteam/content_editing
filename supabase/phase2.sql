-- Phase 2: server-verified word counts and prices. Run once in Supabase -> SQL Editor (after phase1.sql).

alter table public.orders
  add column if not exists plan text,                 -- plan id, e.g. 'academic-5' (used by the server to price the order)
  add column if not exists verified_at timestamptz,   -- set ONLY by the verify-order function
  add column if not exists claimed_words int,         -- what the customer's browser estimated
  add column if not exists claimed_price numeric(10,2),
  add column if not exists verify_note text;          -- why automatic counting failed, if it did

-- Customers cannot submit an order that already claims to be verified
drop policy if exists "orders customer insert" on public.orders;
create policy "orders customer insert" on public.orders for insert to authenticated
  with check (customer_id = auth.uid() and status = 'new' and editor_id is null and verified_at is null);

-- On insert: keep the browser's numbers as "claimed" and mark the order unverified
create or replace function public.orders_before_insert()
returns trigger language plpgsql as $$
begin
  new.claimed_words := new.word_count;
  new.claimed_price := new.price;
  new.verified_at := null;
  new.verify_note := null;
  return new;
end $$;
drop trigger if exists orders_before_insert on public.orders;
create trigger orders_before_insert before insert on public.orders
  for each row execute function public.orders_before_insert();

-- Nobody signed in (customer, editor, manager, admin) can change the verified numbers.
-- Only the verify-order function (service role, no signed-in user) can.
create or replace function public.orders_protect()
returns trigger language plpgsql as $$
begin
  if auth.uid() is not null and (
       new.word_count   is distinct from old.word_count
    or new.price        is distinct from old.price
    or new.currency     is distinct from old.currency
    or new.rush         is distinct from old.rush
    or new.plan         is distinct from old.plan
    or new.verified_at  is distinct from old.verified_at
    or new.claimed_words is distinct from old.claimed_words
    or new.claimed_price is distinct from old.claimed_price
    or new.verify_note  is distinct from old.verify_note
    or new.customer_id  is distinct from old.customer_id
  ) then
    raise exception 'Word count and price are set by the system and cannot be edited';
  end if;
  return new;
end $$;
drop trigger if exists orders_protect on public.orders;
create trigger orders_protect before update on public.orders
  for each row execute function public.orders_protect();
