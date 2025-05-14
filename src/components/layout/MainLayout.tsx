
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import VirtualAssistant from "@/components/landing/VirtualAssistant";
import { useViewport } from "@/hooks/use-viewport";

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

// Create a custom NavLink component that opens in a new tab
export const NavLink = ({ to, children, className = "" }: { to: string, children: React.ReactNode, className?: string }) => {
  // Check if this is a resources, courses, live classes or about us page
  const shouldOpenInNewTab = /\/(resources|courses|live-classes|about-us)/.test(to);
  
  if (shouldOpenInNewTab) {
    return (
      <Link 
        to={to} 
        target="_blank" 
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <Link 
      to={to} 
      className={className}
    >
      {children}
    </Link>
  );
};

const MainLayout: React.FC<LayoutProps> = ({ children, hideHomeButton }) => {
  const { isMobile, isTablet } = useViewport();
  
  useEffect(() => {
    // Optimize for mobile devices
    if (isMobile) {
      // Set viewport meta tag to ensure proper rendering on mobile
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content', 
          'width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover'
        );
      }
      
      // Add class to body for mobile-specific styling
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
    
    return () => {
      document.body.classList.remove('mobile-view');
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-blue">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20">
        {!hideHomeButton && (
          <div className={`fixed ${isMobile ? 'bottom-4 left-4 z-40' : 'bottom-6 right-6 z-30'} flex flex-col gap-2`}>
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
        {/* Overlay for better readability on mobile */}
        {isMobile && (
          <div className="absolute inset-0 top-16 bg-gradient-to-b from-transparent to-white/10 dark:to-dark-blue/30 pointer-events-none z-[1]"></div>
        )}
        <div className="relative z-[2]">{children}</div>
      </main>
      <Footer />
      <Toaster />
      
      {/* Virtual Assistant is included in the layout so it's available on all pages */}
      <VirtualAssistant />
    </div>
  );
};

export default MainLayout;
