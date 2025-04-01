
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Mic, Volume2, MessageSquare, Globe, Lightbulb, BookOpen, Send, Loader2, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define header type to avoid TypeScript errors
interface ApiHeaders {
  [key: string]: string;
}

const VirtualAssistant = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [message, setMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyDialogOpen, setApiKeyDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('ai_api_key') || "");
  const [apiProvider, setApiProvider] = useState(localStorage.getItem('ai_provider') || "openai");
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', text: 'Hello! I\'m your AI learning assistant. How can I help with your studies today?' }
  ]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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

  const saveApiKey = () => {
    localStorage.setItem('ai_api_key', apiKey);
    localStorage.setItem('ai_provider', apiProvider);
    setApiKeyDialogOpen(false);
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved securely in your browser.",
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setChatHistory([...chatHistory, { sender: 'user', text: message }]);
    
    setIsLoading(true);

    if (!apiKey) {
      setApiKeyDialogOpen(true);
      setIsLoading(false);
      return;
    }
    
    try {
      const context = chatHistory
        .slice(-5)
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n');
      
      const response = await fetchAIResponse(message, context, apiKey, apiProvider);
      
      setChatHistory(prev => [...prev, { sender: 'bot', text: response }]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      toast({
        title: "Connection Error",
        description: "Could not connect to AI service. Using fallback responses.",
        variant: "destructive"
      });
      
      let fallbackResponse = '';
      
      if (message.toLowerCase().includes('course')) {
        fallbackResponse = 'We offer many courses in various subjects. Would you like me to recommend some based on your interests?';
      } else if (message.toLowerCase().includes('exam') || message.toLowerCase().includes('test')) {
        fallbackResponse = 'Our platform offers AI-powered mock tests that adapt to your skill level. Would you like to try one?';
      } else if (message.toLowerCase().includes('language')) {
        fallbackResponse = 'We support multiple languages! You can change your preferred language from the language selector in the header.';
      } else if (message.toLowerCase().includes('income tax')) {
        fallbackResponse = 'We just added new income tax resources! You can find comprehensive notes on calculations, planning, and strategies in our resources section.';
      } else {
        fallbackResponse = 'Thank you for your message. How else can I assist you with your learning journey?';
      }
      
      setChatHistory(prev => [...prev, { sender: 'bot', text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  const fetchAIResponse = async (userMessage: string, context: string, key: string, provider: string) => {
    let API_URL = '';
    let requestBody = {};
    let headers: ApiHeaders = {
      "Content-Type": "application/json",
    };

    switch (provider) {
      case 'openai':
        API_URL = "https://api.openai.com/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        };
        requestBody = {
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI learning assistant for EasyWin Learning Hub, an educational platform. You help users with their educational needs, course information, and study resources. Be informative, friendly, and concise. Promote the platform's learning resources including newly added income tax notes."
            },
            {
              role: "user",
              content: `Previous conversation:\n${context}\n\nUser's new message: ${userMessage}`
            }
          ],
          max_tokens: 150
        };
        break;
      
      case 'anthropic':
        API_URL = "https://api.anthropic.com/v1/messages";
        headers = {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01"
        };
        requestBody = {
          model: "claude-2.1",
          messages: [
            {
              role: "user",
              content: `You are a helpful AI learning assistant for EasyWin Learning Hub, an educational platform. Help with this request based on previous conversation:\n${context}\n\nUser's new message: ${userMessage}`
            }
          ],
          max_tokens: 150
        };
        break;
      
      case 'groq':
        API_URL = "https://api.groq.com/openai/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        };
        requestBody = {
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI learning assistant for EasyWin Learning Hub, an educational platform. You help users with their educational needs, course information, and study resources. Be informative, friendly, and concise. Promote the platform's learning resources including newly added income tax notes."
            },
            {
              role: "user",
              content: `Previous conversation:\n${context}\n\nUser's new message: ${userMessage}`
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        };
        break;
      
      case 'xai':
        API_URL = "https://api.x.ai/v1/chat/completions";
        headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        };
        requestBody = {
          model: "grok-2-latest",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI learning assistant for EasyWin Learning Hub, an educational platform. You help users with their educational needs, course information, and study resources. Be informative, friendly, and concise. Promote the platform's learning resources including newly added income tax notes."
            },
            {
              role: "user",
              content: `Previous conversation:\n${context}\n\nUser's new message: ${userMessage}`
            }
          ],
          max_tokens: 150,
          temperature: 0.7,
          stream: false
        };
        break;
      
      default:
        API_URL = "https://api.communicateai.net/v1/chat/completions";
        requestBody = {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI learning assistant for EasyWin Learning Hub, an educational platform. You help users with their educational needs, course information, and study resources. Be informative, friendly, and concise. Promote the platform's learning resources including newly added income tax notes."
            },
            {
              role: "user",
              content: `Previous conversation:\n${context}\n\nUser's new message: ${userMessage}`
            }
          ],
          max_tokens: 150
        };
    }
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (provider === 'openai' || provider === 'groq' || provider === 'xai') {
        return data.choices[0].message.content.trim();
      } else if (provider === 'anthropic') {
        return data.content[0].text;
      } else {
        return data.choices[0].message.content.trim();
      }
    } catch (error) {
      console.error("Error calling AI API:", error);
      throw error;
    }
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

  const openApiSettings = () => {
    setApiKeyDialogOpen(true);
  };

  return (
    <>
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
                      onClick={openApiSettings}
                      className="p-1.5 hover:bg-cyber-light rounded-full transition-colors"
                      aria-label="API Settings"
                    >
                      <Lock className="text-gray-400 hover:text-white" size={16} />
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
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-cyber-light text-gray-200 rounded-lg p-3 max-w-[80%] mr-auto rounded-tl-none">
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-royal-blue" />
                            <p className="text-sm">Thinking...</p>
                          </div>
                        </div>
                      </div>
                    )}
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
                    <div className="flex-1 bg-cyber-light rounded-lg px-4 py-2 text-gray-200 text-sm">
                      <Textarea 
                        placeholder="Type your question..." 
                        className="bg-transparent border-0 outline-none w-full min-h-[24px] max-h-[100px] p-0 resize-none text-sm"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
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
                      disabled={!message.trim() || isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send size={18} />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
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

      <Dialog open={apiKeyDialogOpen} onOpenChange={setApiKeyDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-cyber-dark text-white border border-neon-blue/30">
          <DialogHeader>
            <DialogTitle className="text-royal-blue">Configure AI Provider</DialogTitle>
            <DialogDescription>
              Enter your API key to connect to your preferred AI service. Your key is stored locally in your browser.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                Provider
              </Label>
              <select 
                id="provider"
                className="col-span-3 bg-cyber-darker border border-neon-blue/30 rounded-md p-2"
                value={apiProvider}
                onChange={(e) => setApiProvider(e.target.value)}
              >
                <option value="openai">OpenAI (GPT-4o-mini)</option>
                <option value="anthropic">Anthropic (Claude)</option>
                <option value="groq">Groq (Llama 3)</option>
                <option value="xai">X.ai (Grok)</option>
                <option value="free">Free API (Limited)</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="api-key" className="text-right">
                API Key
              </Label>
              <Input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="col-span-3 bg-cyber-darker border border-neon-blue/30 text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={saveApiKey}
              className="bg-royal-blue hover:bg-royal-blue/80"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VirtualAssistant;
