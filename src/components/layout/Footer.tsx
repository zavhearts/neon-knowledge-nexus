
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cyber-darker relative overflow-hidden border-t border-neon-blue/20">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Easy<span className="text-neon-blue">Win</span></h3>
            <p className="text-gray-400 text-sm max-w-xs">
              A futuristic e-learning platform designed to provide immersive and 
              seamless educational experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Recorded Courses
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/live-classes" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Live Classes
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/mock-tests" className="text-gray-400 hover:text-neon-blue transition-colors text-sm">
                  Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contact Us</h4>
            <p className="text-gray-400 text-sm flex items-start">
              <Mail size={18} className="mr-2 mt-0.5 text-neon-blue" />
              support@easywin.learn
            </p>
            <div className="pt-2">
              <Link to="/contact">
                <button className="cyber-button text-sm px-4 py-1.5 rounded-md">
                  Send Message
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} EasyWin Learning Hub. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 hover:text-neon-blue text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-neon-blue text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
