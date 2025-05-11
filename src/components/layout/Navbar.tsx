
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User, Sun, Moon } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTheme } from "@/components/theme/theme-provider";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ExternalLink = ({ to, children, className }) => (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-dark-blue shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/6db8a32c-58a8-4d1e-9c82-e1c9efa2a040.png" 
            alt="Easy Win Learning Hub" 
            className="h-12 animate-pulse-glow"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <div className="nav-parallelogram-container relative">
            <div className="nav-parallelogram-bg absolute inset-0 bg-royal-blue dark:bg-neon-blue/30 skew-x-[-20deg] rounded-md blur-[1px] opacity-20"></div>
            <div className="nav-links-container flex items-center relative z-10">
              <Link
                to="/"
                className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue transition-colors relative group px-4 py-2"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                <span className="absolute inset-0 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 -skew-x-12 rounded-sm"></span>
              </Link>
              <ExternalLink
                to="/courses"
                className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue transition-colors relative group px-4 py-2"
              >
                <span className="relative z-10">Courses</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                <span className="absolute inset-0 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 -skew-x-12 rounded-sm"></span>
              </ExternalLink>
              <ExternalLink
                to="/resources"
                className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue transition-colors relative group px-4 py-2"
              >
                <span className="relative z-10">Resources</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                <span className="absolute inset-0 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 -skew-x-12 rounded-sm"></span>
              </ExternalLink>
              <ExternalLink
                to="/live-classes"
                className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue transition-colors relative group px-4 py-2"
              >
                <span className="relative z-10">Live Classes</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                <span className="absolute inset-0 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 -skew-x-12 rounded-sm"></span>
              </ExternalLink>
              <ExternalLink
                to="/about-us"
                className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue transition-colors relative group px-4 py-2"
              >
                <span className="relative z-10">About Us</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
                <span className="absolute inset-0 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 -skew-x-12 rounded-sm"></span>
              </ExternalLink>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full hover:animate-spin-slow"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-royal-blue text-royal-blue dark:border-neon-blue dark:text-neon-blue hover:bg-royal-blue/10 dark:hover:bg-neon-blue/10 transition-all hover:-translate-y-1"
              >
                <LogIn size={16} className="mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-royal-blue hover:bg-royal-blue/80 dark:bg-neon-blue dark:hover:bg-neon-blue/80 text-white dark:text-black font-medium text-sm px-4 py-1.5 rounded-md transition-all hover:-translate-y-1 hover:shadow-glow">
                <User size={16} className="mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button
            className="text-dark-blue dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu - updated for consistent styling */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-dark-blue/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <a
              href="/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Courses</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Resources</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/live-classes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Live Classes</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-royal-blue dark:bg-neon-blue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-royal-blue text-royal-blue dark:border-neon-blue dark:text-neon-blue"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-royal-blue hover:bg-royal-blue/80 dark:bg-neon-blue dark:hover:bg-neon-blue/80 text-white dark:text-black font-medium py-2 transition-all">
                  <User size={16} className="mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
