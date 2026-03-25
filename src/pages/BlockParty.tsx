import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { BulletinBoardFooter } from "@/components/BulletinBoardFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PartyPopper, ArrowRight, ClipboardList } from "lucide-react";

const timeOptions = [
  "Saturday afternoon",
  "Saturday evening",
  "Sunday afternoon",
  "Sunday evening",
];

const monthOptions = ["August", "September", "October"];

const BlockParty = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const [preferredMonths, setPreferredMonths] = useState<string[]>([]);
  const [unavailableWeekends, setUnavailableWeekends] = useState("");
  const [participationFactors, setParticipationFactors] = useState("");
  const [potluckOk, setPotluckOk] = useState<string>("");
  const [partyIdeas, setPartyIdeas] = useState("");
  const [wantsCommittee, setWantsCommittee] = useState<string>("");
  const [committeeContact, setCommitteeContact] = useState("");

  // Math CAPTCHA
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    return { a, b, answer: a + b };
  }, []);

  const toggleTime = (time: string) => {
    setPreferredTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (!potluckOk) {
      toast({ title: "Please answer the potluck question", variant: "destructive" });
      return;
    }
    if (parseInt(captchaAnswer) !== captcha.answer) {
      toast({ title: "Math answer is incorrect — please try again!", variant: "destructive" });
      return;
    }
    if (wantsCommittee === "yes" && !committeeContact.trim()) {
      toast({ title: "Please provide contact info for the committee", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("block_party_survey_2026" as any).insert({
        name: name.trim(),
        preferred_times: preferredTimes.length > 0 ? preferredTimes : null,
        preferred_month: preferredMonth || null,
        unavailable_weekends: unavailableWeekends.trim() || null,
        participation_factors: participationFactors.trim() || null,
        potluck_ok: potluckOk === "yes",
        party_ideas: partyIdeas.trim() || null,
        wants_committee: wantsCommittee === "yes" ? true : wantsCommittee === "no" ? false : null,
        committee_contact: wantsCommittee === "yes" ? committeeContact.trim() || null : null,
      } as any);

      if (error) throw error;

      // Send notification email
      await supabase.functions.invoke("send-form-notification", {
        body: {
          formType: "block_party_survey",
          formData: {
            name: name.trim(),
            preferred_times: preferredTimes,
            preferred_month: preferredMonth,
            unavailable_weekends: unavailableWeekends.trim(),
            participation_factors: participationFactors.trim(),
            potluck_ok: potluckOk === "yes",
            party_ideas: partyIdeas.trim(),
            wants_committee: wantsCommittee === "yes",
            committee_contact: committeeContact.trim(),
          },
        },
      });

      setSubmitted(true);
      toast({ title: "🎉 Thanks for your input!", description: "Your survey response has been recorded." });
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

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            <PartyPopper className="h-8 w-8 text-primary" />
            Block Party 2026
          </h1>
          <p className="text-muted-foreground text-lg">
            Let's plan our next block party on 48th Ave! Fill out this quick 2-minute survey so we can find the best date, time, and vibe for everyone.
          </p>
        </div>

        {/* Link to 2025 retro */}
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

        {/* Survey */}
        {submitted ? (
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-8 text-center space-y-4">
              <span className="text-5xl">🎉</span>
              <h2 className="text-2xl font-bold text-foreground">Thank you!</h2>
              <p className="text-muted-foreground">Your responses have been recorded. We'll use this to plan the best block party ever!</p>
              <Button variant="outline" onClick={() => {
                setSubmitted(false);
                setName("");
                setPreferredTimes([]);
                setPreferredMonth("");
                setUnavailableWeekends("");
                setParticipationFactors("");
                setPotluckOk("");
                setPartyIdeas("");
                setWantsCommittee("");
                setCommitteeContact("");
                setCaptchaAnswer("");
              }}>
                Submit Another Response
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                2026 Block Party Neighbor Survey
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    maxLength={100}
                    required
                  />
                </div>

                {/* Time preferences */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    What time works for you, generally? <span className="text-muted-foreground text-sm">(optional, select all that apply)</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timeOptions.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${time}`}
                          checked={preferredTimes.includes(time)}
                          onCheckedChange={() => toggleTime(time)}
                        />
                        <Label htmlFor={`time-${time}`} className="text-foreground cursor-pointer">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Month */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    In which month should we party? <span className="text-muted-foreground text-sm">(optional, select all you like)</span>
                  </Label>
                  <RadioGroup value={preferredMonth} onValueChange={setPreferredMonth}>
                    <div className="flex flex-wrap gap-4">
                      {monthOptions.map((month) => (
                        <div key={month} className="flex items-center space-x-2">
                          <RadioGroupItem value={month} id={`month-${month}`} />
                          <Label htmlFor={`month-${month}`} className="text-foreground cursor-pointer">{month}</Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Unavailable weekends */}
                <div className="space-y-2">
                  <Label htmlFor="unavailable" className="text-foreground font-medium">
                    Any weekends you know don't work for you? <span className="text-muted-foreground text-sm">(optional)</span>
                  </Label>
                  <Textarea
                    id="unavailable"
                    value={unavailableWeekends}
                    onChange={(e) => setUnavailableWeekends(e.target.value)}
                    placeholder="e.g. Labor Day weekend, Sept 20-21..."
                    maxLength={500}
                  />
                </div>

                {/* Participation factors */}
                <div className="space-y-2">
                  <Label htmlFor="factors" className="text-foreground font-medium">
                    What would make it more likely you could participate? <span className="text-muted-foreground text-sm">(optional)</span>
                  </Label>
                  <Textarea
                    id="factors"
                    value={participationFactors}
                    onChange={(e) => setParticipationFactors(e.target.value)}
                    placeholder="e.g. kid-friendly activities, later start time..."
                    maxLength={500}
                  />
                </div>

                {/* Potluck */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Would you be open to this being a potluck? <span className="text-destructive">*</span>
                  </Label>
                  <RadioGroup value={potluckOk} onValueChange={setPotluckOk}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="potluck-yes" />
                        <Label htmlFor="potluck-yes" className="text-foreground cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="potluck-no" />
                        <Label htmlFor="potluck-no" className="text-foreground cursor-pointer">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Party ideas */}
                <div className="space-y-2">
                  <Label htmlFor="ideas" className="text-foreground font-medium">
                    Any specific ideas about the party? <span className="text-muted-foreground text-sm">(optional)</span>
                  </Label>
                  <Textarea
                    id="ideas"
                    value={partyIdeas}
                    onChange={(e) => setPartyIdeas(e.target.value)}
                    placeholder="What should we include or not include?"
                    maxLength={1000}
                  />
                </div>

                {/* Committee */}
                <div className="space-y-3">
                  <Label className="text-foreground font-medium">
                    Do you or someone in your household want to serve on the design or organizing committee? <span className="text-muted-foreground text-sm">(optional)</span>
                  </Label>
                  <RadioGroup value={wantsCommittee} onValueChange={setWantsCommittee}>
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="committee-yes" />
                        <Label htmlFor="committee-yes" className="text-foreground cursor-pointer">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="committee-no" />
                        <Label htmlFor="committee-no" className="text-foreground cursor-pointer">No</Label>
                      </div>
                    </div>
                  </RadioGroup>
                  {wantsCommittee === "yes" && (
                    <div className="space-y-2 pl-4 border-l-2 border-primary/30">
                      <Label htmlFor="committee-contact" className="text-foreground">
                        Email or phone so we can get in touch <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="committee-contact"
                        value={committeeContact}
                        onChange={(e) => setCommitteeContact(e.target.value)}
                        placeholder="your@email.com or phone number"
                        maxLength={200}
                      />
                    </div>
                  )}
                </div>

                {/* CAPTCHA */}
                <div className="space-y-2 bg-muted/50 p-4 rounded-lg">
                  <Label htmlFor="captcha" className="text-foreground font-medium">
                    Quick human check: What is {captcha.a} + {captcha.b}? <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="captcha"
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="w-32"
                    required
                  />
                </div>

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? "Submitting..." : "Submit Survey 🎉"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      <BulletinBoardFooter />
    </div>
  );
};

export default BlockParty;
