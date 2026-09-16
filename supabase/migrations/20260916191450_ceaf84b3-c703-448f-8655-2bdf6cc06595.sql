CREATE TABLE public.block_party_2026_signups (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  contact text NOT NULL,
  potluck_item text,
  volunteer_roles text[],
  questions text
);

GRANT INSERT ON public.block_party_2026_signups TO anon;
GRANT SELECT, INSERT ON public.block_party_2026_signups TO authenticated;
GRANT ALL ON public.block_party_2026_signups TO service_role;

ALTER TABLE public.block_party_2026_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit block party signups"
ON public.block_party_2026_signups FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Only admins can view block party signups"
ON public.block_party_2026_signups FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_block_party_2026_signups_updated_at
BEFORE UPDATE ON public.block_party_2026_signups
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();