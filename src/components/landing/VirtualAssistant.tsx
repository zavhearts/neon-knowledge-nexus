
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Mic, Volume2, MessageSquare, Globe, Lightbulb, BookOpen, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";

const VirtualAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?' }
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

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

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    // Simulate AI response (in a real app, this would call an AI API)
    setTimeout(() => {
      let response = '';
      
      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes('course')) {
        response = 'We offer many courses in various subjects. Would you like me to recommend some based on your interests?';
      } else if (message.toLowerCase().includes('exam') || message.toLowerCase().includes('test')) {
        response = 'Our platform offers AI-powered mock tests that adapt to your skill level. Would you like to try one?';
      } else if (message.toLowerCase().includes('language')) {
        response = 'We support multiple languages! You can change your preferred language from the language selector in the header.';
      } else {
        response = 'Thank you for your message. How else can I assist you with your learning journey?';
      }
      
      setChatHistory(prev => [...prev, { sender: 'bot', text: response }]);
    }, 1000);
    
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    // In a real implementation, this would trigger the browser's speech recognition API
    alert('Voice input feature coming soon!');
  };

  const handleTextToSpeech = () => {
    // Toggle speaking state for UI feedback
    setIsSpeaking(!isSpeaking);
    
    // In a real implementation, this would use the Web Speech API
    if (!isSpeaking) {
      // Simple demo of text-to-speech using browser's built-in speech synthesis
      if ('speechSynthesis' in window) {
        const latestBotMessage = [...chatHistory].reverse().find(msg => msg.sender === 'bot');
        if (latestBotMessage) {
          const utterance = new SpeechSynthesisUtterance(latestBotMessage.text);
          window.speechSynthesis.speak(utterance);
        }
      } else {
        alert('Text-to-speech is not supported in this browser.');
      }
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleQuickAction = (action: string) => {
    let actionMessage = '';
    
    switch(action) {
      case 'explain':
        actionMessage = 'Can you explain this topic in more detail?';
        break;
      case 'example':
        actionMessage = 'Can you give me an example?';
        break;
      case 'translate':
        actionMessage = 'Can you translate this to another language?';
        break;
      default:
        actionMessage = 'I need help with this topic.';
    }
    
    setChatHistory([...chatHistory, { sender: 'user', text: actionMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'explain': 'I\'d be happy to explain this in more detail. What specific aspects are you finding challenging?',
        'example': 'Here\'s an example that might help illustrate this concept...',
        'translate': 'I can help translate content. Which language would you prefer?',
        'default': 'I\'m here to help! Please let me know what you need assistance with.'
      };
      
      setChatHistory(prev => [...prev, { 
        sender: 'bot', 
        text: responses[action as keyof typeof responses] || responses.default 
      }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 max-w-md w-full"
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
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={handleTextToSpeech}
                    className={`p-1.5 hover:bg-cyber-light rounded-full transition-colors ${isSpeaking ? 'bg-royal-blue/20' : ''}`}
                    aria-label="Text to speech"
                  >
                    <Volume2 className={`${isSpeaking ? 'text-royal-blue' : 'text-gray-400 hover:text-white'}`} size={16} />
                  </Button>
                  <Button 
                    onClick={() => setIsVisible(false)}
                    className="p-1.5 hover:bg-cyber-light rounded-full transition-colors"
                    aria-label="Close assistant"
                  >
                    <X className="text-gray-400 hover:text-white" size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-cyber-dark max-h-80 overflow-y-auto">
                <div className="space-y-4">
                  {chatHistory.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.sender === 'user' 
                            ? 'bg-royal-blue text-white ml-auto rounded-tr-none' 
                            : 'bg-cyber-light text-gray-200 mr-auto rounded-tl-none'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              
              <div className="p-2 bg-cyber-darker border-t border-neon-blue/30">
                <div className="flex flex-wrap gap-1 mb-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs py-1 h-7 bg-royal-blue/10 border-royal-blue/30 text-royal-blue hover:bg-royal-blue/20"
                    onClick={() => handleQuickAction('explain')}
                  >
                    <Lightbulb className="h-3 w-3 mr-1" />
                    Explain More
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs py-1 h-7 bg-royal-blue/10 border-royal-blue/30 text-royal-blue hover:bg-royal-blue/20"
                    onClick={() => handleQuickAction('example')}
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    Give Example
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs py-1 h-7 bg-royal-blue/10 border-royal-blue/30 text-royal-blue hover:bg-royal-blue/20"
                    onClick={() => handleQuickAction('translate')}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    Translate
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-cyber-light rounded-full px-4 py-2 text-gray-200 text-sm flex items-center">
                    <input 
                      type="text" 
                      placeholder="Type your question..." 
                      className="bg-transparent outline-none w-full"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <Button 
                    onClick={handleVoiceInput}
                    className="p-2 rounded-full bg-royal-blue/10 text-royal-blue hover:bg-royal-blue/20"
                    aria-label="Voice input"
                  >
                    <Mic size={18} />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-royal-blue text-white hover:bg-royal-blue/80"
                    aria-label="Send message"
                    disabled={!message.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Collapsed chat bubble */}
          {!isVisible && (
            <motion.button
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-royal-blue text-white shadow-neon-glow flex items-center justify-center"
              onClick={() => setIsVisible(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageSquare size={24} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VirtualAssistant;
