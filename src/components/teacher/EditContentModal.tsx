
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileUp, ImagePlus, X, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface EditContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    id: number;
    title: string;
    description?: string;
    type: string;
    thumbnailUrl?: string;
    authorId?: number;
    authorName?: string;
  };
  onSave: (updatedContent: any) => void;
}

const EditContentModal: React.FC<EditContentModalProps> = ({ isOpen, onClose, content, onSave }) => {
  const [title, setTitle] = useState(content.title);
  const [description, setDescription] = useState(content.description || "");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(content.thumbnailUrl || null);
  const [isPublished, setIsPublished] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [isModerated, setIsModerated] = useState(false);
  
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
      thumbnailUrl: thumbnailPreview || content.thumbnailUrl,
      isPublished,
      isModerated
    };
    
    onSave(updatedContent);
    toast({
      title: "Content Updated",
      description: `${content.type} has been updated successfully`,
    });
    onClose();
  };

  const handleMarkAsModerated = () => {
    setIsModerated(true);
    setShowWarning(false);
    toast({
      title: "Content Moderated",
      description: "This content has been marked as reviewed and moderated",
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <span>Edit {content.type}</span>
            {content.authorName && (
              <span className="ml-2 text-sm text-white/60">
                (by {content.authorName})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        
        {showWarning && (
          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-md p-4 mb-4 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-500">Content Warning</h4>
              <p className="text-sm text-white/70">This content may contain inappropriate or unreviewed material. Please review carefully before publishing.</p>
              <Button 
                variant="outline"
                size="sm"
                className="mt-2 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/20"
                onClick={handleMarkAsModerated}
              >
                Mark as Moderated
              </Button>
            </div>
          </div>
        )}
        
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
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Switch 
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-500 hover:bg-red-500/20"
              onClick={() => setShowWarning(!showWarning)}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Mark as Inappropriate
            </Button>
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
