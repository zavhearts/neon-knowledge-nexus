
import React from 'react';
import { Helmet } from "react-helmet";
import QuizContainer from '@/components/quiz/QuizContainer';
import { ThemeProvider } from "@/components/theme/theme-provider";

const Quiz = () => {
  return (
    <ThemeProvider>
      <Helmet>
        <title>AI Quiz | Easy Win</title>
      </Helmet>
      <div className="min-h-screen bg-white dark:bg-dark-bg transition-colors duration-300">
        <QuizContainer />
      </div>
    </ThemeProvider>
  );
};

export default Quiz;
