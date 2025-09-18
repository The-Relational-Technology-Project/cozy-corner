-- First delete any claims for dummy coupons, then delete the dummy coupons themselves
DELETE FROM public.coupon_claims 
WHERE coupon_id IN (
    SELECT id FROM public.neighbor_coupons 
    WHERE contributor_email = 'steward@cozycorner.place' 
    AND contributor_name = 'Cozy Corner'
);

-- Then delete the dummy coupons
DELETE FROM public.neighbor_coupons 
WHERE contributor_email = 'steward@cozycorner.place' 
AND contributor_name = 'Cozy Corner';