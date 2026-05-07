-- SignalOps preview_submissions table
-- Use this if your existing Supabase project already has the original leads schema
-- and you only need to add the Free Instant AI Lead System Preview flow.

create extension if not exists pgcrypto;

create table if not exists public.preview_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  industry text not null,
  main_lead_sources text[] not null default '{}',
  current_problem text not null,
  average_job_value numeric,
  monthly_lead_volume text not null default 'Not sure',
  notes text,
  preview_data jsonb not null default '{}',
  manager_notes jsonb not null default '{}',
  status text not null default 'New' check (
    status in (
      'New',
      'Preview Generated',
      'Needs Review',
      'Approved to Send',
      'Sent',
      'Discovery Booked',
      'Project Initiated',
      'Building',
      'Delivered',
      'Won',
      'Lost'
    )
  ),
  owner_approved boolean not null default false
);

create index if not exists preview_submissions_created_at_idx on public.preview_submissions (created_at desc);
create index if not exists preview_submissions_status_idx on public.preview_submissions (status);
create index if not exists preview_submissions_email_idx on public.preview_submissions (email);

alter table public.preview_submissions enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.preview_submissions to anon, authenticated;
grant select, insert, update on public.preview_submissions to authenticated;

drop policy if exists preview_submissions_public_insert on public.preview_submissions;
create policy preview_submissions_public_insert
on public.preview_submissions
for insert
to anon
with check (
  nullif(business_name, '') is not null
  and nullif(contact_name, '') is not null
  and nullif(email, '') is not null
);

drop policy if exists preview_submissions_authenticated_read on public.preview_submissions;
create policy preview_submissions_authenticated_read
on public.preview_submissions
for select
to authenticated
using (true);

drop policy if exists preview_submissions_authenticated_update on public.preview_submissions;
create policy preview_submissions_authenticated_update
on public.preview_submissions
for update
to authenticated
using (true)
with check (true);
