import { Link, useLocation } from "react-router-dom";
import { Home, Users, Ticket, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MainNavigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/block-party-2025", label: "Block Party", icon: Users },
    { path: "/coupons", label: "Coupons", icon: Ticket },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center h-16 gap-1 md:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className={`
                    flex items-center gap-2 rounded-xl font-medium transition-all duration-200
                    ${isActive(item.path) 
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md" 
                      : "text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};