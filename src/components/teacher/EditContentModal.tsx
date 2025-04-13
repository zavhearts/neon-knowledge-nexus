
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileUp, ImagePlus, X } from "lucide-react";

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: number;
    title: string;
    description?: string;
    type: string;
    thumbnailUrl?: string;
  };
  onSave: (updatedContent: any) => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ isOpen, onClose, content, onSave }) => {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(content.thumbnailUrl || null);
  
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
  
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your content",
        variant: "destructive",
      });
      return;
    }
    
    const updatedContent = {
      ...content,
      title,
      description,
      thumbnailUrl: thumbnailPreview || content.thumbnailUrl
    };
    
    onSave(updatedContent);
    toast({
      title: "Content Updated",
      description: `${content.type} has been updated successfully`,
    });
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {content.type}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Enter ${content.type.toLowerCase()} title`}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={`Enter ${content.type.toLowerCase()} description`}
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Thumbnail
            </label>
            <div className="flex items-center gap-4">
              {thumbnailPreview && (
                <div className="relative w-40 h-24">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail"
                    className="w-full h-full object-cover rounded-md border border-neon-blue/30"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 bg-cyber-dark rounded-full p-1 border border-white/20"
                    onClick={() => setThumbnailPreview(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Button
                variant="outline"
                onClick={() => document.getElementById("thumbnail-upload")?.click()}
              >
                <ImagePlus className="h-4 w-4 mr-2" />
                Change Thumbnail
              </Button>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditContentModal;
