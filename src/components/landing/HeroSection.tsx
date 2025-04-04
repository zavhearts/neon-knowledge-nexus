
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Rocket, Bell, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom hook for typing animation
const useTypingAnimation = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isTypingComplete };
};

// AnimatedText component
const AnimatedText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {text}
    </motion.span>
  );
};

const HeroSection = () => {
  const { displayText, isTypingComplete } = useTypingAnimation(
    "Empowering Learning, Inspiring Future",
    80
  );
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      {/* Notification Alert */}
      {showAlert && (
        <motion.div 
          className="absolute top-4 left-0 right-0 z-20 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert className="border border-neon-blue/50 bg-cyber-light/30 backdrop-blur-sm">
            <Bell className="h-4 w-4 text-neon-blue" />
            <AlertTitle className="text-white font-medium">New Resources Available!</AlertTitle>
            <AlertDescription className="text-gray-300">
              Income Tax Notes have been added to our resources section. 
              <Link to="/resources" className="ml-2 text-neon-blue hover:text-neon-blue/80 underline">
                View Now
              </Link>
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-1 right-1 text-white/70 hover:text-white" 
              onClick={() => setShowAlert(false)}
            >
              ×
            </Button>
          </Alert>
        </motion.div>
      )}
      
      {/* Background circuit animation */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 animate-circuit-animation"></div>
      
      {/* Glowing orb effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-neon-blue/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-neon-purple/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-28 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <motion.div 
              className="inline-block mb-4 px-4 py-1 rounded-full border border-neon-blue/50 bg-cyber-light/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-neon-blue text-sm font-medium">The Future of Learning</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              <AnimatedText text="Welcome to " />
              <br />
              <span className="animated-text">EasyWin Learning Hub</span>
            </h1>
            
            <div className="h-12 mb-8">
              <h2 className="text-xl md:text-2xl text-gray-300 font-light">
                {displayText}
                <span className={`inline-block h-5 w-0.5 bg-neon-blue ml-1 ${isTypingComplete ? 'animate-pulse' : ''}`}></span>
              </h2>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link to="/signup">
                <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black font-semibold px-8 py-6 text-lg rounded-md transition-all animate-pulse-glow hover:animate-none hover:shadow-neon-glow">
                  Get Started
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="cyber-button px-8 py-6 text-lg rounded-md">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Latest Live Class Information */}
            <motion.div
              className="mt-8 p-4 border border-neon-blue/30 rounded-lg bg-cyber-darker/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <h3 className="text-white font-medium">Latest Live Class</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <p className="text-neon-blue font-medium">Income Tax Fundamentals</p>
                  <p className="text-sm text-gray-300">Friday, June 14, 2024</p>
                  <p className="text-sm text-gray-300">7:00 PM (120 minutes)</p>
                </div>
                <Link to="/live-classes">
                  <Button size="sm" className="bg-neon-green hover:bg-neon-green/80 text-black">
                    Join Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Holographic frame effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-75 blur-md animate-pulse-glow"></div>
              
              <div className="glassmorphic rounded-2xl p-1 relative">
                <div className="bg-cyber-darker rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Futuristic Learning" 
                    className="w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6 p-3 glassmorphic rounded-full shadow-neon-glow animate-float">
                    <Rocket className="text-neon-blue" size={24} />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 max-w-[80%] p-4 glassmorphic rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="text-neon-purple" size={16} />
                      <span className="text-white text-xs font-medium">New Income Tax Resources</span>
                    </div>
                    <p className="text-white text-sm">
                      "Comprehensive notes on income tax calculations, planning, and strategies now available."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
