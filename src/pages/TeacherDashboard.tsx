import { useState, useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/teacher/DashboardHeader";
import StatsSection from "@/components/teacher/StatsSection";
import TabsContainer from "@/components/teacher/TabsContainer";
import ZoomMeetingForm from "@/components/teacher/ZoomMeetingForm";
import ZoomMeetingsList from "@/components/teacher/ZoomMeetingsList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomMeeting } from "@/services/zoomService";

const TAX_NOTES_PDFS = [
  { 
    id: 1001, 
    name: "6th Semester Income Tax Notes - Version 1",
    type: "PDF", 
    size: "5.8 MB",
    date: "2023-09-25", 
    downloads: 0,
    thumbnailUrl: "/lovable-uploads/067a49d5-8a1a-4b2e-899f-ca0ca9318f7f.png",
    downloadUrl: "https://drive.google.com/file/d/1aif8Mvb2Xmd-zWpUIPwcpCZOkwhtrt44/view?usp=sharing"
  },
  { 
    id: 1002, 
    name: "6th Semester Income Tax Notes - Version 2",
    type: "PDF", 
    size: "4.7 MB",
    date: "2023-09-22", 
    downloads: 0,
    thumbnailUrl: "/lovable-uploads/df63615b-38c3-4851-9a2e-cd9ca1a03df0.png",
    downloadUrl: "https://drive.google.com/file/d/1R8AI-pMEYUGXokdKL_SaxKmrPDrH-3ua/view?usp=sharing"
  },
  { 
    id: 1003, 
    name: "6th Semester Income Tax Notes - Version 3",
    type: "PDF", 
    size: "6.2 MB",
    date: "2023-09-20", 
    downloads: 0,
    thumbnailUrl: "/lovable-uploads/0895bf65-bed5-4685-82ff-8f07bedd103d.png",
    downloadUrl: "https://drive.google.com/file/d/1ejrsIX9czXyu01fdfQivonlQRIN2lRN3/view?usp=sharing"
  }
];

interface UploadedFiles {
  video: File[];
  resource: File[];
  videoThumbnail: File[];
  resourceThumbnail: File[];
}

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [searchTerm, setSearchTerm] = useState("");
  const videoFileInputRef = useRef<HTMLInputElement>(null);
  const resourceFileInputRef = useRef<HTMLInputElement>(null);
  const videoThumbnailInputRef = useRef<HTMLInputElement>(null);
  const resourceThumbnailInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles>({
    video: [],
    resource: [],
    videoThumbnail: [],
    resourceThumbnail: []
  });
  
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [meetingsRefreshTrigger, setMeetingsRefreshTrigger] = useState(0);
  const [selectedMeeting, setSelectedMeeting] = useState<ZoomMeeting | null>(null);
  
  const [taxNotesPdfs, setTaxNotesPdfs] = useState(TAX_NOTES_PDFS);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadType, setUploadType] = useState<"Video" | "Resource" | "">("");

  const handleUploadClick = (type: string) => {
    if (type === "Video") {
      setUploadType("Video");
      setShowUploadForm(true);
    } else if (type === "Resource") {
      setUploadType("Resource");
      setShowUploadForm(true);
    } else if (type === "VideoThumbnail" && videoThumbnailInputRef.current) {
      videoThumbnailInputRef.current.click();
    } else if (type === "ResourceThumbnail" && resourceThumbnailInputRef.current) {
      resourceThumbnailInputRef.current.click();
    } else if (type === "ZoomMeeting") {
      setShowMeetingForm(true);
    } else if (type === "AddClass") {
      window.open("/upload-content?type=video", "_blank");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      
      if (type === "Video") {
        setUploadedFiles(prev => ({
          ...prev,
          video: [...prev.video, ...fileArray]
        }));
        
        if (uploadedFiles.videoThumbnail.length < uploadedFiles.video.length + fileArray.length) {
          toast({
            title: `Video Uploaded Successfully`,
            description: `${fileArray.map(f => f.name).join(', ')} has been uploaded. Please add a thumbnail.`,
          });
          
          setTimeout(() => {
            if (videoThumbnailInputRef.current) {
              videoThumbnailInputRef.current.click();
            }
          }, 500);
        } else {
          toast({
            title: `Video Uploaded Successfully`,
            description: `${fileArray.map(f => f.name).join(', ')} has been uploaded.`,
          });
        }
      } else if (type === "Resource") {
        setUploadedFiles(prev => ({
          ...prev,
          resource: [...prev.resource, ...fileArray]
        }));
        
        if (uploadedFiles.resourceThumbnail.length < uploadedFiles.resource.length + fileArray.length) {
          toast({
            title: `Resource Uploaded Successfully`,
            description: `${fileArray.map(f => f.name).join(', ')} has been uploaded. Please add a thumbnail.`,
          });
          
          setTimeout(() => {
            if (resourceThumbnailInputRef.current) {
              resourceThumbnailInputRef.current.click();
            }
          }, 500);
        } else {
          toast({
            title: `Resource Uploaded Successfully`,
            description: `${fileArray.map(f => f.name).join(', ')} has been uploaded.`,
          });
        }
        
        if (fileArray.some(file => file.name.toLowerCase().endsWith('.pdf'))) {
          toast({
            title: "PDF Resource Available",
            description: "Students can now download this PDF from the Resources page",
          });
        }
      }
    }
  };
  
  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      
      if (type === "Video") {
        setUploadedFiles(prev => ({
          ...prev,
          videoThumbnail: [...prev.videoThumbnail, ...fileArray]
        }));
        toast({
          title: `Thumbnail Added`,
          description: `Thumbnail for your video has been added.`,
        });
      } else if (type === "Resource") {
        setUploadedFiles(prev => ({
          ...prev,
          resourceThumbnail: [...prev.resourceThumbnail, ...fileArray]
        }));
        toast({
          title: `Thumbnail Added`,
          description: `Thumbnail for your resource has been added.`,
        });
      }
    }
  };

  const handleAction = (action: string, id: number, type: string) => {
    const taxNote = taxNotesPdfs.find(pdf => pdf.id === id);
    
    if (taxNote && action === "Download") {
      window.open(taxNote.downloadUrl, "_blank");
      
      setTaxNotesPdfs(prevPdfs => 
        prevPdfs.map(pdf => 
          pdf.id === id ? { ...pdf, downloads: pdf.downloads + 1 } : pdf
        )
      );
      
      toast({
        title: `Downloading ${taxNote.name}`,
        description: `Your PDF is opening in a new tab.`,
      });
      return;
    }
    
    if (action === "View" && type === "Resource") {
      if (taxNote) {
        window.open(taxNote.downloadUrl, "_blank");
      } else {
        window.open(`/resources?id=${id}`, "_blank");
      }
      
      toast({
        title: `Opening ${type} #${id}`,
        description: `Opening ${type.toLowerCase()} in a new tab`,
      });
    } else {
      toast({
        title: `${action} ${type} #${id}`,
        description: `${action} action performed on ${type.toLowerCase()} #${id}`,
      });
    }
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

  const handleCloseUploadForm = () => {
    setShowUploadForm(false);
    setUploadType("");
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
          resourceCount={4 + uploadedFiles.resource.length + taxNotesPdfs.length} 
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
          videoThumbnailInputRef={videoThumbnailInputRef}
          resourceThumbnailInputRef={resourceThumbnailInputRef}
          uploadedFiles={uploadedFiles}
          handleThumbnailChange={handleThumbnailChange}
          taxNotesPdfs={taxNotesPdfs}
        />
      </div>
      
      <Dialog open={showMeetingForm} onOpenChange={setShowMeetingForm}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-2xl">
          <ZoomMeetingForm 
            onSuccess={handleMeetingSuccess}
            onCancel={() => setShowMeetingForm(false)}
          />
        </DialogContent>
      </Dialog>
      
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
      
      <Dialog open={showUploadForm} onOpenChange={setShowUploadForm}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-2xl">
          <div className="space-y-4">
            <h2 className="text-xl font-bold animated-text">
              Upload {uploadType === "Video" ? "Video" : "Resource"}
            </h2>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">
                  Select {uploadType} File
                </label>
                <div 
                  className="border-2 border-dashed border-neon-blue/50 rounded-lg p-8 text-center cursor-pointer hover:bg-neon-blue/5 transition-colors"
                  onClick={() => uploadType === "Video" ? videoFileInputRef.current?.click() : resourceFileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    hidden 
                    ref={uploadType === "Video" ? videoFileInputRef : resourceFileInputRef}
                    onChange={(e) => handleFileChange(e, uploadType)} 
                    accept={uploadType === "Video" ? "video/*" : "*/*"}
                  />
                  <p className="text-white/70 mb-2">Click to select or drag and drop your file here</p>
                  <Button size="sm">
                    Select File
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">
                  Add Thumbnail (Required)
                </label>
                <div 
                  className="border-2 border-dashed border-neon-pink/50 rounded-lg p-8 text-center cursor-pointer hover:bg-neon-pink/5 transition-colors"
                  onClick={() => uploadType === "Video" ? videoThumbnailInputRef.current?.click() : resourceThumbnailInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    hidden 
                    ref={uploadType === "Video" ? videoThumbnailInputRef : resourceThumbnailInputRef}
                    onChange={(e) => handleThumbnailChange(e, uploadType === "Video" ? "Video" : "Resource")} 
                    accept="image/*"
                  />
                  <p className="text-white/70 mb-2">Add a thumbnail image for your {uploadType.toLowerCase()}</p>
                  <Button size="sm">
                    Select Image
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline"
                onClick={handleCloseUploadForm}
              >
                Cancel
              </Button>
              <Button 
                className="cyber-button"
                onClick={handleCloseUploadForm}
              >
                Finish Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
