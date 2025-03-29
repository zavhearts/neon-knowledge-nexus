
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Eye, Trash2, Download } from "lucide-react";

interface ResourceItem {
  id: number;
  title: string;
  type: string;
  size: string;
  downloads: number;
  date: string;
}

interface ResourcesTabProps {
  handleUploadClick: (type: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  resources: ResourceItem[];
  uploadedFiles: {
    resource: File[];
  };
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({
  handleUploadClick,
  handleAction,
  resources,
  uploadedFiles,
}) => {
  // Simulate download by opening a new tab
  const handleDownload = (id: number) => {
    // In a real app, this would point to the actual file URL
    handleAction("Download", id, "Resource");
    window.open(`/resources?download=${id}`, "_blank");
  };

  return (
    <Card className="cyber-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Resources</h2>
        <Button onClick={() => handleUploadClick("Resource")}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Size</th>
              <th className="text-left py-3 px-4">Downloads</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Show existing resources */}
            {resources.map((resource) => (
              <tr key={resource.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">{resource.title}</td>
                <td className="py-3 px-4">
                  <Badge className={
                    resource.type === "PDF" ? "bg-neon-blue text-black" : 
                    resource.type === "ZIP" ? "bg-neon-green text-black" : 
                    "bg-neon-purple text-white"
                  }>
                    {resource.type}
                  </Badge>
                </td>
                <td className="py-3 px-4">{resource.size}</td>
                <td className="py-3 px-4">{resource.downloads}</td>
                <td className="py-3 px-4">{resource.date}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      size="sm"
                      onClick={() => handleAction("View", resource.id, "Resource")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                      size="sm"
                      onClick={() => handleDownload(resource.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      size="sm"
                      onClick={() => handleAction("Delete", resource.id, "Resource")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Show newly uploaded resources */}
            {uploadedFiles.resource.map((file, index) => (
              <tr key={`uploaded-resource-${index}`} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">{file.name}</td>
                <td className="py-3 px-4">
                  <Badge className={
                    file.name.endsWith(".pdf") ? "bg-neon-blue text-black" : 
                    file.name.endsWith(".zip") ? "bg-neon-green text-black" : 
                    "bg-neon-purple text-white"
                  }>
                    {file.name.split('.').pop()?.toUpperCase() || "DOC"}
                  </Badge>
                </td>
                <td className="py-3 px-4">{(file.size / (1024 * 1024)).toFixed(1)} MB</td>
                <td className="py-3 px-4">0</td>
                <td className="py-3 px-4">{new Date().toLocaleDateString()}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      className="text-white/70 hover:text-white hover:bg-white/10"
                      size="sm"
                      onClick={() => handleAction("View", 1000 + index, "Resource")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
                      size="sm"
                      onClick={() => handleDownload(1000 + index)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                      size="sm"
                      onClick={() => handleAction("Delete", 1000 + index, "Resource")}
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

export default ResourcesTab;
