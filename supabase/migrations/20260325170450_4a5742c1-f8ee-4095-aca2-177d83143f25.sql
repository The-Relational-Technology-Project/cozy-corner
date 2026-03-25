
CREATE TABLE public.block_party_survey_2026 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  preferred_times text[],
  preferred_month text,
  unavailable_weekends text,
  participation_factors text,
  potluck_ok boolean NOT NULL,
  party_ideas text,
  wants_committee boolean,
  committee_contact text
);

ALTER TABLE public.block_party_survey_2026 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit survey" ON public.block_party_survey_2026
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Only admins can view surveys" ON public.block_party_survey_2026
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'));
