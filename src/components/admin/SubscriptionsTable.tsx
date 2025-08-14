import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { RefreshCw, Shield } from 'lucide-react';

interface SubscriptionStats {
  total_subscriptions: number;
  east_side_count: number;
  west_side_count: number;
  both_sides_count: number;
}

interface SubscriptionsTableProps {
  onDataChange: () => void;
}

export const SubscriptionsTable = ({ onDataChange }: SubscriptionsTableProps) => {
  const [stats, setStats] = useState<SubscriptionStats>({
    total_subscriptions: 0,
    east_side_count: 0,
    west_side_count: 0,
    both_sides_count: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.rpc('get_subscription_stats');

      if (error) throw error;
      
      if (data && data.length > 0) {
        setStats(data[0]);
      }
    } catch (error) {
      console.error('Error fetching subscription stats:', error);
      toast({
        title: "Error",
        description: "Failed to load subscription statistics.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-orange-800">Street Cleaning Subscriptions</CardTitle>
          <Button
            onClick={() => {
              fetchStats();
              onDataChange();
            }}
            variant="outline"
            size="sm"
            className="border-orange-300 text-orange-700 hover:bg-orange-100"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Privacy Protected</span>
          </div>
          <p className="text-sm text-blue-700">
            Individual email addresses are now protected for user privacy. Only aggregate statistics are shown.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-orange-600">Loading statistics...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
              <div className="text-2xl font-bold text-orange-800">{stats.total_subscriptions}</div>
              <div className="text-sm text-orange-600">Total Subscriptions</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-800">{stats.east_side_count}</div>
              <div className="text-sm text-blue-600">East Side Only</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-800">{stats.west_side_count}</div>
              <div className="text-sm text-green-600">West Side Only</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-800">{stats.both_sides_count}</div>
              <div className="text-sm text-purple-600">Both Sides</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
