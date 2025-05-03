
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Mic, Volume2, MessageSquare, Globe, Lightbulb, BookOpen, Send, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const VirtualAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hai! I\'m VedaGenie, your AI learning assistant. How can I help with your studies today?' }
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const assistantTexts = [
    "Hai! I'm VedaGenie, your AI learning assistant.",
    "Welcome to the world of ancient wisdom and modern learning!",
    "Empowering Learning with the Wisdom of the Ages",
    "How can I assist on your path to knowledge today?",
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

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    setIsLoading(true);
    
    const userMsg = message;
    setMessage('');
    
    try {
      const response = await fetchAIResponse(userMsg);
      setChatHistory(prev => [...prev, { sender: 'bot', text: response }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      
      toast({
        title: "Connection Error",
        description: "Could not connect to AI service. Using fallback responses.",
        variant: "destructive"
      });
      
      let fallbackResponse = generateFallbackResponse(userMsg);
      setChatHistory(prev => [...prev, { sender: 'bot', text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userMessage: string) => {
    const lowerCaseMsg = userMessage.toLowerCase();
    
    if (lowerCaseMsg.includes('course')) {
      return 'We offer many courses in various subjects. Would you like me to recommend some based on your interests?';
    } else if (lowerCaseMsg.includes('exam') || lowerCaseMsg.includes('test')) {
      return 'Our platform offers AI-powered mock tests that adapt to your skill level. Would you like to try one?';
    } else if (lowerCaseMsg.includes('language')) {
      return 'We support multiple languages! You can change your preferred language from the language selector in the header.';
    } else if (lowerCaseMsg.includes('income tax')) {
      return 'We just added new income tax resources! You can find comprehensive notes on calculations, planning, and strategies in our resources section.';
    } else {
      return 'Thank you for your message. How else can I assist you with your learning journey?';
    }
  };

  const fetchAIResponse = async (userMessage: string) => {
    // Simple fallback responses without requiring API key
    const context = chatHistory
      .slice(-5)
      .map(msg => `${msg.sender === 'user' ? 'User' : 'VedaGenie'}: ${msg.text}`)
      .join('\n');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return generateFallbackResponse(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      toast({
        title: "Voice Recognition Started",
        description: "Please speak clearly...",
      });
      
      setTimeout(() => {
        toast({
          title: "Voice Recognition",
          description: "Voice recognition feature is coming soon!",
        });
      }, 2000);
    } else {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser.",
        variant: "destructive"
      });
    }
  };

  const handleTextToSpeech = () => {
    setIsSpeaking(!isSpeaking);
    
    if (!isSpeaking) {
      if ('speechSynthesis' in window) {
        const latestBotMessage = [...chatHistory].reverse().find(msg => msg.sender === 'bot');
        if (latestBotMessage) {
          const utterance = new SpeechSynthesisUtterance(latestBotMessage.text);
          window.speechSynthesis.speak(utterance);
        }
      } else {
        toast({
          title: "Not Supported",
          description: "Text-to-speech is not supported in this browser.",
          variant: "destructive"
        });
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
    setMessage('');
    
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`fixed z-50 ${isMobile ? 'bottom-2 right-2 left-2' : 'bottom-6 right-6'} ${isMobile ? 'max-w-full' : 'max-w-md w-full'}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative rounded-xl shadow-lg overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-mystic-blue via-neon-cyan to-electric-purple rounded-xl opacity-70 animate-pulse"></div>
              
              <div className="relative glassmorphic rounded-xl border border-neon-cyan/30">
                <div className="bg-mystic-blue p-3 flex justify-between items-center border-b border-neon-cyan/30">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center mr-3 shadow-md">
                      <Bot className="text-neon-cyan" size={18} />
                    </div>
                    <div>
                      <h3 className="text-white text-sm font-medium">VedaGenie</h3>
                      <div className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                        <span className="text-xs text-green-500">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={handleTextToSpeech}
                      className={`p-1.5 hover:bg-mystic-blue/50 rounded-full transition-colors ${isSpeaking ? 'bg-neon-cyan/20' : ''}`}
                      aria-label="Text to speech"
                    >
                      <Volume2 className={`${isSpeaking ? 'text-neon-cyan' : 'text-gray-400 hover:text-white'}`} size={16} />
                    </Button>
                    <Button 
                      onClick={() => setIsVisible(false)}
                      className="p-1.5 hover:bg-mystic-blue/50 rounded-full transition-colors"
                      aria-label="Close assistant"
                    >
                      <X className="text-gray-400 hover:text-white" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className={`p-4 bg-charcoal-black/90 ${isMobile ? 'max-h-60' : 'max-h-80'} overflow-y-auto`}>
                  <div className="space-y-4">
                    {chatHistory.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.sender === 'user' 
                              ? 'bg-mystic-blue text-white ml-auto rounded-tr-none' 
                              : 'bg-charcoal-black border border-neon-cyan/30 text-white mr-auto rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm break-words">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-charcoal-black border border-neon-cyan/30 text-white rounded-lg p-3 max-w-[80%] mr-auto rounded-tl-none">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-neon-cyan" />
                            <p className="text-sm">Thinking...</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messageEndRef} />
                  </div>
                </div>
                
                <div className="p-2 bg-mystic-blue border-t border-neon-cyan/30">
                  <div className={`flex flex-wrap gap-1 mb-2 ${isMobile ? 'justify-center' : ''}`}>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs py-1 h-7 bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20"
                      onClick={() => handleQuickAction('explain')}
                    >
                      <Lightbulb className="h-3 w-3 mr-1" />
                      Explain More
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs py-1 h-7 bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20"
                      onClick={() => handleQuickAction('example')}
                    >
                      <BookOpen className="h-3 w-3 mr-1" />
                      Give Example
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs py-1 h-7 bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/20"
                      onClick={() => handleQuickAction('translate')}
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      Translate
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-charcoal-black/80 rounded-lg px-4 py-2 text-white text-sm">
                      <Textarea 
                        placeholder="Ask VedaGenie a question..."
                        className="bg-transparent border-0 outline-none w-full min-h-[24px] max-h-[100px] p-0 resize-none text-sm"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                    <div className="flex-shrink-0 flex gap-2">
                      <Button 
                        onClick={handleVoiceInput}
                        className={`p-2 rounded-full bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 ${isMobile ? 'hidden' : ''}`}
                        aria-label="Voice input"
                      >
                        <Mic size={18} />
                      </Button>
                      <Button 
                        onClick={handleSendMessage}
                        className="p-2 rounded-full bg-neon-cyan text-charcoal-black hover:bg-neon-cyan/80"
                        aria-label="Send message"
                        disabled={!message.trim() || isLoading}
                      >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {!isVisible && (
          <motion.button
            className={`fixed ${isMobile ? 'bottom-4 right-4 w-12 h-12' : 'bottom-6 right-6 w-14 h-14'} rounded-full bg-mystic-blue text-neon-cyan shadow-lg flex items-center justify-center border border-neon-cyan/30 z-50`}
            onClick={() => setIsVisible(true)}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MessageSquare size={isMobile ? 20 : 24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default VirtualAssistant;
