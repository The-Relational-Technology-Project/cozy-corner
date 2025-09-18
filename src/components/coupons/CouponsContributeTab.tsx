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
    'Check surf conditions together',
    'Peer support for career planning',
    'Offer an empathetic listening ear',
    'Learn about our neighborhood history',
    'Try out different kid bikes',
    'Place the best Hook Fish order',
    'Plan a hike or backpacking trip',
    'Bring some baked goods!',
    'Tour of Other Avenues Co–op',
    'Talk about local daycares',
    'Talk about local preschools',
    'Talk about local schools',
    'Go on a bike tour of GG Park',
    'Share gardening tips',
    'Go on a sunrise or sunset walk'
  ];

  const iconOptions = [
    '🎟️', '🚲', '🛒', '🏡', '🌳', '👋', '🐕', '🍩', '🎨', '📚', '🪁', '🛠', '🎶', 
    '☕', '🧘', '🌅', '🍞', '🎲', '💻', '🌱', '🏄', '🎭'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.contributorName || !formData.contributorEmail) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
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
          contributor_name: formData.contributorName,
          contributor_email: formData.contributorEmail
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
                <Label htmlFor="contributorName">Your Name *</Label>
                <Input
                  id="contributorName"
                  value={formData.contributorName}
                  onChange={(e) => setFormData(prev => ({ ...prev, contributorName: e.target.value }))}
                  placeholder="Your first name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contributorEmail">Your Email *</Label>
                <Input
                  id="contributorEmail"
                  type="email"
                  value={formData.contributorEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, contributorEmail: e.target.value }))}
                  placeholder="For the steward to contact you"
                  required
                />
              </div>
            </div>

            <div className="text-sm text-cozy-cream-foreground/80 bg-cozy-orange-light p-3 rounded-lg">
              <p className="font-medium mb-1">🔒 Privacy Note</p>
              <p>Your name and email are necessary but only shared with the block steward to facilitate connections. They won't appear publicly on the site.</p>
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