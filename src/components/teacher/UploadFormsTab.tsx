
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, FileText, Upload } from "lucide-react";

interface UploadFormsTabProps {
  handleUploadClick: (type: string) => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, type: string) => void;
  videoFileInputRef: React.RefObject<HTMLInputElement>;
  resourceFileInputRef: React.RefObject<HTMLInputElement>;
  uploadedFiles: {
    video: File[];
    resource: File[];
  };
}

const UploadFormsTab: React.FC<UploadFormsTabProps> = ({
  handleUploadClick,
  handleFileChange,
  videoFileInputRef,
  resourceFileInputRef,
  uploadedFiles,
}) => {
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
          <p className="text-xs text-white/50">
            Supported formats: MP4, MOV, AVI (Max: 1GB)
          </p>
          
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
          <p className="text-xs text-white/50">
            Supported formats: PDF, DOCX, PPTX, ZIP (Max: 100MB)
          </p>
          
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
