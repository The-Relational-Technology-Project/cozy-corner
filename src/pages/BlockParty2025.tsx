import { Link } from "react-router-dom";
import { MainNavigation } from "@/components/MainNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MapPin, Home, Heart } from "lucide-react";
import blockPartyAerial from "@/assets/block-party-aerial.png";
import blockPartyChalk from "@/assets/block-party-chalk.png";
import blockPartyMusic from "@/assets/block-party-music.png";
import civicJoyLogo from "@/assets/civic-joy-fund-logo.png";
import oslLogo from "@/assets/osl-logo.png";

// Role data structure - all roles now filled!
const roles = [{
  category: "🏗️ Setup & Safety",
  items: [{
    emoji: "🚧",
    name: "Barricade Setup",
    time: "9:30am",
    spots: 2,
    filled: 2
  }, {
    emoji: "🛡️",
    name: "Adult Monitor and Greeter: Lincoln",
    time: "all day, shift ok",
    spots: 2,
    filled: 2
  }, {
    emoji: "🛡️",
    name: "Adult Monitor and Greeter: Irving",
    time: "all day, shift ok",
    spots: 2,
    filled: 2
  }, {
    emoji: "🧹",
    name: "Street Sweep",
    time: "end of day",
    spots: 2,
    filled: 2
  }]
}, {
  category: "🍽️ Food & Snacks",
  items: [{
    emoji: "🥐",
    name: "Morning setup and takedown",
    time: "food provided",
    spots: 4,
    filled: 4
  }, {
    emoji: "🍕",
    name: "Pizza setup and takedown",
    time: "food provided",
    spots: 3,
    filled: 3
  }, {
    emoji: "🌮",
    name: "Lunch setup and takedown",
    time: "food provided",
    spots: 3,
    filled: 3
  }, {
    emoji: "☕",
    name: "Greet sidewalk talk and mutual aid groups",
    time: "11am",
    spots: 1,
    filled: 1
  }]
}, {
  category: "🎨 Activities & Stations",
  items: [{
    emoji: "🧼",
    name: "Bounce House Overseers",
    time: "equipment provided",
    spots: 2,
    filled: 2
  }, {
    emoji: "🎭",
    name: "Dress-Up Zone Helper",
    time: "",
    spots: 1,
    filled: 1
  }, {
    emoji: "🎨",
    name: "Art Supplies Host",
    time: "",
    spots: 1,
    filled: 1
  }, {
    emoji: "💃",
    name: "Dance Class Rally Team",
    time: "instruction provided, 12:30pm",
    spots: 2,
    filled: 2
  }, {
    emoji: "🎧",
    name: "Musicians",
    time: "beginners welcome!, 11am",
    spots: 5,
    filled: 5
  }, {
    emoji: "🌞",
    name: "Mutual Aid Table Hosts",
    time: "11am",
    spots: 2,
    filled: 2
  }]
}, {
  category: "💬 Support & Fun",
  items: [{
    emoji: "🎤",
    name: "Emcee On Demand",
    time: "welcome, transitions",
    spots: 1,
    filled: 1
  }, {
    emoji: "🎒",
    name: "Supplies Prepper",
    time: "tape, sunscreen, bandaids",
    spots: 1,
    filled: 1
  }, {
    emoji: "📸",
    name: "Photographers",
    time: "",
    spots: 2,
    filled: 2
  }, {
    emoji: "📢",
    name: "Spread the word",
    time: "to neighbors",
    spots: 5,
    filled: 5
  }]
}, {
  category: "🎪 Party Supplies & Equipment",
  items: [{
    emoji: "🪑",
    name: "Folding tables",
    time: "loan for party",
    spots: 10,
    filled: 10
  }, {
    emoji: "💺",
    name: "Outdoor chairs",
    time: "loan for party",
    spots: 50,
    filled: 50
  }, {
    emoji: "👗",
    name: "Kids dress up supplies",
    time: "loan for party",
    spots: 10,
    filled: 10
  }, {
    emoji: "🎨",
    name: "Chalk and art supplies",
    time: "loan for party",
    spots: 10,
    filled: 10
  }, {
    emoji: "🔊",
    name: "Speakers for music",
    time: "loan for party",
    spots: 2,
    filled: 2
  }, {
    emoji: "✨",
    name: "Something else we need!",
    time: "loan for party",
    spots: 10,
    filled: 10
  }]
}];

