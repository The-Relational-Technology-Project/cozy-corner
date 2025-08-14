import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SubscriptionsTable } from './SubscriptionsTable';
import { UnsubscribesTable } from './UnsubscribesTable';
import { EventSuggestionsTable } from './EventSuggestionsTable';
import { EventsManager } from './EventsManager';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    subscriptions: 0,
    unsubscribes: 0,
    suggestions: 0,
    events: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [subscriptionsRes, unsubscribesRes, suggestionsRes, eventsRes] = await Promise.all([
        supabase.rpc('get_subscription_stats'),
        supabase.from('street_cleaning_unsubscribes').select('*', { count: 'exact', head: true }),
        supabase.rpc('get_event_suggestion_count'),
        supabase.from('upcoming_events').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        subscriptions: subscriptionsRes.data?.[0]?.total_subscriptions || 0,
        unsubscribes: unsubscribesRes.count || 0,
        suggestions: suggestionsRes.data || 0,
        events: eventsRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{stats.subscriptions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              Unsubscribes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{stats.unsubscribes}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              Event Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{stats.suggestions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{stats.events}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="subscriptions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="unsubscribes">Unsubscribes</TabsTrigger>
          <TabsTrigger value="suggestions">Event Suggestions</TabsTrigger>
          <TabsTrigger value="events">Manage Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscriptions" className="space-y-4">
          <SubscriptionsTable onDataChange={fetchStats} />
        </TabsContent>
        
        <TabsContent value="unsubscribes" className="space-y-4">
          <UnsubscribesTable onDataChange={fetchStats} />
        </TabsContent>
        
        <TabsContent value="suggestions" className="space-y-4">
          <EventSuggestionsTable onDataChange={fetchStats} />
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <EventsManager onDataChange={fetchStats} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
