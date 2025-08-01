import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowDown, Users, Clock, MapPin } from "lucide-react";

// Role data structure
const roles = [
  {
    category: "🏗️ Setup & Safety",
    items: [
      { emoji: "🚧", name: "Barricade Setup", time: "9:30am", spots: 2, filled: 0 },
      { emoji: "🛡️", name: "Adult Monitor and Greeter: Lincoln", time: "all day, shift ok", spots: 2, filled: 0 },
      { emoji: "🛡️", name: "Adult Monitor and Greeter: Irving", time: "all day, shift ok", spots: 2, filled: 0 },
      { emoji: "🧹", name: "Street Sweep", time: "end of day", spots: 2, filled: 0 }
    ]
  },
  {
    category: "🍽️ Food & Snacks",
    items: [
      { emoji: "🥐", name: "Morning setup and takedown", time: "food provided", spots: 4, filled: 0 },
      { emoji: "🍕", name: "Pizza setup and takedown", time: "food provided", spots: 3, filled: 0 },
      { emoji: "🌮", name: "Lunch setup and takedown", time: "food provided", spots: 3, filled: 0 },
      { emoji: "☕", name: "Greet sidewalk talk and mutual aid groups", time: "11am", spots: 1, filled: 0 }
    ]
  },
  {
    category: "🎨 Activities & Stations",
    items: [
      { emoji: "🧼", name: "Bounce House Overseers", time: "equipment provided", spots: 2, filled: 0 },
      { emoji: "🎭", name: "Dress-Up Zone Helper", time: "", spots: 1, filled: 0 },
      { emoji: "🎨", name: "Art Supplies Host", time: "", spots: 1, filled: 0 },
      { emoji: "💃", name: "Dance Class Rally Team", time: "instruction provided, 12:30pm", spots: 2, filled: 0 },
      { emoji: "🎧", name: "Musicians", time: "beginners welcome!, 11am", spots: 5, filled: 0 },
      { emoji: "🌞", name: "Mutual Aid Table Hosts", time: "11am", spots: 2, filled: 0 }
    ]
  },
  {
    category: "💬 Support & Fun",
    items: [
      { emoji: "🎤", name: "Emcee On Demand", time: "welcome, transitions", spots: 1, filled: 0 },
      { emoji: "🎒", name: "Supplies Prepper", time: "tape, sunscreen, bandaids", spots: 1, filled: 0 },
      { emoji: "📸", name: "Photographers", time: "", spots: 2, filled: 0 },
      { emoji: "🤔", name: "I have a new idea!", time: "", spots: 999, filled: 0, isSpecial: true }
    ]
  }
];

const BlockParty2025 = () => {
  const { toast } = useToast();
  const [ideaForm, setIdeaForm] = useState({ email: "", phone: "", idea: "" });
  const [signupForm, setSignupForm] = useState({ name: "", email: "", message: "" });
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleIdeaSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send to your backend
    toast({
      title: "Thanks for your idea!",
      description: "We'll be in touch about incorporating your suggestion.",
    });
    setIdeaForm({ email: "", phone: "", idea: "" });
  };

  const handleRoleSignup = (e) => {
    e.preventDefault();
    // Here you would typically send to your backend
    toast({
      title: "You're signed up!",
      description: `Thanks for volunteering for ${selectedRole?.name}. We'll follow up soon!`,
    });
    setSignupForm({ name: "", email: "", message: "" });
    setIsDialogOpen(false);
    setSelectedRole(null);
  };

  const scrollToSignup = () => {
    document.getElementById('signup-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/patterns/sand-pattern.svg')] bg-repeat opacity-30"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-orange-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-amber-300 rounded-full animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            🎉 48th Ave Block Party 2025
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-4 text-lg text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Saturday, September 27 · 10:00 AM – 2:00 PM
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Between Irving & Lincoln
            </div>
          </div>
          <p className="text-lg text-foreground max-w-2xl mx-auto mb-8">
            We're throwing a block party on 48th Ave — and you're invited to help shape the magic. 
            Pick a role, host an activity, show up and have fun. There's something for everyone.
          </p>

          {/* Idea Submission Form */}
          <Card className="mb-6 max-w-xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">💡 Got Ideas?</CardTitle>
              <CardDescription>Do you have ideas for our party? Let us know!</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleIdeaSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={ideaForm.email}
                      onChange={(e) => setIdeaForm({...ideaForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={ideaForm.phone}
                      onChange={(e) => setIdeaForm({...ideaForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="idea">Your Idea</Label>
                  <Textarea
                    id="idea"
                    placeholder="Tell us about your idea for the block party..."
                    value={ideaForm.idea}
                    onChange={(e) => setIdeaForm({...ideaForm, idea: e.target.value})}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Idea
                </Button>
              </form>
            </CardContent>
          </Card>

          <Button 
            onClick={scrollToSignup} 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse"
          >
            Sign Up to Help <ArrowDown className="ml-2 w-4 h-4" />
          </Button>
        </div>

        {/* Site Plan Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">📍 Site Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <img 
                src="/lovable-uploads/42a9fd25-722a-41f3-8746-565a8bf50bc0.png" 
                alt="48th Ave Block Party Site Plan"
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-muted-foreground mt-4">
                This is the current plan for activities and timeline.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Role Sign-up Grid */}
        <div id="signup-section">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            🙋‍♀️ Sign Up to Help
          </h2>
          
          {roles.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((role, roleIndex) => (
                  <Dialog key={roleIndex} open={isDialogOpen && selectedRole === role} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) setSelectedRole(null);
                  }}>
                    <DialogTrigger asChild>
                      <Card 
                        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                          role.isSpecial ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setSelectedRole(role)}
                      >
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl mb-2">{role.emoji}</div>
                            <h4 className="font-medium text-sm mb-1">{role.name}</h4>
                            {role.time && (
                              <p className="text-xs text-muted-foreground mb-2">
                                {role.time}
                              </p>
                            )}
                            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                              <Users className="w-3 h-3" />
                              {role.isSpecial ? 'Unlimited' : `${role.filled} of ${role.spots} filled`}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          {role.emoji} {role.name}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleRoleSignup} className="space-y-4">
                        <div>
                          <Label htmlFor="signup-name">Name *</Label>
                          <Input
                            id="signup-name"
                            placeholder="Your name"
                            value={signupForm.name}
                            onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="signup-email">Email *</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="your@email.com"
                            value={signupForm.email}
                            onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="signup-message">Message or Note (optional)</Label>
                          <Textarea
                            id="signup-message"
                            placeholder="Any questions or special notes..."
                            value={signupForm.message}
                            onChange={(e) => setSignupForm({...signupForm, message: e.target.value})}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          We'll only use your info to coordinate the event.
                        </div>
                        <Button type="submit" className="w-full">
                          Sign Me Up!
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockParty2025;
