import { Link, useLocation } from "react-router-dom";
import { Home, Handshake, Ticket, Mail, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export const MainNavigation = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const homeItem = { path: "/", label: t('nav.home'), icon: Home };
  
  const rightNavItems = [
    { path: "/prep-together", label: t('nav.prep'), icon: Handshake },
    { path: "/block-party-2025", label: t('nav.party'), icon: "🎉" as const },
    { path: "/coupons", label: t('nav.coupons'), icon: Ticket },
    { path: "/contact", label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-amber-200/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Home button - left side */}
          <Link to={homeItem.path}>
            <Button
              variant={isActive(homeItem.path) ? "default" : "ghost"}
              size="sm"
              className={`
                flex items-center gap-2 rounded-xl font-medium transition-all duration-200
                ${isActive(homeItem.path) 
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md" 
                  : "text-amber-700 hover:text-amber-900 hover:bg-amber-50"
                }
              `}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{homeItem.label}</span>
            </Button>
          </Link>

          {/* Right navigation items */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Language selector */}
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'zh-CN' | 'zh-HK')}>
              <SelectTrigger className="w-[50px] md:w-[140px] h-9 border-amber-200 bg-white/80 hover:bg-amber-50 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-amber-700" />
                  <SelectValue className="hidden md:inline" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="zh-CN">简体中文</SelectItem>
                <SelectItem value="zh-HK">繁體中文</SelectItem>
              </SelectContent>
            </Select>
            {rightNavItems.map((item) => {
              const isEmoji = typeof item.icon === 'string';
              const Icon = isEmoji ? null : item.icon;
              
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
                    {isEmoji ? (
                      <span className="text-sm">{item.icon}</span>
                    ) : Icon ? (
                      <Icon className="h-4 w-4" />
                    ) : null}
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};