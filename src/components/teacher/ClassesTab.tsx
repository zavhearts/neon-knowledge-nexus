
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, PlusCircle, Eye, Edit, Trash2, MessageCircle, BarChart2 } from "lucide-react";
import CustomVideoPlayer from "../video/CustomVideoPlayer";
import EditContentModal from "./EditContentModal";
import VideoCommentsModal from "./VideoCommentsModal";

interface ClassItem {
  id: number;
  title: string;
  type: string;
  students: number;
  date: string;
  status: string;
  videoUrl?: string;
  resources?: {
    type: string;
    name: string;
    url: string;
  }[];
}

interface UploadedFile extends File {
  id?: number;
}

interface ClassesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleUploadClick: (type: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  classes: ClassItem[];
  uploadedFiles: {
    video: UploadedFile[];
  };
}

const ClassesTab: React.FC<ClassesTabProps> = ({
  searchTerm,
  setSearchTerm,
  handleUploadClick,
  handleAction,
  classes,
  uploadedFiles,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [viewingClass, setViewingClass] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [viewingComments, setViewingComments] = useState(false);
  const [commentedClass, setCommentedClass] = useState<ClassItem | null>(null);

  const handleViewClass = (classItem: ClassItem) => {
    setSelectedClass(classItem);
    setViewingClass(true);
  };
  
  const handleEditClass = (classItem: ClassItem) => {
    setEditingClass(classItem);
  };
  
  const handleSaveEdit = (updatedClass: ClassItem) => {
    // In a real app, you would update the backend here
    // For now, we'll just close the modal
    setEditingClass(null);
  };
  
  const handleViewComments = (classItem: ClassItem) => {
    setCommentedClass(classItem);
    setViewingComments(true);
  };

  // Sample resources for demo purposes
  const sampleResources = [
    { type: "PDF", name: "Lecture Notes", url: "https://example.com/notes.pdf" },
    { type: "PDF", name: "Practice Problems", url: "https://example.com/problems.pdf" },
    { type: "XLSX", name: "Calculation Sheet", url: "https://example.com/calc.xlsx" }
  ];

  // Sample video URL for demo purposes
  const sampleVideoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

  // All classes with added sample video URLs and resources
  const enhancedClasses = classes.map(cls => ({
    ...cls,
    videoUrl: sampleVideoUrl,
    resources: sampleResources
  }));

  const enhancedUploadedFiles = uploadedFiles.video.map((file, index) => ({
    id: 1000 + index,
    title: file.name,
    type: "Recorded",
    students: 0,
    date: new Date().toLocaleDateString(),
    status: "Uploaded",
    videoUrl: URL.createObjectURL(file),
    resources: sampleResources
  }));

  const allClasses = [...enhancedClasses, ...enhancedUploadedFiles];
  
  // Filter classes based on search term
  const filteredClasses = allClasses.filter(cls => 
    cls.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="cyber-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Classes</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search classes..."
                className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => handleUploadClick("AddClass")}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Class
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Type</th>
                <th className="text-left py-3 px-4">Students</th>
                <th className="text-left py-3 px-4">Date</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <tr key={cls.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">{cls.title}</td>
                    <td className="py-3 px-4">
                      <Badge className={cls.type === "Live" ? "bg-neon-purple text-white" : "bg-neon-green text-black"}>
                        {cls.type}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{cls.students}</td>
                    <td className="py-3 px-4">{cls.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={cls.status === "Published" ? "bg-neon-blue text-black" : "bg-neon-pink text-white"}>
                        {cls.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          className="text-white/70 hover:text-white hover:bg-white/10"
                          size="sm"
                          onClick={() => handleViewClass(cls)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-neon-blue hover:text-neon-blue/80 hover:bg-neon-blue/10"
                          size="sm"
                          onClick={() => handleEditClass(cls)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-neon-purple hover:text-neon-purple/80 hover:bg-neon-purple/10"
                          size="sm"
                          onClick={() => handleViewComments(cls)}
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-neon-green hover:text-neon-green/80 hover:bg-neon-green/10"
                          size="sm"
                          onClick={() => handleAction("Analytics", cls.id, "Class")}
                        >
                          <BarChart2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          size="sm"
                          onClick={() => handleAction("Delete", cls.id, "Class")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-white/50">
                    No classes found. Add a new class to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* View Class Dialog */}
      <Dialog open={viewingClass} onOpenChange={setViewingClass}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-6xl p-0">
          {selectedClass && (
            <CustomVideoPlayer
              videoUrl={selectedClass.videoUrl || sampleVideoUrl}
              title={selectedClass.title}
              resources={selectedClass.resources || []}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Edit Class Modal */}
      {editingClass && (
        <EditContentModal
          isOpen={!!editingClass}
          onClose={() => setEditingClass(null)}
          content={{
            id: editingClass.id,
            title: editingClass.title,
            type: 'Class',
            thumbnailUrl: editingClass.videoUrl ? 'https://sample-videos.com/img/Sample-jpg-image-500kb.jpg' : undefined
          }}
          onSave={handleSaveEdit}
        />
      )}
      
      {/* View Comments Modal */}
      {commentedClass && (
        <VideoCommentsModal
          isOpen={viewingComments}
          onClose={() => setViewingComments(false)}
          videoTitle={commentedClass.title}
        />
      )}
    </>
  );
};

export default ClassesTab;
