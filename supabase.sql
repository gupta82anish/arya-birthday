-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- Wishes table: uploads from friends
create table if not exists public.wishes (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  message text not null,
  image_path text,
  image_url text,
  created_at timestamptz not null default now()
);
alter table public.wishes enable row level security;

-- Everyone can read wishes (for a future public wall if you want)
create policy if not exists wishes_select on public.wishes
for select using (true);

-- Storage bucket for wish images (public)
insert into storage.buckets (id, name, public)
values ('wishes', 'wishes', true)
on conflict do nothing;

-- Allow public (anon) read of objects in the 'wishes' bucket
create policy if not exists "Public Read wishes"
on storage.objects for select
using (bucket_id = 'wishes');
