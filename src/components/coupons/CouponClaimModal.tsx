import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Coupon {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface CouponClaimModalProps {
  coupon: Coupon;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export const CouponClaimModal = ({ coupon, open, onOpenChange, onSuccess }: CouponClaimModalProps) => {
  const [formData, setFormData] = useState({
    claimerName: '',
    claimerEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.claimerName || !formData.claimerEmail) {
      toast({
        title: "Error",
        description: "Please fill in your name and email.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('coupon_claims')
        .insert({
          coupon_id: coupon.id,
          claimer_name: formData.claimerName,
          claimer_email: formData.claimerEmail,
          status: 'pending'
        });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'coupon_claim',
          formData: {
            coupon_title: coupon.title,
            claimer_name: formData.claimerName,
            claimer_email: formData.claimerEmail
          }
        }
      });

      onSuccess();
    } catch (error) {
      console.error('Error claiming coupon:', error);
      toast({
        title: "Error",
        description: "Failed to claim coupon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="text-4xl mb-2">{coupon.icon}</div>
            Claim: {coupon.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            {coupon.description}
          </p>
          
          <div className="bg-cozy-orange-light p-3 rounded text-sm text-center">
            After you claim this coupon, our block steward will reach out with an intro.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="claimerName">Your Name *</Label>
              <Input
                id="claimerName"
                value={formData.claimerName}
                onChange={(e) => setFormData(prev => ({ ...prev, claimerName: e.target.value }))}
                placeholder="How should we introduce you?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claimerEmail">Your Email *</Label>
              <Input
                id="claimerEmail"
                type="email"
                value={formData.claimerEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, claimerEmail: e.target.value }))}
                placeholder="For the steward to contact you"
                required
              />
            </div>

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-cozy-orange hover:bg-cozy-orange-dark text-cozy-orange-foreground"
              >
                {isSubmitting ? 'Claiming...' : 'Claim Coupon'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};