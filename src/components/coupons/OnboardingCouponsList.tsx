import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface OnboardingCouponsListProps {
  selectedCouponIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export const OnboardingCouponsList = ({ selectedCouponIds, onSelectionChange }: OnboardingCouponsListProps) => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data, error } = await supabase.rpc('get_public_coupons');
        if (error) throw error;
        setCoupons(data || []);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const toggleCoupon = (id: string) => {
    if (selectedCouponIds.includes(id)) {
      onSelectionChange(selectedCouponIds.filter(c => c !== id));
    } else {
      onSelectionChange([...selectedCouponIds, id]);
    }
  };

  if (loading) {
    return <p className="text-muted-foreground text-center text-sm py-4">Loading coupons...</p>;
  }

  return (
    <div className="space-y-3">
      {coupons.map((coupon) => {
        const isSelected = selectedCouponIds.includes(coupon.id);
        return (
          <button
            key={coupon.id}
            type="button"
            onClick={() => toggleCoupon(coupon.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
              isSelected
                ? 'bg-ocean-light border-ocean shadow-sm'
                : 'bg-card border-border/50 hover:border-ocean/30 hover:shadow-sm'
            }`}
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
            <div className="flex-shrink-0 text-xs font-medium">
              {isSelected ? (
                <span className="text-ocean-dark">✅ Picked</span>
              ) : (
                <span className="text-muted-foreground">Tap to pick</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};
