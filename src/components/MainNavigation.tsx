import { Link, useLocation } from "react-router-dom";
import { Home, Handshake, Mail, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

export const MainNavigation = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  
  const languageAbbreviations = {
    'en': 'EN',
    'zh-CN': '简',
    'zh-HK': '繁'
  };
  
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const homeItem = { path: "/", label: t('nav.home'), icon: Home };
  
  const rightNavItems = [
    { path: "/prep-together", label: t('nav.prep'), icon: Handshake },
    { path: "/block-party-2025", label: t('nav.party'), icon: "🎉" as const },
    { path: "/contact", label: t('nav.contact'), icon: Mail },
  ];

  return (
    <nav className="bg-card/90 backdrop-blur-sm border-b border-fog/30 sticky top-0 z-50">
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
                  ? "bg-ocean text-ocean-foreground shadow-md" 
                  : "text-foreground hover:text-ocean hover:bg-ocean-light"
                }
              `}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">{homeItem.label}</span>
            </Button>
          </Link>

          {/* Right navigation items */}
          <div className="flex items-center gap-1.5 md:gap-3">
            {/* Language selector */}
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'zh-CN' | 'zh-HK')}>
              <SelectTrigger className="w-auto h-9 px-2 md:px-3 border-fog/30 bg-card/80 hover:bg-fog-light rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Languages className="h-4 w-4 text-foreground hidden sm:block" />
                  <span className="text-sm font-medium text-foreground">
                    {languageAbbreviations[language]}
                  </span>
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
                        ? "bg-ocean text-ocean-foreground shadow-md" 
                        : "text-foreground hover:text-ocean hover:bg-ocean-light"
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