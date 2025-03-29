
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, Upload, Image } from "lucide-react";

interface UploadFormsTabProps {
  handleUploadClick: (type: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  videoFileInputRef: React.RefObject<HTMLInputElement>;
  resourceFileInputRef: React.RefObject<HTMLInputElement>;
  videoThumbnailInputRef?: React.RefObject<HTMLInputElement>;
  resourceThumbnailInputRef?: React.RefObject<HTMLInputElement>;
  uploadedFiles: {
    video: File[];
    resource: File[];
    videoThumbnail?: File[];
    resourceThumbnail?: File[];
  };
  handleThumbnailChange?: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
}

const UploadFormsTab: React.FC<UploadFormsTabProps> = ({
  handleUploadClick,
  handleFileChange,
  videoFileInputRef,
  resourceFileInputRef,
  videoThumbnailInputRef,
  resourceThumbnailInputRef,
  uploadedFiles,
  handleThumbnailChange,
}) => {
  const [videoThumbnailPreview, setVideoThumbnailPreview] = useState<string | null>(null);
  const [resourceThumbnailPreview, setResourceThumbnailPreview] = useState<string | null>(null);

  // Handle thumbnail preview display
  const handleLocalThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (type === "Video") {
          setVideoThumbnailPreview(e.target?.result as string);
        } else {
          setResourceThumbnailPreview(e.target?.result as string);
        }
      };
      
      reader.readAsDataURL(file);
      
      // Call parent handler if available
      if (handleThumbnailChange) {
        handleThumbnailChange(event, type);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="cyber-card p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Video className="h-12 w-12 mb-4 text-neon-blue" />
          <h2 className="text-xl font-semibold mb-2">Upload Class Video</h2>
          <p className="text-white/70 mb-6">Upload recorded videos of your classes</p>
          <div className="border-2 border-dashed border-neon-blue/50 rounded-lg p-8 w-full mb-4 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 mb-2 text-neon-blue" />
            <p className="text-sm text-white/70 mb-4">Drag & drop files here or click to browse</p>
            <Button onClick={() => handleUploadClick("Video")}>
              Select Video File
            </Button>
            <input 
              type="file" 
              ref={videoFileInputRef}
              accept="video/*" 
              className="hidden"
              onChange={(e) => handleFileChange(e, "Video")}
            />
          </div>
          <p className="text-xs text-white/50 mb-6">
            Supported formats: MP4, MOV, AVI (Max: 1GB)
          </p>
          
          {/* Thumbnail upload section */}
          <div className="w-full border-t border-white/10 pt-6 mb-6">
            <h3 className="text-sm font-medium mb-4">Video Thumbnail</h3>
            <div className="flex flex-col items-center">
              {videoThumbnailPreview ? (
                <div className="mb-4 relative">
                  <img 
                    src={videoThumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="w-40 h-24 object-cover rounded-md border border-neon-blue/30"
                  />
                  <button 
                    className="absolute -top-2 -right-2 bg-cyber-dark rounded-full p-1 border border-white/20"
                    onClick={() => setVideoThumbnailPreview(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-40 h-24 bg-cyber-light/10 rounded-md flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-white/30" />
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="border-neon-blue/50 text-neon-blue"
                onClick={() => videoThumbnailInputRef?.current?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Add Thumbnail
              </Button>
              <input 
                type="file" 
                ref={videoThumbnailInputRef}
                accept="image/*" 
                className="hidden"
                onChange={(e) => handleLocalThumbnailChange(e, "Video")}
              />
              <p className="text-xs text-white/50 mt-2">
                Recommended: 16:9 ratio, min 640×360px
              </p>
            </div>
          </div>
          
          {uploadedFiles.video.length > 0 && (
            <div className="mt-4 w-full">
              <h3 className="text-sm font-medium mb-2">Uploaded Videos</h3>
              <ul className="text-left bg-cyber-light/10 rounded-md p-2">
                {uploadedFiles.video.map((file, index) => (
                  <li key={index} className="py-1 px-2 flex justify-between items-center">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-white/50">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
      
      <Card className="cyber-card p-6">
        <div className="flex flex-col items-center justify-center text-center">
          <FileText className="h-12 w-12 mb-4 text-neon-purple" />
          <h2 className="text-xl font-semibold mb-2">Upload Resources</h2>
          <p className="text-white/70 mb-6">Share documents, notes and materials with students</p>
          <div className="border-2 border-dashed border-neon-purple/50 rounded-lg p-8 w-full mb-4 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 mb-2 text-neon-purple" />
            <p className="text-sm text-white/70 mb-4">Drag & drop files here or click to browse</p>
            <Button 
              className="bg-neon-purple text-white hover:bg-neon-purple/80"
              onClick={() => handleUploadClick("Resource")}
            >
              Select Document
            </Button>
            <input 
              type="file" 
              ref={resourceFileInputRef}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.zip" 
              className="hidden"
              onChange={(e) => handleFileChange(e, "Resource")}
            />
          </div>
          <p className="text-xs text-white/50 mb-6">
            Supported formats: PDF, DOCX, PPTX, ZIP (Max: 100MB)
          </p>
          
          {/* Thumbnail upload section */}
          <div className="w-full border-t border-white/10 pt-6 mb-6">
            <h3 className="text-sm font-medium mb-4">Resource Thumbnail</h3>
            <div className="flex flex-col items-center">
              {resourceThumbnailPreview ? (
                <div className="mb-4 relative">
                  <img 
                    src={resourceThumbnailPreview} 
                    alt="Thumbnail preview" 
                    className="w-40 h-24 object-cover rounded-md border border-neon-purple/30"
                  />
                  <button 
                    className="absolute -top-2 -right-2 bg-cyber-dark rounded-full p-1 border border-white/20"
                    onClick={() => setResourceThumbnailPreview(null)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-40 h-24 bg-cyber-light/10 rounded-md flex items-center justify-center mb-4">
                  <Image className="h-8 w-8 text-white/30" />
                </div>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="border-neon-purple/50 text-neon-purple"
                onClick={() => resourceThumbnailInputRef?.current?.click()}
              >
                <Image className="h-4 w-4 mr-2" />
                Add Thumbnail
              </Button>
              <input 
                type="file" 
                ref={resourceThumbnailInputRef}
                accept="image/*" 
                className="hidden"
                onChange={(e) => handleLocalThumbnailChange(e, "Resource")}
              />
              <p className="text-xs text-white/50 mt-2">
                Recommended: 4:3 ratio, min 400×300px
              </p>
            </div>
          </div>
          
          {uploadedFiles.resource.length > 0 && (
            <div className="mt-4 w-full">
              <h3 className="text-sm font-medium mb-2">Uploaded Resources</h3>
              <ul className="text-left bg-cyber-light/10 rounded-md p-2">
                {uploadedFiles.resource.map((file, index) => (
                  <li key={index} className="py-1 px-2 flex justify-between items-center">
                    <span className="truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-white/50">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UploadFormsTab;
