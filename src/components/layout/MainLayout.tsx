
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  FileText,
  Home,
  Menu,
  Video,
  X,
  User,
  LogIn,
  ChevronDown,
  Graduation,
  Search
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Live Classes", href: "/live-classes", icon: Video },
    { name: "Resources", href: "/resources", icon: FileText },
    { name: "Dashboard", href: "/dashboard", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern flex flex-col">
      {/* Header */}
      <header className="glassmorphic border-b border-neon-blue/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold animated-text">Easy Win</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-2 rounded-md flex items-center space-x-1 transition-colors ${
                      isActive(link.href) 
                        ? "text-black bg-neon-blue" 
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button className="bg-neon-blue text-black hover:bg-neon-blue/80">
                <User className="h-4 w-4 mr-2" />
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                className="text-white" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphic border-b border-neon-blue/20 absolute w-full z-40">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md flex items-center space-x-2 ${
                    isActive(link.href) 
                      ? "text-black bg-neon-blue" 
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-4 pb-3 border-t border-white/10">
              <div className="flex items-center px-5">
                <Button variant="outline" className="w-full border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </div>
              <div className="mt-3 px-5">
                <Button className="w-full bg-neon-blue text-black hover:bg-neon-blue/80">
                  <User className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-cyber-darker border-t border-neon-blue/20 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link to="/" className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold animated-text">Easy Win</span>
              </Link>
              <p className="text-white/70 mb-4">
                The futuristic e-learning platform designed to enhance your educational experience.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.0367 0H1.96334C0.878492 0 0 0.878492 0 1.96334V22.0367C0 23.1215 0.878492 24 1.96334 24H12.8016V14.7188H9.68262V11.0844H12.8016V8.41565C12.8016 5.31315 14.7109 3.62392 17.4857 3.62392C18.8057 3.62392 19.9409 3.72391 20.2729 3.76941V7.05711L18.3536 7.05765C16.8473 7.05765 16.5586 7.77191 16.5586 8.81889V11.0844H20.1465L19.6783 14.7188H16.5586V24H22.0367C23.1215 24 24 23.1215 24 22.0367V1.96334C24 0.878492 23.1215 0 22.0367 0Z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
                <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-white/70 hover:text-neon-blue transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white/70 hover:text-neon-blue transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
              <p className="text-white/70 mb-4">
                Stay updated with the latest courses and features.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-cyber-light/30 border border-neon-blue/50 rounded-l px-4 py-2 text-white placeholder:text-white/50 flex-grow"
                />
                <Button className="bg-neon-blue text-black hover:bg-neon-blue/80 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} Easy Win Learning Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
