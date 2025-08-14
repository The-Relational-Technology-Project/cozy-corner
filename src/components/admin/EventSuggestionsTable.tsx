import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Shield } from 'lucide-react';

interface EventSuggestion {
  id: string;
  name: string | null;
  email: string | null;
  event_title: string;
  event_description: string | null;
  suggested_location: string | null;
  suggested_date: string | null;
  contact_info: string | null;
  created_at: string;
}

interface EventSuggestionsTableProps {
  onDataChange: () => void;
}

export const EventSuggestionsTable = ({ onDataChange }: EventSuggestionsTableProps) => {
  const [suggestions, setSuggestions] = useState<EventSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .rpc('get_event_suggestions_for_admin');

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error fetching event suggestions:', error);
      toast({
        title: "Error",
        description: "Failed to load event suggestions.",
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
      description: "Text copied to clipboard.",
    });
  };

  const copyAllEmails = () => {
    const emails = suggestions
      .filter(suggestion => suggestion.email)
      .map(suggestion => suggestion.email)
      .join(', ');
    navigator.clipboard.writeText(emails);
    toast({
      title: "Copied!",
      description: "All email addresses copied to clipboard.",
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
          <CardTitle className="text-orange-800">Community Event Suggestions</CardTitle>
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
                fetchSuggestions();
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
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 text-blue-800 mb-2">
            <Shield className="h-4 w-4" />
            <span className="font-medium">Sensitive Data - Admin Access Only</span>
          </div>
          <p className="text-sm text-blue-700">
            This data contains personal contact information. Handle with care and use only for legitimate event organization purposes.
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="text-orange-600">Loading event suggestions...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate" title={suggestion.event_title}>
                        {suggestion.event_title}
                      </div>
                      {suggestion.event_description && (
                        <div className="text-sm text-gray-500 truncate mt-1" title={suggestion.event_description}>
                          {suggestion.event_description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{suggestion.name || 'N/A'}</TableCell>
                    <TableCell>
                      {suggestion.email ? (
                        <Button
                          onClick={() => copyToClipboard(suggestion.email!)}
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700 p-0 h-auto font-normal"
                        >
                          {suggestion.email}
                        </Button>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{suggestion.suggested_location || 'N/A'}</TableCell>
                    <TableCell>{suggestion.suggested_date || 'N/A'}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(suggestion.created_at)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {suggestion.contact_info && (
                          <Button
                            onClick={() => copyToClipboard(suggestion.contact_info!)}
                            variant="ghost"
                            size="sm"
                            className="text-orange-600 hover:text-orange-700"
                            title="Copy contact info"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {suggestions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No event suggestions found.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
