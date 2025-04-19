
import React from 'react';
import { Helmet } from "react-helmet";
import QuizContainer from '@/components/quiz/QuizContainer';
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
            <h1 className="text-3xl font-bold mb-6 text-center">Interactive MCQ Quiz</h1>
            <QuizContainer />
          </div>
        </div>
      </MainLayout>
    </ThemeProvider>
  );
};

export default Quiz;
