
import React from 'react';
import { Helmet } from "react-helmet";
import MainLayout from '@/components/layout/MainLayout';
import { ThemeProvider } from "@/components/theme/theme-provider";

const Quiz = () => {
  return (
    <ThemeProvider>
      <MainLayout>
        <Helmet>
          <title>AI Quiz | Easy Win</title>
        </Helmet>
        <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center p-8">
              <h1 className="text-3xl font-bold mb-4">Quiz Feature Coming Soon</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We're currently developing this feature. Check back later for interactive quizzes!
              </p>
            </div>
          </div>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
};

export default Quiz;
