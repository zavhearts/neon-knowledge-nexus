
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Home, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
  hideHomeButton?: boolean;
}

const MainLayout: React.FC<LayoutProps> = ({ children, hideHomeButton }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-dark-blue">
      <Navbar />
      <main className="flex-grow pt-20">
        {!hideHomeButton && (
          <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
            <Link to="/teacher" target="_blank" rel="noopener noreferrer">
              <Button 
                className="bg-royal-blue hover:bg-royal-blue/80 text-white rounded-full w-12 h-12 p-0 shadow-lg"
                aria-label="Teacher Dashboard"
              >
                <UserCog className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/">
              <Button 
                className="bg-royal-blue hover:bg-royal-blue/80 text-white rounded-full w-12 h-12 p-0 shadow-lg"
                aria-label="Back to home"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
        {children}
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
