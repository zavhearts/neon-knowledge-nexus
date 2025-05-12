
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SimpleChatbot = () => {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      // Using together.xyz API with the provided API key
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer sk_u9abTzZQY5gyIILiFBsbfAut9h7eNbDtTMI9YLhHfrA`,
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.2",
          messages: [
            {
              role: "system",
              content: "You are a helpful educational assistant that provides concise, accurate information to students. Your name is EasyWin Assistant."
            },
            ...messages,
            userMessage
          ],
          max_tokens: 1024,
          temperature: 0.7
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API returned status ${response.status}: ${errorText}`);
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", JSON.stringify(data, null, 2));

      if (data.choices && data.choices.length > 0 && data.choices[0].message) {
        const aiMessage = { role: "assistant", content: data.choices[0].message.content };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching AI response:", err);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glassmorphic rounded-xl overflow-hidden border border-neon-blue/30">
      <div className="bg-cyber-darker p-3 border-b border-neon-blue/30">
        <h2 className="text-white font-medium">EasyWin Assistant</h2>
      </div>
      
      <div className="bg-charcoal-black/90 p-4 h-64 overflow-y-auto">
        {messages.length === 0 && (
          <div className="text-gray-400 text-center italic">
            Ask me anything about your studies!
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`mb-3 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span 
              className={`inline-block p-2 rounded-lg ${
                msg.role === "user" 
                  ? "bg-mystic-blue text-white ml-auto rounded-tr-none" 
                  : "bg-charcoal-black border border-neon-blue/30 text-white mr-auto rounded-tl-none"
              } max-w-[80%]`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        
        {loading && (
          <div className="flex items-center gap-2 text-neon-blue">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>
      
      <div className="bg-mystic-blue p-3 flex items-center gap-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-charcoal-black/80 text-white border-neon-blue/30 focus-visible:ring-neon-blue/30"
          placeholder="Type your question..."
        />
        <Button 
          onClick={handleSend} 
          disabled={loading}
          className="bg-neon-blue hover:bg-neon-blue/80 text-black"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default SimpleChatbot;
