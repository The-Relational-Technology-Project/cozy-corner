import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, MessageSquare, Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface StreetCleaningModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formatPhoneDisplay = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

const toE164 = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 10) return `+1${digits}`;
  return '';
};

export const StreetCleaningModal = ({ open, onOpenChange }: StreetCleaningModalProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wantEmail, setWantEmail] = useState(true);
  const [wantSms, setWantSms] = useState(false);
  const [eastSide, setEastSide] = useState(false);
  const [westSide, setWestSide] = useState(false);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnsubscribe, setShowUnsubscribe] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wantEmail && !wantSms) {
      toast({ title: "Choose a reminder method", description: "Please select email, text, or both.", variant: "destructive" });
      return;
    }
    if (wantEmail && !email) {
      toast({ title: "Email required", description: "Please enter your email address for email reminders.", variant: "destructive" });
      return;
    }
    if (wantSms && !toE164(phone)) {
      toast({ title: "Valid phone required", description: "Please enter a 10-digit US phone number for text reminders.", variant: "destructive" });
      return;
    }
    if (!eastSide && !westSide) {
      toast({ title: "Select a side", description: "Please select at least one side for reminders.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const e164Phone = wantSms ? toE164(phone) : null;
      const subEmail = wantEmail ? email : (wantSms ? toE164(phone) : '');

      // Check if subscription exists
      const { data: exists, error: checkError } = await supabase
        .rpc('subscription_exists', { check_email: subEmail });
      if (checkError) throw checkError;

      const payload = {
        east_side: eastSide,
        west_side: westSide,
        phone: e164Phone,
        sms_enabled: wantSms,
        email: subEmail,
        updated_at: new Date().toISOString()
      };

      if (exists) {
        const { error: updateError } = await supabase
          .from('street_cleaning_subscriptions')
          .update(payload)
          .eq('email', subEmail);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('street_cleaning_subscriptions')
          .insert(payload);
        if (insertError) throw insertError;
      }

      // Send admin notification
      await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'street_cleaning',
          formData: { email: subEmail, east_side: eastSide, west_side: westSide, sms_enabled: wantSms, phone: e164Phone, email_enabled: wantEmail }
        }
      });

      // Send confirmation SMS if opted in
      if (wantSms && e164Phone) {
        try {
          await supabase.functions.invoke('send-sms-reminder', {
            body: {
              action: 'send_confirmation',
              phone: e164Phone,
              message: { east_side: eastSide, west_side: westSide }
            }
          });
        } catch (smsError) {
          console.error("SMS confirmation failed:", smsError);
        }
      }

      const sides = [];
      if (eastSide) sides.push("East Side");
      if (westSide) sides.push("West Side");
      const methods = [];
      if (wantEmail) methods.push("email");
      if (wantSms) methods.push("text");

      toast({
        title: "Welcome to the neighborhood! 🏄‍♀️",
        description: `You're signed up for ${sides.join(" & ")} reminders via ${methods.join(" & ")}!`
      });

      setEmail(""); setPhone(""); setWantEmail(true); setWantSms(false);
      setEastSide(false); setWestSide(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error signing up:", error);
      toast({ title: "Signup failed", description: "There was an error signing you up. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unsubscribeEmail) {
      toast({ title: "Email required", description: "Please enter your email address to unsubscribe.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error: unsubscribeError } = await supabase
        .from('street_cleaning_unsubscribes')
        .insert({ email: unsubscribeEmail });
      if (unsubscribeError) throw unsubscribeError;

      const { error: deleteError } = await supabase
        .from('street_cleaning_subscriptions')
        .delete()
        .eq('email', unsubscribeEmail);
      if (deleteError) throw deleteError;

      toast({ title: "Unsubscribed", description: "You've been removed from all street cleaning reminders." });
      setUnsubscribeEmail("");
      setShowUnsubscribe(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error unsubscribing:", error);
      toast({ title: "Unsubscribe failed", description: "There was an error processing your request.", variant: "destructive" });
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
            Get 8am reminders on cleaning days — by email, text, or both.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Schedule */}
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* How do you want to be reminded? */}
                <div>
                  <Label className="text-amber-900 font-medium mb-3 block">
                    How do you want to be reminded?
                  </Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wantEmail"
                        checked={wantEmail}
                        onCheckedChange={(checked) => setWantEmail(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="wantEmail" className="text-amber-800 flex items-center gap-1.5 cursor-pointer">
                        <Mail className="h-3.5 w-3.5" /> Email
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="wantSms"
                        checked={wantSms}
                        onCheckedChange={(checked) => setWantSms(checked as boolean)}
                        disabled={isSubmitting}
                      />
                      <Label htmlFor="wantSms" className="text-amber-800 flex items-center gap-1.5 cursor-pointer">
                        <MessageSquare className="h-3.5 w-3.5" /> Text message (SMS)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Email field */}
                {wantEmail && (
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
                      required={wantEmail}
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                {/* Phone field */}
                {wantSms && (
                  <div>
                    <Label htmlFor="phone" className="text-amber-900 font-medium">
                      Phone Number (US) *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(formatPhoneDisplay(e.target.value))}
                      placeholder="(415) 555-1234"
                      className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-amber-600 mt-1">
                      Standard message rates apply. Reply STOP to unsubscribe from texts.
                    </p>
                  </div>
                )}

                {/* Which side */}
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
                  disabled={isSubmitting || (!wantEmail && !wantSms)}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Me Up! 🌊"}
                </Button>
              </form>

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
