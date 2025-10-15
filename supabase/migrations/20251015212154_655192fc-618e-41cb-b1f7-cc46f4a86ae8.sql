-- Add column to track if form is being completed on behalf of someone else
ALTER TABLE public.disaster_check_ins 
ADD COLUMN completing_on_behalf boolean NOT NULL DEFAULT false;