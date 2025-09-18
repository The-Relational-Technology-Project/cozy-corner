-- Remove dummy coupons, keeping only the real ones from Josh
DELETE FROM public.neighbor_coupons 
WHERE contributor_email = 'steward@cozycorner.place' 
AND contributor_name = 'Cozy Corner';