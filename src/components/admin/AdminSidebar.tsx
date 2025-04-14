
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Users, 
  ListChecks, 
  MonitorPlay, 
  TestTube, 
  BarChart3, 
  Upload, 
  MessageSquare, 
  Settings, 
  FileText, 
  Home,
  ChevronUp,
  ChevronDown,
  Sliders,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  id: string;
}

interface AdminSidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const AdminSidebar = ({ activeView, setActiveView }: AdminSidebarProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  
  const navItems: NavItem[] = [
    {
      title: "EASY WIN ADMIN",
      icon: <Settings className="h-5 w-5" />,
      id: "dashboard"
    },
    {
      title: "USER MANAGEMENT",
      icon: <Users className="h-5 w-5" />,
      id: "users"
    },
    {
      title: "CLASS MANAGEMENT",
      icon: <ListChecks className="h-5 w-5" />,
      id: "classes"
    },
    {
      title: "LIVE MONITOR",
      icon: <MonitorPlay className="h-5 w-5" />,
      id: "live"
    },
    {
      title: "MOCK TESTS",
      icon: <TestTube className="h-5 w-5" />,
      id: "tests"
    },
    {
      title: "ANALYTICS",
      icon: <BarChart3 className="h-5 w-5" />,
      id: "analytics"
    },
    {
      title: "UPLOADS",
      icon: <Upload className="h-5 w-5" />,
      id: "uploads"
    },
    {
      title: "USER FEEDBACK",
      icon: <MessageSquare className="h-5 w-5" />,
      id: "feedback"
    },
    {
      title: "WEBSITE CONTROL",
      icon: <Settings className="h-5 w-5" />,
      id: "settings"
    },
    {
      title: "CONTENT MANAGEMENT",
      icon: <FileText className="h-5 w-5" />,
      id: "content"
    },
    {
      title: "SLIDER CONTROL",
      icon: <Sliders className="h-5 w-5" />,
      id: "slider"
    },
    {
      title: "Return to Home",
      icon: <Home className="h-5 w-5" />,
      id: "home"
    }
  ];

  const handleScroll = () => {
    if (!scrollAreaRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    
    setShowScrollTop(scrollTop > 20);
    setShowScrollBottom(scrollTop + clientHeight < scrollHeight - 20);
  };

  const scrollToPosition = (position: "top" | "bottom") => {
    if (!scrollAreaRef.current) return;
    
    const { scrollHeight, clientHeight } = scrollAreaRef.current;
    const target = position === "top" ? 0 : scrollHeight - clientHeight;
    
    scrollAreaRef.current.scrollTo({
      top: target,
      behavior: "smooth"
    });
  };

  const handleNavItemClick = (id: string) => {
    if (id === "home") {
      window.open("/", "_blank");
    } else {
      setActiveView(id);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const scrollElement = scrollAreaRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Check initial scroll position
      handleScroll();
      
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="min-h-screen w-64 bg-neutral-100 dark:bg-dark-bg border-r border-neutral-200 dark:border-neutral-700 flex flex-col relative">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
            Administration
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Dashboard control panel
          </p>
        </div>
        <Button 
          onClick={toggleTheme} 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="relative flex-grow">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="h-[calc(100vh-7rem)] overflow-y-auto pb-14"
        >
          <div className="p-2 space-y-1">
            {navItems.map((item, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                className={cn(
                  "w-full justify-start font-medium tracking-wide text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors",
                  item.title === "Return to Home" && "mt-4",
                  activeView === item.id && "bg-neutral-200 dark:bg-neutral-800 text-primary font-bold"
                )}
                onClick={() => handleNavItemClick(item.id)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="text-sm">{item.title}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
        
        {/* Scroll buttons */}
        <div className="absolute bottom-0 right-0 p-2 flex flex-col gap-1">
          {showScrollTop && (
            <Button 
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full bg-white dark:bg-neutral-800 shadow-md"
              onClick={() => scrollToPosition("top")}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only">Scroll to top</span>
            </Button>
          )}
          
          {showScrollBottom && (
            <Button 
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full bg-white dark:bg-neutral-800 shadow-md"
              onClick={() => scrollToPosition("bottom")}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Scroll to bottom</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
