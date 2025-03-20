
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Award, Medal } from 'lucide-react';
import { motion } from 'framer-motion';

interface GamificationBarProps {
  xp: number;
  level: number;
  xpToNextLevel: number;
  totalXp: number;
  badges: {
    id: string;
    name: string;
    icon: 'trophy' | 'star' | 'award' | 'medal';
    achieved: boolean;
    description: string;
  }[];
}

const GamificationBar: React.FC<GamificationBarProps> = ({ 
  xp, 
  level, 
  xpToNextLevel, 
  totalXp,
  badges 
}) => {
  const progressPercentage = (xp / xpToNextLevel) * 100;
  
  const getBadgeIcon = (iconName: string) => {
    switch(iconName) {
      case 'trophy':
        return <Trophy className="h-5 w-5 text-gold" />;
      case 'star':
        return <Star className="h-5 w-5 text-gold" />;
      case 'award':
        return <Award className="h-5 w-5 text-teal" />;
      case 'medal':
        return <Medal className="h-5 w-5 text-royal-blue" />;
      default:
        return <Star className="h-5 w-5 text-gold" />;
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-dark-blue/50 rounded-lg shadow-md">
      <div className="flex flex-wrap items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <div className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                className="rounded-full bg-royal-blue/10 w-10 h-10 flex items-center justify-center mr-3"
              >
                <Trophy className="h-5 w-5 text-royal-blue" />
              </motion.div>
              <div>
                <h3 className="text-lg font-bold text-dark-blue dark:text-white">Level {level}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">XP: {xp}/{xpToNextLevel}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-300">Total XP: {totalXp}</p>
          <p className="text-xs text-royal-blue">{Math.floor(progressPercentage)}% to Level {level + 1}</p>
        </div>
      </div>

      <Progress value={progressPercentage} className="h-2.5 bg-gray-200 dark:bg-dark-blue" />

      <div className="mt-4">
        <h4 className="text-sm font-medium text-dark-blue dark:text-gray-300 mb-2">Earned Badges</h4>
        <div className="flex flex-wrap gap-2">
          {badges.map((badge) => (
            <motion.div 
              key={badge.id}
              whileHover={{ scale: 1.1 }}
              className={`relative rounded-md p-2 ${
                badge.achieved 
                  ? 'bg-royal-blue/10 border border-royal-blue/30' 
                  : 'bg-gray-200/50 dark:bg-dark-blue/30 border border-gray-300/30 dark:border-gray-700/30'
              }`}
              title={badge.description}
            >
              <div className={`${!badge.achieved && 'opacity-50 grayscale'}`}>
                {getBadgeIcon(badge.icon)}
              </div>
              {badge.achieved && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white dark:border-dark-blue"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, delay: 0.2 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationBar;
