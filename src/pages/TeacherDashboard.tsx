
import { useState, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import DashboardHeader from "@/components/teacher/DashboardHeader";
import StatsSection from "@/components/teacher/StatsSection";
import TabsContainer from "@/components/teacher/TabsContainer";

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

  const handleUploadClick = (type: string) => {
    if (type === "Video" && videoFileInputRef.current) {
      videoFileInputRef.current.click();
    } else if (type === "Resource" && resourceFileInputRef.current) {
      resourceFileInputRef.current.click();
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

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern">
      <DashboardHeader onUploadClick={handleUploadClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsSection 
          classCount={4 + uploadedFiles.video.length} 
          resourceCount={4 + uploadedFiles.resource.length} 
        />
        
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
    </div>
  );
};

export default TeacherDashboard;
