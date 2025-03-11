import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';

const VirtualAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const assistantTexts = [
    "Hello! I'm your AI learning assistant.",
    "Welcome to EasyWin Learning Hub!",
    "Empowering Learning, Inspiring Future",
    "How can I help you with your learning journey today?",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    setIsTyping(true);
    setDisplayText("");

    let currentText = assistantTexts[currentTextIndex];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex < currentText.length) {
        setDisplayText((prev) => prev + currentText.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        if (currentTextIndex < assistantTexts.length - 1) {
          const nextTextTimer = setTimeout(() => {
            setCurrentTextIndex((prev) => prev + 1);
          }, 3000);
          
          return () => clearTimeout(nextTextTimer);
        }
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentTextIndex, isVisible]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-xs w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="relative rounded-xl shadow-neon-glow overflow-hidden">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-blue rounded-xl opacity-70 animate-pulse"></div>
            
            <div className="relative glassmorphic rounded-xl">
              <div className="bg-cyber-darker p-3 flex justify-between items-center border-b border-neon-blue/30">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cyber-light flex items-center justify-center mr-3 shadow-neon-glow">
                    <Bot className="text-neon-blue" size={18} />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">AI Assistant</h3>
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                      <span className="text-green-500 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="p-1.5 hover:bg-cyber-light rounded-full transition-colors"
                >
                  <X className="text-gray-400 hover:text-white" size={16} />
                </button>
              </div>
              
              <div className="p-4 bg-cyber-dark">
                <div className="min-h-[80px] flex items-center">
                  <p className="text-gray-300 text-sm">
                    {displayText}
                    {isTyping && (
                      <span className="inline-block h-3 w-0.5 bg-neon-blue ml-1 animate-pulse"></span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="p-3 bg-cyber-darker border-t border-neon-blue/30">
                <div className="bg-cyber-light rounded-full px-4 py-2 text-gray-400 text-sm flex items-center">
                  <span>Type your question...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualAssistant;
