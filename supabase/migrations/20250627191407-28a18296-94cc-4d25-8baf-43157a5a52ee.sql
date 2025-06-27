
-- Create a table to track global sand accumulation
CREATE TABLE public.sand_accumulation (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  last_cleared_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  sand_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial record
INSERT INTO public.sand_accumulation (sand_count) VALUES (0);

-- Enable RLS (but make it publicly readable/writable since this is a community feature)
ALTER TABLE public.sand_accumulation ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Anyone can view sand accumulation" 
  ON public.sand_accumulation 
  FOR SELECT 
  USING (true);

-- Create policy for public update access
CREATE POLICY "Anyone can update sand accumulation" 
  ON public.sand_accumulation 
  FOR UPDATE 
  USING (true);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_sand_accumulation_updated_at
  BEFORE UPDATE ON public.sand_accumulation
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
