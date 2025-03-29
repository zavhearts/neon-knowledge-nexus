
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

// Sample students data
const STUDENTS = [
  { id: 1, name: "Alex Johnson", email: "alex.j@example.com", progress: 85, lastActive: "2023-09-15" },
  { id: 2, name: "Sarah Williams", email: "sarah.w@example.com", progress: 72, lastActive: "2023-09-14" },
  { id: 3, name: "Michael Brown", email: "michael.b@example.com", progress: 45, lastActive: "2023-09-10" },
  { id: 4, name: "Jessica Davis", email: "jessica.d@example.com", progress: 92, lastActive: "2023-09-13" },
  { id: 5, name: "David Miller", email: "david.m@example.com", progress: 63, lastActive: "2023-09-11" }
];

// Define type for the tax notes PDFs
export interface TaxNotesPdf {
  id: number;
  name: string;
  type: string;
  size: string;
  date: string;
  downloads: number;
  thumbnailUrl: string;
  downloadUrl: string;
}

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
  taxNotesPdfs?: TaxNotesPdf[];
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
  handleThumbnailChange,
  taxNotesPdfs = []
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
        <StudentsTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleAction={handleAction}
          students={STUDENTS}
        />
      </TabsContent>
      
      <TabsContent value="resources" className="mt-0">
        <ResourcesTab 
          handleUploadClick={handleUploadClick}
          handleAction={handleAction}
          resources={RESOURCES}
          uploadedFiles={uploadedFiles}
          taxNotesPdfs={taxNotesPdfs}
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
