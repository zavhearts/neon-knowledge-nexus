import { useState, useRef, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/teacher/DashboardHeader";
import StatsSection from "@/components/teacher/StatsSection";
import TabsContainer from "@/components/teacher/TabsContainer";
import ZoomMeetingForm from "@/components/teacher/ZoomMeetingForm";
import ZoomMeetingsList from "@/components/teacher/ZoomMeetingsList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomMeeting } from "@/services/zoomService";
import { Video, Users, Calendar, FileText, Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/theme-provider";

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
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Function to handle starting a live class
  const handleGoLive = () => {
    navigate('/live-classes', { state: { isTeacher: true, startBroadcast: true } });
    toast({
      title: "Starting Live Class",
      description: "You're being redirected to the live class interface.",
    });
  };

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

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-cyber-dark bg-circuit-pattern" : "bg-gray-50"}`}>
      <div className="sticky top-0 z-50">
        <DashboardHeader 
          onUploadClick={handleUploadClick} 
          onScheduleZoom={() => setShowMeetingForm(true)}
          onGoLive={handleGoLive}
        />
        
        <div className={`flex justify-end px-6 py-2 ${theme === "dark" ? "bg-cyber-darker/80" : "bg-white"} backdrop-blur-md border-b border-blue-500/20`}>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
              className={theme === "dark" ? "bg-blue-700" : "bg-gray-300"}
            />
            <Moon className="h-4 w-4 text-blue-400" />
          </div>
        </div>
      </div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        variants={containerAnimation}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8"
          variants={containerAnimation}
        >
          <motion.div 
            className="lg:col-span-9"
            variants={itemAnimation}
          >
            <motion.div 
              className="mb-6"
              variants={itemAnimation}
            >
              <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-neon-blue animated-text" : "text-blue-700"}`}>
                Dashboard Overview
              </h2>
              <StatsSection 
                classCount={4 + uploadedFiles.video.length} 
                resourceCount={4 + uploadedFiles.resource.length + taxNotesPdfs.length} 
              />
            </motion.div>
            
            <AnimatePresence mode="wait">
              {activeTab === "classes" && (
                <motion.div 
                  className={`${theme === "dark" ? "bg-cyber-darker" : "bg-white"} rounded-lg border ${theme === "dark" ? "border-neon-blue/30" : "border-blue-200"} ${theme === "dark" ? "shadow-glow-sm" : "shadow-lg"} p-4 mb-6`}
                  variants={itemAnimation}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-neon-blue animated-text" : "text-blue-700"}`}>
                    Upcoming Sessions
                  </h2>
                  <ZoomMeetingsList 
                    onSelect={handleSelectMeeting}
                    refreshTrigger={meetingsRefreshTrigger}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            variants={itemAnimation}
          >
            <motion.div 
              className={`${theme === "dark" ? "bg-cyber-darker" : "bg-white"} rounded-lg p-4 ${theme === "dark" ? "border border-neon-blue/30 shadow-glow-sm" : "border border-blue-200 shadow-lg"} flex flex-col h-full`}
              variants={itemAnimation}
            >
              <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-neon-blue animated-text" : "text-blue-700"}`}>Quick Actions</h3>
              <div className="space-y-3 flex-grow">
                <Button 
                  onClick={handleGoLive} 
                  className="bg-red-600 hover:bg-red-700 text-white w-full flex items-center justify-center gap-3"
                >
                  <Video className="h-4 w-4" />
                  Go Live Now
                </Button>
                
                <Button 
                  onClick={() => setShowMeetingForm(true)} 
                  variant="outline"
                  className={`${theme === "dark" ? "border-neon-purple text-neon-purple hover:bg-neon-purple/10" : "border-purple-500 text-purple-600 hover:bg-purple-50"} w-full flex items-center justify-center gap-3`}
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Class
                </Button>
                
                <Button 
                  onClick={() => navigate('/upload-content?type=video')}
                  variant="outline" 
                  className={`${theme === "dark" ? "border-neon-blue text-neon-blue hover:bg-neon-blue/10" : "border-blue-500 text-blue-600 hover:bg-blue-50"} w-full flex items-center justify-center gap-3`}
                >
                  <Video className="h-4 w-4" />
                  Upload New Class
                </Button>
                
                <Button 
                  onClick={() => handleUploadClick("Resource")}
                  variant="outline" 
                  className={`${theme === "dark" ? "border-neon-green text-neon-green hover:bg-neon-green/10" : "border-green-500 text-green-600 hover:bg-green-50"} w-full flex items-center justify-center gap-3`}
                >
                  <FileText className="h-4 w-4" />
                  Upload Resources
                </Button>
                
                <Button 
                  onClick={() => navigate('/admin')}
                  variant="outline" 
                  className={`${theme === "dark" ? "border-amber-500 text-amber-400 hover:bg-amber-500/10" : "border-amber-500 text-amber-600 hover:bg-amber-50"} w-full flex items-center justify-center gap-3 mt-auto`}
                >
                  <Users className="h-4 w-4" />
                  Manage Students
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className={`${theme === "dark" ? "bg-cyber-darker rounded-lg border border-neon-blue/30 shadow-glow-sm" : "bg-white rounded-lg border border-blue-200 shadow-lg"} p-4`}
          variants={itemAnimation}
        >
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
        </motion.div>
      </motion.div>
      
      <Dialog open={showMeetingForm} onOpenChange={setShowMeetingForm}>
        <DialogContent className={`${theme === "dark" ? "bg-cyber-darker border-neon-blue/50" : "bg-white border-blue-200"} max-w-2xl`}>
          <ZoomMeetingForm 
            onSuccess={handleMeetingSuccess}
            onCancel={() => setShowMeetingForm(false)}
          />
        </DialogContent>
      </Dialog>
      
      <Dialog open={!!selectedMeeting} onOpenChange={handleCloseMeetingDialog}>
        <DialogContent className={`${theme === "dark" ? "bg-cyber-darker border-neon-blue/50" : "bg-white border-blue-200"}`}>
          {selectedMeeting && (
            <div className="space-y-4">
              <h2 className={`text-xl font-bold ${theme === "dark" ? "animated-text" : "text-blue-700"}`}>
                {selectedMeeting.topic}
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className={`text-sm ${theme === "dark" ? "text-white/70" : "text-gray-500"}`}>Date & Time</p>
                  <p>{format(parseISO(selectedMeeting.start_time), "PPP p")}</p>
                </div>
                
                <div className="space-y-1">
                  <p className={`text-sm ${theme === "dark" ? "text-white/70" : "text-gray-500"}`}>Duration</p>
                  <p>{selectedMeeting.duration} minutes</p>
                </div>
                
                <div className="space-y-1 col-span-2">
                  <p className={`text-sm ${theme === "dark" ? "text-white/70" : "text-gray-500"}`}>Join URL</p>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={selectedMeeting.join_url} 
                      readOnly
                      className={`${theme === "dark" ? "bg-cyber-dark border border-neon-blue/30" : "bg-gray-50 border border-blue-200"} rounded p-2 flex-1`}
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
                    <p className={`text-sm ${theme === "dark" ? "text-white/70" : "text-gray-500"}`}>Password</p>
                    <p>{selectedMeeting.password}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline"
                  onClick={handleCloseMeetingDialog}
                  className={theme === "dark" ? "" : "border-blue-300"}
                >
                  Close
                </Button>
                <Button 
                  className={theme === "dark" ? "cyber-button" : "bg-blue-600 hover:bg-blue-700"}
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
        <DialogContent className={`${theme === "dark" ? "bg-cyber-darker border-neon-blue/50" : "bg-white border-blue-200"} max-w-2xl`}>
          <div className="space-y-4">
            <h2 className={`text-xl font-bold ${theme === "dark" ? "animated-text" : "text-blue-700"}`}>
              Upload {uploadType === "Video" ? "Video" : "Resource"}
            </h2>
            
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                  Select {uploadType} File
                </label>
                <div 
                  className={`border-2 border-dashed ${theme === "dark" ? "border-neon-blue/50 hover:bg-neon-blue/5" : "border-blue-300 hover:bg-blue-50"} rounded-lg p-8 text-center cursor-pointer transition-colors`}
                  onClick={() => uploadType === "Video" ? videoFileInputRef.current?.click() : resourceFileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    hidden 
                    ref={uploadType === "Video" ? videoFileInputRef : resourceFileInputRef}
                    onChange={(e) => handleFileChange(e, uploadType)} 
                    accept={uploadType === "Video" ? "video/*" : "*/*"}
                  />
                  <p className={`${theme === "dark" ? "text-white/70" : "text-gray-500"} mb-2`}>Click to select or drag and drop your file here</p>
                  <Button size="sm">
                    Select File
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className={`block text-sm font-medium ${theme === "dark" ? "text-white/70" : "text-gray-600"}`}>
                  Add Thumbnail (Required)
                </label>
                <div 
                  className={`border-2 border-dashed ${theme === "dark" ? "border-neon-pink/50 hover:bg-neon-pink/5" : "border-pink-300 hover:bg-pink-50"} rounded-lg p-8 text-center cursor-pointer transition-colors`}
                  onClick={() => uploadType === "Video" ? videoThumbnailInputRef.current?.click() : resourceThumbnailInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    hidden 
                    ref={uploadType === "Video" ? videoThumbnailInputRef : resourceThumbnailInputRef}
                    onChange={(e) => handleThumbnailChange(e, uploadType === "Video" ? "Video" : "Resource")} 
                    accept="image/*"
                  />
                  <p className={`${theme === "dark" ? "text-white/70" : "text-gray-500"} mb-2`}>Add a thumbnail image for your {uploadType.toLowerCase()}</p>
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
                className={theme === "dark" ? "" : "border-blue-300"}
              >
                Cancel
              </Button>
              <Button 
                className={theme === "dark" ? "cyber-button" : "bg-blue-600 hover:bg-blue-700"}
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
