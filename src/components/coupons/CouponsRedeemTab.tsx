import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { CouponClaimModal } from './CouponClaimModal';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const CouponsRedeemTab = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [claimedCoupons, setClaimedCoupons] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_public_coupons');

      if (error) throw error;
      setCoupons(data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      toast({
        title: "Error",
        description: "Failed to load coupons. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleClaimSuccess = (couponId: string) => {
    setClaimedCoupons(prev => [...prev, couponId]);
    setSelectedCoupon(null);
    toast({
      title: "Coupon Claimed!",
      description: "✅ Pending steward intro — you'll be connected soon!",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading coupons...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-muted-foreground italic text-center text-sm">
          Claim a coupon and our block steward will make an intro!
        </p>
      </div>

      <div className="space-y-3">
        {coupons.map((coupon) => {
          const isClaimed = claimedCoupons.includes(coupon.id);
          
          return (
            <div 
              key={coupon.id} 
              className="flex items-center gap-3 p-3 bg-card rounded-xl border border-border/50 hover:border-ocean/30 hover:shadow-sm transition-all"
            >
              <div className="text-2xl flex-shrink-0">{coupon.icon}</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm text-foreground leading-tight">
                  {coupon.title}
                </h3>
                <p className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                  {coupon.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                {isClaimed ? (
                  <span className="text-dune text-xs font-medium whitespace-nowrap">
                    ✅ Claimed
                  </span>
                ) : (
                  <Button 
                    onClick={() => handleClaim(coupon)}
                    size="sm"
                    className="bg-ocean hover:bg-ocean-dark text-ocean-foreground h-8 px-3 text-xs"
                  >
                    Claim
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedCoupon && (
        <CouponClaimModal
          coupon={selectedCoupon}
          open={true}
          onOpenChange={(open) => !open && setSelectedCoupon(null)}
          onSuccess={() => handleClaimSuccess(selectedCoupon.id)}
        />
      )}
    </>
  );
};