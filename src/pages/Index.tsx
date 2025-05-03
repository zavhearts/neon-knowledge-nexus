
import React from 'react';
import { Helmet } from "react-helmet";
import MainLayout from '@/components/layout/MainLayout';
import HeroComponent from '@/components/landing/HeroComponent';

const Index = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Easy Win | Learning Made Easy</title>
      </Helmet>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {/* API Key Configuration Section */}
        <div className="mb-8 p-6 bg-white dark:bg-dark-card/50 rounded-lg shadow-md border border-cyan-500/20">
          <h2 className="text-2xl font-bold mb-4">Chatbot Configuration</h2>
          <p className="mb-4">Enter your API key to enable the VedaGenie AI assistant:</p>
          <div className="flex gap-2">
            <input 
              type="password" 
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your API key here" 
              id="chatbot-api-key"
            />
            <button 
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-md hover:opacity-90"
              onClick={() => {
                const apiKey = (document.getElementById('chatbot-api-key') as HTMLInputElement).value;
                localStorage.setItem('vedagenie-api-key', apiKey);
                alert('API key saved! Refresh the page to activate the chatbot.');
              }}
            >
              Save Key
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Your API key is stored locally in your browser and never sent to our servers.
          </p>
        </div>
      </div>
      
      <HeroComponent />
    </MainLayout>
  );
};

export default Index;
