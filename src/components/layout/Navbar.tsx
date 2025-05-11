
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User, Sun, Moon } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTheme } from "@/components/theme/theme-provider";
import { motion } from "framer-motion";

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
  
  // Nav link with advanced hover effects
  const NavLink = ({ to, children, external = false }) => {
    const LinkComponent = external ? ExternalLink : Link;
    
    return (
      <LinkComponent
        to={to}
        className="text-dark-blue dark:text-white relative group px-4 py-2 transition-colors duration-300"
      >
        <span className="relative z-10 font-medium">{children}</span>
        {/* Blue glowing underline that appears on hover */}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></span>
        {/* Background highlight effect */}
        <span className="absolute -inset-1 -skew-x-12 bg-royal-blue/10 dark:bg-neon-blue/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-sm -z-10"></span>
        {/* Subtle pulse animation on hover */}
        <span className="absolute -inset-3 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10">
          <span className="absolute inset-0 rounded-md bg-gradient-to-r from-royal-blue/0 via-royal-blue/10 dark:from-neon-blue/0 dark:via-neon-blue/20 to-royal-blue/0 dark:to-neon-blue/0 animate-pulse-glow"></span>
        </span>
      </LinkComponent>
    );
  };

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
          <motion.img 
            src="/lovable-uploads/6db8a32c-58a8-4d1e-9c82-e1c9efa2a040.png" 
            alt="Easy Win Learning Hub" 
            className="h-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {/* Parallelogram navigation with sci-fi effects */}
          <motion.div 
            className="relative px-2 py-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Parallelogram background with glow effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-royal-blue/5 to-teal/5 dark:from-neon-blue/10 dark:to-neon-cyan/10 rounded-md border border-royal-blue/20 dark:border-neon-blue/30 backdrop-blur-sm">
              {/* Animated scanner line */}
              <div className="absolute inset-0 overflow-hidden rounded-md">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-royal-blue/40 dark:via-neon-blue/60 to-transparent animate-scanner-line"></div>
              </div>
              
              {/* Animated glowing borders */}
              <div className="absolute inset-0 rounded-md opacity-50">
                <div className="absolute inset-0 rounded-md border border-royal-blue/0 dark:border-neon-blue/0 animate-pulse"></div>
              </div>
              
              {/* Circuit pattern background */}
              <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
            </div>
            
            {/* Navigation links */}
            <div className="flex items-center relative z-10">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/courses" external>Courses</NavLink>
              <NavLink to="/resources" external>Resources</NavLink>
              <NavLink to="/live-classes" external>Live Classes</NavLink>
              <NavLink to="/about-us" external>About Us</NavLink>
            </div>
          </motion.div>

          <div className="flex items-center gap-3 ml-4">
            <LanguageSwitcher />
            <motion.button 
              className="relative p-2 rounded-full bg-white dark:bg-cyber-darker border border-royal-blue/20 dark:border-neon-blue/30 text-royal-blue dark:text-neon-blue"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="relative z-10">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-royal-blue/10 to-teal/10 dark:from-neon-blue/20 dark:to-neon-cyan/20 opacity-0 hover:opacity-100 transition-opacity"></span>
            </motion.button>
            <Link to="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  className="border-royal-blue text-royal-blue dark:border-neon-blue dark:text-neon-blue hover:bg-royal-blue/10 dark:hover:bg-neon-blue/10 transition-all"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link to="/signup">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-royal-blue hover:bg-royal-blue/80 dark:bg-neon-blue dark:hover:bg-neon-blue/80 text-white dark:text-black font-medium text-sm px-4 py-1.5 rounded-md transition-all hover:shadow-neon-glow dark:hover:shadow-cyan-glow">
                  <User size={16} className="mr-2" />
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <motion.button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-white/80 dark:bg-cyber-darker/80 border border-royal-blue/20 dark:border-neon-blue/30"
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-neon-blue" /> : <Moon className="h-5 w-5 text-royal-blue" />}
          </motion.button>
          <motion.button
            className="text-dark-blue dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu with improved styling */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-dark-blue/95 backdrop-blur-md shadow-lg animate-fade-in">
          <motion.div 
            className="container mx-auto px-4 py-4 flex flex-col gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
            <a
              href="/courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Courses</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/resources"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Resources</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/live-classes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">Live Classes</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
            <a
              href="/about-us"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-blue dark:text-white hover:text-royal-blue dark:hover:text-neon-blue py-2 transition-colors relative overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
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
          </motion.div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
