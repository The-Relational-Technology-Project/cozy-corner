
-- Create a table for upcoming events that can be managed from the admin panel
CREATE TABLE public.upcoming_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index for better performance when querying by date
CREATE INDEX idx_upcoming_events_date ON public.upcoming_events(event_date);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_upcoming_events_updated_at
  BEFORE UPDATE ON public.upcoming_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
