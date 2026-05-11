-- SignalOps Supabase schema
-- Run this in the Supabase SQL editor for the project that backs SignalOps.
-- The app writes through the server-only service role key. No anon policies are
-- added here, so browser clients cannot read or write these tables directly.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'website',
  name text not null,
  email text,
  phone text,
  business_name text,
  website text,
  industry text,
  service_needed text,
  urgency text,
  address text,
  message text,
  vehicle_year_make_model text,
  wheel_size text,
  damage_type text,
  number_of_wheels integer not null default 0,
  vehicle_drivable text,
  needs_mobile_service text,
  photo_notes text,
  preferred_time text,
  score integer not null default 0 check (score >= 0 and score <= 100),
  priority text not null default 'cold' check (priority in ('hot', 'warm', 'cold', 'junk')),
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'booked', 'closed', 'archived')),
  ai_summary text,
  ai_urgency text check (ai_urgency is null or ai_urgency in ('emergency', 'soon', 'researching', 'unknown')),
  ai_confidence numeric(3,2) check (ai_confidence is null or (ai_confidence >= 0 and ai_confidence <= 1)),
  needs_human_review boolean not null default false,
  recommended_action text,
  customer_reply text,
  internal_note text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null,
  title text not null,
  description text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.lead_messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  channel text not null default 'sms' check (channel in ('sms', 'email', 'chat', 'phone', 'internal')),
  direction text not null default 'outbound' check (direction in ('inbound', 'outbound', 'internal')),
  subject text,
  body text not null,
  status text not null default 'draft' check (status in ('draft', 'queued', 'sent', 'delivered', 'failed', 'received')),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

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

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

drop trigger if exists preview_submissions_set_updated_at on public.preview_submissions;
create trigger preview_submissions_set_updated_at
before update on public.preview_submissions
for each row
execute function public.set_updated_at();

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_priority_idx on public.leads (priority);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_tags_idx on public.leads using gin (tags);
create index if not exists lead_events_lead_id_idx on public.lead_events (lead_id);
create index if not exists lead_messages_lead_id_idx on public.lead_messages (lead_id);
create index if not exists preview_submissions_created_at_idx on public.preview_submissions (created_at desc);
create index if not exists preview_submissions_status_idx on public.preview_submissions (status);
create index if not exists preview_submissions_email_idx on public.preview_submissions (email);

alter table public.leads enable row level security;
alter table public.lead_events enable row level security;
alter table public.lead_messages enable row level security;
alter table public.preview_submissions enable row level security;

grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon, authenticated;
grant insert on public.preview_submissions to anon, authenticated;
grant select, insert, update on public.leads to authenticated;
grant select, insert, update on public.lead_events to authenticated;
grant select, insert, update on public.lead_messages to authenticated;
grant select, insert, update on public.preview_submissions to authenticated;

drop policy if exists leads_public_insert on public.leads;
create policy leads_public_insert
on public.leads
for insert
to anon
with check (
  name is not null
  and (
    nullif(email, '') is not null
    or nullif(phone, '') is not null
  )
);

drop policy if exists leads_authenticated_read on public.leads;
create policy leads_authenticated_read
on public.leads
for select
to authenticated
using (true);

drop policy if exists leads_authenticated_update on public.leads;
create policy leads_authenticated_update
on public.leads
for update
to authenticated
using (true)
with check (true);

drop policy if exists lead_events_authenticated_all on public.lead_events;
create policy lead_events_authenticated_all
on public.lead_events
for all
to authenticated
using (true)
with check (true);

drop policy if exists lead_messages_authenticated_all on public.lead_messages;
create policy lead_messages_authenticated_all
on public.lead_messages
for all
to authenticated
using (true)
with check (true);

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

-- Anonymous visitors can submit leads, but they cannot read lead data back.
-- Server-side SignalOps API routes should use SUPABASE_SERVICE_ROLE_KEY for
-- privileged reads, dashboard access, and status updates in production.
