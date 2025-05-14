
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useViewport } from "@/hooks/use-viewport";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useViewport();
  
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
    <div className="min-h-screen flex flex-col bg-cyber-dark bg-circuit-pattern bg-fixed bg-[length:auto]">
      <Navbar />
      <main className="flex-grow relative">
        {/* Overlay for better readability on mobile */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/20 to-cyber-dark/40 pointer-events-none z-[1]"></div>
        )}
        <div className="relative z-[2]">{children}</div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
