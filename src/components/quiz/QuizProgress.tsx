
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizProgress = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-cyan-500" />
            <div>
              <h4 className="font-semibold">Total XP</h4>
              <p className="text-2xl font-bold">1,240</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-purple-500" />
            <div>
              <h4 className="font-semibold">Quizzes Completed</h4>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-emerald-500" />
            <div>
              <h4 className="font-semibold">Accuracy</h4>
              <p className="text-2xl font-bold">87%</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Level Progress</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Level 5</span>
              <span>2,400 / 3,000 XP</span>
            </div>
            <Progress value={80} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizProgress;
