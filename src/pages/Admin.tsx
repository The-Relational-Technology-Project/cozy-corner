
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getCurrentUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-cozy-cream">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-cozy-cream-foreground">
              🏠 Cozy Corner Admin Panel
            </h1>
            {user && (
              <p className="text-cozy-cream-foreground/70 mt-1">
                Signed in as: {user.email}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-brown-sand text-brown-sand hover:bg-brown-sand hover:text-brown-sand-foreground"
            >
              Back to Site
            </Button>
            <Button
              onClick={handleLogout}
              className="bg-cozy-orange hover:bg-cozy-orange-dark text-cozy-orange-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
        
        <AdminDashboard />
      </div>
    </div>
  );
};

export default Admin;
