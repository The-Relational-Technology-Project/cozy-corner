import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StreetCleaningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StreetCleaningModal = ({ open, onOpenChange }: StreetCleaningModalProps) => {
  const [email, setEmail] = useState("");
  const [eastSide, setEastSide] = useState(false);
  const [westSide, setWestSide] = useState(false);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to sign up for reminders.",
        variant: "destructive"
      });
      return;
    }
    if (!eastSide && !westSide) {
      toast({
        title: "Select a side",
        description: "Please select at least one side for street cleaning reminders.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First check if subscription exists
      const { data: exists, error: checkError } = await supabase
        .rpc('subscription_exists', { check_email: email });

      if (checkError) throw checkError;

      if (exists) {
        // Update existing subscription
        const { error: updateError } = await supabase
          .from('street_cleaning_subscriptions')
          .update({
            east_side: eastSide,
            west_side: westSide,
            updated_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) throw updateError;
      } else {
        // Insert new subscription
        const { error: insertError } = await supabase
          .from('street_cleaning_subscriptions')
          .insert({
            email,
            east_side: eastSide,
            west_side: westSide
          });

        if (insertError) throw insertError;
      }

      const sides = [];
      if (eastSide) sides.push("East Side (City Side)");
      if (westSide) sides.push("West Side (Beach Side)");
      
      toast({
        title: "Welcome to the neighborhood! 🏄‍♀️",
        description: `You're signed up for ${sides.join(" and ")} reminders. We'll send you a friendly heads up at 8am on cleaning days!`
      });

      // Reset form and close modal
      setEmail("");
      setEastSide(false);
      setWestSide(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Signup failed",
        description: "There was an error signing you up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unsubscribeEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address to unsubscribe.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // First record the unsubscribe request
      const { error: unsubscribeError } = await supabase
        .from('street_cleaning_unsubscribes')
        .insert({
          email: unsubscribeEmail
        });

      if (unsubscribeError) throw unsubscribeError;

      // Then delete the subscription
      const { error: deleteError } = await supabase
        .from('street_cleaning_subscriptions')
        .delete()
        .eq('email', unsubscribeEmail);

      if (deleteError) throw deleteError;

      toast({
        title: "Unsubscribed",
        description: "You've been removed from all street cleaning reminders."
      });
      setUnsubscribeEmail("");
      setShowUnsubscribe(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast({
        title: "Unsubscribe failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-amber-900">
            🧹 Street Cleaning Reminders
          </DialogTitle>
          <DialogDescription className="text-amber-700">
            Get 8am email reminders on street cleaning days for your side of 48th Ave.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Street Cleaning Schedule */}
          <div className="bg-amber-50 rounded-xl p-4">
            <h3 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Street Cleaning Schedule
            </h3>
            <div className="space-y-2 text-sm text-amber-800">
              <div className="flex justify-between">
                <span className="font-medium">East Side (City Side):</span>
                <span>12pm - 2pm, 1st & 3rd Friday</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">West Side (Beach Side):</span>
                <span>1pm - 3pm, 1st & 3rd Tuesday</span>
              </div>
            </div>
          </div>

          {!showUnsubscribe ? (
            <>
              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-amber-900 font-medium">
                    Email Address *
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="neighbor@example.com" 
                    className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                    required 
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label className="text-amber-900 font-medium mb-3 block">
                    Which side reminders do you want?
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="eastSide" 
                        checked={eastSide}
                        onCheckedChange={(checked) => setEastSide(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="eastSide" className="text-amber-800">East Side (City Side) - 1st & 3rd Friday</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="westSide" 
                        checked={westSide}
                        onCheckedChange={(checked) => setWestSide(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="westSide" className="text-amber-800">West Side (Beach Side) - 1st & 3rd Tuesday</Label>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Me Up! 🌊"}
                </Button>
              </form>

              {/* Toggle to Unsubscribe */}
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowUnsubscribe(true)}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  Need to unsubscribe instead?
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Unsubscribe Form */}
              <div className="space-y-4">
                <h3 className="font-medium text-amber-900">Unsubscribe from all reminders</h3>
                <form onSubmit={handleUnsubscribe} className="space-y-4">
                  <div>
                    <Label htmlFor="unsubscribeEmail" className="text-amber-900 font-medium">
                      Email Address *
                    </Label>
                    <Input 
                      id="unsubscribeEmail"
                      type="email" 
                      value={unsubscribeEmail} 
                      onChange={e => setUnsubscribeEmail(e.target.value)} 
                      placeholder="your@email.com" 
                      className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                      disabled={isSubmitting}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Unsubscribe"}
                  </Button>
                </form>
              </div>

              {/* Toggle back to Sign Up */}
              <div className="text-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowUnsubscribe(false)}
                  className="text-amber-600 hover:text-amber-700 text-sm"
                >
                  ← Back to sign up
                </Button>
              </div>
            </>
          )}

          <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
            <p className="leading-relaxed">
              We only send street cleaning reminders for 48th Ave. We never share your info. 
              Reminders come at 8am on cleaning days.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};