import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const CouponsContributeTab = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    availability: '',
    contributorName: '',
    contributorEmail: '',
    icon: '🎟️'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const inspirationItems = [
    'Teach a card game',
    'Share favorite coffee spots',
    'Lead a short stretch/yoga routine',
    'Host a tea chat',
    'Show composting/gardening tips',
    'Share a local parenting hack',
    'Offer a surf lesson',
    'Give a tour of your backyard plants',
    'Share your favorite baking recipe',
    'Host a board game night',
    'Share tech setup tips (wifi, apps)',
    'Invite neighbors to walk with you at sunrise/sunset'
  ];

  const iconOptions = [
    '🎟️', '🚲', '🛒', '🏡', '🌳', '👋', '🐕', '🍩', '🎨', '📚', '🪁', '🛠', '🎶', 
    '☕', '🧘', '🌅', '🍞', '🎲', '💻', '🌱', '🏄', '🎭'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in the title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('neighbor_coupons')
        .insert({
          title: formData.title,
          description: formData.description,
          icon: formData.icon,
          availability: formData.availability,
          contributor_name: formData.contributorName || null,
          contributor_email: formData.contributorEmail || null
        });

      if (error) throw error;

      toast({
        title: "Coupon Added!",
        description: "Your coupon has been added and will appear in the Redeem tab.",
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        availability: '',
        contributorName: '',
        contributorEmail: '',
        icon: '🎟️'
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
      toast({
        title: "Error",
        description: "Failed to add coupon. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-cozy-cream-foreground italic text-center">
          Want to share something you love about the neighborhood? Add it here — it doesn't need 
          to be big. The steward will help connect you when someone claims it.
        </p>
      </div>

      {/* Quick Inspiration Panel */}
      <Card className="bg-white/80 border-cozy-orange/20">
        <CardHeader>
          <CardTitle className="text-cozy-cream-foreground text-center">
            💡 You could offer...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {inspirationItems.map((item, index) => (
              <div key={index} className="p-2 bg-cozy-orange-light rounded text-center text-cozy-cream-foreground">
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Offer Creation Form */}
      <Card className="bg-white border-cozy-orange/20">
        <CardHeader>
          <CardTitle className="text-cozy-cream-foreground text-center">
            Create Your Coupon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Coupon Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Coffee Shop Tour"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select 
                  value={formData.icon} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        <span className="text-lg">{icon}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What's included? How casual is it? Give neighbors a sense of what to expect."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                placeholder="e.g., Weekends, Flexible, Mornings"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contributorName">Your Name (optional)</Label>
                <Input
                  id="contributorName"
                  value={formData.contributorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contributorName: e.target.value }))}
                  placeholder="Your first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contributorEmail">Your Email (optional)</Label>
                <Input
                  id="contributorEmail"
                  type="email"
                  value={formData.contributorEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contributorEmail: e.target.value }))}
                  placeholder="For the steward to contact you"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-cozy-orange hover:bg-cozy-orange-dark text-cozy-orange-foreground"
            >
              {isSubmitting ? 'Adding Coupon...' : 'Add My Coupon'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};