import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Lightbulb, Clock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import EventSuggestionForm from "@/components/EventSuggestionForm";

import { StreetCleaningModal } from "@/components/StreetCleaningModal";
import { NeighborhoodContributionsModal } from "@/components/NeighborhoodContributionsModal";

const NewIndex = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [showStreetCleaningModal, setShowStreetCleaningModal] = useState(false);
  const [showContributionsModal, setShowContributionsModal] = useState(false);

  const upcomingEvents = [
    {
      id: 1,
      name: "Neighbor Lunch Outside",
      date: "Friday, October 10th",
      time: "12:00 PM",
      location: "In front of Josh N's place",
      contact: "Community",
      description: "Join us for a casual outdoor lunch with neighbors!",
      highlighted: true
    },
    {
      id: 2,
      name: "Halloween Hangout",
      date: "Friday, October 31st",
      time: "4:00 PM - 5:00 PM",
      location: "In front of Josh N's place",
      contact: "Community",
      description: "Come celebrate Halloween with your neighbors!",
      highlighted: true
    }
  ];

  const newIdeas = [
    {
      title: "Annual block party",
      status: "in progress",
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
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      
      <MainNavigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
          backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
        }} />
        <div className="relative px-4 py-12 md:py-16 mx-auto max-w-6xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4 leading-tight">
              Cozy Corner
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-amber-800 font-medium mb-6">
              48th Ave Neighbor Hub
            </p>
            
            {/* Welcome Message */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-white/20">
                <p className="text-base md:text-lg text-amber-900 leading-relaxed">
                  Welcome! We're neighbors on 48th Ave between Lincoln & Irving. This site is meant to help bring care and joy to our little corner of San Francisco. 🌊
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-16 mx-auto max-w-6xl space-y-12">
        
        {/* Events Calendar */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
              <CardDescription className="text-orange-100">
                Next four weeks on 48th Ave
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`${event.highlighted ? 'bg-gradient-to-r from-orange-100 to-red-100 border-l-4 border-red-500 rounded-r-lg p-4 -ml-2' : 'border-l-4 border-orange-400 pl-4'}`}>
                      <h3 className={`font-semibold mb-2 ${event.highlighted ? 'text-red-900' : 'text-orange-900'}`}>{event.name}</h3>
                      <div className="text-sm text-orange-700 space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{event.date} {event.time && `at ${event.time}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-orange-600 mt-2">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6">
                  <Calendar className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                  <p className="text-orange-700 mb-4">No events scheduled yet</p>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 rounded-xl transition-all duration-200"
                onClick={() => setShowEventForm(true)}
              >
                Suggest an event!
              </Button>
            </CardContent>
          </Card>
          
          {/* Street Cleaning Note */}
          <div className="mt-6 bg-amber-50 rounded-2xl p-4 md:p-6 border border-amber-200">
            <div className="text-center">
              <h3 className="font-semibold text-amber-900 mb-2 flex items-center justify-center gap-2">
                <Clock className="h-4 w-4" />
                Street Cleaning Reminders
              </h3>
              <p className="text-amber-800 text-sm mb-4">
                Never miss moving your car again! Get friendly 8am email reminders on cleaning days.
              </p>
              <div className="space-y-2 text-xs text-amber-700 mb-4">
                <div>East Side: 1st & 3rd Friday</div>
                <div>West Side: 1st & 3rd Tuesday</div>
              </div>
              <Button 
                onClick={() => setShowStreetCleaningModal(true)}
                size="sm"
                className="bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium rounded-xl"
              >
                Set Up Reminders 🌊
              </Button>
            </div>
          </div>
        </section>

        {/* New Ideas Board */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                New Ideas Board
              </CardTitle>
              <CardDescription className="text-amber-100">
                Neighbor-driven initiatives for our community
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {newIdeas.map((idea, index) => {
                  const content = (
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 hover:bg-amber-100 transition-colors duration-200">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{idea.emoji}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-amber-900">{idea.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              idea.status === 'in progress' 
                                ? 'bg-green-100 text-green-700' 
                                : idea.status === "we're live!"
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {idea.status}
                            </span>
                          </div>
                          <p className="text-sm text-amber-700">{idea.description}</p>
                        </div>
                      </div>
                    </div>
                  );

                  return idea.link ? (
                    <Link key={index} to={idea.link}>
                      {content}
                    </Link>
                  ) : (
                    <div key={index}>
                      {content}
                    </div>
                  );
                })}
              </div>
              
              <Button 
                onClick={() => setShowContributionsModal(true)}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium rounded-xl"
              >
                💡 Suggest an idea!
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* About Section */}
        <section>
          <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <CardTitle className="text-xl">🏠 About Cozy Corner</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-amber-800 leading-relaxed mb-4">
                This site is a tiny mutual support and connection hub built by neighbors for neighbors. 
                We will keep things simple, respect privacy, and aim to support real community connections.
              </p>
              <div className="text-center">
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    className="border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
                  >
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
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

export default NewIndex;