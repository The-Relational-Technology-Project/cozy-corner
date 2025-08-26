import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
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
        <p className="text-cozy-cream-foreground">Loading coupons...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-cozy-cream-foreground italic text-center">
          Pick a coupon to explore the neighborhood with a neighbor! When you claim one, 
          our block steward will make an intro.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => {
          const isClaimed = claimedCoupons.includes(coupon.id);
          
          return (
            <Card key={coupon.id} className="bg-white shadow-md hover:shadow-lg transition-shadow border-cozy-orange/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">{coupon.icon}</div>
                  <h3 className="font-semibold text-lg mb-2 text-cozy-cream-foreground">
                    {coupon.title}
                  </h3>
                  <p className="text-cozy-cream-foreground/80 mb-4 text-sm">
                    {coupon.description}
                  </p>
                  
                  {isClaimed ? (
                    <div className="text-center py-2">
                      <p className="text-green-600 font-medium">
                        ✅ Pending steward intro — you'll be connected soon!
                      </p>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleClaim(coupon)}
                      className="w-full bg-cozy-orange hover:bg-cozy-orange-dark text-cozy-orange-foreground"
                    >
                      Claim
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
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