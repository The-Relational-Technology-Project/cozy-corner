import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [reminderType, setReminderType] = useState("both");
  const {
    toast
  } = useToast();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to sign up for reminders.",
        variant: "destructive"
      });
      return;
    }
    console.log("Street cleaning signup:", {
      email,
      name,
      reminderType
    });
    toast({
      title: "Welcome to the neighborhood! 🏄‍♀️",
      description: "You're all set for street cleaning reminders. We'll send you a friendly heads up so you never get caught off guard!"
    });

    // Reset form
    setEmail("");
    setName("");
    setReminderType("both");
  };
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
        backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
      }} />
        <div className="relative px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-slate-700 via-blue-600 to-orange-500 bg-clip-text text-transparent mb-4">
              Cozy Corner
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 font-medium mb-2">
              48th Ave Neighbor Hub
            </p>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Simple tools for our little stretch of 48th Ave between Lincoln & Irving
            </p>
          </div>

          {/* Welcome Message */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-slate-700 leading-relaxed">Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site is meant to help bring care and joy to our little corner of San Francisco. 🌊</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Street Cleaning Widget */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                🧹 Street Cleaning Reminders
              </CardTitle>
              <CardDescription className="text-blue-100 text-base">
                Never get caught by surprise! Sign up for free email reminders before street cleaning on 48th Ave.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">
                      Email Address *
                    </Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="neighbor@example.com" className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="text-slate-700 font-medium">
                      Name or Nickname (optional)
                    </Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="How should we greet you?" className="mt-1 border-slate-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl" />
                  </div>

                  <div>
                    <Label className="text-slate-700 font-medium mb-3 block">
                      When would you like reminders?
                    </Label>
                    <RadioGroup value={reminderType} onValueChange={setReminderType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="day-before" id="day-before" />
                        <Label htmlFor="day-before" className="text-slate-600">1 day before</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hour-before" id="hour-before" />
                        <Label htmlFor="hour-before" className="text-slate-600">1 hour before</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="text-slate-600">Both (recommended)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                  <p className="leading-relaxed">
                    We'll only send you street cleaning reminders for 48th Ave. You can unsubscribe anytime. 
                    We never share your info. Every reminder comes with a little joke to brighten your day! 😊
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Sign Me Up! 🌊
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
                <CardTitle className="text-xl">🔮 Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Neighborhood events calendar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Tool library sign-ups</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Block party announcements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Lost & found board</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Mutual aid request board</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-500 to-slate-600 text-white">
                <CardTitle className="text-xl">🏠 About Cozy Corner</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cozy Corner is a tiny mutual aid and connection hub built by neighbors for neighbors. 
                  We believe in keeping things simple, respecting privacy, and fostering real community connections.
                </p>
                
                <div className="space-y-2 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Hyperlocal & community-focused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Privacy-respecting, no data sharing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Zero monetization, built with love</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span>Neighbor-built & neighbor-run</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
            <p className="text-slate-500 text-sm leading-relaxed">
              Made with 💛 by neighbors on 48th Ave. Questions or ideas? 
              Stop by and say hello — we're the ones with the overgrown succulents and the surfboard in the window.
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;