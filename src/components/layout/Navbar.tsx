
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, User, BookOpen, Sun, Moon } from "lucide-react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
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
          <img 
            src="/lovable-uploads/6d0b63c4-3fcf-4756-8c97-c249e6e91073.png" 
            alt="Easy Win Learning Hub" 
            className="h-12"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-royal-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/courses"
            className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue transition-colors relative group"
          >
            Courses
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-royal-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/resources"
            target="_blank"
            className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue transition-colors relative group"
          >
            Resources
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-royal-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/live-classes"
            target="_blank"
            className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue transition-colors relative group"
          >
            Live Classes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-royal-blue transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link to="/login">
              <Button
                variant="outline"
                className="border-royal-blue text-royal-blue hover:bg-royal-blue/10"
              >
                <LogIn size={16} className="mr-2" />
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-royal-blue hover:bg-royal-blue/80 text-white font-medium text-sm px-4 py-1.5 rounded-md transition-all">
                <User size={16} className="mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleDarkMode}
            className="rounded-full"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <button
            className="text-dark-blue dark:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-dark-blue/95 backdrop-blur-md shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/resources"
              target="_blank"
              className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/live-classes"
              target="_blank"
              className="text-dark-blue dark:text-gray-300 hover:text-royal-blue dark:hover:text-royal-blue py-2 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Live Classes
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="w-full border-royal-blue text-royal-blue"
                >
                  <LogIn size={16} className="mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-royal-blue hover:bg-royal-blue/80 text-white font-medium py-2 transition-all">
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
