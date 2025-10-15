
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EventSuggestionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventSuggestionForm = ({ isOpen, onClose }: EventSuggestionFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event_title: "",
    event_description: "",
    suggested_date: "",
    suggested_location: "",
    contact_info: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.event_title) {
      toast({
        title: "Event title required",
        description: "Please provide a title for your event suggestion.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('event_suggestions')
        .insert({
          name: formData.name || null,
          email: formData.email || null,
          event_title: formData.event_title,
          event_description: formData.event_description || null,
          suggested_date: formData.suggested_date || null,
          suggested_location: formData.suggested_location || null,
          contact_info: formData.contact_info || null
        });

      if (error) throw error;

      // Send email notification
      await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'event_suggestion',
          formData: formData
        }
      });

      toast({
        title: "Event suggestion submitted! 🎉",
        description: "Thank you for helping make our neighborhood more vibrant. We'll review your suggestion and get back to you!"
      });

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        event_title: "",
        event_description: "",
        suggested_date: "",
        suggested_location: "",
        contact_info: ""
      });
      onClose();
    } catch (error) {
      console.error("Error submitting event suggestion:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your suggestion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-900">Suggest a Neighborhood Event 🎉</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="event_title" className="text-amber-900 font-medium">
              Event Title *
            </Label>
            <Input
              id="event_title"
              value={formData.event_title}
              onChange={(e) => handleInputChange('event_title', e.target.value)}
              placeholder="Block party, movie night, book club..."
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="event_description" className="text-amber-900 font-medium">
              Description
            </Label>
            <Textarea
              id="event_description"
              value={formData.event_description}
              onChange={(e) => handleInputChange('event_description', e.target.value)}
              placeholder="Tell us more about your event idea..."
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              rows={3}
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="suggested_date" className="text-amber-900 font-medium">
                Suggested Date
              </Label>
              <Input
                id="suggested_date"
                value={formData.suggested_date}
                onChange={(e) => handleInputChange('suggested_date', e.target.value)}
                placeholder="Saturday evening"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="suggested_location" className="text-amber-900 font-medium">
                Location
              </Label>
              <Input
                id="suggested_location"
                value={formData.suggested_location}
                onChange={(e) => handleInputChange('suggested_location', e.target.value)}
                placeholder="47th & Kirkham"
                className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-amber-900 font-medium">
              Your Name (optional)
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Your name"
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-amber-900 font-medium">
              Email (optional)
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your@email.com"
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <Label htmlFor="contact_info" className="text-amber-900 font-medium">
              Contact Info (optional)
            </Label>
            <Input
              id="contact_info"
              value={formData.contact_info}
              onChange={(e) => handleInputChange('contact_info', e.target.value)}
              placeholder="How can we reach you?"
              className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Suggestion"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventSuggestionForm;
