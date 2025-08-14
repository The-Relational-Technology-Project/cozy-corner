import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Lightbulb } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NeighborhoodContributionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const existingIdeas = [
  "Movie nights",
  "Book clubs",
  "Tool library sign-ups",
  "Block party announcements",
  "Lost & found board",
  "Other (specify in message)"
];

export const NeighborhoodContributionsModal = ({ open, onOpenChange }: NeighborhoodContributionsModalProps) => {
  const [contributionType, setContributionType] = useState<"suggestion" | "volunteer">("suggestion");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    suggestedIdea: "",
    existingIdea: "",
    message: "",
    availability: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (contributionType === "suggestion" && !formData.suggestedIdea) {
      toast({
        title: "Idea required",
        description: "Please describe your neighborhood idea.",
        variant: "destructive"
      });
      return;
    }

    if (contributionType === "volunteer" && !formData.existingIdea) {
      toast({
        title: "Selection required", 
        description: "Please select which activity you'd like to help with.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('neighborhood_contributions')
        .insert({
          name: formData.name || null,
          email: formData.email,
          phone: formData.phone || null,
          contribution_type: contributionType,
          suggested_idea: contributionType === "suggestion" ? formData.suggestedIdea : null,
          existing_idea: contributionType === "volunteer" ? formData.existingIdea : null,
          message: formData.message || null,
          availability: contributionType === "volunteer" ? formData.availability : null
        });

      if (error) throw error;

      toast({
        title: contributionType === "suggestion" ? "Idea submitted! 💡" : "Volunteer interest recorded! ❤️",
        description: contributionType === "suggestion" 
          ? "Thanks for sharing your idea! We'll be in touch if we move forward with it."
          : "Thanks for volunteering! We'll reach out when we start organizing this activity."
      });

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        suggestedIdea: "",
        existingIdea: "",
        message: "",
        availability: ""
      });
      setContributionType("suggestion");
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting contribution:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your contribution. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      suggestedIdea: "",
      existingIdea: "",
      message: "",
      availability: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2 text-amber-900">
            🌟 Help Shape Our Neighborhood
          </DialogTitle>
          <DialogDescription className="text-amber-700">
            Share your ideas or volunteer to help make our community even better!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contribution Type Selection */}
          <div className="space-y-3">
            <Label className="text-amber-900 font-medium">What would you like to do?</Label>
            <RadioGroup 
              value={contributionType} 
              onValueChange={(value: "suggestion" | "volunteer") => {
                setContributionType(value);
                resetForm();
              }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-4 border border-amber-200 rounded-xl hover:bg-amber-50 cursor-pointer">
                <RadioGroupItem value="suggestion" id="suggestion" />
                <Label htmlFor="suggestion" className="cursor-pointer flex items-center gap-2 text-amber-800">
                  <Lightbulb className="h-4 w-4" />
                  Suggest an idea
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border border-amber-200 rounded-xl hover:bg-amber-50 cursor-pointer">
                <RadioGroupItem value="volunteer" id="volunteer" />
                <Label htmlFor="volunteer" className="cursor-pointer flex items-center gap-2 text-amber-800">
                  <Heart className="h-4 w-4" />
                  Volunteer to help
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-amber-900 font-medium">Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Your name" 
                className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-amber-900 font-medium">Email *</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                placeholder="your@email.com" 
                className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone" className="text-amber-900 font-medium">Phone (optional)</Label>
            <Input 
              id="phone" 
              type="tel"
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
              placeholder="(555) 123-4567" 
              className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
              disabled={isSubmitting}
            />
          </div>

          {/* Conditional Content Based on Contribution Type */}
          {contributionType === "suggestion" ? (
            <>
              <div>
                <Label htmlFor="suggestedIdea" className="text-amber-900 font-medium">Your neighborhood idea *</Label>
                <Textarea 
                  id="suggestedIdea"
                  value={formData.suggestedIdea} 
                  onChange={e => setFormData({...formData, suggestedIdea: e.target.value})} 
                  placeholder="Describe your idea for improving our neighborhood..." 
                  className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl min-h-[100px]" 
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-amber-900 font-medium">Additional details (optional)</Label>
                <Textarea 
                  id="message"
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  placeholder="Any additional thoughts, logistics, or context..." 
                  className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                  disabled={isSubmitting}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="existingIdea" className="text-amber-900 font-medium">Which activity interests you? *</Label>
                <Select value={formData.existingIdea} onValueChange={(value) => setFormData({...formData, existingIdea: value})}>
                  <SelectTrigger className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl">
                    <SelectValue placeholder="Select an activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingIdeas.map((idea) => (
                      <SelectItem key={idea} value={idea}>{idea}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="availability" className="text-amber-900 font-medium">Your availability & skills</Label>
                <Textarea 
                  id="availability"
                  value={formData.availability} 
                  onChange={e => setFormData({...formData, availability: e.target.value})} 
                  placeholder="When are you available? What skills or resources can you offer?" 
                  className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-amber-900 font-medium">Additional message (optional)</Label>
                <Textarea 
                  id="message"
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                  placeholder="Anything else you'd like us to know..." 
                  className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" 
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : contributionType === "suggestion" ? "Submit Idea 💡" : "Sign Me Up! ❤️"}
          </Button>

          <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
            <p className="leading-relaxed">
              We'll review all contributions and reach out when we're ready to move forward. Thanks for helping make our neighborhood amazing! 🌟
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};