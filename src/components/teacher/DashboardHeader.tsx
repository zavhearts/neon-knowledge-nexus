
import React from "react";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

interface DashboardHeaderProps {
  onUploadClick: (type: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onUploadClick }) => {
  return (
    <div className="relative holographic-bg py-8 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold animated-text">Teacher Dashboard</h1>
            <p className="text-white/70">Manage your classes, resources, and students</p>
          </div>
          
          <div className="mt-4 md:mt-0 space-x-2">
            <Button 
              variant="outline" 
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
              onClick={() => onUploadClick("Video")}
            >
              <Video className="h-4 w-4 mr-2" />
              Add Class
            </Button>
            
            <Button
              className="cyber-button"
              onClick={() => window.location.href = "/"}
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
