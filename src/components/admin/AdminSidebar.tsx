
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
  Sliders
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const AdminSidebar = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const navItems: NavItem[] = [
    {
      title: "EASY WIN ADMIN",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin"
    },
    {
      title: "USER MANAGEMENT",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users"
    },
    {
      title: "CLASS MANAGEMENT",
      icon: <ListChecks className="h-5 w-5" />,
      href: "/admin/classes"
    },
    {
      title: "LIVE MONITOR",
      icon: <MonitorPlay className="h-5 w-5" />,
      href: "/admin/live"
    },
    {
      title: "MOCK TESTS",
      icon: <TestTube className="h-5 w-5" />,
      href: "/admin/tests"
    },
    {
      title: "ANALYTICS",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics"
    },
    {
      title: "UPLOADS",
      icon: <Upload className="h-5 w-5" />,
      href: "/admin/uploads"
    },
    {
      title: "USER FEEDBACK",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/feedback"
    },
    {
      title: "WEBSITE CONTROL",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings"
    },
    {
      title: "CONTENT MANAGEMENT",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/content"
    },
    {
      title: "SLIDER CONTROL",
      icon: <Sliders className="h-5 w-5" />,
      href: "/admin/slider"
    },
    {
      title: "Return to Home",
      icon: <Home className="h-5 w-5" />,
      href: "/"
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
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
        <h3 className="text-lg font-bold text-neutral-800 dark:text-white">
          Administration
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Dashboard control panel
        </p>
      </div>
      
      <div className="relative flex-grow">
        <ScrollArea 
          ref={scrollAreaRef} 
          className="h-[calc(100vh-7rem)] overflow-y-auto pb-14"
        >
          <div className="p-2 space-y-1">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                to={item.href} 
                target={item.title === "Return to Home" ? "_blank" : undefined}
              >
                <Button 
                  variant="ghost" 
                  className={cn(
                    "w-full justify-start font-medium tracking-wide text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors",
                    item.title === "Return to Home" && "mt-4",
                    item.title === "EASY WIN ADMIN" && "bg-neutral-200 dark:bg-neutral-800 text-primary font-bold"
                  )}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-sm">{item.title}</span>
                </Button>
              </Link>
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
