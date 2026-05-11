-- SignalOps preview_submissions table
-- Use this if your existing Supabase project already has the original leads schema
-- and you only need to add the Free Instant AI Lead System Preview flow.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.preview_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  business_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  website text,
  industry text not null,
  other_industry text,
  main_services text,
  main_lead_sources text[] not null default '{}',
  other_lead_source text,
  biggest_bottleneck text,
  current_problem text not null,
  current_tools text,
  lead_process text,
  average_job_value numeric,
  monthly_lead_volume text not null default 'Not sure',
  anything_else text,
  notes text,
  preview_data jsonb not null default '{}',
  manager_notes jsonb not null default '{}',
  selected_system_template text,
  selected_package text,
  classification_json jsonb not null default '{}',
  prompt_worker_result_json jsonb not null default '{}',
  generated_chatgpt_prompt text,
  prompt_status text not null default 'not_generated' check (
    prompt_status in (
      'not_generated',
      'generated',
      'pasted_to_chatgpt',
      'preview_drafted',
      'sent_to_customer',
      'paid',
      'lost'
    )
  ),
  internal_notes text,
  contact_allowed boolean not null default true,
  is_test_submission boolean not null default false,
  test_reason text,
  customer_email_sent_at timestamptz,
  marked_paid_at timestamptz,
  marked_lost_at timestamptz,
  status text not null default 'New' check (
    status in (
      'New',
      'Draft Generated',
      'Needs Review',
      'Approved',
      'Sent'
    )
  ),
  owner_approved boolean not null default false
);

alter table public.preview_submissions add column if not exists updated_at timestamptz not null default now();
alter table public.preview_submissions add column if not exists other_industry text;
alter table public.preview_submissions add column if not exists main_services text;
alter table public.preview_submissions add column if not exists other_lead_source text;
alter table public.preview_submissions add column if not exists biggest_bottleneck text;
alter table public.preview_submissions add column if not exists current_tools text;
alter table public.preview_submissions add column if not exists lead_process text;
alter table public.preview_submissions add column if not exists anything_else text;
alter table public.preview_submissions add column if not exists selected_system_template text;
alter table public.preview_submissions add column if not exists selected_package text;
alter table public.preview_submissions add column if not exists classification_json jsonb not null default '{}';
alter table public.preview_submissions add column if not exists prompt_worker_result_json jsonb not null default '{}';
alter table public.preview_submissions add column if not exists generated_chatgpt_prompt text;
alter table public.preview_submissions add column if not exists prompt_status text not null default 'not_generated';
alter table public.preview_submissions add column if not exists internal_notes text;
alter table public.preview_submissions add column if not exists contact_allowed boolean not null default true;
alter table public.preview_submissions add column if not exists is_test_submission boolean not null default false;
alter table public.preview_submissions add column if not exists test_reason text;
alter table public.preview_submissions add column if not exists customer_email_sent_at timestamptz;
alter table public.preview_submissions add column if not exists marked_paid_at timestamptz;
alter table public.preview_submissions add column if not exists marked_lost_at timestamptz;

alter table public.preview_submissions drop constraint if exists preview_submissions_status_check;
alter table public.preview_submissions add constraint preview_submissions_status_check
check (status in ('New', 'Draft Generated', 'Needs Review', 'Approved', 'Sent'));

alter table public.preview_submissions drop constraint if exists preview_submissions_prompt_status_check;
alter table public.preview_submissions add constraint preview_submissions_prompt_status_check
check (prompt_status in ('not_generated', 'generated', 'pasted_to_chatgpt', 'preview_drafted', 'sent_to_customer', 'paid', 'lost'));

drop trigger if exists preview_submissions_set_updated_at on public.preview_submissions;
create trigger preview_submissions_set_updated_at
before update on public.preview_submissions
for each row
execute function public.set_updated_at();

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
