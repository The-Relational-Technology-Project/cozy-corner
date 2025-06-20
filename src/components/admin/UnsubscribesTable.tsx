import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw } from 'lucide-react';

interface Unsubscribe {
  id: string;
  email: string;
  created_at: string;
}

interface UnsubscribesTableProps {
  onDataChange: () => void;
}

export const UnsubscribesTable = ({ onDataChange }: UnsubscribesTableProps) => {
  const [unsubscribes, setUnsubscribes] = useState<Unsubscribe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUnsubscribes();
  }, []);

  const fetchUnsubscribes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('street_cleaning_unsubscribes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUnsubscribes(data || []);
    } catch (error) {
      console.error('Error fetching unsubscribes:', error);
      toast({
        title: "Error",
        description: "Failed to load unsubscribes.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard.",
    });
  };

  const copyAllEmails = () => {
    const emails = unsubscribes.map(unsub => unsub.email).join(', ');
    navigator.clipboard.writeText(emails);
    toast({
      title: "Copied!",
      description: `${unsubscribes.length} email addresses copied to clipboard.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-orange-800">Street Cleaning Unsubscribes</CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={copyAllEmails}
              variant="outline"
              size="sm"
              className="border-orange-300 text-orange-700 hover:bg-orange-100"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy All Emails
            </Button>
            <Button
              onClick={() => {
                fetchUnsubscribes();
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
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-orange-600">Loading unsubscribes...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Unsubscribed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unsubscribes.map((unsubscribe) => (
                  <TableRow key={unsubscribe.id}>
                    <TableCell className="font-medium">{unsubscribe.email}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(unsubscribe.created_at)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => copyToClipboard(unsubscribe.email)}
                        variant="ghost"
                        size="sm"
                        className="text-orange-600 hover:text-orange-700"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {unsubscribes.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No unsubscribes found.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
