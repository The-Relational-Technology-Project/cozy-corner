import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Clock, Waves } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import EventSuggestionForm from "@/components/EventSuggestionForm";
import { StreetCleaningModal } from "@/components/StreetCleaningModal";
import { NeighborhoodContributionsModal } from "@/components/NeighborhoodContributionsModal";
import { NewNeighborWelcome } from "@/components/NewNeighborWelcome";
import { OuterSunsetEvents } from "@/components/OuterSunsetEvents";
import { CommunityServices } from "@/components/CommunityServices";

const Index = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showStreetCleaningModal, setShowStreetCleaningModal] = useState(false);
  const [showContributionsModal, setShowContributionsModal] = useState(false);
  const [showNewNeighborModal, setShowNewNeighborModal] = useState(false);

  const newIdeas = [
    {
      title: "Annual block party",
      status: "accomplished!",
      emoji: "🎉",
      description: "Bringing neighbors together for fun and community"
    },
    {
      title: "Friday lunch outside",
      status: "coming soon",
      emoji: "🥪",
      description: "Casual outdoor lunches to connect with neighbors"
    },
    {
      title: "Neighborhood music jams",
      status: "coming soon", 
      emoji: "🎵",
      description: "Informal music sessions for all skill levels"
    },
    {
      title: "Neighbor coupons",
      status: "we're live!",
      emoji: "🎟️",
      description: "Share skills and connect through friendly exchanges",
      link: "/coupons"
    }
  ];

  return (
    <div className="min-h-screen bg-outer-sunset">
      <MainNavigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-light/50 to-transparent pointer-events-none" />
        <div className="relative px-4 py-12 md:py-16 mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Waves className="w-8 h-8 text-ocean animate-wave" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-ocean via-ocean-dark to-sky bg-clip-text text-transparent leading-tight">
                Cozy Corner
              </h1>
              <Waves className="w-8 h-8 text-ocean animate-wave" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-ocean-dark font-medium mb-6">
              48th Ave Neighbor Hub • Outer Sunset, SF
            </p>
            
            {/* Welcome Message */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-fog/30">
                <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                  Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site helps us share resources, connect, and look out for each other. 🌊
                </p>
                
                {/* New Neighbor CTA */}
                <Button
                  onClick={() => setShowNewNeighborModal(true)}
                  size="lg"
                  className="bg-ocean hover:bg-ocean-dark text-ocean-foreground rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8"
                >
                  👋 New to the Block?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl space-y-12">
        
        {/* Events from Outer Sunset Today */}
        <section>
          <OuterSunsetEvents />
        </section>

        {/* Community Services */}
        <section>
          <CommunityServices />
        </section>

        {/* Street Cleaning Reminders */}
        <section>
          <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-fog/30 shadow-lg">
            <div className="text-center">
              <h3 className="font-semibold text-foreground mb-2 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4 text-ocean" />
                Street Cleaning Reminders
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Never miss moving your car again! Get friendly 8am email reminders on cleaning days.
              </p>
              <div className="space-y-1 text-xs text-muted-foreground mb-4">
                <div>East Side: 1st & 3rd Friday</div>
                <div>West Side: 1st & 3rd Tuesday</div>
              </div>
              <Button 
                onClick={() => setShowStreetCleaningModal(true)}
                size="sm"
                className="bg-ocean hover:bg-ocean-dark text-ocean-foreground font-medium rounded-xl"
              >
                Set Up Reminders 🌊
              </Button>
            </div>
          </div>
        </section>

        {/* New Ideas Board */}
        <section>
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-dune to-dune-dark text-dune-foreground">
              <CardTitle className="text-xl flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Ideas Board
              </CardTitle>
              <CardDescription className="text-dune-foreground/80">
                Neighbor-driven initiatives for our community
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {newIdeas.map((idea, index) => {
                  const content = (
                    <div className="bg-sand-light rounded-xl p-4 border border-sand/50 hover:bg-sand transition-colors duration-200 h-full">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{idea.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-medium text-foreground">{idea.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              idea.status === 'in progress' 
                                ? 'bg-dune-light text-dune-dark' 
                                : idea.status === "we're live!"
                                ? 'bg-ocean-light text-ocean-dark'
                                : idea.status === 'accomplished!'
                                ? 'bg-sunset-light text-sunset-dark'
                                : 'bg-sky-light text-sky-dark'
                            }`}>
                              {idea.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                        </div>
                      </div>
                    </div>
                  );

                  return idea.link ? (
                    <Link key={index} to={idea.link} className="block h-full">
                      {content}
                    </Link>
                  ) : (
                    <div key={index} className="h-full">
                      {content}
                    </div>
                  );
                })}
              </div>
              
              <Button 
                onClick={() => setShowContributionsModal(true)}
                className="w-full bg-dune hover:bg-dune-dark text-dune-foreground font-medium rounded-xl"
              >
                💡 Suggest an idea!
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* About Section */}
        <section>
          <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-fog to-fog-dark text-fog-foreground">
              <CardTitle className="text-xl">🏠 About Cozy Corner</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-foreground leading-relaxed mb-4">
                This site is a tiny mutual support and connection hub built by neighbors for neighbors. 
                We keep things simple, respect privacy, and aim to support real community connections.
              </p>
              <div className="text-center">
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    className="border-fog-dark/30 text-foreground hover:bg-fog-light rounded-xl"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Modals */}
      <NewNeighborWelcome
        open={showNewNeighborModal}
        onOpenChange={setShowNewNeighborModal}
      />

      <StreetCleaningModal 
        open={showStreetCleaningModal} 
        onOpenChange={setShowStreetCleaningModal} 
      />

      {showEventForm && (
        <EventSuggestionForm 
          isOpen={showEventForm} 
          onClose={() => setShowEventForm(false)} 
        />
      )}

      <NeighborhoodContributionsModal 
        open={showContributionsModal} 
        onOpenChange={setShowContributionsModal} 
      />
    </div>
  );
};

export default Index;