
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Check, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const QuizContent = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Sample question
  const question: Question = {
    id: 1,
    text: "What is the primary purpose of React's useEffect hook?",
    options: [
      "To handle side effects in functional components",
      "To create new React components",
      "To style React components",
      "To define component props"
    ],
    correctAnswer: 0
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === question.correctAnswer) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-lg text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏆 {score} XP
          </motion.div>
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            <span>{timeLeft}s</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Streak:</span>
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded text-white"
            animate={{ scale: streak > 0 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.3 }}
          >
            {streak} 🔥
          </motion.div>
        </div>
      </div>

      <Card className="p-6 backdrop-blur-sm bg-white/50 dark:bg-dark-card/50 border border-cyan-500/20">
        <h3 className="text-xl font-bold mb-6">{question.text}</h3>
        <div className="space-y-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-4 text-left rounded-lg transition-all ${
                selectedOption === index
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/50 dark:bg-dark-card hover:bg-cyan-500/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(index)}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <Button
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90"
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          <Check className="mr-2 h-4 w-4" /> Submit Answer
        </Button>
      </Card>

      <Progress value={70} className="mt-6" />
    </div>
  );
};

export default QuizContent;
