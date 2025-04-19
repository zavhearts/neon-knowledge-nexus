
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuizContent from './QuizContent';
import QuizProgress from './QuizProgress';
import { Trophy, Clock, Star } from 'lucide-react';

const QuizContainer = () => {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-white/10 dark:bg-dark-card/50 p-1 rounded-lg">
          <TabsTrigger value="current" className="data-[state=active]:bg-primary">
            <Trophy className="h-4 w-4 mr-2" />
            Current Quiz
          </TabsTrigger>
          <TabsTrigger value="progress" className="data-[state=active]:bg-primary">
            <Star className="h-4 w-4 mr-2" />
            Progress
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-primary">
            <Clock className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="mt-6">
          <QuizContent />
        </TabsContent>

        <TabsContent value="progress" className="mt-6">
          <QuizProgress />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Quiz history will appear here
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuizContainer;
