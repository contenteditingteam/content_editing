-- Phase 8: order timeline, order messages, cancel and revision requests.
-- Run once in Supabase -> SQL Editor (after phase1-7).
--
-- POLICY VALUES you may want to change below:
--   revision window = 7 days after delivery  (search for "interval '7 days'", keep it equal to revisionDays in scripts/legal-config.mjs)
--   a customer can cancel by themselves only while the order is still "new" (not yet given to an editor)

-- 1. New order columns ---------------------------------------------------------
alter table public.orders
  add column if not exists completed_at   timestamptz,
  add column if not exists cancelled_at   timestamptz,
  add column if not exists refund_status  text check (refund_status in ('requested','done')),
  add column if not exists revision_count int not null default 0,
  add column if not exists revision_note  text;

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in ('new','assigned','in_progress','completed','cancelled'));

-- Orders already completed: use their creation time as the delivery time
update public.orders set completed_at = coalesce(completed_at, certified_at, created_at) where status = 'completed' and completed_at is null;

-- 2. Protect the new fields ----------------------------------------------------
-- The functions below set app.system = '1' for the length of one transaction; the browser cannot do that.
create or replace function public.orders_protect()
returns trigger language plpgsql as $$
declare sysmode boolean := coalesce(current_setting('app.system', true), '') = '1';
  staff boolean := public.app_role() in ('admin','manager');
begin
  if auth.uid() is not null and not sysmode then
    if new.word_count   is distinct from old.word_count
    or new.price        is distinct from old.price
    or new.currency     is distinct from old.currency
    or new.rush         is distinct from old.rush
    or new.plan         is distinct from old.plan
    or new.verified_at  is distinct from old.verified_at
    or new.claimed_words is distinct from old.claimed_words
    or new.claimed_price is distinct from old.claimed_price
    or new.verify_note  is distinct from old.verify_note
    or new.customer_id  is distinct from old.customer_id
    or new.payment_status is distinct from old.payment_status
    or new.razorpay_order_id is distinct from old.razorpay_order_id
    or new.razorpay_payment_id is distinct from old.razorpay_payment_id
    or new.paid_at      is distinct from old.paid_at
    or new.certificate_no is distinct from old.certificate_no
    or new.verify_code  is distinct from old.verify_code
    or new.certified_at is distinct from old.certified_at
    or new.completed_at is distinct from old.completed_at
    or new.revision_count is distinct from old.revision_count
    or new.revision_note is distinct from old.revision_note then
      raise exception 'Price, payment and certificate details are set by the system and cannot be edited';
    end if;
    if (new.cancelled_at is distinct from old.cancelled_at
        or new.refund_status is distinct from old.refund_status
        or (new.status = 'cancelled' and old.status <> 'cancelled')) and not staff then
      raise exception 'Only a manager can cancel an order or change a refund';
    end if;
    if new.editor_id is distinct from old.editor_id and new.editor_id is not null and new.payment_status <> 'paid' then
      raise exception 'An editor can only be assigned after the order is paid';
    end if;
  end if;
  return new;
end $$;

-- Remember when an order was delivered (named zz so it runs after orders_protect, which would otherwise reject the change)
create or replace function public.orders_stamp()
returns trigger language plpgsql as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then new.completed_at := now(); end if;
  return new;
end $$;
drop trigger if exists orders_zz_stamp on public.orders;
create trigger orders_zz_stamp before update on public.orders for each row execute function public.orders_stamp();

-- 3. Timeline ------------------------------------------------------------------
create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('created','paid','assigned','in_progress','completed','revision','cancelled','refund_done')),
  note text
);
create index if not exists order_events_order on public.order_events(order_id, created_at);
alter table public.order_events enable row level security;

drop policy if exists "events read" on public.order_events;
create policy "events read" on public.order_events for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id));   -- same people who can see the order

