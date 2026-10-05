-- File uploads. Run once in Supabase -> SQL Editor (after schema.sql).
-- Buckets expected (already created in the dashboard):
--   'Customer file uploading'  -> documents customers submit
--   'Editor file uploading'    -> finished documents editors return

-- 1. Orders get the file paths and the quoted price
alter table public.orders
  add column if not exists file_path text,
  add column if not exists result_path text,
  add column if not exists price numeric(10,2);

-- 2. Make both buckets PRIVATE (customer documents must not be reachable by public URL)
update storage.buckets set public = false
where id in ('Customer file uploading', 'Editor file uploading');

-- 3. Access rules. Files live in a folder named after the uploader's user id: <uid>/<file>
drop policy if exists "cust upload own"            on storage.objects;
drop policy if exists "cust read own"              on storage.objects;
drop policy if exists "staff read customer files"  on storage.objects;
drop policy if exists "editor read assigned files" on storage.objects;
drop policy if exists "editor upload result"       on storage.objects;
drop policy if exists "editor read own results"    on storage.objects;
drop policy if exists "staff read results"         on storage.objects;
drop policy if exists "cust read own result"       on storage.objects;

create policy "cust upload own" on storage.objects for insert to authenticated
  with check (bucket_id = 'Customer file uploading' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "cust read own" on storage.objects for select to authenticated
  using (bucket_id = 'Customer file uploading' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "staff read customer files" on storage.objects for select to authenticated
  using (bucket_id = 'Customer file uploading' and public.app_role() in ('admin','manager'));

create policy "editor read assigned files" on storage.objects for select to authenticated
  using (bucket_id = 'Customer file uploading'
         and exists (select 1 from public.orders o where o.file_path = name and o.editor_id = auth.uid()));

create policy "editor upload result" on storage.objects for insert to authenticated
  with check (bucket_id = 'Editor file uploading' and public.app_role() = 'editor'
              and (storage.foldername(name))[1] = auth.uid()::text);

create policy "editor read own results" on storage.objects for select to authenticated
  using (bucket_id = 'Editor file uploading' and (storage.foldername(name))[1] = auth.uid()::text);

create policy "staff read results" on storage.objects for select to authenticated
  using (bucket_id = 'Editor file uploading' and public.app_role() in ('admin','manager'));

create policy "cust read own result" on storage.objects for select to authenticated
  using (bucket_id = 'Editor file uploading'
         and exists (select 1 from public.orders o
                     where o.result_path = name and o.customer_id = auth.uid() and o.status = 'completed'));
