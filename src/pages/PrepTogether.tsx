import { useState } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertCircle, Waves, Home, Users, ExternalLink, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const PrepTogether = () => {
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_info: "",
    vulnerable_count: "1",
    specific_needs: "",
    language_preference: "english",
    completing_on_behalf: false
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.vulnerable_count) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your address and number of people needing check-ins.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("disaster_check_ins").insert([{
        name: formData.name || null,
        address: formData.address,
        contact_info: formData.contact_info || null,
        vulnerable_count: parseInt(formData.vulnerable_count),
        specific_needs: formData.specific_needs || null,
        language_preference: formData.language_preference,
        completing_on_behalf: formData.completing_on_behalf
      }]);
      if (error) throw error;
      setSubmitted(true);
      toast({
        title: "Successfully signed up!",
        description: "Thank you! We'll check on you if a disaster hits. Stay safe – and check on your neighbors too!"
      });

      // Reset form
      setFormData({
        name: "",
        address: "",
        contact_info: "",
        vulnerable_count: "1",
        specific_needs: "",
        language_preference: "english",
        completing_on_behalf: false
      });
    } catch (error) {
      console.error("Error submitting check-in request:", error);
      toast({
        title: "Submission failed",
        description: "There was an error signing up. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const scrollToForm = () => {
    document.getElementById("check-in-form")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      <MainNavigation />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
        backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
      }} />
        <div className="relative px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-4 leading-tight">
              Prep Together
            </h1>
            <p className="text-xl md:text-2xl text-slate-800 font-medium mb-6">
              Stay Safe, Stay Connected
            </p>
            
            {/* Welcome Message */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <p className="text-lg text-slate-900 leading-relaxed">
                  Earthquakes and tsunamis are real risks in our neighborhood. By preparing together, we can protect each other.
                </p>
              </div>
            </div>

            <Button size="lg" onClick={scrollToForm} className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-xl text-base md:text-lg px-4 md:px-8">
              Sign Up for a Post-Disaster Check-In ❤️
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl space-y-12">
        
        {/* Know Our Risks */}
        <section className="pt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-10 leading-tight">
            Know Our Risks
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Earthquake Risk */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-white/60">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-xl text-slate-900">Earthquake Risks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  The Sunset sits on sandy soil that can act like quicksand in a quake. Experts say there's a 72% chance of a major earthquake (M6.7+) in the Bay Area by 2043.
                </p>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold mb-2 text-orange-900">What you can do now:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-orange-800">
                    <li>Secure heavy furniture</li>
                    <li>Prepare a 72-hour emergency kit</li>
                    <li>Practice 'Drop, Cover, and Hold On'</li>
                    <li>Sign up for AlertSF</li>
                  </ul>
                </div>
                <a href="https://www.ready.gov/earthquakes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-800 font-medium transition-colors">
                  Learn more at Ready.gov <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>

            {/* Tsunami Risk */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-white/60">
                <div className="flex items-center gap-2">
                  <Waves className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-xl text-slate-900">Tsunami Risks</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  Outer Sunset is in a tsunami hazard zone. In a worst-case quake offshore, waves could reach 20–30 feet and flood up to 46th Avenue.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold mb-2 text-blue-900">What you can do now:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                    <li>Know evacuation routes uphill</li>
                    <li>If west of 46th Ave, be ready to evacuate</li>
                    <li>Store water and supplies</li>
                    <li>Talk with family about plans</li>
                  </ul>
                </div>
                <a href="https://www.conservation.ca.gov/cgs/tsunami" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                  CA Geological Survey tsunami map <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Neighbors Helping Neighbors */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-blue-600 text-white">
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6" />
                <CardTitle className="text-2xl">Neighbors Helping Neighbors</CardTitle>
              </div>
              <CardDescription className="text-blue-100 text-center text-lg">
                Connection is Preparedness
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed text-lg">Neighbors are the true first responders. Checking on each other saves lives. Together, we can make sure no one is left isolated.</p>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-semibold mb-4 text-slate-900 text-lg">Ways to connect:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Exchange phone numbers or WeChat/WhatsApp info</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Join an upcoming planning conversation in Josh N's garage</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Pair up in a buddy system</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">Connect with local NERT/CERT trainings</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm font-medium text-slate-900">
                  Want to join an upcoming planning meeting or volunteer to check on neighbors? <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact us</a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Check-In Form */}
        <section id="check-in-form" className="scroll-mt-24">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
              <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                Request a Post-Disaster Check-In
                <span>❤</span>
              </CardTitle>
              <CardDescription className="text-red-100 text-center">
                Do you live alone, have limited mobility, or care for someone who might need extra help? Let your neighbors know.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-slate-700 leading-relaxed mb-6 text-center">
                Fill out this form so Cozy Corner volunteers can check on you after an emergency. Your info will stay private.
              </p>

              {submitted ? <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
                    <h3 className="text-2xl font-bold text-green-800">
                      Thank You!
                    </h3>
                    <p className="text-green-700">
                      We'll check on you if a disaster hits. Stay safe – and check on your neighbors too!
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl">
                      Submit Another Request
                    </Button>
                  </div>
                 </div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-start space-x-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <Checkbox 
                      id="on-behalf" 
                      checked={formData.completing_on_behalf}
                      onCheckedChange={(checked) => setFormData({
                        ...formData,
                        completing_on_behalf: checked as boolean
                      })}
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <Label htmlFor="on-behalf" className="text-slate-900 font-medium cursor-pointer">
                        I'm completing this form on behalf of someone else
                      </Label>
                      <p className="text-sm text-slate-600">
                        (who has given consent)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900">Name / 姓名 (Optional)</Label>
                    <Input id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} placeholder="Your name" className="border-slate-300 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-slate-900">
                      Address / 地址 <span className="text-red-600">*</span>
                    </Label>
                    <Input id="address" required value={formData.address} onChange={e => setFormData({
                  ...formData,
                  address: e.target.value
                })} placeholder="Street address" className="border-slate-300 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-slate-900">Preferred Contact / 聯絡方式 (Optional)</Label>
                    <Input id="contact" value={formData.contact_info} onChange={e => setFormData({
                  ...formData,
                  contact_info: e.target.value
                })} placeholder="Phone, email, WeChat, etc." className="border-slate-300 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vulnerable_count" className="text-slate-900">
                      Number of people needing check-ins / 家中需要特別照顧的人數 <span className="text-red-600">*</span>
                    </Label>
                    <Select value={formData.vulnerable_count} onValueChange={value => setFormData({
                  ...formData,
                  vulnerable_count: value
                })}>
                      <SelectTrigger className="border-slate-300 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "person" : "people"}
                          </SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specific_needs" className="text-slate-900">Any specific needs? (Optional)</Label>
                    <Textarea id="specific_needs" value={formData.specific_needs} onChange={e => setFormData({
                  ...formData,
                  specific_needs: e.target.value
                })} placeholder="Wheelchair access, medical devices, language support, etc." rows={3} className="border-slate-300 rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-slate-900">Language Preference</Label>
                    <Select value={formData.language_preference} onValueChange={value => setFormData({
                  ...formData,
                  language_preference: value
                })}>
                      <SelectTrigger className="border-slate-300 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="mandarin">Mandarin / 普通话</SelectItem>
                        <SelectItem value="cantonese">Cantonese / 粵語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                    🔒 Your information will never be public. Only Cozy Corner volunteers will use it to check on you.
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Signing Up..." : "Sign Up / 提交表格"}
                  </Button>
                </form>}

              <p className="text-sm text-center text-slate-600 mt-6">
                Want to update or remove your info? <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact us</a>.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Resources */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-600 to-blue-600 text-white">
              <CardTitle className="text-2xl text-center">Resources & Links</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-4">
                <a href="https://alertsf.org" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">AlertSF Sign-Up</span>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </a>

                <a href="https://www.ready.gov/earthquakes" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">Ready.gov Earthquake Guide</span>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </a>

                <a href="https://www.ready.gov/tsunamis" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">Ready.gov Tsunami Guide</span>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </a>

                <a href="https://www.conservation.ca.gov/cgs/tsunami" target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900">CA Tsunami Hazard Zones</span>
                    <ExternalLink className="w-4 h-4 text-slate-600" />
                  </div>
                </a>
              </div>

              <p className="text-sm text-center text-slate-600 mt-8">
                Information sources: FEMA, USGS, SF Department of Emergency Management, California Geological Survey
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>;
};
export default PrepTogether;