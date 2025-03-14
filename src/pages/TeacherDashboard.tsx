
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  FileText, 
  Users, 
  Calendar, 
  Search, 
  PlusCircle, 
  Upload, 
  Eye, 
  Edit, 
  Trash2 
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

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

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("classes");
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = (type: string) => {
    toast({
      title: `Upload ${type}`,
      description: `${type} upload form opened`,
    });
  };

  const handleAction = (action: string, id: number, type: string) => {
    toast({
      title: `${action} ${type} #${id}`,
      description: `${action} action performed on ${type.toLowerCase()} #${id}`,
    });
  };

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern">
      {/* Hero section with dashboard title */}
      <div className="relative holographic-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold animated-text">Teacher Dashboard</h1>
              <p className="text-white/70">Manage your classes, resources, and students</p>
            </div>
            
            <div className="mt-4 md:mt-0 space-x-2">
              <Button 
                variant="outline" 
                className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                onClick={() => handleUpload("Class")}
              >
                <Video className="h-4 w-4 mr-2" />
                Add Class
              </Button>
              
              <Button
                className="cyber-button"
                onClick={() => window.location.href = "/"}
              >
                Return to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="cyber-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-neon-blue/20 rounded-full mr-4">
                <Video className="h-6 w-6 text-neon-blue" />
              </div>
              <div>
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-white/70">Total Classes</div>
              </div>
            </div>
          </Card>
          
          <Card className="cyber-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-neon-purple/20 rounded-full mr-4">
                <Users className="h-6 w-6 text-neon-purple" />
              </div>
              <div>
                <div className="text-3xl font-bold">156</div>
                <div className="text-sm text-white/70">Students</div>
              </div>
            </div>
          </Card>
          
          <Card className="cyber-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-neon-green/20 rounded-full mr-4">
                <FileText className="h-6 w-6 text-neon-green" />
              </div>
              <div>
                <div className="text-3xl font-bold">28</div>
                <div className="text-sm text-white/70">Resources</div>
              </div>
            </div>
          </Card>
          
          <Card className="cyber-card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-neon-pink/20 rounded-full mr-4">
                <Calendar className="h-6 w-6 text-neon-pink" />
              </div>
              <div>
                <div className="text-3xl font-bold">4</div>
                <div className="text-sm text-white/70">Live Sessions</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Tabs for different dashboard sections */}
        <Tabs defaultValue="classes" className="mb-8" onValueChange={setActiveTab}>
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
                  <Button onClick={() => handleUpload("Class")}>
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
                    {CLASSES.map((cls) => (
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
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card className="cyber-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Resources</h2>
                <Button onClick={() => handleUpload("Resource")}>
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
                    {RESOURCES.map((resource) => (
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
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="students">
            <Card className="cyber-card p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Students</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Progress</th>
                      <th className="text-left py-3 px-4">Last Active</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STUDENTS.map((student) => (
                      <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4">{student.name}</td>
                        <td className="py-3 px-4">{student.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-40 bg-white/20 rounded-full h-2 mr-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  student.progress > 80 ? 'bg-neon-green' : 
                                  student.progress > 60 ? 'bg-neon-blue' : 
                                  'bg-neon-pink'
                                }`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span>{student.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{student.lastActive}</td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            variant="ghost" 
                            className="text-white/70 hover:text-white hover:bg-white/10"
                            size="sm"
                            onClick={() => handleAction("View", student.id, "Student")}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="uploads">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="cyber-card p-6">
                <div className="flex flex-col items-center justify-center text-center">
                  <Video className="h-12 w-12 mb-4 text-neon-blue" />
                  <h2 className="text-xl font-semibold mb-2">Upload Class Video</h2>
                  <p className="text-white/70 mb-6">Upload recorded videos of your classes</p>
                  <div className="border-2 border-dashed border-neon-blue/50 rounded-lg p-8 w-full mb-4 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 mb-2 text-neon-blue" />
                    <p className="text-sm text-white/70 mb-4">Drag & drop files here or click to browse</p>
                    <Button onClick={() => handleUpload("Video")}>
                      Select Video File
                    </Button>
                  </div>
                  <p className="text-xs text-white/50">
                    Supported formats: MP4, MOV, AVI (Max: 1GB)
                  </p>
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
                      onClick={() => handleUpload("Resource")}
                    >
                      Select Document
                    </Button>
                  </div>
                  <p className="text-xs text-white/50">
                    Supported formats: PDF, DOCX, PPTX, ZIP (Max: 100MB)
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
