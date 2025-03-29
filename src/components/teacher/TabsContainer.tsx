
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassesTab from "./ClassesTab";
import StudentsTab from "./StudentsTab";
import ResourcesTab from "./ResourcesTab";
import UploadFormsTab from "./UploadFormsTab";

// Sample data
const CLASSES = [
  { id: 1, title: "Introduction to Cybersecurity", type: "Live", students: 24, date: "2023-09-15", status: "Published" },
  { id: 2, title: "Data Science Fundamentals", type: "Recorded", students: 32, date: "2023-09-12", status: "Draft" },
  { id: 3, title: "Advanced Web Development", type: "Live", students: 18, date: "2023-09-08", status: "Published" },
  { id: 4, title: "Machine Learning Basics", type: "Recorded", students: 42, date: "2023-09-05", status: "Published" }
];

const RESOURCES = [
  { id: 1, title: "Cybersecurity Guide.pdf", type: "PDF", size: "4.2 MB", downloads: 24, date: "2023-09-15" },
  { id: 2, title: "Data Science Examples.zip", type: "ZIP", size: "12.8 MB", downloads: 18, date: "2023-09-10" },
  { id: 3, title: "Web Dev Cheatsheet.pdf", type: "PDF", size: "2.1 MB", downloads: 32, date: "2023-09-05" },
  { id: 4, title: "ML Algorithms.pptx", type: "PPT", size: "8.5 MB", downloads: 15, date: "2023-09-01" }
];

export interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleUploadClick: (type: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  videoFileInputRef: React.RefObject<HTMLInputElement>;
  resourceFileInputRef: React.RefObject<HTMLInputElement>;
  videoThumbnailInputRef: React.RefObject<HTMLInputElement>;
  resourceThumbnailInputRef: React.RefObject<HTMLInputElement>;
  uploadedFiles: {
    video: File[];
    resource: File[];
    videoThumbnail: File[];
    resourceThumbnail: File[];
  };
  handleThumbnailChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
}

const TabsContainer: React.FC<TabsContainerProps> = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  handleUploadClick,
  handleFileChange,
  handleAction,
  videoFileInputRef,
  resourceFileInputRef,
  videoThumbnailInputRef,
  resourceThumbnailInputRef,
  uploadedFiles,
  handleThumbnailChange
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="bg-cyber-light/20 p-1">
        <TabsTrigger value="classes" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Classes
        </TabsTrigger>
        <TabsTrigger value="students" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Students
        </TabsTrigger>
        <TabsTrigger value="resources" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Resources
        </TabsTrigger>
        <TabsTrigger value="uploads" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Upload Forms
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="classes" className="mt-0">
        <ClassesTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleUploadClick={handleUploadClick}
          handleAction={handleAction}
          classes={CLASSES}
          uploadedFiles={uploadedFiles}
        />
      </TabsContent>
      
      <TabsContent value="students" className="mt-0">
        <StudentsTab />
      </TabsContent>
      
      <TabsContent value="resources" className="mt-0">
        <ResourcesTab 
          handleUploadClick={handleUploadClick}
          handleAction={handleAction}
          resources={RESOURCES}
          uploadedFiles={uploadedFiles}
        />
      </TabsContent>
      
      <TabsContent value="uploads" className="mt-0">
        <UploadFormsTab 
          handleUploadClick={handleUploadClick}
          handleFileChange={handleFileChange}
          videoFileInputRef={videoFileInputRef}
          resourceFileInputRef={resourceFileInputRef}
          videoThumbnailInputRef={videoThumbnailInputRef}
          resourceThumbnailInputRef={resourceThumbnailInputRef}
          uploadedFiles={uploadedFiles}
          handleThumbnailChange={handleThumbnailChange}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