create or replace function public.orders_log()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op = 'INSERT' then
    insert into public.order_events(order_id, kind) values (new.id, 'created');
    return new;
  end if;
  if new.payment_status = 'paid' and old.payment_status <> 'paid' then
    insert into public.order_events(order_id, kind) values (new.id, 'paid');
  end if;
  if new.editor_id is not null and new.editor_id is distinct from old.editor_id then
    insert into public.order_events(order_id, kind) values (new.id, 'assigned');
  end if;
  if new.revision_count > old.revision_count then
    insert into public.order_events(order_id, kind, note) values (new.id, 'revision', new.revision_note);
  elsif new.status is distinct from old.status then
    if new.status = 'in_progress' then insert into public.order_events(order_id, kind) values (new.id, 'in_progress');
    elsif new.status = 'completed' then insert into public.order_events(order_id, kind) values (new.id, 'completed');
    elsif new.status = 'cancelled' then insert into public.order_events(order_id, kind) values (new.id, 'cancelled');
    end if;
  end if;
  if new.refund_status = 'done' and old.refund_status is distinct from 'done' then
    insert into public.order_events(order_id, kind) values (new.id, 'refund_done');
  end if;
  return new;
end $$;
drop trigger if exists orders_log on public.orders;
create trigger orders_log after insert or update on public.orders for each row execute function public.orders_log();

-- Orders that already exist get a starting point
insert into public.order_events(order_id, kind, created_at)
  select id, 'created', created_at from public.orders o
  where not exists (select 1 from public.order_events e where e.order_id = o.id);

-- 4. Messages on an order --------------------------------------------------------
create table if not exists public.order_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  sender_id uuid not null default auth.uid() references public.profiles(id),
  sender_role text not null default 'customer',
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);
create index if not exists order_messages_order on public.order_messages(order_id, created_at);
alter table public.order_messages enable row level security;

-- the role label is copied from the sender's profile, never taken from the browser
create or replace function public.order_messages_before_insert()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  select role into new.sender_role from public.profiles where id = new.sender_id;
  return new;
end $$;
drop trigger if exists order_messages_before_insert on public.order_messages;
create trigger order_messages_before_insert before insert on public.order_messages
  for each row execute function public.order_messages_before_insert();

drop policy if exists "messages read" on public.order_messages;
create policy "messages read" on public.order_messages for select to authenticated
  using (exists (select 1 from public.orders o where o.id = order_id));

drop policy if exists "messages send" on public.order_messages;
create policy "messages send" on public.order_messages for insert to authenticated
  with check (sender_id = auth.uid()
    and exists (select 1 from public.orders o where o.id = order_id and o.status <> 'cancelled'));

-- 5. Cancel and revision (the only ways a customer changes an order) ---------------
create or replace function public.cancel_order(p_order uuid)
returns void language plpgsql security definer set search_path = public as $$
declare o public.orders;
begin
  select * into o from public.orders where id = p_order and customer_id = auth.uid() for update;
  if not found then raise exception 'Order not found'; end if;
  if o.status <> 'new' then
    raise exception 'This order is already with an editor. Please send us a message to cancel it.';
  end if;
  perform set_config('app.system', '1', true);
  update public.orders
     set status = 'cancelled', cancelled_at = now(),
         refund_status = case when o.payment_status = 'paid' then 'requested' end
   where id = p_order;
end $$;

create or replace function public.request_revision(p_order uuid, p_note text)
returns void language plpgsql security definer set search_path = public as $$
declare o public.orders;
begin
  if p_note is null or char_length(trim(p_note)) < 10 or char_length(p_note) > 2000 then
    raise exception 'Please describe what to change (10 to 2000 characters).';
  end if;
  select * into o from public.orders where id = p_order and customer_id = auth.uid() for update;
  if not found then raise exception 'Order not found'; end if;
  if o.status <> 'completed' then raise exception 'Only a delivered order can be revised.'; end if;
  if o.completed_at < now() - interval '7 days' then
    raise exception 'The free revision period for this order has ended. Please send us a message.';
  end if;
  perform set_config('app.system', '1', true);
  update public.orders
     set status = 'in_progress', revision_count = revision_count + 1, revision_note = trim(p_note)
   where id = p_order;
  insert into public.order_messages(order_id, sender_id, body)
    values (p_order, auth.uid(), 'Revision requested: ' || trim(p_note));
end $$;

revoke all on function public.cancel_order(uuid) from public, anon;
revoke all on function public.request_revision(uuid, text) from public, anon;
grant execute on function public.cancel_order(uuid) to authenticated;
grant execute on function public.request_revision(uuid, text) to authenticated;

-- 6. Then add ONE more database webhook (Database -> Webhooks): table order_messages, event Insert,
--    function send-email, header x-webhook-secret (same value as the other webhooks).
