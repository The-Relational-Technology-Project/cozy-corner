import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ExternalLink, MessageCircle, Plus, Calendar, Package, Users, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServiceRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: string;
  serviceName: string;
}

const ServiceRequestModal = ({ open, onOpenChange, serviceType, serviceName }: ServiceRequestModalProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast({
        title: "Required fields",
        description: "Please enter your name and contact info.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const isEmail = contact.includes('@');
      const { error } = await supabase
        .from('community_service_requests')
        .insert({
          name: name.trim(),
          email: isEmail ? contact.trim() : null,
          phone: !isEmail ? contact.trim() : null,
          service_type: serviceType,
          message: message.trim() || null
        });

      if (error) throw error;

      toast({
        title: "Request sent!",
        description: "Josh will get back to you soon with the link."
      });
      onOpenChange(false);
      setName('');
      setContact('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Access: {serviceName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="req-name">Your Name</Label>
            <Input
              id="req-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should we know you?"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="req-contact">Email or Phone</Label>
            <Input
              id="req-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="How can Josh reach you?"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="req-message">Message (optional)</Label>
            <Textarea
              id="req-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything you'd like Josh to know?"
              className="mt-1.5"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-ocean hover:bg-ocean-dark text-ocean-foreground"
          >
            {isSubmitting ? 'Sending...' : 'Request Access'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface SuggestServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuggestServiceModal = ({ open, onOpenChange }: SuggestServiceModalProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceUrl, setServiceUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName.trim()) {
      toast({
        title: "Service name required",
        description: "Please enter the service name.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const isEmail = contact.includes('@');
      const { error } = await supabase
        .from('community_service_requests')
        .insert({
          name: name.trim() || 'Anonymous',
          email: isEmail ? contact.trim() : null,
          phone: !isEmail && contact.trim() ? contact.trim() : null,
          service_type: 'suggest_new',
          suggested_service_name: serviceName.trim(),
          suggested_service_url: serviceUrl.trim() || null,
          message: message.trim() || null
        });

      if (error) throw error;

      toast({
        title: "Suggestion received!",
        description: "Thanks for helping grow our community resources."
      });
      onOpenChange(false);
      setName('');
      setContact('');
      setServiceName('');
      setServiceUrl('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Suggest a Community Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="svc-name">Service Name *</Label>
            <Input
              id="svc-name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              placeholder="e.g., Sunset Tool Library"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="svc-url">Website (optional)</Label>
            <Input
              id="svc-url"
              type="url"
              value={serviceUrl}
              onChange={(e) => setServiceUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea
              id="svc-desc"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What does this service offer?"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="your-name">Your Name (optional)</Label>
            <Input
              id="your-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="your-contact">Your Contact (optional)</Label>
            <Input
              id="your-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="In case we have questions"
              className="mt-1.5"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-ocean hover:bg-ocean-dark text-ocean-foreground"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const CommunityServices = () => {
  const [requestModal, setRequestModal] = useState<{ open: boolean; type: string; name: string }>({
    open: false,
    type: '',
    name: ''
  });
  const [suggestModal, setSuggestModal] = useState(false);

  const services = [
    {
      name: 'Outer Sunset Today',
      description: 'Neighborhood events calendar — find out what\'s happening nearby',
      icon: Calendar,
      color: 'bg-ocean-light text-ocean-dark',
      iconColor: 'text-ocean',
      type: 'link',
      url: 'https://outersunset.today'
    },
    {
      name: 'Community Supplies',
      description: 'Neighborhood sharing library — borrow tools, gear & more',
      icon: Package,
      color: 'bg-dune-light text-dune-dark',
      iconColor: 'text-dune',
      type: 'link',
      url: 'https://communitysupplies.org'
    },
    {
      name: 'Outer Mamas',
      description: 'WhatsApp group for moms in the Outer Sunset',
      icon: Users,
      color: 'bg-sunset-light text-sunset-dark',
      iconColor: 'text-sunset',
      type: 'request',
      serviceType: 'outer_mamas'
    },
    {
      name: 'Outer Dadas',
      description: 'WhatsApp group for dads in the Outer Sunset',
      icon: Users,
      color: 'bg-sky-light text-sky-dark',
      iconColor: 'text-sky',
      type: 'request',
      serviceType: 'outer_dadas'
    },
    {
      name: 'SF Mutual Aid - Sunset Pod',
      description: 'Neighbors helping neighbors with everyday needs',
      icon: Heart,
      color: 'bg-sand-light text-sand-foreground',
      iconColor: 'text-sunset',
      type: 'request',
      serviceType: 'mutual_aid'
    },
    {
      name: 'Outer Sunset Neighbors',
      description: 'Community nonprofit advocating for our neighborhood',
      icon: Users,
      color: 'bg-fog-light text-fog-foreground',
      iconColor: 'text-ocean',
      type: 'link',
      url: 'https://sunsetneighbors.org'
    }
  ];

  return (
    <>
      <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-ocean-gradient text-ocean-foreground">
          <CardTitle className="text-xl flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Community Services
          </CardTitle>
          <CardDescription className="text-ocean-foreground/80">
            Local resources and groups for Outer Sunset neighbors
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {services.map((service) => {
              const Icon = service.icon;
              
              if (service.type === 'link' && service.url) {
                return (
                  <a
                    key={service.name}
                    href={service.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className={`${service.color} rounded-xl p-4 h-full transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-card/50 ${service.iconColor}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="font-semibold truncate">{service.name}</h3>
                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                          </div>
                          <p className="text-sm opacity-80">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              }

              return (
                <button
                  key={service.name}
                  onClick={() => setRequestModal({ open: true, type: service.serviceType || '', name: service.name })}
                  className="text-left group w-full"
                >
                  <div className={`${service.color} rounded-xl p-4 h-full transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-lg`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-card/50 ${service.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="font-semibold truncate">{service.name}</h3>
                          <MessageCircle className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
                        </div>
                        <p className="text-sm opacity-80">{service.description}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            onClick={() => setSuggestModal(true)}
            variant="outline"
            className="w-full border-ocean/30 text-ocean hover:bg-ocean-light rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Suggest a community service
          </Button>
        </CardContent>
      </Card>

      <ServiceRequestModal
        open={requestModal.open}
        onOpenChange={(open) => setRequestModal(prev => ({ ...prev, open }))}
        serviceType={requestModal.type}
        serviceName={requestModal.name}
      />

      <SuggestServiceModal
        open={suggestModal}
        onOpenChange={setSuggestModal}
      />
    </>
  );
};