
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassesTab from "./ClassesTab";
import ResourcesTab from "./ResourcesTab";
import StudentsTab from "./StudentsTab";
import UploadFormsTab from "./UploadFormsTab";

// Sample data for dashboard
const CLASSES = [
  { id: 1, title: "Introduction to Mathematics", type: "Recorded", students: 32, date: "2023-06-12", status: "Published" },
  { id: 2, title: "Advanced Physics Concepts", type: "Recorded", students: 28, date: "2023-06-10", status: "Published" },
  { id: 3, title: "Web Development Fundamentals", type: "Live", students: 45, date: "2023-06-15 10:00 AM", status: "Scheduled" },
  { id: 4, title: "Data Science Workshop", type: "Live", students: 38, date: "2023-06-17 2:00 PM", status: "Scheduled" },
];

const RESOURCES = [
  { id: 1, title: "Math Formula Sheet", type: "PDF", size: "2.5 MB", downloads: 145, date: "2023-06-08" },
  { id: 2, title: "Physics Lab Manual", type: "PDF", size: "4.7 MB", downloads: 98, date: "2023-06-06" },
  { id: 3, title: "Web Dev Code Examples", type: "ZIP", size: "12.3 MB", downloads: 78, date: "2023-06-04" },
  { id: 4, title: "Data Science Cheat Sheet", type: "PDF", size: "1.8 MB", downloads: 210, date: "2023-06-01" },
];

const STUDENTS = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", progress: 85, lastActive: "2023-06-12" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", progress: 72, lastActive: "2023-06-11" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", progress: 94, lastActive: "2023-06-12" },
  { id: 4, name: "Diana Wilson", email: "diana@example.com", progress: 62, lastActive: "2023-06-10" },
];

interface TabsContainerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleUploadClick: (type: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  videoFileInputRef: React.RefObject<HTMLInputElement>;
  resourceFileInputRef: React.RefObject<HTMLInputElement>;
  uploadedFiles: {
    video: File[];
    resource: File[];
  };
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
  uploadedFiles,
}) => {
  return (
    <Tabs defaultValue={activeTab} className="mb-8" onValueChange={setActiveTab}>
      <TabsList className="bg-cyber-light/20 p-1 mb-6">
        <TabsTrigger value="classes" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          My Classes
        </TabsTrigger>
        <TabsTrigger value="resources" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Resources
        </TabsTrigger>
        <TabsTrigger value="students" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Students
        </TabsTrigger>
        <TabsTrigger value="uploads" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
          Upload Content
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="classes">
        <ClassesTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleUploadClick={handleUploadClick}
          handleAction={handleAction}
          classes={CLASSES}
          uploadedFiles={uploadedFiles}
        />
      </TabsContent>
      
      <TabsContent value="resources">
        <ResourcesTab 
          handleUploadClick={handleUploadClick}
          handleAction={handleAction}
          resources={RESOURCES}
          uploadedFiles={uploadedFiles}
        />
      </TabsContent>
      
      <TabsContent value="students">
        <StudentsTab 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleAction={handleAction}
          students={STUDENTS}
        />
      </TabsContent>
      
      <TabsContent value="uploads">
        <UploadFormsTab 
          handleUploadClick={handleUploadClick}
          handleFileChange={handleFileChange}
          videoFileInputRef={videoFileInputRef}
          resourceFileInputRef={resourceFileInputRef}
          uploadedFiles={uploadedFiles}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
