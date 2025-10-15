import { useState, useEffect } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MessageSquare, Phone } from "lucide-react";


const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Math verification
  const [mathQuestion, setMathQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState("");

  // Generate new math question
  const generateMathQuestion = () => {
    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    setMathQuestion({ a, b, answer: a + b });
    setUserAnswer("");
  };

  // Initialize with a math question
  useEffect(() => {
    generateMathQuestion();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verify math answer
    if (parseInt(userAnswer) !== mathQuestion.answer) {
      toast({
        title: "Verification failed",
        description: "Please solve the math problem correctly.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email || 'no-email-provided@contact.local',
          subject: formData.subject,
          message: formData.message
        });

      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          title: "Error",
          description: "Failed to send your message. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Send email notification
      await supabase.functions.invoke('send-form-notification', {
        body: {
          formType: 'contact',
          formData: {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        }
      });
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. We'll get back to you soon."
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      generateMathQuestion(); // Generate new math question
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      
      <MainNavigation />
      
      <div className="px-4 py-16 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-amber-800 leading-relaxed max-w-2xl mx-auto">
            Have questions, ideas, or want to get involved? We'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Let's Connect
              </CardTitle>
              <CardDescription className="text-amber-100">
                Ways to reach us
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-900">Group Chat</h3>
                    <p className="text-amber-700 text-sm">Ask a neighbor for the link to our WhatsApp group</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-amber-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-amber-900">Text Josh</h3>
                    <p className="text-amber-700 text-sm">For urgent neighborhood matters</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-amber-200">
                <h3 className="font-medium text-amber-900 mb-2">About This Site</h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  This neighborhood hub is maintained by neighbors for neighbors. 
                  We keep things simple, respect privacy, and aim to support real community connections.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl">Send a Message</CardTitle>
              <CardDescription className="text-amber-100">
                We'll get back to you as soon as we can
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-amber-900 font-medium">Name (optional)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-amber-900 font-medium">Email (optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="subject" className="text-amber-900 font-medium">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-amber-900 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl min-h-32"
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>
                
                {/* Math verification */}
                <div>
                  <Label className="text-amber-900 font-medium">
                    Human Verification: What is {mathQuestion.a} + {mathQuestion.b}?
                  </Label>
                  <Input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500 rounded-xl"
                    placeholder="Enter the answer"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-medium py-3 rounded-xl transition-all duration-200"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;