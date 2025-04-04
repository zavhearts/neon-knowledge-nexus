
import { useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layout/MainLayout";
import { FileUp, ImagePlus, X, CheckCircle } from "lucide-react";

const UploadContent = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get("type") || "video";
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [contentTitle, setContentTitle] = useState("");
  const [contentDescription, setContentDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedThumbnail(e.target.files[0]);
    }
  };
  
  const simulateUpload = () => {
    if (!selectedFile || !selectedThumbnail) {
      toast({
        title: "Missing Files",
        description: "Please select both content file and thumbnail image",
        variant: "destructive",
      });
      return;
    }
    
    if (!contentTitle.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a title for your content",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsUploaded(true);
            toast({
              title: "Upload Complete",
              description: `Your ${activeTab === 'video' ? 'video' : 'resource'} has been uploaded successfully`,
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  const resetForm = () => {
    setContentTitle("");
    setContentDescription("");
    setSelectedFile(null);
    setSelectedThumbnail(null);
    setIsUploaded(false);
    setUploadProgress(0);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    resetForm();
  };
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8 animated-text">Upload Content</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="video" className="text-lg py-3">
              Upload Video
            </TabsTrigger>
            <TabsTrigger value="resource" className="text-lg py-3">
              Upload Resource
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video">
            <Card className="cyber-card p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Video Upload</h2>
                
                {isUploaded ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-neon-green" />
                    <h3 className="text-xl font-medium mb-2">Upload Complete!</h3>
                    <p className="text-white/70 mb-6">Your video has been uploaded successfully</p>
                    <Button onClick={resetForm}>Upload Another</Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Video Title
                        </label>
                        <Input
                          placeholder="Enter video title"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          disabled={isUploading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Video Description
                        </label>
                        <Textarea
                          placeholder="Enter video description"
                          value={contentDescription}
                          onChange={(e) => setContentDescription(e.target.value)}
                          disabled={isUploading}
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Video File
                        </label>
                        <div className="border-2 border-dashed border-neon-blue/50 rounded-lg p-6 text-center">
                          {selectedFile ? (
                            <div className="flex items-center justify-between bg-neon-blue/10 p-3 rounded">
                              <span className="truncate max-w-xs">{selectedFile.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                                disabled={isUploading}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="cursor-pointer py-4"
                            >
                              <FileUp className="mx-auto h-10 w-10 text-neon-blue mb-2" />
                              <p className="text-white/70">Click to select or drag a video file</p>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="video/*"
                            className="hidden"
                            disabled={isUploading}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Video Thumbnail (Required)
                        </label>
                        <div className="border-2 border-dashed border-neon-pink/50 rounded-lg p-6 text-center">
                          {selectedThumbnail ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between bg-neon-pink/10 p-3 rounded">
                                <span className="truncate max-w-xs">{selectedThumbnail.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedThumbnail(null)}
                                  disabled={isUploading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative h-40 bg-black/20 rounded overflow-hidden">
                                <img
                                  src={URL.createObjectURL(selectedThumbnail)}
                                  alt="Thumbnail preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => thumbnailInputRef.current?.click()}
                              className="cursor-pointer py-4"
                            >
                              <ImagePlus className="mx-auto h-10 w-10 text-neon-pink mb-2" />
                              <p className="text-white/70">Click to select a thumbnail image</p>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={thumbnailInputRef}
                            onChange={handleThumbnailSelect}
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-2 my-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex justify-end pt-4">
                      <Button
                        className="cyber-button"
                        onClick={simulateUpload}
                        disabled={isUploading || !selectedFile || !selectedThumbnail}
                      >
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="resource">
            <Card className="cyber-card p-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Resource Upload</h2>
                
                {isUploaded ? (
                  <div className="text-center py-8">
                    <CheckCircle className="mx-auto mb-4 h-16 w-16 text-neon-green" />
                    <h3 className="text-xl font-medium mb-2">Upload Complete!</h3>
                    <p className="text-white/70 mb-6">Your resource has been uploaded successfully</p>
                    <Button onClick={resetForm}>Upload Another</Button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Resource Title
                        </label>
                        <Input
                          placeholder="Enter resource title"
                          value={contentTitle}
                          onChange={(e) => setContentTitle(e.target.value)}
                          disabled={isUploading}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Resource Description
                        </label>
                        <Textarea
                          placeholder="Enter resource description"
                          value={contentDescription}
                          onChange={(e) => setContentDescription(e.target.value)}
                          disabled={isUploading}
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Resource File
                        </label>
                        <div className="border-2 border-dashed border-neon-blue/50 rounded-lg p-6 text-center">
                          {selectedFile ? (
                            <div className="flex items-center justify-between bg-neon-blue/10 p-3 rounded">
                              <span className="truncate max-w-xs">{selectedFile.name}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedFile(null)}
                                disabled={isUploading}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="cursor-pointer py-4"
                            >
                              <FileUp className="mx-auto h-10 w-10 text-neon-blue mb-2" />
                              <p className="text-white/70">Click to select or drag a file</p>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={isUploading}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Resource Thumbnail (Required)
                        </label>
                        <div className="border-2 border-dashed border-neon-pink/50 rounded-lg p-6 text-center">
                          {selectedThumbnail ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between bg-neon-pink/10 p-3 rounded">
                                <span className="truncate max-w-xs">{selectedThumbnail.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedThumbnail(null)}
                                  disabled={isUploading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="relative h-40 bg-black/20 rounded overflow-hidden">
                                <img
                                  src={URL.createObjectURL(selectedThumbnail)}
                                  alt="Thumbnail preview"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              onClick={() => thumbnailInputRef.current?.click()}
                              className="cursor-pointer py-4"
                            >
                              <ImagePlus className="mx-auto h-10 w-10 text-neon-pink mb-2" />
                              <p className="text-white/70">Click to select a thumbnail image</p>
                            </div>
                          )}
                          <input
                            type="file"
                            ref={thumbnailInputRef}
                            onChange={handleThumbnailSelect}
                            accept="image/*"
                            className="hidden"
                            disabled={isUploading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {isUploading && (
                      <div className="space-y-2 my-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex justify-end pt-4">
                      <Button
                        className="cyber-button"
                        onClick={simulateUpload}
                        disabled={isUploading || !selectedFile || !selectedThumbnail}
                      >
                        {isUploading ? 'Uploading...' : 'Upload Resource'}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UploadContent;
