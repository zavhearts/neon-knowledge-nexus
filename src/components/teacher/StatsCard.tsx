
import React from "react";
import { Card } from "@/components/ui/card";
import { Video, FileText, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/components/theme/theme-provider";

interface StatsCardProps {
  icon: "video" | "users" | "resource" | "calendar";
  count: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, count, label }) => {
  const { theme } = useTheme();
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const getIconComponent = () => {
    switch (icon) {
      case "video":
        return <Video className="h-6 w-6 text-neon-blue" />;
      case "users":
        return <Users className="h-6 w-6 text-neon-purple" />;
      case "resource":
        return <FileText className="h-6 w-6 text-neon-green" />;
      case "calendar":
        return <Calendar className="h-6 w-6 text-neon-pink" />;
      default:
        return <Video className="h-6 w-6 text-neon-blue" />;
    }
  };

  const getBgClass = () => {
    const isDark = theme === "dark";
    
    switch (icon) {
      case "video":
        return `${isDark ? "bg-neon-blue/10" : "bg-blue-50"} border-l-4 border-neon-blue`;
      case "users":
        return `${isDark ? "bg-neon-purple/10" : "bg-purple-50"} border-l-4 border-neon-purple`;
      case "resource":
        return `${isDark ? "bg-neon-green/10" : "bg-green-50"} border-l-4 border-neon-green`;
      case "calendar":
        return `${isDark ? "bg-neon-pink/10" : "bg-pink-50"} border-l-4 border-neon-pink`;
      default:
        return `${isDark ? "bg-neon-blue/10" : "bg-blue-50"} border-l-4 border-neon-blue`;
    }
  };

  const counterAnimation = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  return (
    <motion.div variants={item}>
      <Card 
        className={`cyber-card hover:shadow-lg transition-all ${getBgClass()} 
          overflow-hidden backdrop-blur-sm`}
      >
        <div className="flex items-center p-4">
          <div className="p-3 rounded-full mr-4 glass-effect">
            {getIconComponent()}
          </div>
          <div>
            <motion.div 
              className="text-2xl font-bold"
              variants={counterAnimation}
              initial="hidden"
              animate="show"
            >
              {count}
            </motion.div>
            <div className="text-sm text-white/70 dark:text-white/70 light:text-gray-600">{label}</div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;
