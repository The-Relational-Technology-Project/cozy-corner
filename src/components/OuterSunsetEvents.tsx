import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Clock, MapPin, Loader2 } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  location?: string;
  url?: string;
}

export const OuterSunsetEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      // TODO: Replace with actual API call to outersunset.today once the edge function is ready
      // For now, show a placeholder state
      setLoading(false);
      setEvents([]);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Unable to load events');
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden">
      <CardHeader className="bg-sunset-gradient text-sunset-foreground">
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          What's Happening
        </CardTitle>
        <CardDescription className="text-sunset-foreground/80">
          Events in the Outer Sunset this week
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-ocean" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sand-light rounded-full mb-4">
              <Calendar className="w-8 h-8 text-sand-dark" />
            </div>
            <p className="text-muted-foreground mb-4">
              Events feed coming soon! In the meantime, check out the full calendar:
            </p>
            <a
              href="https://outersunset.today"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-sunset hover:bg-sunset-dark text-sunset-foreground rounded-xl">
                <Calendar className="w-4 h-4 mr-2" />
                Visit Outer Sunset Today
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {events.map((event) => (
                <a
                  key={event.id}
                  href={event.url || 'https://outersunset.today'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-sand-light rounded-xl p-4 transition-all duration-200 group-hover:bg-sand group-hover:shadow-md">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-ocean transition-colors truncate">
                          {event.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(event.date)}
                          </span>
                          {event.time && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {event.time}
                            </span>
                          )}
                          {event.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {event.location}
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://outersunset.today"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="outline" className="w-full border-sunset/30 text-sunset hover:bg-sunset-light rounded-xl">
                See Full Calendar
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </>
        )}
      </CardContent>
    </Card>
  );
};