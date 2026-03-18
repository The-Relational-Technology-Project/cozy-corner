import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Mail, MessageSquare } from "lucide-react";

interface StreetCleaningInvitationProps {
  onOpenModal: () => void;
}

export const StreetCleaningInvitation = ({ onOpenModal }: StreetCleaningInvitationProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          🧹 Street Cleaning Reminders
        </CardTitle>
        <CardDescription className="text-amber-100">
          Never miss moving your car again
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {/* Quick Schedule Overview */}
        <div className="bg-amber-50 rounded-xl p-4 mb-4">
          <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Quick Schedule
          </h3>
          <div className="space-y-1 text-sm text-amber-800">
            <div>East Side: 1st & 3rd Friday</div>
            <div>West Side: 1st & 3rd Tuesday</div>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-amber-800 text-sm">
            Get friendly 8am reminders on cleaning days — by email, text, or both.
          </p>

          <div className="flex items-center justify-center gap-3 text-amber-700 text-xs">
            <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Email</span>
            <span className="text-amber-300">•</span>
            <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" /> Text</span>
            <span className="text-amber-300">•</span>
            <span>Or both!</span>
          </div>
          
          <Button 
            onClick={onOpenModal}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-medium py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Set Up Reminders 🌊
          </Button>

          <div className="text-xs text-amber-600">
            Free • No spam • Easy unsubscribe
          </div>
        </div>
      </CardContent>
    </Card>
  );
};