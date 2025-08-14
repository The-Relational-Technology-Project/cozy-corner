import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EventSuggestionForm from "@/components/EventSuggestionForm";
import SandAccumulation from "@/components/SandAccumulation";
import { StreetCleaningModal } from "@/components/StreetCleaningModal";
import { StreetCleaningInvitation } from "@/components/StreetCleaningInvitation";
import { NeighborhoodContributionsModal } from "@/components/NeighborhoodContributionsModal";

const Index = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showStreetCleaningModal, setShowStreetCleaningModal] = useState(false);
  const [showContributionsModal, setShowContributionsModal] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      name: "Inaugural Cozy Corner Block Party",
      date: "Saturday, September 27th",
      time: "10:00 AM",
      location: "On our block!",
      contact: "Community",
      description: "We're in planning mode – please reach out with ideas!",
      highlighted: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      {/* Sand Accumulation Component */}
      <SandAccumulation />
      
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
          <div className="max-w-4xl mx-auto text-center mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-amber-900 leading-relaxed">Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site is meant to help bring care and joy to our little corner of San Francisco. 🌊</p>
            </div>
          </div>

          {/* Block Party Banner */}
          <div className="max-w-4xl mx-auto mb-16">
            <Link to="/block-party-2025" className="block">
              <Card className="bg-sunset-fog hover:bg-sunset-fog/80 shadow-xl border-2 border-sunset-fog-foreground/20 hover:border-sunset-fog-foreground/40 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-sunset-fog-foreground">
                    <Sparkles className="w-6 h-6" />
                    <div>
                      <h3 className="text-xl font-bold mb-1">🎉 Block Party 2025!</h3>
                      <p className="text-sunset-fog-foreground/80">Saturday, September 27 • Sign up to help make magic!</p>
                    </div>
                    <Sparkles className="w-6 h-6" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Street Cleaning Invitation */}
          <StreetCleaningInvitation onOpenModal={() => setShowStreetCleaningModal(true)} />

          {/* Events Calendar Widget */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription className="text-amber-100">
                Next four weeks on 48th Ave
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`${event.highlighted ? 'bg-gradient-to-r from-amber-100 to-orange-100 border-l-4 border-orange-500 rounded-r-lg p-3 -ml-2' : 'border-l-4 border-amber-400 pl-4'} pb-4 border-b border-amber-100 last:border-b-0`}>
                      <h3 className={`font-semibold ${event.highlighted ? 'text-orange-900' : 'text-amber-900'}`}>{event.name}</h3>
                      <div className="text-sm text-amber-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date} {event.time && `at ${event.time}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-amber-600 mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-amber-400 mb-4" />
                  <p className="text-amber-700 mb-4">No events scheduled yet</p>
                </div>
              )}
              <Button 
                variant="outline" 
                className="w-full mt-4 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
                onClick={() => setShowEventForm(true)}
              >
                Suggest an event!
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon & About Section */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl">🔮 Coming Soon</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 text-amber-800 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Movie nights</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span>Book clubs</span>
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
              
              <div className="space-y-3 pt-3 border-t border-amber-200">
                <p className="text-sm text-amber-700 font-medium">Want to help make these happen?</p>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl text-sm"
                    onClick={() => setShowContributionsModal(true)}
                  >
                    💡 Suggest a new idea
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl text-sm"
                    onClick={() => setShowContributionsModal(true)}
                  >
                    ❤️ Volunteer to help
                  </Button>
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
              <p className="text-amber-800 leading-relaxed">This site is a tiny mutual support and connection hub built by neighbors for neighbors. We will keep things simple, respect privacy, and aim to support real community connections.</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
            <p className="text-amber-700 text-sm leading-relaxed">
              Made with 💛 by neighbors on 48th Ave. Questions or ideas? 
              Reach out in our group chat or reach out to Josh!
            </p>
          </div>
        </div>
      </div>

      {/* Street Cleaning Modal */}
      <StreetCleaningModal 
        open={showStreetCleaningModal} 
        onOpenChange={setShowStreetCleaningModal} 
      />

      {/* Event Suggestion Form Modal */}
      {showEventForm && (
        <EventSuggestionForm 
          isOpen={showEventForm} 
          onClose={() => setShowEventForm(false)} 
        />
      )}

      {/* Neighborhood Contributions Modal */}
      <NeighborhoodContributionsModal 
        open={showContributionsModal} 
        onOpenChange={setShowContributionsModal} 
      />
    </div>
  );
};

export default Index;
