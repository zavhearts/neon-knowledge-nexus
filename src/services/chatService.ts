
import { db, functions, httpsCallable } from '../config/firebase';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';

// Update the type definition to be more strict
export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: Date;
}

interface AIResponse {
  text: string;
}

// Service for handling chat functionality
export const chatService = {
  // Send message to AI and get response
  sendMessageToAI: async (message: string, chatHistory: ChatMessage[]): Promise<string> => {
    try {
      // Get API key from localStorage
      const apiKey = localStorage.getItem('vedagenie-api-key');
      
      if (!apiKey) {
        return "Please provide an API key in the configuration section on the home page to enable AI responses.";
      }
      
      // Format chat history for the AI API
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      
      // Call the Cloud Function
      const generateAIResponse = httpsCallable<
        { message: string; chatHistory: any[]; apiKey: string },
        AIResponse
      >(functions, 'generateAIResponse');
      
      // Get response from AI
      const result = await generateAIResponse({
        message,
        chatHistory: formattedHistory,
        apiKey
      });
      
      return result.data.text;
    } catch (error) {
      console.error('Error sending message to AI:', error);
      throw new Error('Failed to get response from AI');
    }
  },
  
  // Save chat message to Firestore (for logged in users)
  saveMessage: async (userId: string | null, message: ChatMessage): Promise<void> => {
    if (!userId) return; // Don't save if no user is logged in
    
    try {
      await addDoc(collection(db, 'messages'), {
        userId,
        sender: message.sender,
        text: message.text,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  },
  
  // Get chat history for a user
  getUserChatHistory: async (userId: string): Promise<ChatMessage[]> => {
    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('userId', '==', userId),
        orderBy('timestamp', 'asc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          sender: data.sender,
          text: data.text,
          timestamp: data.timestamp?.toDate()
        } as ChatMessage;
      });
    } catch (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
  },
  
  // Generate fallback response when AI is unavailable
  generateFallbackResponse: (userMessage: string): string => {
    const apiKey = localStorage.getItem('vedagenie-api-key');
    
    if (!apiKey) {
      return "Please provide an API key in the configuration section on the home page to enable AI responses.";
    }
    
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
  }
};
