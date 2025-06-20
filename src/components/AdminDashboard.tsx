
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Edit, Trash2, LogOut } from 'lucide-react';

interface UpcomingEvent {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [unsubscribes, setUnsubscribes] = useState([]);
  const [eventSuggestions, setEventSuggestions] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([]);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<UpcomingEvent | null>(null);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [subsResult, unsubsResult, suggestionsResult, eventsResult] = await Promise.all([
        supabase.from('street_cleaning_subscriptions').select('*'),
        supabase.from('street_cleaning_unsubscribes').select('*'),
        supabase.from('event_suggestions').select('*'),
        supabase.from('upcoming_events').select('*').order('event_date', { ascending: true })
      ]);

      setSubscriptions(subsResult.data || []);
      setUnsubscribes(unsubsResult.data || []);
      setEventSuggestions(suggestionsResult.data || []);
      setUpcomingEvents(eventsResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await supabase
          .from('upcoming_events')
          .update(eventForm)
          .eq('id', editingEvent.id);
      } else {
        await supabase
          .from('upcoming_events')
          .insert([eventForm]);
      }
      
      setIsEventDialogOpen(false);
      setEditingEvent(null);
      setEventForm({ title: '', description: '', event_date: '', event_time: '', location: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      await supabase.from('upcoming_events').delete().eq('id', id);
      fetchData();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const openEventDialog = (event?: UpcomingEvent) => {
    if (event) {
      setEditingEvent(event);
      setEventForm({
        title: event.title,
        description: event.description || '',
        event_date: event.event_date,
        event_time: event.event_time || '',
        location: event.location || ''
      });
    } else {
      setEditingEvent(null);
      setEventForm({ title: '', description: '', event_date: '', event_time: '', location: '' });
    }
    setIsEventDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Cozy Corner Admin</h1>
          <Button onClick={onLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Street Cleaning Subscriptions */}
          <Card>
            <CardHeader>
              <CardTitle>Street Cleaning Subscriptions ({subscriptions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>East Side</TableHead>
                      <TableHead>West Side</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((sub: any) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-mono text-sm">{sub.email}</TableCell>
                        <TableCell>{sub.east_side ? '✓' : '✗'}</TableCell>
                        <TableCell>{sub.west_side ? '✓' : '✗'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Unsubscribes */}
          <Card>
            <CardHeader>
              <CardTitle>Unsubscribes ({unsubscribes.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {unsubscribes.map((unsub: any) => (
                      <TableRow key={unsub.id}>
                        <TableCell className="font-mono text-sm">{unsub.email}</TableCell>
                        <TableCell>{format(new Date(unsub.created_at), 'MMM d, yyyy')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Suggestions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Event Suggestions ({eventSuggestions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventSuggestions.map((suggestion: any) => (
                    <TableRow key={suggestion.id}>
                      <TableCell className="font-medium">{suggestion.event_title}</TableCell>
                      <TableCell>{suggestion.name || '-'}</TableCell>
                      <TableCell className="font-mono text-sm">{suggestion.email || '-'}</TableCell>
                      <TableCell>{suggestion.suggested_date || '-'}</TableCell>
                      <TableCell>{suggestion.suggested_location || '-'}</TableCell>
                      <TableCell className="max-w-xs truncate">{suggestion.event_description || '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Upcoming Events ({upcomingEvents.length})</CardTitle>
            <Button onClick={() => openEventDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{format(new Date(event.event_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>{event.event_time || '-'}</TableCell>
                    <TableCell>{event.location || '-'}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEventDialog(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Event Dialog */}
        <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="event_date">Date *</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={eventForm.event_date}
                  onChange={(e) => setEventForm({ ...eventForm, event_date: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="event_time">Time</Label>
                <Input
                  id="event_time"
                  type="time"
                  value={eventForm.event_time}
                  onChange={(e) => setEventForm({ ...eventForm, event_time: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingEvent ? 'Update' : 'Create'} Event
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
