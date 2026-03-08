
-- Create public storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read images (public portfolio)
CREATE POLICY "Public read portfolio images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- Allow anyone to upload (owner uploads without auth)
CREATE POLICY "Anyone can upload portfolio images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

-- Allow anyone to update portfolio images
CREATE POLICY "Anyone can update portfolio images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'portfolio-images');

-- Create a table to store portfolio settings (like profile photo URL)
CREATE TABLE IF NOT EXISTS public.portfolio_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Public read portfolio settings"
  ON public.portfolio_settings FOR SELECT
  USING (true);

-- Anyone can upsert settings (no auth on this portfolio)
CREATE POLICY "Anyone can insert portfolio settings"
  ON public.portfolio_settings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update portfolio settings"
  ON public.portfolio_settings FOR UPDATE
  USING (true);
