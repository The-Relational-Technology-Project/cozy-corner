import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CouponsHowItWorksTab = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="bg-white border-cozy-orange/20">
        <CardHeader>
          <CardTitle className="text-cozy-cream-foreground text-center">
            How Neighbor Coupons Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-cozy-cream-foreground">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">🔐</div>
              <div>
                <h3 className="font-semibold mb-1">Safe, Steward-Mediated Introductions</h3>
                <p>Coupons are safe, steward-mediated introductions. Your personal information stays private until you both agree to connect.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">🤝</div>
              <div>
                <h3 className="font-semibold mb-1">When You Claim a Coupon</h3>
                <p>When you claim a coupon, the block steward checks with the neighbor who offered it and facilitates the introduction between you both.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">🔒</div>
              <div>
                <h3 className="font-semibold mb-1">No Contact Info Shared</h3>
                <p>No contact information is shared on the site itself. All connections happen through the steward who ensures both parties are comfortable.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl">❤️</div>
              <div>
                <h3 className="font-semibold mb-1">About Connection, Not Transactions</h3>
                <p>This is about connection and warm welcomes, not transactions. The goal is to build community and help neighbors get to know each other.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-cozy-orange-light border-cozy-orange/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="font-semibold text-cozy-cream-foreground mb-2">
              Questions or Concerns?
            </h3>
            <p className="text-cozy-cream-foreground">
              Reach out to Josh{' '}
              <a href="mailto:steward@cozycorner.place" className="text-cozy-orange-dark underline">
                steward@cozycorner.place
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};