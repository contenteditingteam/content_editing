-- Phase 1: quote form upgrades (rush, currency, several files). Run once in Supabase -> SQL Editor.
alter table public.orders
  add column if not exists rush boolean not null default false,
  add column if not exists currency text not null default 'USD' check (currency in ('USD','INR')),
  add column if not exists file_paths text[] not null default '{}';

-- Editors must be able to read every file of an order assigned to them
drop policy if exists "editor read assigned files" on storage.objects;
create policy "editor read assigned files" on storage.objects for select to authenticated
  using (bucket_id = 'Customer file uploading'
         and exists (select 1 from public.orders o
                     where (o.file_path = name or name = any(o.file_paths)) and o.editor_id = auth.uid()));
