-- Create table for block party role signups
CREATE TABLE public.block_party_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT,
  role_name TEXT NOT NULL,
  role_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for block party ideas
CREATE TABLE public.block_party_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  phone TEXT,
  idea TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.block_party_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.block_party_ideas ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a community event)
CREATE POLICY "Anyone can view block party signups" 
ON public.block_party_signups 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create block party signups" 
ON public.block_party_signups 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view block party ideas" 
ON public.block_party_ideas 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create block party ideas" 
ON public.block_party_ideas 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_block_party_signups_updated_at
BEFORE UPDATE ON public.block_party_signups
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_block_party_ideas_updated_at
BEFORE UPDATE ON public.block_party_ideas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();