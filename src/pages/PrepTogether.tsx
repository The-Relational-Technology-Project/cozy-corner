import { useState } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Waves, Home, Users, ExternalLink, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PrepTogether = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_info: "",
    vulnerable_count: "1",
    specific_needs: "",
    language_preference: "english",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.address || !formData.vulnerable_count) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your address and number of people needing check-ins.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("disaster_check_ins")
        .insert([{
          name: formData.name || null,
          address: formData.address,
          contact_info: formData.contact_info || null,
          vulnerable_count: parseInt(formData.vulnerable_count),
          specific_needs: formData.specific_needs || null,
          language_preference: formData.language_preference,
        }]);

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Successfully signed up!",
        description: "Thank you! We'll check on you if a disaster hits. Stay safe – and check on your neighbors too!",
      });

      // Reset form
      setFormData({
        name: "",
        address: "",
        contact_info: "",
        vulnerable_count: "1",
        specific_needs: "",
        language_preference: "english",
      });
    } catch (error) {
      console.error("Error submitting check-in request:", error);
      toast({
        title: "Submission failed",
        description: "There was an error signing up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    document.getElementById("check-in-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950/20 dark:to-green-950/20 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-4 mb-6">
            <Home className="w-12 h-12 text-primary" />
            <Waves className="w-12 h-12 text-blue-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Prep Together: Stay Safe, Stay Connected
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Earthquakes and tsunamis are real risks in our neighborhood. By preparing together, we can protect each other.
          </p>
          <Button size="lg" onClick={scrollToForm} className="text-lg px-8">
            Sign Up for a Post-Disaster Check-In
          </Button>
        </div>
      </section>

      {/* Know Our Risks */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Know Our Risks</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Earthquake Risk */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                  <CardTitle>Earthquake Risks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  The Sunset sits on sandy soil that can act like quicksand in a quake. Experts say there's a 72% chance of a major earthquake (M6.7+) in the Bay Area by 2043.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">What you can do now:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Secure heavy furniture</li>
                    <li>Prepare a 72-hour emergency kit</li>
                    <li>Practice 'Drop, Cover, and Hold On'</li>
                    <li>Sign up for AlertSF</li>
                  </ul>
                </div>
                <a 
                  href="https://www.ready.gov/earthquakes" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  Learn more at Ready.gov <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>

            {/* Tsunami Risk */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Waves className="w-6 h-6 text-blue-500" />
                  <CardTitle>Tsunami Risks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Outer Sunset is in a tsunami hazard zone. In a worst-case quake offshore, waves could reach 20–30 feet and flood up to 46th Avenue.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-foreground">What you can do now:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Know evacuation routes uphill</li>
                    <li>If west of 46th Ave, be ready to evacuate</li>
                    <li>Store water and supplies</li>
                    <li>Talk with family about plans</li>
                  </ul>
                </div>
                <a 
                  href="https://www.conservation.ca.gov/cgs/tsunami" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  CA Geological Survey tsunami map <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Neighbors Helping Neighbors */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Neighbors Helping Neighbors</h2>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Connection is Preparedness</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Neighbors are the true first responders. Checking on each other saves lives. Imagine the day after a big quake: power is out, cell service is down. Who will knock on the door of the elderly couple nearby? Together, we can make sure no one is left isolated.
              </p>
              
              <div className="bg-background p-4 rounded-lg">
                <h4 className="font-semibold mb-3 text-foreground">Ways to connect:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Exchange phone numbers or WeChat/WhatsApp info</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Organize a block coffee chat or annual meet-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Pair up in a buddy system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Connect with local NERT/CERT trainings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                <p className="text-sm font-medium text-foreground">
                  Want to volunteer to check on neighbors? <a href="/contact" className="underline hover:text-primary">Contact us</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Check-In Form */}
      <section id="check-in-form" className="py-16 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center justify-center gap-2">
              Request a Post-Disaster Check-In
              <span className="text-red-500">❤</span>
            </h2>
            <p className="text-muted-foreground">
              Do you live alone, have limited mobility, or care for someone who might need extra help? Let your neighbors know. Fill out this form so Cozy Corner volunteers can check on you after an emergency. Your info will stay private.
            </p>
          </div>

          {submitted ? (
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto" />
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200">
                    Thank You!
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    We'll check on you if a disaster hits. Stay safe – and check on your neighbors too!
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Submit Another Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name / 姓名 (Optional)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address / 地址 <span className="text-red-500">*</span></Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact">Preferred Contact / 聯絡方式 (Optional)</Label>
                    <Input
                      id="contact"
                      value={formData.contact_info}
                      onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                      placeholder="Phone, email, WeChat, etc."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vulnerable_count">
                      Number of people needing check-ins / 家中需要特別照顧的人數 <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={formData.vulnerable_count}
                      onValueChange={(value) => setFormData({ ...formData, vulnerable_count: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specific_needs">Any specific needs? (Optional)</Label>
                    <Textarea
                      id="specific_needs"
                      value={formData.specific_needs}
                      onChange={(e) => setFormData({ ...formData, specific_needs: e.target.value })}
                      placeholder="Wheelchair access, medical devices, language support, etc."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language Preference</Label>
                    <Select 
                      value={formData.language_preference}
                      onValueChange={(value) => setFormData({ ...formData, language_preference: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="mandarin">Mandarin / 普通话</SelectItem>
                        <SelectItem value="cantonese">Cantonese / 粵語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                    🔒 Your information will never be public. Only Cozy Corner volunteers will use it to check on you.
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up / 提交表格"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          <p className="text-sm text-center text-muted-foreground mt-6">
            Want to update or remove your info? <a href="/contact" className="text-primary hover:underline">Contact us</a>.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Resources & Links</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://alertsf.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 bg-background hover:bg-accent rounded-lg border transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">AlertSF Sign-Up</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>

            <a 
              href="https://www.ready.gov/earthquakes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 bg-background hover:bg-accent rounded-lg border transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Ready.gov Earthquake Guide</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>

            <a 
              href="https://www.ready.gov/tsunamis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 bg-background hover:bg-accent rounded-lg border transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Ready.gov Tsunami Guide</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>

            <a 
              href="https://www.conservation.ca.gov/cgs/tsunami" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 bg-background hover:bg-accent rounded-lg border transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">CA Tsunami Hazard Zones</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </div>
            </a>
          </div>

          <p className="text-sm text-center text-muted-foreground mt-8">
            Information sources: FEMA, USGS, SF Department of Emergency Management, California Geological Survey
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrepTogether;