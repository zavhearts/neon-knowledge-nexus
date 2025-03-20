
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRight, 
  AlertCircle, 
  BarChart3,
  BrainCircuit
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: "Which of the following is NOT a valid way to declare a variable in JavaScript?",
    options: ["let x = 5;", "const x = 5;", "var x = 5;", "variable x = 5;"],
    correct: 3,
    difficulty: 'easy',
    explanation: "JavaScript variables can be declared using 'let', 'const', or 'var', but 'variable' is not a valid keyword."
  },
  {
    id: 2,
    text: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
    correct: 1,
    difficulty: 'medium',
    explanation: "Binary search has a time complexity of O(log n) because it divides the search space in half with each step."
  },
  {
    id: 3,
    text: "Which design pattern is used when you need to ensure only one instance of a class exists?",
    options: ["Factory", "Singleton", "Observer", "Decorator"],
    correct: 1,
    difficulty: 'hard',
    explanation: "The Singleton pattern is used when you want to ensure a class has only one instance throughout the application."
  }
];

const SmartMockTest: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds per question
  const [showExplanation, setShowExplanation] = useState(false);
  const [userPerformance, setUserPerformance] = useState<{
    easy: number;
    medium: number;
    hard: number;
  }>({
    easy: 0,
    medium: 0,
    hard: 0
  });
  
  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult && !showExplanation) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, showExplanation]);
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    // Check if answer is correct and update score
    const currentQ = mockQuestions[currentQuestion];
    
    if (selectedOption === currentQ.correct) {
      setScore(score + 1);
      
      // Update performance based on difficulty
      setUserPerformance({
        ...userPerformance,
        [currentQ.difficulty]: userPerformance[currentQ.difficulty as keyof typeof userPerformance] + 1
      });
    }
    
    if (selectedOption !== null) {
      setShowExplanation(true);
    } else {
      // If time ran out, move to next question
      proceedToNextQuestion();
    }
  };
  
  const proceedToNextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimeLeft(60);
    } else {
      setShowResult(true);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getDifficultyColor = (difficulty: string): string => {
    switch(difficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'hard':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };
  
  const getDifficultyBg = (difficulty: string): string => {
    switch(difficulty) {
      case 'easy':
        return 'bg-green-100 dark:bg-green-900/20';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20';
      case 'hard':
        return 'bg-red-100 dark:bg-red-900/20';
      default:
        return 'bg-blue-100 dark:bg-blue-900/20';
    }
  };
  
  const calculatePerformancePercentage = (difficulty: keyof typeof userPerformance): number => {
    const questionsOfDifficulty = mockQuestions.filter(q => q.difficulty === difficulty).length;
    return questionsOfDifficulty > 0 
      ? (userPerformance[difficulty] / questionsOfDifficulty) * 100 
      : 0;
  };

  return (
    <div className="bg-white dark:bg-dark-blue/50 rounded-lg shadow-md p-6 max-w-3xl mx-auto">
      {!showResult ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-dark-blue dark:text-white">Smart Mock Test</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </p>
            </div>
            
            <div className="flex items-center">
              <div className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${
                getDifficultyBg(mockQuestions[currentQuestion].difficulty)
              } ${
                getDifficultyColor(mockQuestions[currentQuestion].difficulty)
              }`}>
                {mockQuestions[currentQuestion].difficulty.charAt(0).toUpperCase() + 
                 mockQuestions[currentQuestion].difficulty.slice(1)}
              </div>
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-gray-600 dark:text-gray-300" />
                <span className={`text-sm font-medium ${
                  timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          <Progress 
            value={(currentQuestion / mockQuestions.length) * 100}
            className="h-1.5 mb-6 bg-gray-200 dark:bg-dark-blue"
          />
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-dark-blue dark:text-white mb-4">
              {mockQuestions[currentQuestion].text}
            </h3>
            
            <div className="space-y-3">
              {mockQuestions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <button
                    className={`w-full text-left p-3 rounded-md border ${
                      selectedOption === index
                        ? 'border-royal-blue bg-royal-blue/10 text-royal-blue'
                        : 'border-gray-300 dark:border-gray-700 hover:border-royal-blue/50'
                    } ${
                      showExplanation && index === mockQuestions[currentQuestion].correct
                        ? 'border-green-500 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : showExplanation && selectedOption === index
                          ? 'border-red-500 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                          : ''
                    } transition-all duration-200`}
                    onClick={() => !showExplanation && handleOptionSelect(index)}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                        selectedOption === index
                          ? 'bg-royal-blue text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      } ${
                        showExplanation && index === mockQuestions[currentQuestion].correct
                          ? 'bg-green-500 text-white'
                          : showExplanation && selectedOption === index
                            ? 'bg-red-500 text-white'
                            : ''
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">{option}</span>
                      
                      {showExplanation && index === mockQuestions[currentQuestion].correct && (
                        <CheckCircle className="ml-auto h-5 w-5 text-green-500" />
                      )}
                      {showExplanation && selectedOption === index && index !== mockQuestions[currentQuestion].correct && (
                        <XCircle className="ml-auto h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-blue-50 dark:bg-royal-blue/10 border border-blue-200 dark:border-royal-blue/30 rounded-md"
              >
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-royal-blue mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-royal-blue mb-1">Explanation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {mockQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="flex justify-end">
            <Button
              onClick={showExplanation ? proceedToNextQuestion : handleNextQuestion}
              className="bg-royal-blue hover:bg-royal-blue/80 text-white"
              disabled={selectedOption === null && !showExplanation}
            >
              {showExplanation ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Submit Answer'
              )}
            </Button>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2, transition: { duration: 0.5 } }}
              className="w-16 h-16 mx-auto bg-royal-blue/10 rounded-full flex items-center justify-center mb-4"
            >
              <BrainCircuit className="h-8 w-8 text-royal-blue" />
            </motion.div>
            <h2 className="text-2xl font-bold text-dark-blue dark:text-white mb-2">
              Test Complete!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              You scored {score} out of {mockQuestions.length} ({Math.round((score / mockQuestions.length) * 100)}%)
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-dark-blue dark:text-white mb-4">
              Performance by Difficulty
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">Easy</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {userPerformance.easy} correct
                  </span>
                </div>
                <Progress value={calculatePerformancePercentage('easy')} className="h-2 bg-gray-200 dark:bg-dark-blue" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Medium</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {userPerformance.medium} correct
                  </span>
                </div>
                <Progress value={calculatePerformancePercentage('medium')} className="h-2 bg-gray-200 dark:bg-dark-blue" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">Hard</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {userPerformance.hard} correct
                  </span>
                </div>
                <Progress value={calculatePerformancePercentage('hard')} className="h-2 bg-gray-200 dark:bg-dark-blue" />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-royal-blue/10 border border-royal-blue/30 rounded-md mb-6">
            <h3 className="flex items-center text-lg font-medium text-royal-blue mb-2">
              <BarChart3 className="h-5 w-5 mr-2" />
              AI Recommendation
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              Based on your performance, we recommend focusing on:
            </p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
              {userPerformance.hard === 0 && (
                <li>Advanced concepts in programming patterns and algorithms</li>
              )}
              {userPerformance.medium < 1 && (
                <li>Intermediate topics like data structures and algorithm complexity</li>
              )}
              {score < mockQuestions.length / 2 && (
                <li>Reviewing basic programming fundamentals</li>
              )}
              {score >= mockQuestions.length / 2 && (
                <li>Continue practicing with more challenging questions</li>
              )}
            </ul>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="border-royal-blue text-royal-blue">
              View Detailed Analytics
            </Button>
            <Button className="bg-royal-blue hover:bg-royal-blue/80 text-white">
              Take Another Test
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartMockTest;
