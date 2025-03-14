
import React from "react";
import { Card } from "@/components/ui/card";
import { Video, FileText, Users, Calendar } from "lucide-react";

interface StatsCardProps {
  icon: "video" | "users" | "resource" | "calendar";
  count: number;
  label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, count, label }) => {
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
    switch (icon) {
      case "video":
        return "bg-neon-blue/20";
      case "users":
        return "bg-neon-purple/20";
      case "resource":
        return "bg-neon-green/20";
      case "calendar":
        return "bg-neon-pink/20";
      default:
        return "bg-neon-blue/20";
    }
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex items-center">
        <div className={`p-3 ${getBgClass()} rounded-full mr-4`}>
          {getIconComponent()}
        </div>
        <div>
          <div className="text-3xl font-bold">{count}</div>
          <div className="text-sm text-white/70">{label}</div>
        </div>
      </div>
    </Card>
  );
};

export default StatsCard;
