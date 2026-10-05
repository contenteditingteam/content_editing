-- Phase 3: payments. Run once in Supabase -> SQL Editor (after phase1.sql and phase2.sql).

alter table public.orders
  add column if not exists payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid')),
  add column if not exists razorpay_order_id text,
  add column if not exists razorpay_payment_id text,
  add column if not exists paid_at timestamptz;

-- New orders always start unpaid, whatever the browser sends
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
  return new;
end $$;

-- Signed-in users can't edit verified numbers or payment fields, and nobody can assign an editor to an unpaid order.
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
    or new.paid_at      is distinct from old.paid_at then
      raise exception 'Price and payment details are set by the system and cannot be edited';
    end if;
    if new.editor_id is distinct from old.editor_id and new.editor_id is not null and new.payment_status <> 'paid' then
      raise exception 'An editor can only be assigned after the order is paid';
    end if;
  end if;
  return new;
end $$;

-- Optional: orders you created while testing before payments existed can be marked paid so they can be assigned:
--   update public.orders set payment_status = 'paid', paid_at = now() where payment_status = 'unpaid';
