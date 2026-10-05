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
