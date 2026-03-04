import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CommunityLink {
  name: string;
  question: string;
  cardBg: string;
  rotation: string;
  borderRadius: string;
  padding: string;
  pinPosition: string;
  pinColor: string;
  type: "link" | "request";
  domain?: string;
  url?: string;
  serviceType?: string;
}

const COMMUNITY_LINKS: CommunityLink[] = [
  {
    name: "Outer Sunset Field Guide",
    question: "Exploring the neighborhood?",
    cardBg: "hsl(210, 30%, 93%)",
    rotation: "-2deg",
    borderRadius: "2px",
    padding: "p-5 pt-10",
    pinPosition: "left-[35%]",
    pinColor: "#3a6e9e",
    type: "link",
    url: "https://outersunset.place",
    domain: "outersunset.place",
  },
  {
    name: "Community Supplies",
    question: "Want to share things with neighbors?",
    cardBg: "#f5f0e6",
    rotation: "1deg",
    borderRadius: "3px",
    padding: "p-6 pt-9",
    pinPosition: "left-1/2 -translate-x-1/2",
    pinColor: "#e8933a",
    type: "link",
    url: "https://communitysupplies.org",
    domain: "communitysupplies.org",
  },
  {
    name: "Outer Sunset Today",
    question: "Curious what's happening today?",
    cardBg: "hsl(210, 15%, 93%)",
    rotation: "2deg",
    borderRadius: "2px",
    padding: "p-5 pt-10",
    pinPosition: "right-5",
    pinColor: "#5a7a52",
    type: "link",
    url: "https://outersunset.today",
    domain: "outersunset.today",
  },
  {
    name: "Outer Mamas",
    question: "Mom in the Outer Sunset?",
    cardBg: "hsl(35, 80%, 93%)",
    rotation: "-2.5deg",
    borderRadius: "2px",
    padding: "p-5 pt-10",
    pinPosition: "left-[40%]",
    pinColor: "#c96a3f",
    type: "request",
    serviceType: "outer_mamas",
  },
  {
    name: "Outer Dadas",
    question: "Dad in the Outer Sunset?",
    cardBg: "hsl(200, 50%, 93%)",
    rotation: "1.5deg",
    borderRadius: "3px",
    padding: "p-6 pt-9",
    pinPosition: "left-1/2 -translate-x-1/2",
    pinColor: "#3a6e9e",
    type: "request",
    serviceType: "outer_dadas",
  },
  {
    name: "SF Mutual Aid – Sunset Pod",
    question: "Need a hand or want to help?",
    cardBg: "hsl(45, 30%, 92%)",
    rotation: "-1deg",
    borderRadius: "2px",
    padding: "p-5 pt-11",
    pinPosition: "right-5",
    pinColor: "#e8933a",
    type: "request",
    serviceType: "mutual_aid",
  },
  {
    name: "Outer Sunset Neighbors",
    question: "Want to get involved locally?",
    cardBg: "hsl(210, 15%, 93%)",
    rotation: "2.5deg",
    borderRadius: "3px",
    padding: "p-6 pt-9",
    pinPosition: "left-[30%]",
    pinColor: "#5a7a52",
    type: "link",
    url: "https://sunsetneighbors.org",
  },
];

function darken(hex: string): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 40);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 40);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 40);
  return `rgb(${r},${g},${b})`;
}

