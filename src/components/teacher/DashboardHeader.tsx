
import React from "react";
import { Button } from "@/components/ui/button";
import { Video, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onUploadClick: (type: string) => void;
  onScheduleZoom?: () => void;
  onGoLive?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onUploadClick, onScheduleZoom, onGoLive }) => {
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
            {onGoLive && (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={onGoLive}
              >
                <Video className="h-4 w-4 mr-2" />
                Go Live Now
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
              onClick={() => onUploadClick("AddClass")}
            >
              <Video className="h-4 w-4 mr-2" />
              Add Class
            </Button>
            
            {onScheduleZoom && (
              <Button 
                variant="outline" 
                className="border-neon-purple text-neon-purple hover:bg-neon-purple/10"
                onClick={onScheduleZoom}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Zoom
              </Button>
            )}
            
            <Link to="/live-classes">
              <Button
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/10"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Classes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
