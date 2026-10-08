-- ======================== phase4.sql ========================
-- Phase 4: editing certificates. Run once in Supabase -> SQL Editor (after phase1-3).

alter table public.orders
  add column if not exists doc_title text,            -- title printed on the certificate (customer types it when ordering)
  add column if not exists certificate_no text unique, -- e.g. CE-2026-000123
  add column if not exists verify_code text unique,    -- random code in the QR link; not guessable
  add column if not exists certified_at timestamptz;

create sequence if not exists public.certificate_seq;

-- New orders can never arrive with certificate or payment fields filled in
create or replace function public.orders_before_insert()
returns trigger language plpgsql as $$
begin
  new.claimed_words := new.word_count;
  new.claimed_price := new.price;
  new.verified_at := null;
  new.verify_note := null;
  new.payment_status := 'unpaid';
  new.razorpay_order_id := null;
  new.razorpay_payment_id := null;
  new.paid_at := null;
  new.certificate_no := null;
  new.verify_code := null;
  new.certified_at := null;
  return new;
end $$;

-- Signed-in users can't edit prices, payment or certificate fields; nobody can assign an editor before payment
create or replace function public.orders_protect()
returns trigger language plpgsql as $$
begin
  if auth.uid() is not null then
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
    or new.certified_at is distinct from old.certified_at then
      raise exception 'Price, payment and certificate details are set by the system and cannot be edited';
    end if;
    if new.editor_id is distinct from old.editor_id and new.editor_id is not null and new.payment_status <> 'paid' then
      raise exception 'An editor can only be assigned after the order is paid';
    end if;
  end if;
  return new;
end $$;

-- Issue the certificate automatically when an order becomes completed.
-- Named orders_z_... so it runs AFTER orders_protect (triggers run alphabetically).
create or replace function public.orders_issue_certificate()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed'
     and new.payment_status = 'paid' and new.certificate_no is null then
    new.certificate_no := 'CE-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.certificate_seq')::text, 6, '0');
    new.verify_code    := upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 16));
    new.certified_at   := now();
  end if;
  return new;
end $$;

drop trigger if exists orders_z_certificate on public.orders;
create trigger orders_z_certificate before update on public.orders
  for each row execute function public.orders_issue_certificate();

-- Public check used by verify.html and the QR code. Needs the random code, so other certificates cannot be guessed.
create or replace function public.verify_certificate(p_code text)
returns table (certificate_no text, customer_name text, doc_title text, service text, word_count int, certified_at timestamptz)
language sql stable security definer set search_path = public as $$
  select o.certificate_no,
         coalesce(nullif(p.full_name, ''), 'Customer'),
         coalesce(nullif(o.doc_title, ''), 'Untitled document'),
         o.service, o.word_count, o.certified_at
  from public.orders o join public.profiles p on p.id = o.customer_id
  where o.verify_code = upper(replace(trim(p_code), '-', '')) and o.status = 'completed'
$$;
grant execute on function public.verify_certificate(text) to anon, authenticated;

-- Optional: give certificates to orders that were completed before this phase
-- (run these two lines in the SQL editor; they re-complete the orders so the trigger issues numbers):
--   update public.orders set status = 'in_progress' where status = 'completed' and certificate_no is null;
--   update public.orders set status = 'completed'   where status = 'in_progress' and result_path is not null and certificate_no is null;

-- ======================== phase5.sql ========================
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

-- ======================== phase6.sql ========================
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

-- ======================== phase7.sql ========================
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

-- ======================== phase8.sql ========================
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

-- ======================== phase9.sql ========================
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

-- ======================== refresh Supabase's list of tables and columns ========================
notify pgrst, 'reload schema';
