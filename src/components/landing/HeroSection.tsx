
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SimpleChatbot from "@/components/common/SimpleChatbot";
import { useViewport } from "@/hooks/use-viewport";
import { ResponsiveImage } from "@/components/ui/responsive-image";

// Custom hook for typing animation with reduced speed
const useTypingAnimation = (text: string, speed: number = 130) => { // Increased from 100 to 130ms
  const [displayText, setDisplayText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Reset state when text changes
    setDisplayText("");
    setIsTypingComplete(false);
    
    let i = 0;
    console.log("Starting typing animation with text:", text);
    const timer = setInterval(() => {
      if (i < text.length) {
        const nextChar = text.charAt(i);
        console.log(`Adding character at index ${i}:`, nextChar);
        setDisplayText((prev) => prev + nextChar);
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

// AnimatedText component with slower animations
const AnimatedText = ({ text }: { text: string }) => {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }} // Increased duration from 0.5 to 0.8, delay from 0.2 to 0.3
    >
      {text}
    </motion.span>
  );
};

const HeroSection = () => {
  // Slower typing speed
  const { displayText, isTypingComplete } = useTypingAnimation(
    "Empowering Learning Inspiring Future",
    120 // Increased from 80 to 120ms
  );
  const [showAlert, setShowAlert] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const { isMobile, isTablet } = useViewport();

  // Adjust animations based on device - more significant slowdown
  const heroImageVariants = {
    hidden: { opacity: 0, scale: 0.9 }, // Changed from 0.8 to 0.9 for subtler entry
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: isMobile ? 0.8 : 1.2, // Increased from 0.5/0.7 to 0.8/1.2
        delay: isMobile ? 0.3 : 0.5, // Increased from 0.2/0.3 to 0.3/0.5
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-dark">
      {/* Notification Alert - Adjusted for better mobile display */}
      {showAlert && (
        <motion.div 
          className="absolute top-4 left-0 right-0 z-20 mx-auto max-w-2xl px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} // Increased from 0.5 to 0.8
        >
          <Alert className="border border-neon-cyan-30 bg-cyber-light/30 backdrop-blur-sm">
            <Bell className="h-4 w-4 text-neon-blue" />
            <AlertTitle className="text-white font-medium text-sm sm:text-base">New Resources Available!</AlertTitle>
            <AlertDescription className="text-gray-300 text-xs sm:text-sm">
              Income Tax Notes have been added to our resources section. 
              <Link to="/resources" className="ml-2 text-neon-blue hover:text-neon-blue/80 underline">
                View Now
              </Link>
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-1 right-1 text-white/70 hover:text-white h-6 w-6 p-0" 
              onClick={() => setShowAlert(false)}
            >
              ×
            </Button>
          </Alert>
        </motion.div>
      )}
      
      {/* Background circuit animation - further optimized and slowed down */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 animate-circuit-animation-slow"></div>
      
      {/* Glowing orb effects - Adjusted for mobile with reduced intensity */}
      <div className="absolute top-1/4 left-1/4 w-32 sm:w-56 h-32 sm:h-56 bg-gradient-radial from-neon-blue/15 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 sm:w-64 h-40 sm:h-64 bg-gradient-radial from-neon-purple/15 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 pt-20 sm:pt-28 pb-12 sm:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <div className="text-center lg:text-left">
            <motion.div 
              className="inline-block mb-4 px-3 py-1 rounded-full border border-neon-cyan-30 bg-cyber-light/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }} // Increased from 0.5 to 0.8
            >
              <span className="text-neon-blue text-xs sm:text-sm font-medium">The Future of Learning</span>
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
              <AnimatedText text="Welcome to " />
              <br />
              <span className="animated-text">EasyWin Learning Hub</span>
            </h1>
            
            <div className="h-8 sm:h-12 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light">
                {displayText}
                <span className={`inline-block h-5 w-0.5 bg-neon-blue ml-1 ${isTypingComplete ? 'animate-pulse' : ''}`}></span>
              </h2>
            </div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }} // Increased from 0.5/0.8 to 0.8/1.2
            >
              <Link to="/signup">
                <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-md transition-all animate-pulse-glow hover:animate-none hover:shadow-neon-glow w-full sm:w-auto mb-3 sm:mb-0">
                  Get Started
                  <ChevronRight className="ml-2" size={isMobile ? 16 : 20} />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="cyber-button px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg rounded-md w-full sm:w-auto">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>

            {/* Toggle Chatbot Button - Better mobile positioning */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }} // Increased from 0.5/1 to 0.8/1.5
            >
              <Button 
                onClick={() => setShowChatbot(!showChatbot)} 
                variant="outline"
                className="border-neon-cyan-30 text-neon-blue hover:bg-neon-blue/10 w-full sm:w-auto"
              >
                {showChatbot ? "Hide Assistant" : "Ask AI Assistant"}
              </Button>
            </motion.div>

            {/* Show Chatbot when toggled */}
            {showChatbot && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} // Increased from 0.5 to 0.8
              >
                <SimpleChatbot />
              </motion.div>
            )}

            {/* Latest Live Class Information - Mobile optimized with less animation intensity */}
            <motion.div
              className="mt-6 sm:mt-8 p-3 sm:p-4 border border-neon-cyan-30 rounded-lg bg-cyber-darker/60 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }} // Increased from 0.5/1 to 0.8/1.4
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-neon-green rounded-full animate-pulse"></div>
                <h3 className="text-white font-medium text-sm sm:text-base">Latest Live Class</h3>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1">
                  <p className="text-neon-blue font-medium text-sm sm:text-base">Income Tax Fundamentals</p>
                  <p className="text-xs sm:text-sm text-gray-300">Friday, June 14, 2024</p>
                  <p className="text-xs sm:text-sm text-gray-300">7:00 PM (120 minutes)</p>
                </div>
                <Link to="/live-classes">
                  <Button size="sm" className="bg-neon-green hover:bg-neon-green/80 text-black text-xs sm:text-sm w-full sm:w-auto">
                    Join Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="relative"
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative mx-auto max-w-md">
              {/* Holographic frame effect with reduced intensity */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-60 blur-md animate-pulse-glow"></div>
              
              <div className="glassmorphic rounded-2xl p-1 relative">
                <div className="bg-cyber-darker rounded-xl overflow-hidden">
                  {/* Using ResponsiveImage component for better loading */}
                  <ResponsiveImage 
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                    alt="Futuristic Learning"
                    className="w-full h-auto rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                    aspectRatio={4/3}
                    loadingBehavior="eager"
                  />
                  
                  {/* Floating elements with slower animation - Adjusted for mobile */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 sm:p-3 glassmorphic rounded-full shadow-neon-glow animate-float">
                    <BookOpen className="text-neon-blue" size={isMobile ? 16 : 24} />
                  </div>
                  
                  <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 glassmorphic rounded-lg">
                    <div className="flex items-center gap-2 mb-1 sm:mb-2">
                      <BookOpen className="text-neon-purple" size={isMobile ? 12 : 16} />
                      <span className="text-white text-xs font-medium">New Income Tax Resources</span>
                    </div>
                    <p className="text-white text-xs sm:text-sm">
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
