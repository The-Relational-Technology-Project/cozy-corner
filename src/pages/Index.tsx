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
  return <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
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
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-amber-900 leading-relaxed">Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site is meant to help bring care and joy to our little corner of San Francisco. 🌊</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Street Cleaning Widget */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                🧹 Street Cleaning Reminders
              </CardTitle>
              <CardDescription className="text-amber-100 text-base">
                Never get caught by surprise! Sign up for free email reminders before street cleaning on 48th Ave.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-amber-900 font-medium">
                      Email Address *
                    </Label>
                    <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="neighbor@example.com" className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="name" className="text-amber-900 font-medium">
                      Name or Nickname (optional)
                    </Label>
                    <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="How should we greet you?" className="mt-1 border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl" />
                  </div>

                  <div>
                    <Label className="text-amber-900 font-medium mb-3 block">
                      When would you like reminders?
                    </Label>
                    <RadioGroup value={reminderType} onValueChange={setReminderType}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="day-before" id="day-before" />
                        <Label htmlFor="day-before" className="text-amber-800">1 day before</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hour-before" id="hour-before" />
                        <Label htmlFor="hour-before" className="text-amber-800">1 hour before</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both" className="text-amber-800">Both (recommended)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-800">
                  <p className="leading-relaxed">
                    We'll only send you street cleaning reminders for 48th Ave. You can unsubscribe anytime. 
                    We never share your info. Every reminder comes with a little joke to brighten your day! 😊
                  </p>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Sign Me Up! 🌊
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="text-xl">🔮 Coming Soon</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-amber-800">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span>Neighborhood events calendar</span>
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
                <p className="text-amber-800 leading-relaxed mb-4">Cozy Corner is a tiny mutual aid and connection hub built by neighbors for neighbors. We will keep things simple, respect privacy, and aim to support real community connections.</p>
                
                <div className="space-y-2 text-sm text-amber-700">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Hyperlocal & community-focused</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Privacy-respecting, no data sharing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Built with love as a gift to the community</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
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
            <p className="text-amber-700 text-sm leading-relaxed">
              Made with 💛 by neighbors on 48th Ave. Questions or ideas? 
              Reach out in our group chat or stop by and say hello!
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default Index;