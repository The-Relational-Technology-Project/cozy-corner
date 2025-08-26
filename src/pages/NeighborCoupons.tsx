import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CouponsRedeemTab } from '@/components/coupons/CouponsRedeemTab';
import { CouponsContributeTab } from '@/components/coupons/CouponsContributeTab';
import { CouponsHowItWorksTab } from '@/components/coupons/CouponsHowItWorksTab';

const NeighborCoupons = () => {
  return (
    <div className="min-h-screen bg-cozy-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-cozy-cream-foreground">
            🎟️ Neighbor Coupons
          </h1>
          <p className="text-lg text-cozy-cream-foreground/80">
            Connect with your neighbors through shared experiences
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="redeem" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 border border-cozy-orange/20">
            <TabsTrigger 
              value="redeem" 
              className="data-[state=active]:bg-cozy-cream-dark data-[state=active]:text-cozy-cream hover:bg-cozy-cream-dark/10 text-cozy-cream-foreground font-medium"
            >
              Redeem
            </TabsTrigger>
            <TabsTrigger 
              value="contribute"
              className="data-[state=active]:bg-cozy-cream-dark data-[state=active]:text-cozy-cream hover:bg-cozy-cream-dark/10 text-cozy-cream-foreground font-medium"
            >
              Contribute
            </TabsTrigger>
            <TabsTrigger 
              value="how-it-works"
              className="data-[state=active]:bg-cozy-cream-dark data-[state=active]:text-cozy-cream hover:bg-cozy-cream-dark/10 text-cozy-cream-foreground font-medium"
            >
              How It Works
            </TabsTrigger>
          </TabsList>

          <TabsContent value="redeem">
            <CouponsRedeemTab />
          </TabsContent>

          <TabsContent value="contribute">
            <CouponsContributeTab />
          </TabsContent>

          <TabsContent value="how-it-works">
            <CouponsHowItWorksTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NeighborCoupons;