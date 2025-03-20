
import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/teacher/DashboardHeader";
import StatsSection from "@/components/teacher/StatsSection";
import TabsContainer from "@/components/teacher/TabsContainer";
import ZoomMeetingForm from "@/components/teacher/ZoomMeetingForm";
import ZoomMeetingsList from "@/components/teacher/ZoomMeetingsList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomMeeting } from "@/services/zoomService";

interface UploadedFiles {
  video: File[];
  resource: File[];
}

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [searchTerm, setSearchTerm] = useState("");
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    video: [],
    resource: []
  });
  
  // Zoom meeting states
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [meetingsRefreshTrigger, setMeetingsRefreshTrigger] = useState(0);
  const [selectedMeeting, setSelectedMeeting] = useState<ZoomMeeting | null>(null);

  const handleUploadClick = (type: string) => {
    if (type === "Video" && videoFileInputRef.current) {
      videoFileInputRef.current.click();
    } else if (type === "Resource" && resourceFileInputRef.current) {
      resourceFileInputRef.current.click();
    } else if (type === "ZoomMeeting") {
      setShowMeetingForm(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const fileType = type.toLowerCase() as "video" | "resource";
      
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: [...prev[fileType], ...fileArray]
      }));
      
      toast({
        title: `${type} Uploaded Successfully`,
        description: `${fileArray.map(f => f.name).join(', ')} has been uploaded.`,
      });
    }
  };

  const handleAction = (action: string, id: number, type: string) => {
    toast({
      title: `${action} ${type} #${id}`,
      description: `${action} action performed on ${type.toLowerCase()} #${id}`,
    });
  };
  
  const handleMeetingSuccess = (meetingId: string) => {
    setShowMeetingForm(false);
    setMeetingsRefreshTrigger(prev => prev + 1);
    toast({
      title: "Meeting Scheduled",
      description: "Your Zoom meeting has been scheduled successfully.",
    });
  };
  
  const handleSelectMeeting = (meeting: ZoomMeeting) => {
    setSelectedMeeting(meeting);
  };
  
  const handleCloseMeetingDialog = () => {
    setSelectedMeeting(null);
  };

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern">
      <DashboardHeader 
        onUploadClick={handleUploadClick} 
        onScheduleZoom={() => setShowMeetingForm(true)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsSection 
          classCount={4 + uploadedFiles.video.length} 
          resourceCount={4 + uploadedFiles.resource.length} 
        />
        
        {activeTab === "classes" && (
          <div className="mb-8">
            <ZoomMeetingsList 
              onSelect={handleSelectMeeting}
              refreshTrigger={meetingsRefreshTrigger}
            />
          </div>
        )}
        
        <TabsContainer 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleUploadClick={handleUploadClick}
          handleFileChange={handleFileChange}
          handleAction={handleAction}
          videoFileInputRef={videoFileInputRef}
          resourceFileInputRef={resourceFileInputRef}
          uploadedFiles={uploadedFiles}
        />
      </div>
      
      {/* Zoom Meeting Creation Dialog */}
      <Dialog open={showMeetingForm} onOpenChange={setShowMeetingForm}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-2xl">
          <ZoomMeetingForm 
            onSuccess={handleMeetingSuccess}
            onCancel={() => setShowMeetingForm(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Meeting Details Dialog */}
      <Dialog open={!!selectedMeeting} onOpenChange={handleCloseMeetingDialog}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50">
          {selectedMeeting && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold animated-text">{selectedMeeting.topic}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-white/70">Date & Time</p>
                  <p>{format(parseISO(selectedMeeting.start_time), "PPP p")}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-white/70">Duration</p>
                  <p>{selectedMeeting.duration} minutes</p>
                </div>
                
                <div className="space-y-1 col-span-2">
                  <p className="text-sm text-white/70">Join URL</p>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={selectedMeeting.join_url} 
                      readOnly
                      className="bg-cyber-dark border border-neon-blue/30 rounded p-2 flex-1"
                    />
                    <Button 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(selectedMeeting.join_url)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                {selectedMeeting.password && (
                  <div className="space-y-1">
                    <p className="text-sm text-white/70">Password</p>
                    <p>{selectedMeeting.password}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={handleCloseMeetingDialog}
                >
                  Close
                </Button>
                <Button 
                  className="cyber-button"
                  onClick={() => window.open(selectedMeeting.join_url, '_blank')}
                >
                  Join Meeting
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
