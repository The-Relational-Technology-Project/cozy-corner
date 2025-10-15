import { useState } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { toast } = useToast();
  const { t } = useLanguage();
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
              {t('prep.title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-800 font-medium mb-6">
              {t('prep.subtitle')}
            </p>
            
            {/* Welcome Message */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <p className="text-lg text-slate-900 leading-relaxed">
                  {t('prep.welcome')}
                </p>
              </div>
            </div>

            <Button size="lg" onClick={scrollToForm} className="mt-8 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium rounded-xl text-base md:text-lg px-4 md:px-8">
              {t('prep.signup.button')}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl space-y-12">
        
        {/* Know Our Risks */}
        <section className="pt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-blue-800 via-slate-700 to-blue-600 bg-clip-text text-transparent mb-10 leading-tight">
            {t('prep.risks.title')}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Earthquake Risk */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
              <CardHeader className="bg-white/60">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <CardTitle className="text-xl text-slate-900">{t('prep.earthquake.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  {t('prep.earthquake.description')}
                </p>
                <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                  <h4 className="font-semibold mb-2 text-orange-900">{t('prep.earthquake.action')}</h4>
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
                  <CardTitle className="text-xl text-slate-900">{t('prep.tsunami.title')}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-slate-700 leading-relaxed">
                  {t('prep.tsunami.description')}
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <h4 className="font-semibold mb-2 text-blue-900">{t('prep.tsunami.action')}</h4>
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
                <CardTitle className="text-2xl">{t('prep.neighbors.title')}</CardTitle>
              </div>
              <CardDescription className="text-blue-100 text-center text-lg">
                {t('prep.neighbors.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <p className="text-slate-700 leading-relaxed text-lg">{t('prep.neighbors.description')}</p>
              
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h4 className="font-semibold mb-4 text-slate-900 text-lg">{t('prep.neighbors.connect')}</h4>
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
                {t('prep.form.title')}
                <span>❤</span>
              </CardTitle>
              <CardDescription className="text-red-100 text-center">
                {t('prep.form.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-slate-700 leading-relaxed mb-6 text-center">
                {t('prep.form.description')}
              </p>

              {submitted ? <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
                  <div className="text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
                    <h3 className="text-2xl font-bold text-green-800">
                      {t('prep.form.success.title')}
                    </h3>
                    <p className="text-green-700">
                      {t('prep.form.success.message')}
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl">
                      {t('prep.form.success.another')}
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
                        {t('prep.form.onbehalf')}
                      </Label>
                      <p className="text-sm text-slate-600">
                        {t('prep.form.onbehalf.consent')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-900">
                      {t('prep.form.name')} {t('prep.form.name.optional')}
                    </Label>
                    <Input 
                      id="name" 
                      value={formData.name} 
                      onChange={e => setFormData({...formData, name: e.target.value})} 
                      className="border-slate-300 rounded-xl" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-slate-900">
                      {t('prep.form.address')} <span className="text-red-600">*</span>
                    </Label>
                    <Input 
                      id="address" 
                      required 
                      value={formData.address} 
                      onChange={e => setFormData({...formData, address: e.target.value})} 
                      className="border-slate-300 rounded-xl" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-slate-900">
                      {t('prep.form.contact')} {t('prep.form.contact.optional')}
                    </Label>
                    <Input 
                      id="contact" 
                      value={formData.contact_info} 
                      onChange={e => setFormData({...formData, contact_info: e.target.value})} 
                      placeholder={t('prep.form.contact.placeholder')}
                      className="border-slate-300 rounded-xl" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vulnerable_count" className="text-slate-900">
                      {t('prep.form.vulnerable_count')} <span className="text-red-600">*</span>
                    </Label>
                    <Select 
                      value={formData.vulnerable_count} 
                      onValueChange={value => setFormData({...formData, vulnerable_count: value})}
                    >
                      <SelectTrigger className="border-slate-300 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? t('prep.form.person') : t('prep.form.people')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specific_needs" className="text-slate-900">
                      {t('prep.form.specific_needs')} {t('prep.form.specific_needs.optional')}
                    </Label>
                    <Textarea 
                      id="specific_needs" 
                      value={formData.specific_needs} 
                      onChange={e => setFormData({...formData, specific_needs: e.target.value})} 
                      placeholder={t('prep.form.specific_needs.placeholder')}
                      rows={3} 
                      className="border-slate-300 rounded-xl" 
                    />
                  </div>

                  <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                    {t('prep.form.privacy')}
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium rounded-xl" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t('prep.form.submitting') : t('prep.form.submit')}
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