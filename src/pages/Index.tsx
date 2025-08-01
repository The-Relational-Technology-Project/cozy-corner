import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import EventSuggestionForm from "@/components/EventSuggestionForm";
import SandAccumulation from "@/components/SandAccumulation";

const Index = () => {
  const [email, setEmail] = useState("");
  const [eastSide, setEastSide] = useState(false);
  const [westSide, setWestSide] = useState(false);
  const [unsubscribeEmail, setUnsubscribeEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
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
      const { error } = await supabase
        .from('street_cleaning_subscriptions' as any)
        .upsert({
          email,
          east_side: eastSide,
          west_side: westSide,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'email'
        });

      if (error) throw error;

      const sides = [];
      if (eastSide) sides.push("East Side (City Side)");
      if (westSide) sides.push("West Side (Beach Side)");
      
      console.log("Street cleaning signup:", { email, sides });
      toast({
        title: "Welcome to the neighborhood! 🏄‍♀️",
        description: `You're signed up for ${sides.join(" and ")} reminders. We'll send you a friendly heads up at 8am on cleaning days!`
      });

      // Reset form
      setEmail("");
      setEastSide(false);
      setWestSide(false);
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
        .from('street_cleaning_unsubscribes' as any)
        .insert({
          email: unsubscribeEmail
        });

      if (unsubscribeError) throw unsubscribeError;

      // Then delete the subscription
      const { error: deleteError } = await supabase
        .from('street_cleaning_subscriptions' as any)
        .delete()
        .eq('email', unsubscribeEmail);

      if (deleteError) throw deleteError;

      console.log("Unsubscribe request:", { email: unsubscribeEmail });
      toast({
        title: "Unsubscribed",
        description: "You've been removed from all street cleaning reminders."
      });
      setUnsubscribeEmail("");
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

  const upcomingEvents = [
    {
      id: 1,
      name: "Inaugural Cozy Corner Block Party",
      date: "Saturday, September 27th",
      time: "10:00 AM",
      location: "On our block!",
      contact: "Community",
      description: "We're in planning mode – please reach out with ideas!",
      highlighted: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      {/* Sand Accumulation Component */}
      <SandAccumulation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
          backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
        }} />
        <div className="relative px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4">
              Cozy Corner
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 font-medium mb-2">
              48th Ave Neighbor Hub
            </p>
          </div>

          {/* Welcome Message */}
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-amber-900 leading-relaxed">Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site is meant to help bring care and joy to our little corner of San Francisco. 🌊</p>
            </div>
          </div>

          {/* Block Party Banner */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link to="/block-party-2025" className="block">
              <Card className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-xl border-0 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 animate-[pulse_4s_ease-in-out_infinite]">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Sparkles className="w-6 h-6" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">🎉 Block Party 2025!</h3>
                      <p className="text-orange-100">Saturday, September 27 • Sign up to help make magic!</p>
                    </div>
                    <Sparkles className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Street Cleaning Widget */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                🧹 Street Cleaning Reminders
              </CardTitle>
              <CardDescription className="text-amber-100 text-base">
                Get 8am email reminders on street cleaning days for your side of 48th Ave.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
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
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing Up..." : "Sign Me Up! 🌊"}
                </Button>
              </form>

              {/* Unsubscribe Section */}
              <div className="border-t border-amber-200 pt-4">
                <h3 className="font-medium text-amber-900 mb-2">Unsubscribe from all reminders</h3>
                <form onSubmit={handleUnsubscribe} className="flex gap-2">
                  <Input 
                    type="email" 
                    value={unsubscribeEmail} 
                    onChange={e => setUnsubscribeEmail(e.target.value)} 
                    placeholder="your@email.com" 
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="submit" 
                    variant="outline" 
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl whitespace-nowrap"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Unsubscribe"}
                  </Button>
                </form>
              </div>

              <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
                <p className="leading-relaxed">
                  We only send street cleaning reminders for 48th Ave. We never share your info. 
                  Reminders come at 8am on cleaning days.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Events Calendar Widget */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription className="text-amber-100">
                Next four weeks on 48th Ave
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`${event.highlighted ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-orange-500 rounded-r-lg p-3 -ml-2' : 'border-l-4 border-amber-400 pl-4'} pb-4 border-b border-amber-100 last:border-b-0`}>
                      <h3 className={`font-semibold ${event.highlighted ? 'text-orange-900' : 'text-amber-900'}`}>{event.name}</h3>
                      <div className="text-sm text-amber-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date} {event.time && `at ${event.time}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-amber-600 mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-amber-400 mb-4" />
                  <p className="text-amber-700 mb-4">No events scheduled yet</p>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
                onClick={() => setShowEventForm(true)}
              >
                Suggest an event!
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon & About Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl">🔮 Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 text-amber-800">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Movie nights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Book clubs</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Tool library sign-ups</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Block party announcements</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Lost & found board</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Your idea!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-700 to-amber-800 text-white">
              <CardTitle className="text-xl">🏠 About Cozy Corner</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-amber-800 leading-relaxed">This site is a tiny mutual support and connection hub built by neighbors for neighbors. We will keep things simple, respect privacy, and aim to support real community connections.</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
            <p className="text-amber-700 text-sm leading-relaxed">
              Made with 💛 by neighbors on 48th Ave. Questions or ideas? 
              Reach out in our group chat or reach out to Josh!
            </p>
          </div>
        </div>
      </div>

      {/* Event Suggestion Form Modal */}
      {showEventForm && (
        <EventSuggestionForm 
          isOpen={showEventForm} 
          onClose={() => setShowEventForm(false)} 
        />
      )}
    </div>
  );
};

export default Index;
