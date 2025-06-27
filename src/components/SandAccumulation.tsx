
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SandParticle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  color: string;
  animationDelay: number;
}

const SandAccumulation = () => {
  const [particles, setParticles] = useState<SandParticle[]>([]);
  const [globalSandCount, setGlobalSandCount] = useState(0);
  const [showClearButton, setShowClearButton] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { toast } = useToast();

  const sandColors = [
    '#D4B896', '#C8A882', '#B89968', '#A68B5B', '#D2B48C', '#DEB887'
  ];

  const createParticle = useCallback((index: number): SandParticle => ({
    id: `particle-${Date.now()}-${index}`,
    x: Math.random() * 200, // Spread across top-left area
    y: -10,
    size: Math.random() * 3 + 2, // 2-5px
    opacity: Math.random() * 0.4 + 0.6, // 0.6-1.0
    rotation: Math.random() * 360,
    color: sandColors[Math.floor(Math.random() * sandColors.length)],
    animationDelay: Math.random() * 2
  }), []);

  const fetchGlobalSandCount = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('sand_accumulation')
        .select('sand_count, last_cleared_at')
        .single();

      if (error) throw error;

      if (data) {
        const timeSinceCleared = Date.now() - new Date(data.last_cleared_at).getTime();
        const minutesSinceCleared = Math.floor(timeSinceCleared / (1000 * 60));
        
        // Add 1 particle every 2 minutes since last cleared
        const accumulatedSand = Math.floor(minutesSinceCleared / 2);
        const totalSand = data.sand_count + accumulatedSand;
        
        setGlobalSandCount(totalSand);
        setShowClearButton(totalSand > 15);
      }
    } catch (error) {
      console.error('Error fetching sand count:', error);
    }
  }, []);

  const addSandParticle = useCallback(() => {
    if (particles.length < Math.min(globalSandCount, 80)) {
      const newParticle = createParticle(particles.length);
      setParticles(prev => [...prev, newParticle]);
    }
  }, [particles.length, globalSandCount, createParticle]);

  const clearSand = async () => {
    setIsClearing(true);
    
    try {
      // Update database
      const { error } = await supabase
        .from('sand_accumulation')
        .update({
          sand_count: 0,
          last_cleared_at: new Date().toISOString()
        })
        .eq('id', (await supabase.from('sand_accumulation').select('id').single()).data?.id);

      if (error) throw error;

      // Clear particles with animation
      setParticles([]);
      setGlobalSandCount(0);
      setShowClearButton(false);
      
      toast({
        title: "Sand cleared! 🧹",
        description: "Thanks for sweeping! The neighborhood appreciates it!",
      });
    } catch (error) {
      console.error('Error clearing sand:', error);
      toast({
        title: "Error",
        description: "Failed to clear sand. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
    }
  };

  // Increment sand count periodically
  useEffect(() => {
    const incrementSand = async () => {
      try {
        const { data } = await supabase
          .from('sand_accumulation')
          .select('id, sand_count')
          .single();

        if (data) {
          await supabase
            .from('sand_accumulation')
            .update({ sand_count: data.sand_count + 1 })
            .eq('id', data.id);
        }
      } catch (error) {
        console.error('Error incrementing sand:', error);
      }
    };

    const interval = setInterval(() => {
      incrementSand();
      fetchGlobalSandCount();
    }, 120000); // Every 2 minutes

    return () => clearInterval(interval);
  }, [fetchGlobalSandCount]);

  // Initial fetch and periodic updates
  useEffect(() => {
    fetchGlobalSandCount();
    const interval = setInterval(fetchGlobalSandCount, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [fetchGlobalSandCount]);

  // Add particles based on global sand count
  useEffect(() => {
    if (globalSandCount > particles.length) {
      const particlesToAdd = Math.min(globalSandCount - particles.length, 3);
      for (let i = 0; i < particlesToAdd; i++) {
        setTimeout(() => addSandParticle(), i * 500);
      }
    }
  }, [globalSandCount, particles.length, addSandParticle]);

  return (
    <div className="fixed top-0 left-0 w-64 h-64 pointer-events-none z-50 overflow-hidden">
      {/* Sand Particles */}
      {particles.map((particle, index) => (
        <div
          key={particle.id}
          className={`absolute transition-all duration-1000 ease-out ${
            isClearing ? 'animate-[fade-out_0.5s_ease-out_forwards]' : 'animate-[fade-in_1s_ease-out]'
          }`}
          style={{
            left: `${particle.x}px`,
            top: `${Math.min(particle.y + index * 2, 200)}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            borderRadius: '50%',
            transform: `rotate(${particle.rotation}deg)`,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}

      {/* Clear Sand Button */}
      {showClearButton && (
        <div className="absolute top-4 left-4 pointer-events-auto">
          <Button
            onClick={clearSand}
            disabled={isClearing}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium text-sm px-3 py-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            {isClearing ? "Clearing..." : "Clear the Sand! 🧹"}
          </Button>
        </div>
      )}

      {/* Subtle sand count indicator */}
      {globalSandCount > 0 && (
        <div className="absolute bottom-4 left-4 text-xs text-amber-700/60 font-medium pointer-events-auto">
          🏖️ {globalSandCount} grains
        </div>
      )}
    </div>
  );
};

export default SandAccumulation;
