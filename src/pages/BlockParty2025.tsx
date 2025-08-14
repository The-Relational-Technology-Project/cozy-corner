import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDown, Users, Clock, MapPin, ChevronDown, Lightbulb, Sparkles, Home } from "lucide-react";

// Role data structure
const roles = [{
  category: "🏗️ Setup & Safety",
  items: [{
    emoji: "🚧",
    name: "Barricade Setup",
    time: "9:30am",
    spots: 2,
    filled: 0
  }, {
    emoji: "🛡️",
    name: "Adult Monitor and Greeter: Lincoln",
    time: "all day, shift ok",
    spots: 2,
    filled: 0
  }, {
    emoji: "🛡️",
    name: "Adult Monitor and Greeter: Irving",
    time: "all day, shift ok",
    spots: 2,
    filled: 0
  }, {
    emoji: "🧹",
    name: "Street Sweep",
    time: "end of day",
    spots: 2,
    filled: 0
  }]
}, {
  category: "🍽️ Food & Snacks",
  items: [{
    emoji: "🥐",
    name: "Morning setup and takedown",
    time: "food provided",
    spots: 4,
    filled: 0
  }, {
    emoji: "🍕",
    name: "Pizza setup and takedown",
    time: "food provided",
    spots: 3,
    filled: 0
  }, {
    emoji: "🌮",
    name: "Lunch setup and takedown",
    time: "food provided",
    spots: 3,
    filled: 0
  }, {
    emoji: "☕",
    name: "Greet sidewalk talk and mutual aid groups",
    time: "11am",
    spots: 1,
    filled: 0
  }]
}, {
  category: "🎨 Activities & Stations",
  items: [{
    emoji: "🧼",
    name: "Bounce House Overseers",
    time: "equipment provided",
    spots: 2,
    filled: 0
  }, {
    emoji: "🎭",
    name: "Dress-Up Zone Helper",
    time: "",
    spots: 1,
    filled: 0
  }, {
    emoji: "🎨",
    name: "Art Supplies Host",
    time: "",
    spots: 1,
    filled: 0
  }, {
    emoji: "💃",
    name: "Dance Class Rally Team",
    time: "instruction provided, 12:30pm",
    spots: 2,
    filled: 0
  }, {
    emoji: "🎧",
    name: "Musicians",
    time: "beginners welcome!, 11am",
    spots: 5,
    filled: 0
  }, {
    emoji: "🌞",
    name: "Mutual Aid Table Hosts",
    time: "11am",
    spots: 2,
    filled: 0
  }]
}, {
  category: "💬 Support & Fun",
  items: [{
    emoji: "🎤",
    name: "Emcee On Demand",
    time: "welcome, transitions",
    spots: 1,
    filled: 0
  }, {
    emoji: "🎒",
    name: "Supplies Prepper",
    time: "tape, sunscreen, bandaids",
    spots: 1,
    filled: 0
  }, {
    emoji: "📸",
    name: "Photographers",
    time: "",
    spots: 2,
    filled: 0
  }, {
    emoji: "📢",
    name: "Spread the word",
    time: "to neighbors",
    spots: 5,
    filled: 0
  }, {
    emoji: "🤔",
    name: "I have a new idea!",
    time: "",
    spots: 999,
    filled: 0,
    isSpecial: true
  }]
}, {
  category: "🎪 Party Supplies & Equipment",
  items: [{
    emoji: "🪑",
    name: "Folding tables",
    time: "loan for party",
    spots: 10,
    filled: 0
  }, {
    emoji: "💺",
    name: "Outdoor chairs",
    time: "loan for party",
    spots: 50,
    filled: 0
  }, {
    emoji: "👗",
    name: "Kids dress up supplies",
    time: "loan for party",
    spots: 10,
    filled: 0
  }, {
    emoji: "🎨",
    name: "Chalk and art supplies",
    time: "loan for party",
    spots: 10,
    filled: 0
  }, {
    emoji: "🔊",
    name: "Speakers for music",
    time: "loan for party",
    spots: 2,
    filled: 0
  }, {
    emoji: "✨",
    name: "Something else we need!",
    time: "loan for party",
    spots: 10,
    filled: 0
  }]
}];
const BlockParty2025 = () => {
  const { toast } = useToast();
  const [rolesData, setRolesData] = useState(roles);
  const [ideaForm, setIdeaForm] = useState({
    email: "",
    phone: "",
    idea: ""
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [selectedRole, setSelectedRole] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isIdeaFormOpen, setIsIdeaFormOpen] = useState(false);

  // Load signup counts from Supabase using secure function
  useEffect(() => {
    const loadSignupCounts = async () => {
      try {
        const { data: signups, error } = await supabase
          .rpc('get_signup_counts');

        if (error) {
          console.error('Error loading signups:', error);
          return;
        }

        // Convert the function result to the expected format
        const signupCounts = {};
        signups?.forEach(signup => {
          const key = `${signup.role_category}:${signup.role_name}`;
          signupCounts[key] = signup.signup_count;
        });

        // Update roles data with counts
        const updatedRoles = roles.map(category => ({
          ...category,
          items: category.items.map(role => ({
            ...role,
            filled: signupCounts[`${category.category}:${role.name}`] || 0
          }))
        }));

        setRolesData(updatedRoles);
      } catch (error) {
        console.error('Error loading signup counts:', error);
      }
    };

    loadSignupCounts();
  }, []);
  const handleIdeaSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('block_party_ideas')
        .insert({
          email: ideaForm.email,
          phone: ideaForm.phone || null,
          idea: ideaForm.idea
        });

      if (error) {
        console.error('Error submitting idea:', error);
        toast({
          title: "Error",
          description: "Failed to submit your idea. Please try again.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Thanks for your idea!",
        description: "We'll be in touch about incorporating your suggestion."
      });
      setIdeaForm({
        email: "",
        phone: "",
        idea: ""
      });
      setIsIdeaFormOpen(false);
    } catch (error) {
      console.error('Error submitting idea:', error);
      toast({
        title: "Error",
        description: "Failed to submit your idea. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRoleSignup = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    try {
      // Find the category for the selected role
      const category = rolesData.find(cat => cat.items.some(item => item.name === selectedRole.name));
      
      const { error } = await supabase
        .from('block_party_signups')
        .insert({
          name: signupForm.name,
          email: signupForm.email,
          message: signupForm.message || null,
          role_name: selectedRole.name,
          role_category: category?.category || ''
        });

      if (error) {
        console.error('Error submitting signup:', error);
        toast({
          title: "Error",
          description: "Failed to submit your signup. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Update the local state to increment the filled count
      setRolesData(prevRoles => 
        prevRoles.map(categoryData => ({
          ...categoryData,
          items: categoryData.items.map(role => 
            role.name === selectedRole.name 
              ? { ...role, filled: role.filled + 1 }
              : role
          )
        }))
      );

      toast({
        title: "Thank you!",
        description: "Josh will send reminders and a day-of schedule."
      });
      setSignupForm({
        name: "",
        email: "",
        message: ""
      });
      setIsDialogOpen(false);
      setSelectedRole(null);
    } catch (error) {
      console.error('Error submitting signup:', error);
      toast({
        title: "Error",
        description: "Failed to submit your signup. Please try again.",
        variant: "destructive"
      });
    }
  };
  const scrollToSignup = () => {
    document.getElementById('signup-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      {/* Hero Section with Background Image */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
        backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
      }} />
        <div className="relative px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4">
              🎉 48th Ave Block Party 2025
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-lg text-amber-800 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Saturday, September 27 · 10:00 AM – 2:00 PM
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Between Irving & Lincoln
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-amber-900 leading-relaxed mb-6">We're throwing a block party on 48th Ave – you're invited to help make it awesome for everyone. Pick a role, host an activity, show up, and have fun! There's something for everyone.</p>

              {/* Collapsible Idea Form */}
              <Collapsible open={isIdeaFormOpen} onOpenChange={setIsIdeaFormOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="mb-4 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl bg-white/80">
                    <Lightbulb className="mr-2 w-4 h-4" />
                    Got Ideas for Our Party? 
                    <ChevronDown className={`ml-2 w-4 h-4 transition-transform ${isIdeaFormOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4">
                  <Card className="bg-white/80 backdrop-blur-sm border-amber-200">
                    <CardContent className="p-6">
                      <form onSubmit={handleIdeaSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="email" className="text-amber-900 font-medium">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" value={ideaForm.email} onChange={e => setIdeaForm({
                            ...ideaForm,
                            email: e.target.value
                          })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" required />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-amber-900 font-medium">Phone (optional)</Label>
                            <Input id="phone" type="tel" placeholder="(555) 123-4567" value={ideaForm.phone} onChange={e => setIdeaForm({
                            ...ideaForm,
                            phone: e.target.value
                          })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="idea" className="text-amber-900 font-medium">Your Idea</Label>
                          <Textarea id="idea" placeholder="Tell us about your idea for the block party..." value={ideaForm.idea} onChange={e => setIdeaForm({
                          ...ideaForm,
                          idea: e.target.value
                        })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" required />
                        </div>
                        <div className="text-xs text-amber-700">
                          We'll only use your info to coordinate the event.
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl">
                          Submit Idea
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>

              {/* Fun Sign Up CTA */}
              <Button onClick={scrollToSignup} size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 md:py-4 px-4 md:px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 animate-[wiggle_2s_ease-in-out_infinite] text-sm md:text-base">
                <Sparkles className="mr-1 md:mr-2 w-4 h-4 md:w-5 md:h-5" />
                <span className="whitespace-nowrap">Sign Up to Help Make Magic!</span>
                <ArrowDown className="ml-1 md:ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl">
        {/* Site Plan Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-12">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardTitle className="text-2xl text-center">📍 Site Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <img src="/lovable-uploads/e634664c-2dee-432b-b6c1-95d5ca32688b.png" alt="48th Ave Block Party Site Plan" className="w-full max-w-2xl mx-auto rounded-lg shadow-md" />
              <p className="text-sm text-amber-600 mt-4">
                This is the current plan for activities and timeline.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Role Sign-up Grid */}
        <div id="signup-section">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-8">
            🙋‍♀️ Sign Up to Help
          </h2>
          
          {rolesData.map((category, categoryIndex) => <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-6">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="text-xl">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((role, roleIndex) => <Dialog key={roleIndex} open={isDialogOpen && selectedRole === role} onOpenChange={open => {
                setIsDialogOpen(open);
                if (!open) setSelectedRole(null);
              }}>
                      <DialogTrigger asChild>
                        <Card className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-amber-200 ${role.isSpecial ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50' : 'hover:border-amber-400'}`} onClick={() => setSelectedRole(role)}>
                          <CardContent className="p-4">
                            <div className="text-center">
                              <div className="text-2xl mb-2">{role.emoji}</div>
                              <h4 className="font-medium text-sm mb-1 text-amber-900">{role.name}</h4>
                              {role.time && <p className="text-xs text-amber-700 mb-2">
                                  {role.time}
                                </p>}
                              <div className="flex items-center justify-center gap-1 text-xs text-amber-600">
                                <Users className="w-3 h-3" />
                                {role.isSpecial ? 'Unlimited' : `${role.filled} of ${role.spots} filled`}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="bg-white/95 backdrop-blur-sm">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2 text-amber-900">
                            {role.emoji} {role.name}
                          </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleRoleSignup} className="space-y-4">
                          <div>
                            <Label htmlFor="signup-name" className="text-amber-900 font-medium">Name *</Label>
                            <Input id="signup-name" placeholder="Your name" value={signupForm.name} onChange={e => setSignupForm({
                        ...signupForm,
                        name: e.target.value
                      })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" required />
                          </div>
                          <div>
                            <Label htmlFor="signup-email" className="text-amber-900 font-medium">Email *</Label>
                            <Input id="signup-email" type="email" placeholder="your@email.com" value={signupForm.email} onChange={e => setSignupForm({
                        ...signupForm,
                        email: e.target.value
                      })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" required />
                          </div>
                          <div>
                            <Label htmlFor="signup-message" className="text-amber-900 font-medium">Message or Note (optional)</Label>
                            <Textarea id="signup-message" placeholder="Any questions or special notes..." value={signupForm.message} onChange={e => setSignupForm({
                        ...signupForm,
                        message: e.target.value
                      })} className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" />
                          </div>
                          <div className="text-xs text-amber-700">
                            We'll only use your info to coordinate the event.
                          </div>
                          <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl">
                            Sign Me Up! 🎉
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>)}
                </div>
              </CardContent>
            </Card>)}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
            <p className="text-amber-700 text-sm leading-relaxed mb-4">
              Made with 💛 by neighbors on 48th Ave. Questions about the block party? 
              Reach out in our group chat or reach out to Josh!
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 transition-colors duration-200 text-sm font-medium">
              <Home className="w-4 h-4" />
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default BlockParty2025;