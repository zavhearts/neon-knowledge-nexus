
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { X, Plus, ImagePlus, FileUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (courseData: any) => void;
  availableClasses: any[];
}

const CourseCreationModal: React.FC<CourseCreationModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  availableClasses
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnail(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const toggleClassSelection = (classId: number) => {
    if (selectedClasses.includes(classId)) {
      setSelectedClasses(selectedClasses.filter(id => id !== classId));
    } else {
      setSelectedClasses([...selectedClasses, classId]);
    }
  };
  
  const filteredClasses = availableClasses.filter(cls => 
    cls.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your course",
        variant: "destructive",
      });
      return;
    }
    
    if (selectedClasses.length === 0) {
      toast({
        title: "No Classes Selected",
        description: "Please select at least one class for your course",
        variant: "destructive",
      });
      return;
    }
    
    if (!thumbnailPreview) {
      toast({
        title: "Thumbnail Required",
        description: "Please add a thumbnail image for your course",
        variant: "destructive",
      });
      return;
    }
    
    const courseData = {
      id: Date.now(),
      title,
      description,
      thumbnailUrl: thumbnailPreview,
      classes: selectedClasses,
      createdAt: new Date().toISOString(),
      students: 0
    };
    
    onSave(courseData);
    toast({
      title: "Course Created",
      description: "Your course has been created successfully",
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Course Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Description
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter course description"
                rows={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Course Thumbnail
              </label>
              <div className="border-2 border-dashed border-neon-blue/50 rounded-lg p-6 text-center">
                {thumbnailPreview ? (
                  <div className="space-y-3">
                    <div className="relative mx-auto w-full max-w-xs h-40 bg-black/20 rounded overflow-hidden">
                      <img
                        src={thumbnailPreview}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-cyber-dark/80 rounded-full p-1"
                        onClick={() => setThumbnailPreview(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById("course-thumbnail")?.click()}
                    className="cursor-pointer py-4"
                  >
                    <ImagePlus className="mx-auto h-10 w-10 text-neon-blue mb-2" />
                    <p className="text-white/70">Click to select a thumbnail image</p>
                  </div>
                )}
                <input
                  id="course-thumbnail"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Add Classes to Course
              </label>
              <Input
                placeholder="Search classes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-2"
              />
              
              <div className="border border-white/20 rounded-lg p-2 h-64 overflow-y-auto">
                {filteredClasses.length > 0 ? (
                  <div className="space-y-2">
                    {filteredClasses.map(cls => (
                      <div
                        key={cls.id}
                        className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                          selectedClasses.includes(cls.id)
                            ? "bg-neon-blue/20 border border-neon-blue/50"
                            : "bg-cyber-light/10 hover:bg-cyber-light/20"
                        }`}
                        onClick={() => toggleClassSelection(cls.id)}
                      >
                        <div className="flex items-center">
                          <div className="mr-3">
                            {selectedClasses.includes(cls.id) ? (
                              <div className="w-4 h-4 rounded-full bg-neon-blue flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-white/50"></div>
                            )}
                          </div>
                          <div className="truncate">{cls.title}</div>
                        </div>
                        <Badge className={cls.type === "Live" ? "bg-neon-purple" : "bg-neon-green text-black"}>
                          {cls.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-white/50">
                    No classes found matching your search
                  </div>
                )}
              </div>
              
              <div className="mt-3">
                <div className="text-sm font-medium text-white/70">Selected Classes ({selectedClasses.length})</div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedClasses.map(id => {
                    const cls = availableClasses.find(c => c.id === id);
                    return cls ? (
                      <Badge key={id} className="bg-neon-blue/30 text-white py-1 px-2 flex items-center gap-1">
                        {cls.title.length > 15 ? cls.title.substring(0, 15) + '...' : cls.title}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleClassSelection(id);
                          }}
                        />
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Create Course
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseCreationModal;
