
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Eye, Edit, Trash2 } from "lucide-react";

interface ClassItem {
  id: number;
  title: string;
  type: string;
  students: number;
  date: string;
  status: string;
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
  return (
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
          <Button onClick={() => handleUploadClick("Video")}>
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
            {/* Show existing classes */}
            {classes.map((cls) => (
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
                      onClick={() => handleAction("View", cls.id, "Class")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-neon-blue hover:text-neon-blue/80 hover:bg-neon-blue/10"
                      size="sm"
                      onClick={() => handleAction("Edit", cls.id, "Class")}
                    >
                      <Edit className="h-4 w-4" />
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
            ))}
            
            {/* Show newly uploaded videos as classes */}
            {uploadedFiles.video.map((file, index) => (
              <tr key={`uploaded-video-${index}`} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">{file.name}</td>
                <td className="py-3 px-4">
                  <Badge className="bg-neon-green text-black">
                    Recorded
                  </Badge>
                </td>
                <td className="py-3 px-4">0</td>
                <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <Badge className="bg-neon-blue text-black">
                    Uploaded
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      size="sm"
                      onClick={() => handleAction("View", 1000 + index, "Class")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-neon-blue hover:text-neon-blue/80 hover:bg-neon-blue/10"
                      size="sm"
                      onClick={() => handleAction("Edit", 1000 + index, "Class")}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      size="sm"
                      onClick={() => handleAction("Delete", 1000 + index, "Class")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ClassesTab;
