
CREATE TABLE public.visitor_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip TEXT,
  country TEXT NOT NULL DEFAULT 'Unknown',
  country_code TEXT NOT NULL DEFAULT '??',
  city TEXT,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow inserts" ON public.visitor_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow reads" ON public.visitor_logs FOR SELECT USING (true);

CREATE INDEX idx_visitor_logs_visited_at ON public.visitor_logs (visited_at DESC);
CREATE INDEX idx_visitor_logs_country ON public.visitor_logs (country);
