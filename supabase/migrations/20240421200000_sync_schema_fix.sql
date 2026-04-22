-- 1. Ensure extension is enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Create table if missing
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  category TEXT,
  goal TEXT
);

-- 3. Add missing columns if they were skipped in the previous run
DO $$ 
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_inquiries' AND column_name='category') THEN
    ALTER TABLE public.contact_inquiries ADD COLUMN category TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='contact_inquiries' AND column_name='goal') THEN
    ALTER TABLE public.contact_inquiries ADD COLUMN goal TEXT;
  END IF;
END $$;

-- 4. Re-apply RLS Policy
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_inquiries;
CREATE POLICY "Allow anonymous inserts" ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- 5. Fix the Trigger Function (Removed the problematic vault setting)
CREATE OR REPLACE FUNCTION public.on_contact_inquiry_insert()
RETURNS TRIGGER AS $$
DECLARE
  project_id TEXT := 'oebxzctadsjnvmqyukoo';
BEGIN
  PERFORM
    net.http_post(
      url := 'https://' || project_id || '.supabase.co/functions/v1/notify-contact',
      headers := jsonb_build_object(
        'Content-Type', 'application/json'
        -- Authorization is currently omitted as the Edge Function is public 
        -- and the previous vault.service_role_key was likely causing errors
      ),
      body := jsonb_build_object('record', row_to_json(new))
    );
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Fallback: If trigger fails, the insert should still succeed
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Ensure Trigger is attached
DROP TRIGGER IF EXISTS on_contact_inquiry_insert_trigger ON public.contact_inquiries;
CREATE TRIGGER on_contact_inquiry_insert_trigger
  AFTER INSERT ON public.contact_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.on_contact_inquiry_insert();