function Pushpin({ position, color }: { position: string; color: string }) {
  return (
    <div className={`absolute top-2 ${position} pointer-events-none`}>
      <div
        className="absolute top-[2px] left-[1px] w-4 h-4 rounded-full"
        style={{ background: "rgba(0,0,0,0.25)", filter: "blur(1px)" }}
      />
      <div
        className="relative w-4 h-4 rounded-full"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${color}, ${darken(color)})`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="absolute top-[2px] left-[3px] w-[5px] h-[5px] rounded-full"
          style={{ background: "rgba(255,255,255,0.55)" }}
        />
      </div>
    </div>
  );
}

function PinnedCard({
  link,
  onClick,
}: {
  link: CommunityLink;
  onClick?: () => void;
}) {
  const Tag = link.type === "link" ? "a" : "button";
  const extraProps =
    link.type === "link"
      ? { href: link.url, target: "_blank", rel: "noopener noreferrer" }
      : { onClick };

  return (
    <Tag
      {...(extraProps as any)}
      className={`group relative block text-center transition-all duration-200 w-full ${link.padding}`}
      style={{
        backgroundColor: link.cardBg,
        transform: `rotate(${link.rotation})`,
        boxShadow:
          "1px 2px 6px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)",
        borderRadius: link.borderRadius,
        border: "1px solid rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.transform =
          "rotate(0deg) scale(1.05) translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "2px 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        (e.currentTarget as HTMLElement).style.transform = `rotate(${link.rotation})`;
        (e.currentTarget as HTMLElement).style.boxShadow =
          "1px 2px 6px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06)";
      }}
    >
      <Pushpin position={link.pinPosition} color={link.pinColor} />
      <p
        className="text-sm font-semibold leading-snug mb-2"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {link.question}
      </p>
      <p
        className="text-xs leading-tight"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {link.name}
      </p>
      {link.domain && (
        <p
          className="mt-1.5 text-[11px] font-mono"
          style={{ color: "hsl(var(--muted-foreground) / 0.6)" }}
        >
          {link.domain}
        </p>
      )}
    </Tag>
  );
}

function ServiceRequestModal({
  open,
  onOpenChange,
  serviceType,
  serviceName,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceType: string;
  serviceName: string;
}) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      toast({
        title: "Required fields",
        description: "Please enter your name and contact info.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const isEmail = contact.includes("@");
      const { error } = await supabase
        .from("community_service_requests")
        .insert({
          name: name.trim(),
          email: isEmail ? contact.trim() : null,
          phone: !isEmail ? contact.trim() : null,
          service_type: serviceType,
          message: message.trim() || null,
        });

      if (error) throw error;

      toast({
        title: "Request sent!",
        description: "Josh will get back to you soon with the link.",
      });
      onOpenChange(false);
      setName("");
      setContact("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Access: {serviceName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="req-name">Your Name</Label>
            <Input
              id="req-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="How should we know you?"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="req-contact">Email or Phone</Label>
            <Input
              id="req-contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="How can Josh reach you?"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="req-message">Message (optional)</Label>
            <Textarea
              id="req-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Anything you'd like Josh to know?"
              className="mt-1.5"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-ocean hover:bg-ocean-dark text-ocean-foreground"
          >
            {isSubmitting ? "Sending..." : "Request Access"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function BulletinBoardFooter() {
  const [requestModal, setRequestModal] = useState<{
    open: boolean;
    type: string;
    name: string;
  }>({ open: false, type: "", name: "" });

  return (
    <>
      <footer>
        {/* Bulletin board */}
        <div
          style={{
            backgroundColor: "hsl(var(--sand))",
            backgroundImage: `
              radial-gradient(circle, hsl(var(--sand-dark) / 0.3) 1px, transparent 1px),
              radial-gradient(circle, hsl(var(--sand-light)) 0.5px, transparent 0.5px)
            `,
            backgroundSize: "8px 8px, 12px 12px",
            backgroundPosition: "0 0, 4px 4px",
          }}
        >
          <div className="py-12 md:py-16 px-6">
            <div className="container mx-auto">
              <h2 className="text-center text-lg md:text-xl font-bold mb-8 md:mb-10 text-foreground">
                🏖️ Community Board
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
                {COMMUNITY_LINKS.map((link) => (
                  <PinnedCard
                    key={link.name}
                    link={link}
                    onClick={
                      link.type === "request"
                        ? () =>
                            setRequestModal({
                              open: true,
                              type: link.serviceType || "",
                              name: link.name,
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div
          className="py-8 text-center"
          style={{ backgroundColor: "hsl(var(--sand))" }}
        >
          <div className="container mx-auto px-6 space-y-1">
            <p className="text-sm text-muted-foreground">
              Made with 🌊 by neighbors, for neighbors
            </p>
            <p className="text-sm text-muted-foreground/70">
              <a
                href="https://studio.relationaltechproject.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold text-muted-foreground/80"
              >
                Relational Tech Project
              </a>{" "}
              · Community tools for real connection
            </p>
          </div>
        </div>
      </footer>

      <ServiceRequestModal
        open={requestModal.open}
        onOpenChange={(open) =>
          setRequestModal((prev) => ({ ...prev, open }))
        }
        serviceType={requestModal.type}
        serviceName={requestModal.name}
      />
    </>
  );
}
