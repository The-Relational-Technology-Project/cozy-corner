import { useState } from "react";
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { BulletinBoardFooter } from "@/components/BulletinBoardFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PartyPopper, ArrowRight, UtensilsCrossed, HandHeart, Clock, Map, Check } from "lucide-react";
import sitePlan from "@/assets/block-party-2026-site-plan.jpg.asset.json";

const volunteerRoles = [
  { emoji: "🚧", label: "Barricades setup" },
  { emoji: "👋", label: "Roaming welcome committee" },
  { emoji: "🏰", label: "Bounce house monitor" },
  { emoji: "🎨", label: "Art station monitor" },
  { emoji: "🍽️", label: "Potluck setup and takedown" },
  { emoji: "🐕", label: "Pet parade facilitator" },
  { emoji: "🎸", label: "Band support crew" },
  { emoji: "🧹", label: "Clean-up crew" },
];

const schedule = [
  { time: "1:30pm", what: "Setup begins" },
  { time: "2:00pm", what: "Bounce house, games, and neighbor music jam" },
  { time: "3:00pm", what: "Coffee and treats, pet parade" },
  { time: "4:00pm", what: "First live band" },
  { time: "4:30pm", what: "Tables and dishes out" },
  { time: "5:00pm", what: "Neighbor potluck" },
  { time: "5:30pm", what: "Second band" },
  { time: "6:00pm", what: "Hang out" },
  { time: "6:30pm", what: "Close and cleanup" },
];

const BlockParty = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [potluckItem, setPotluckItem] = useState("");
  const [roles, setRoles] = useState<string[]>([]);
  const [questions, setQuestions] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const toggleRole = (role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({ title: "Please add your first name", variant: "destructive" });
      return;
    }
    if (!contact.trim()) {
      toast({ title: "Please add an email or phone number", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("block_party_2026_signups" as any).insert({
        name: name.trim(),
        contact: contact.trim(),
        potluck_item: potluckItem.trim() || null,
        volunteer_roles: roles.length > 0 ? roles : null,
        questions: questions.trim() || null,
      } as any);

      if (error) throw error;

      await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "block_party_2026_signup",
          formData: {
            name: name.trim(),
            contact: contact.trim(),
            potluck_item: potluckItem.trim(),
            volunteer_roles: roles,
            questions: questions.trim(),
          },
        },
      });

      setSubmitted(true);
      toast({ title: "🎉 You're signed up!" });
    } catch (err) {
      console.error(err);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="max-w-3xl mx-auto px-4 pt-16 pb-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <PartyPopper className="h-8 w-8 text-primary" />
            Block Party 2026
          </h1>
          <p className="text-muted-foreground text-lg py-[24px]">
            We are partying as a block on Saturday, October 17th, 2–6:30pm! We'll close the street but cars can
            still be parked in their usual spots, and we'll help neighbors come and go safely as needed.
          </p>
        </div>

        {/* Sign-up */}
        {submitted ? (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-8 text-center space-y-4">
              <span className="text-5xl">🎉</span>
              <h2 className="text-2xl font-bold text-foreground">Thank you!</h2>
              <p className="text-muted-foreground">
                Stay tuned for the day-of schedule and reach out to our neighbor group chat with any questions.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setPotluckItem("");
                  setRoles([]);
                  setQuestions("");
                  setName("");
                  setContact("");
                }}
              >
                Sign up someone else
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HandHeart className="h-5 w-5 text-primary" />
                Sign up for October 17th
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Potluck */}
                <div className="space-y-2">
                  <Label htmlFor="potluck" className="text-foreground font-medium flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4 text-primary" />
                    Potluck sign-up
                  </Label>
                  <p className="text-sm text-muted-foreground">What dish or drinks can you bring? (optional)</p>
                  <Textarea
                    id="potluck"
                    value={potluckItem}
                    onChange={(e) => setPotluckItem(e.target.value)}
                    placeholder="e.g. big pan of enchiladas, lemonade, a fruit platter..."
                    maxLength={500}
                  />
                </div>

                {/* Volunteer roles */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <HandHeart className="h-4 w-4 text-primary" />
                    Volunteer sign-ups
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Pick one or more roles — we'll make this happen together! (optional)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {volunteerRoles.map((role) => {
                      const active = roles.includes(role);
                      return (
                        <button
                          type="button"
                          key={role}
                          onClick={() => toggleRole(role)}
                          aria-pressed={active}
                          className={`flex items-center justify-between gap-2 rounded-lg border p-3 text-left text-sm transition-colors ${
                            active
                              ? "border-primary bg-primary/10 text-foreground font-medium"
                              : "border-border bg-card text-foreground hover:border-primary/40"
                          }`}
                        >
                          <span>{role}</span>
                          {active && <Check className="h-4 w-4 text-primary shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Questions */}
                <div className="space-y-2">
                  <Label htmlFor="questions" className="text-foreground font-medium">
                    Any questions about the block party? <span className="text-sm text-muted-foreground">(optional)</span>
                  </Label>
                  <Textarea
                    id="questions"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    placeholder="Ask away!"
                    maxLength={1000}
                  />
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground font-medium">
                      First name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-foreground font-medium">
                      Email or phone <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="you@email.com or phone"
                      maxLength={200}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Submitting..." : "Count me in 🎉"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Day-of overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-2">
              {schedule.map((item) => (
                <li key={item.time} className="flex gap-4 text-foreground">
                  <span className="w-20 shrink-0 font-semibold text-primary">{item.time}</span>
                  <span className="text-muted-foreground">{item.what}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2">
              <p className="font-medium text-foreground flex items-center gap-2">
                <Map className="h-4 w-4 text-primary" />
                Street layout
              </p>
              <img
                src={sitePlan.url}
                alt="Block party layout on 48th Ave between Lincoln Way and Irving St, showing potluck tables, bounce house, art supplies, pet parade station, music and dance areas, coffee and treats, barricades, and a 14-foot emergency access lane"
                className="w-full rounded-lg border border-border"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>

        {/* 2025 retro */}
        <Link to="/block-party-2025">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <div>
                  <p className="font-semibold text-foreground">2025 Block Party Retrospective</p>
                  <p className="text-sm text-muted-foreground">See photos and highlights from last year's party</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      <BulletinBoardFooter />
    </div>
  );
};

export default BlockParty;
