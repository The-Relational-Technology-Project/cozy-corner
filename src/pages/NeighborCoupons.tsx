import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainNavigation } from '@/components/MainNavigation';

import { CouponsRedeemTab } from '@/components/coupons/CouponsRedeemTab';
import { CouponsContributeTab } from '@/components/coupons/CouponsContributeTab';
import { CouponsHowItWorksTab } from '@/components/coupons/CouponsHowItWorksTab';

const NeighborCoupons = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100">
      
      <MainNavigation />
      
      <div className="px-4 py-16 mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-600 bg-clip-text text-transparent mb-4">
            🎟️ Neighbor Coupons
          </h1>
          <p className="text-xl text-amber-800 leading-relaxed max-w-2xl mx-auto">
            Open invitations to connect with your neighbors 🤗
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="redeem" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/50 border border-orange-200/40">
            <TabsTrigger 
              value="redeem" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Redeem
            </TabsTrigger>
            <TabsTrigger 
              value="contribute"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              Contribute
            </TabsTrigger>
            <TabsTrigger 
              value="how-it-works"
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
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