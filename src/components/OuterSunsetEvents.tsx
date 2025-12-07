import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, Clock, MapPin, Loader2 } from 'lucide-react';

interface ApiEvent {
  id: string;
  name: string;
  start: string;
  end?: string;
  description?: string;
  category?: string[];
  location?: {
    name?: string;
    neighborhood?: string;
  };
  url?: string;
}

interface ApiResponse {
  meta: Record<string, unknown>;
  events: ApiEvent[];
  count: number;
}

export const OuterSunsetEvents = () => {
  const [events, setEvents] = useState<ApiEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch(
        `https://nawdvulumebqbxmkedzw.supabase.co/functions/v1/get-public-events?start_after=${today}&start_before=${nextWeek}&limit=6`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data: ApiResponse = await response.json();
      setEvents(data.events || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Unable to load events');
      setLoading(false);
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (eventDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getCategoryEmoji = (categories?: string[]) => {
    if (!categories || categories.length === 0) return '📅';
    const category = categories[0].toLowerCase();
    const categoryMap: Record<string, string> = {
      'music': '🎵',
      'food': '🍽️',
      'market': '🥬',
      'farmers': '🥬',
      'community': '🤝',
      'art': '🎨',
      'sports': '⚽',
      'kids': '👶',
      'nature': '🌿',
    };
    return categoryMap[category] || '📅';
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
          <div className="text-center py-6">
            <p className="text-muted-foreground mb-4">{error}</p>
            <a
              href="https://outersunset.today"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-sunset hover:bg-sunset-dark text-sunset-foreground rounded-xl">
                Visit Outer Sunset Today
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sand-light rounded-full mb-4">
              <Calendar className="w-8 h-8 text-sand-dark" />
            </div>
            <p className="text-muted-foreground mb-4">
              No events scheduled this week. Check out the full calendar:
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
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{getCategoryEmoji(event.category)}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-ocean transition-colors line-clamp-1">
                          {event.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(event.start)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatTime(event.start)}
                          </span>
                          {event.location?.name && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[150px]">
                                {event.location.name}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
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