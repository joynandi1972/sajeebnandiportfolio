
-- Add browser and device columns for fingerprinting
ALTER TABLE public.visitor_logs
  ADD COLUMN IF NOT EXISTS browser TEXT,
  ADD COLUMN IF NOT EXISTS device TEXT;

-- Add unique constraint to deduplicate by ip + browser + device
ALTER TABLE public.visitor_logs
  ADD CONSTRAINT visitor_logs_unique_fingerprint
  UNIQUE (ip, browser, device);

-- Drop old restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Allow inserts" ON public.visitor_logs;
DROP POLICY IF EXISTS "Allow reads" ON public.visitor_logs;

CREATE POLICY "Allow public inserts"
  ON public.visitor_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public reads"
  ON public.visitor_logs FOR SELECT
  USING (true);

-- Enable realtime on the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.visitor_logs;