const BlockParty2025 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      <MainNavigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{
          backgroundImage: `url('/lovable-uploads/0adb7118-2975-4472-b850-5d0265be4e68.png')`
        }} />
        <div className="relative px-4 py-16 mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4 leading-tight">
              🎉 48th Ave Block Party 2024
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 text-lg text-amber-800 mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Saturday, September 27th, 2024
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <p className="text-lg text-amber-900 leading-relaxed">
                What an incredible day! Thank you to all the neighbors, volunteers, and partners who made our first block party a huge success. From the pirate ship bounce house to the live music, face painting to sidewalk chalk, it was a day filled with joy, community, and connection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery Section */}
      <div className="px-4 pb-12 mx-auto max-w-6xl">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-12">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardTitle className="text-2xl text-center">📸 Celebrating Our First Block Party</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={blockPartyAerial} 
                  alt="Aerial view of the block party with pirate ship bounce house" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src={blockPartyMusic} 
                  alt="Live music and neighbors gathering at the block party" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-lg overflow-hidden shadow-md md:col-span-2">
                <img 
                  src={blockPartyChalk} 
                  alt="Sidewalk chalk announcing the block party" 
                  className="w-full h-auto object-cover max-h-96"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Thank You Partners Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-12">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
              <Heart className="w-6 h-6" />
              Thank You to Our Partners
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-center text-lg text-amber-900 mb-8">
              This event wouldn't have been possible without the generous support of:
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              <div className="flex flex-col items-center">
                <img 
                  src={civicJoyLogo} 
                  alt="Civic Joy Fund logo" 
                  className="w-32 h-32 object-contain mb-3"
                />
                <p className="text-sm text-amber-800 font-medium">Civic Joy Fund</p>
                <p className="text-xs text-amber-600">Event Funding</p>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src={oslLogo} 
                  alt="Outer Sunset Neighbors logo" 
                  className="w-32 h-32 object-contain mb-3"
                />
                <p className="text-sm text-amber-800 font-medium">Outer Sunset Neighbors</p>
                <p className="text-xs text-amber-600">Admin Support & Supplies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Site Plan Section */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-12">
          <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
            <CardTitle className="text-2xl text-center">📍 Site Plan</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-center">
              <img 
                src="/lovable-uploads/Updated_BP_Site_Plan.png" 
                alt="48th Ave Block Party Site Plan" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md" 
              />
              <p className="text-sm text-amber-600 mt-4">
                Our layout for the day's activities and stations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Roles - All Filled! */}
        <div id="volunteers-section">
          <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4 leading-tight">
            🙋‍♀️ Thank You Volunteers!
          </h2>
          <p className="text-center text-amber-900 mb-8 max-w-2xl mx-auto">
            Every role was filled by amazing neighbors who stepped up to make this event happen. Thank you to everyone who contributed!
          </p>
          
          {roles.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden mb-6">
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                <CardTitle className="text-xl">
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((role, roleIndex) => (
                    <Card 
                      key={roleIndex} 
                      className="border-green-300 bg-green-50/50"
                    >
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl mb-2">{role.emoji}</div>
                          <h4 className="font-medium text-sm mb-1 text-amber-900">{role.name}</h4>
                          {role.time && (
                            <p className="text-xs text-amber-700 mb-2">
                              {role.time}
                            </p>
                          )}
                          <div className="flex items-center justify-center gap-1 text-xs text-green-700 font-medium">
                            <Users className="w-3 h-3" />
                            ✓ All {role.spots} spots filled!
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stay Tuned Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-amber-100 to-orange-100 shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="text-2xl font-bold text-amber-900 mb-3">
                Stay Tuned for Next Year!
              </h3>
              <p className="text-amber-800 max-w-xl mx-auto">
                We're already dreaming about next year's block party. Stay connected with your neighbors and watch for updates on how you can get involved in planning our next celebration!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 max-w-2xl mx-auto">
            <p className="text-amber-700 text-sm leading-relaxed mb-4">
              Made with 💛 by neighbors on 48th Ave. Questions about future block parties? 
              Reach out in our group chat or reach out to Josh!
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 transition-colors duration-200 text-sm font-medium"
            >
              <Home className="w-4 h-4" />
              Return home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockParty2025;
