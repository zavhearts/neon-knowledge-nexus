
import React from "react";
import { Button } from "@/components/ui/button";
import { Video, Calendar, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onUploadClick: (type: string) => void;
  onScheduleZoom?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onUploadClick, onScheduleZoom }) => {
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
              onClick={() => window.open("/upload-content?type=video", "_blank")}
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
            
            <Link to="/">
              <Button
                variant="outline"
                className="border-neon-green text-neon-green hover:bg-neon-green/10"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live Classes
              </Button>
            </Link>
            
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
