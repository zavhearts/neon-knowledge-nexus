
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VirtualAssistant from "@/components/landing/VirtualAssistant";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  hideHomeButton?: boolean;
}

// This wrapper ensures links are opened in new tabs
export const ExternalLink = ({ to, children, className = "" }: { to: string, children: React.ReactNode, className?: string }) => {
  return (
    <a 
      href={to} 
      target="_blank" 
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

const MainLayout: React.FC<LayoutProps> = ({ children, hideHomeButton }) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-blue">
      <Navbar />
      <main className="flex-grow pt-20">
        {!hideHomeButton && (
          <div className={`fixed ${isMobile ? 'bottom-4 left-4' : 'bottom-6 right-6'} z-30 flex flex-col gap-2`}>
            <Link to="/">
              <Button 
                className={`bg-royal-blue hover:bg-royal-blue/80 text-white rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'} p-0 shadow-lg`}
                aria-label="Back to home"
              >
                <Home className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </Button>
            </Link>
          </div>
        )}
        {children}
      </main>
      <Footer />
      <Toaster />
      
      {/* Virtual Assistant is included in the layout so it's available on all pages */}
      <VirtualAssistant />
    </div>
  );
};

export default MainLayout;
