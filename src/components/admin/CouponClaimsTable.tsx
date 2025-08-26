import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CouponClaim {
  id: string;
  created_at: string;
  coupon_title: string;
  coupon_description: string;
  contributor_name: string;
  contributor_email: string;
  claimer_name: string;
  claimer_email: string;
  status: string;
  admin_notes: string;
}

interface CouponClaimsTableProps {
  onDataChange?: () => void;
}

export const CouponClaimsTable = ({ onDataChange }: CouponClaimsTableProps) => {
  const [claims, setClaims] = useState<CouponClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingClaims, setUpdatingClaims] = useState<Set<string>>(new Set());
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const { data, error } = await supabase.rpc('get_coupon_claims_for_admin');
      
      if (error) throw error;
      setClaims(data || []);
      
      // Initialize admin notes state
      const notesState: { [key: string]: string } = {};
      data?.forEach((claim: CouponClaim) => {
        notesState[claim.id] = claim.admin_notes || '';
      });
      setAdminNotes(notesState);
    } catch (error) {
      console.error('Error fetching coupon claims:', error);
      toast({
        title: "Error",
        description: "Failed to load coupon claims.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateClaimStatus = async (claimId: string, newStatus: string) => {
    setUpdatingClaims(prev => new Set(prev).add(claimId));
    
    try {
      const { error } = await supabase
        .from('coupon_claims')
        .update({ 
          status: newStatus,
          admin_notes: adminNotes[claimId] || null
        })
        .eq('id', claimId);

      if (error) throw error;

      await fetchClaims();
      onDataChange?.();
      
      toast({
        title: "Status Updated",
        description: `Claim status updated to ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating claim status:', error);
      toast({
        title: "Error",
        description: "Failed to update claim status.",
        variant: "destructive",
      });
    } finally {
      setUpdatingClaims(prev => {
        const next = new Set(prev);
        next.delete(claimId);
        return next;
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Approved</Badge>;
      case 'intro_made':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Intro Made</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completed</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading coupon claims...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coupon Claims Management</CardTitle>
      </CardHeader>
      <CardContent>
        {claims.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No coupon claims yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Coupon</TableHead>
                  <TableHead>Contributor</TableHead>
                  <TableHead>Claimer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <TableRow key={claim.id}>
                    <TableCell className="text-sm">
                      {new Date(claim.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{claim.coupon_title}</div>
                        <div className="text-sm text-gray-500">{claim.coupon_description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{claim.contributor_name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">{claim.contributor_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{claim.claimer_name || 'Anonymous'}</div>
                        <div className="text-sm text-gray-500">{claim.claimer_email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(claim.status)}
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={adminNotes[claim.id] || ''}
                        onChange={(e) => setAdminNotes(prev => ({
                          ...prev,
                          [claim.id]: e.target.value
                        }))}
                        placeholder="Add notes..."
                        className="min-h-[60px] text-sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {claim.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateClaimStatus(claim.id, 'approved')}
                              disabled={updatingClaims.has(claim.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateClaimStatus(claim.id, 'declined')}
                              disabled={updatingClaims.has(claim.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        {claim.status === 'approved' && (
                          <Button
                            size="sm"
                            onClick={() => updateClaimStatus(claim.id, 'intro_made')}
                            disabled={updatingClaims.has(claim.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark Intro Made
                          </Button>
                        )}
                        {claim.status === 'intro_made' && (
                          <Button
                            size="sm"
                            onClick={() => updateClaimStatus(claim.id, 'completed')}
                            disabled={updatingClaims.has(claim.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Mark Completed
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};