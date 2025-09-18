
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import BlockParty2025 from "./pages/BlockParty2025";
import NeighborCoupons from "./pages/NeighborCoupons";
import Contact from "./pages/Contact";
import AdminAuth from "./pages/AdminAuth";
import NotFound from "./pages/NotFound";
import { ProtectedAdminRoute } from "./components/ProtectedAdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/block-party-2025" element={<BlockParty2025 />} />
          <Route path="/coupons" element={<NeighborCoupons />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
