import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { OnboardingCouponsList } from '@/components/coupons/OnboardingCouponsList';
import { ChevronLeft, ChevronRight, Waves, MessageSquare, Users, Ticket, Lightbulb } from 'lucide-react';

interface NewNeighborWelcomeProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Step = 'welcome' | 'whatsapp' | 'coupons' | 'hello' | 'ideas' | 'complete';

const STEPS: Step[] = ['welcome', 'whatsapp', 'coupons', 'hello', 'ideas', 'complete'];

export const NewNeighborWelcome = ({ open, onOpenChange }: NewNeighborWelcomeProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('welcome');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    wantsWhatsapp: true,
    welcomeMessage: '',
    ideas: ''
  });
  const [selectedCouponIds, setSelectedCouponIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStep === 'complete';

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const goPrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('new_neighbor_signups')
        .insert({
          name: formData.name.trim(),
          phone: formData.phone.trim() || null,
          email: formData.email.trim() || null,
          wants_whatsapp: formData.wantsWhatsapp,
          welcome_message: formData.welcomeMessage.trim() || null,
          ideas: formData.ideas.trim() || null
        });

      if (error) throw error;

      // Submit coupon claims inline
      if (selectedCouponIds.length > 0) {
        const claimInserts = selectedCouponIds.map(couponId => ({
          coupon_id: couponId,
          claimer_name: formData.name.trim(),
          claimer_email: formData.email.trim() || null,
          status: 'pending'
        }));
        await supabase.from('coupon_claims').insert(claimInserts);
      }

      // Send email notification
      await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'new_neighbor_signup',
          formData: {
            name: formData.name.trim(),
            phone: formData.phone.trim() || null,
            email: formData.email.trim() || null,
            wants_whatsapp: formData.wantsWhatsapp,
            welcome_message: formData.welcomeMessage.trim() || null,
            ideas: formData.ideas.trim() || null,
            claimed_coupon_count: selectedCouponIds.length
          }
        }
      });

      setCurrentStep('complete');
    } catch (error) {
      console.error('Error submitting:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset after closing
    setTimeout(() => {
      setCurrentStep('welcome');
      setSelectedCouponIds([]);
      setFormData({
        name: '',
        phone: '',
        email: '',
        wantsWhatsapp: true,
        welcomeMessage: '',
        ideas: ''
      });
    }, 300);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center gap-2 mb-6">
      {STEPS.filter(s => s !== 'complete').map((step, index) => (
        <div
          key={step}
          className={`w-2 h-2 rounded-full transition-colors ${
            index <= STEPS.indexOf(currentStep) && currentStep !== 'complete'
              ? 'bg-ocean'
              : 'bg-fog'
          }`}
        />
      ))}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl mb-4">🌊</div>
            <h2 className="text-2xl font-bold text-foreground">Welcome!</h2>
            <p className="text-muted-foreground leading-relaxed">
              We're your neighbors on 48th Ave between Lincoln & Irving in San Francisco's Outer Sunset. 
              This site helps us share resources, plan parties, and look out for each other.
            </p>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-dune-light rounded-full mb-4">
                <Users className="w-8 h-8 text-dune" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Join Our Group Chat</h2>
              <p className="text-muted-foreground mt-2">
                We use WhatsApp for quick updates and mutual support. It's a good vibe.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="How should neighbors know you?"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number (for WhatsApp)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="We'll add you to the group"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="For occasional block updates"
                  className="mt-1.5"
                />
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Totally optional — you can always join later!
            </p>
          </div>
        );

      case 'coupons':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sunset-light rounded-full mb-4">
                <Ticket className="w-8 h-8 text-sunset" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Neighbor Coupons</h2>
              <p className="text-muted-foreground mt-2">
                Pick any of these to connect with a neighbor! Claim one and our block steward will make an intro.
              </p>
            </div>
            
            <div className="max-h-[40vh] overflow-y-auto -mx-2 px-2">
              <OnboardingCouponsList
                selectedCouponIds={selectedCouponIds}
                onSelectionChange={setSelectedCouponIds}
              />
            </div>
          </div>
        );

      case 'hello':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-ocean-light rounded-full mb-4">
                <MessageSquare className="w-8 h-8 text-ocean" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Say Hello!</h2>
              <p className="text-muted-foreground mt-2">
                Optionally, drop a note to Josh, who keeps this site running. Questions, ideas, anything on your mind!
              </p>
            </div>
            
            <div>
              <Label htmlFor="message">Your message</Label>
              <Textarea
                id="message"
                value={formData.welcomeMessage}
                onChange={(e) => setFormData(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                placeholder="Hi! I just moved to the block..."
                className="mt-1.5 min-h-[120px]"
              />
            </div>
            
          </div>
        );

      case 'ideas':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-light rounded-full mb-4">
                <Lightbulb className="w-8 h-8 text-sky" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Got Ideas?</h2>
              <p className="text-muted-foreground mt-2">
                What would make this block even better? Events, shared resources, traditions?
              </p>
            </div>
            
            <div>
              <Label htmlFor="ideas">Your ideas</Label>
              <Textarea
                id="ideas"
                value={formData.ideas}
                onChange={(e) => setFormData(prev => ({ ...prev, ideas: e.target.value }))}
                placeholder="I'd love it if we had..."
                className="mt-1.5 min-h-[120px]"
              />
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6 animate-fade-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground">Welcome to the Block!</h2>
            <p className="text-muted-foreground leading-relaxed">
              Thanks for introducing yourself, {formData.name}! 
              {formData.phone && " We'll add you to the WhatsApp group soon."}
              {formData.welcomeMessage && " Josh will be in touch!"}
            </p>
            <div className="bg-ocean-light rounded-xl p-4 text-ocean-dark">
              <p className="text-sm font-medium">
                Explore the site to discover events, community services, and ways to connect with neighbors.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-ocean">
            <Waves className="w-5 h-5" />
            New to the Block?
          </DialogTitle>
        </DialogHeader>

        {!isLastStep && renderStepIndicator()}

        {renderStep()}

        <div className="flex justify-between mt-6 pt-4 border-t border-border">
          {!isFirstStep && !isLastStep ? (
            <Button
              variant="ghost"
              onClick={goPrev}
              className="text-muted-foreground"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {isLastStep ? (
            <Button
              onClick={handleClose}
              className="ml-auto bg-ocean hover:bg-ocean-dark text-ocean-foreground"
            >
              Start Exploring
            </Button>
          ) : currentStep === 'ideas' ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name.trim()}
              className="bg-ocean hover:bg-ocean-dark text-ocean-foreground"
            >
              {isSubmitting ? 'Submitting...' : 'Complete'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={goNext}
              className="bg-ocean hover:bg-ocean-dark text-ocean-foreground"
            >
              {currentStep === 'welcome' ? 'Next' : 'Continue'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};