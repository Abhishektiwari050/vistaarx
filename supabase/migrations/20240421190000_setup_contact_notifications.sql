-- Enable HTTP extension
create extension if not exists pg_net;

-- Create contact_inquiries table
create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  name text not null,
  email text not null,
  company text,
  category text,
  budget text,
  timeline text,
  goal text
);

-- Enable RLS
alter table public.contact_inquiries enable row level security;

-- Allow anonymous inserts (adjust if you have specific auth requirements)
create policy "Allow anonymous inserts" on public.contact_inquiries for insert with check (true);

-- Create the function to invoke the edge function
create or replace function public.on_contact_inquiry_insert()
returns trigger as $$
declare
  project_id text := 'oebxzctadsjnvmqyukoo'; -- VistaarX Reference ID
begin
  perform
    net.http_post(
      url := 'https://' || project_id || '.supabase.co/functions/v1/notify-contact',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('vault.service_role_key', true)
      ),
      body := jsonb_build_object('record', row_to_json(new))
    );
  return new;
exception when others then
  raise notice 'Error calling edge function: %', sqlerrm;
  return new;
end;
$$ language plpgsql security definer;

-- Create the trigger
drop trigger if exists on_contact_inquiry_insert_trigger on public.contact_inquiries;
create trigger on_contact_inquiry_insert_trigger
  after insert on public.contact_inquiries
  for each row execute function public.on_contact_inquiry_insert();
