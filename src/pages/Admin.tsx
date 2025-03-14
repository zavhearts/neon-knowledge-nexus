
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, LineChart, PieChart } from "recharts";
import { 
  Users, 
  Video, 
  Radio, 
  CheckSquare, 
  BarChart2, 
  BellRing,
  PlusCircle,
  Search,
  Settings,
  Upload,
  UserX,
  Trash2,
  Eye,
  User,
  FileText,
  Calendar,
  CreditCard,
  DollarSign
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample data for admin dashboard
const USERS = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Teacher", status: "Active" },
  { id: 3, name: "Robert Brown", email: "robert@example.com", role: "Student", status: "Inactive" },
  { id: 4, name: "Emily Johnson", email: "emily@example.com", role: "Student", status: "Active" },
  { id: 5, name: "Michael Wilson", email: "michael@example.com", role: "Admin", status: "Active" },
];

const CLASSES = [
  { id: 1, title: "Introduction to Mathematics", instructor: "Jane Smith", students: 32, status: "Active" },
  { id: 2, title: "Advanced Physics", instructor: "Dr. Richard Feynman", students: 28, status: "Active" },
  { id: 3, title: "Web Development Basics", instructor: "Sarah Connor", students: 45, status: "Scheduled" },
  { id: 4, title: "Data Science Fundamentals", instructor: "Alan Turing", students: 38, status: "Active" },
];

const REVENUE_DATA = [
  { name: 'Jan', Subscriptions: 4000, Courses: 2400, Total: 6400 },
  { name: 'Feb', Subscriptions: 3000, Courses: 1398, Total: 4398 },
  { name: 'Mar', Subscriptions: 2000, Courses: 9800, Total: 11800 },
  { name: 'Apr', Subscriptions: 2780, Courses: 3908, Total: 6688 },
  { name: 'May', Subscriptions: 1890, Courses: 4800, Total: 6690 },
  { name: 'Jun', Subscriptions: 2390, Courses: 3800, Total: 6190 },
];

const USER_ACTIVITY = [
  { name: 'Mon', Students: 5, Teachers: 3 },
  { name: 'Tue', Students: 12, Teachers: 4 },
  { name: 'Wed', Students: 8, Teachers: 2 },
  { name: 'Thu', Students: 15, Teachers: 5 },
  { name: 'Fri', Students: 20, Teachers: 6 },
  { name: 'Sat', Students: 18, Teachers: 3 },
  { name: 'Sun', Students: 10, Teachers: 1 },
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("users");
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    toast({
      title: `Theme Changed`,
      description: `Switched to ${!darkMode ? "dark" : "light"} mode`,
    });
  };

  const handleActionClick = (action: string, id: number, type: string) => {
    toast({
      title: `${action} ${type} #${id}`,
      description: `${action} action performed on ${type.toLowerCase()} #${id}`,
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-cyber-dark bg-circuit-pattern' : 'bg-blue-50'}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-cyber-darker opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
      </div>

      <div className="dashboard relative z-10 flex min-h-screen">
        {/* Sidebar */}
        <aside className={`sidebar fixed h-full w-72 p-6 border-r ${darkMode ? 'bg-cyber-darker/90 border-neon-blue/30' : 'bg-white/90 border-blue-200'} backdrop-blur-md`}>
          <div className="flex items-center justify-between mb-12">
            <h2 className={`text-2xl font-bold font-orbitron ${darkMode ? 'text-neon-blue animate-pulse-slow' : 'text-blue-700'}`}>
              EASY WIN ADMIN
            </h2>
          </div>

          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentTab("users")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "users"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Users className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">USER MANAGEMENT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("classes")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "classes"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Video className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">CLASS MANAGEMENT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("live")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "live"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Radio className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">LIVE MONITOR</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("tests")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "tests"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <CheckSquare className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">MOCK TESTS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("analytics")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "analytics"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <BarChart2 className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">ANALYTICS</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("uploads")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "uploads"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Upload className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">UPLOADS</span>
                </button>
              </li>
            </ul>
          </nav>

          <div className="absolute bottom-0 left-0 w-full p-6">
            <Button 
              onClick={() => window.location.href = "/"}
              className={`w-full ${darkMode ? 'bg-cyan-600 hover:bg-cyan-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
            >
              Return to Home
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-72 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-3xl font-bold font-orbitron ${darkMode ? 'text-neon-blue animate-text-glow' : 'text-blue-700'}`}>
              {currentTab === "users" && "User Management"}
              {currentTab === "classes" && "Class Management"}
              {currentTab === "live" && "Live Monitor"}
              {currentTab === "tests" && "Mock Tests"}
              {currentTab === "analytics" && "Analytics"}
              {currentTab === "uploads" && "Content Uploads"}
            </h1>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className={darkMode ? "border-neon-blue text-neon-blue hover:bg-neon-blue/10" : "border-blue-500 text-blue-500 hover:bg-blue-50"}
                onClick={toggleTheme}
              >
                Toggle Theme
              </Button>
              
              <Button 
                variant="outline" 
                className={darkMode ? "border-neon-purple text-neon-purple hover:bg-neon-purple/10" : "border-purple-500 text-purple-500 hover:bg-purple-50"}
                onClick={() => toast({ title: "Settings", description: "Settings panel opened" })}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Dashboard Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className={`cyber-card p-6 ${darkMode ? '' : 'bg-white border-blue-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-neon-blue/20' : 'bg-blue-100'}`}>
                  <Users className={darkMode ? "h-6 w-6 text-neon-blue" : "h-6 w-6 text-blue-600"} />
                </div>
                <Badge className={darkMode ? "bg-neon-blue text-black" : "bg-blue-100 text-blue-800"}>+12%</Badge>
              </div>
              <h3 className="text-xl font-bold mb-1">{USERS.length}</h3>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Total Users</p>
            </Card>
            
            <Card className={`cyber-card p-6 ${darkMode ? '' : 'bg-white border-blue-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-neon-purple/20' : 'bg-purple-100'}`}>
                  <Video className={darkMode ? "h-6 w-6 text-neon-purple" : "h-6 w-6 text-purple-600"} />
                </div>
                <Badge className={darkMode ? "bg-neon-purple text-white" : "bg-purple-100 text-purple-800"}>+8%</Badge>
              </div>
              <h3 className="text-xl font-bold mb-1">{CLASSES.length}</h3>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Active Classes</p>
            </Card>
            
            <Card className={`cyber-card p-6 ${darkMode ? '' : 'bg-white border-blue-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-neon-pink/20' : 'bg-pink-100'}`}>
                  <Radio className={darkMode ? "h-6 w-6 text-neon-pink" : "h-6 w-6 text-pink-600"} />
                </div>
                <Badge className={darkMode ? "bg-neon-pink text-black" : "bg-pink-100 text-pink-800"}>+5%</Badge>
              </div>
              <h3 className="text-xl font-bold mb-1">2</h3>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Live Sessions</p>
            </Card>
            
            <Card className={`cyber-card p-6 ${darkMode ? '' : 'bg-white border-blue-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${darkMode ? 'bg-neon-green/20' : 'bg-green-100'}`}>
                  <DollarSign className={darkMode ? "h-6 w-6 text-neon-green" : "h-6 w-6 text-green-600"} />
                </div>
                <Badge className={darkMode ? "bg-neon-green text-black" : "bg-green-100 text-green-800"}>+20%</Badge>
              </div>
              <h3 className="text-xl font-bold mb-1">$12,450</h3>
              <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-gray-500'}`}>Monthly Revenue</p>
            </Card>
          </div>

          {/* Main Content Tabs */}
          {currentTab === "users" && (
            <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>User Management</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      className={`pl-10 ${darkMode ? 'bg-cyber-light/30 border-neon-blue/50' : 'bg-white border-gray-300'}`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button onClick={() => toast({ title: "Add User", description: "User creation form opened" })}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className={`w-full border-collapse ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <thead>
                    <tr className={darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}>
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {USERS.map((user) => (
                      <tr 
                        key={user.id} 
                        className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${user.role === 'Admin' ? 
                              (darkMode ? 'bg-neon-blue text-black' : 'bg-blue-100 text-blue-800') : 
                            user.role === 'Teacher' ? 
                              (darkMode ? 'bg-neon-purple text-white' : 'bg-purple-100 text-purple-800') : 
                              (darkMode ? 'bg-neon-green text-black' : 'bg-green-100 text-green-800')}
                          `}>
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${user.status === 'Active' ? 
                              (darkMode ? 'bg-neon-green text-black' : 'bg-green-100 text-green-800') : 
                              (darkMode ? 'bg-red-500 text-white' : 'bg-red-100 text-red-800')}
                          `}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              className={darkMode ? "text-red-500 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}
                              size="sm"
                              onClick={() => handleActionClick("Ban", user.id, "User")}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              className={darkMode ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-500 hover:bg-gray-50"}
                              size="sm"
                              onClick={() => handleActionClick("View", user.id, "User")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              className={darkMode ? "text-red-500 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}
                              size="sm"
                              onClick={() => handleActionClick("Delete", user.id, "User")}
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
          )}

          {currentTab === "classes" && (
            <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Class Management</h2>
                <Button onClick={() => toast({ title: "Add Class", description: "Class creation form opened" })}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className={`w-full border-collapse ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <thead>
                    <tr className={darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}>
                      <th className="text-left py-3 px-4">Title</th>
                      <th className="text-left py-3 px-4">Instructor</th>
                      <th className="text-left py-3 px-4">Students</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLASSES.map((cls) => (
                      <tr 
                        key={cls.id} 
                        className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}
                      >
                        <td className="py-3 px-4">{cls.title}</td>
                        <td className="py-3 px-4">{cls.instructor}</td>
                        <td className="py-3 px-4">{cls.students}</td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${cls.status === 'Active' ? 
                              (darkMode ? 'bg-neon-green text-black' : 'bg-green-100 text-green-800') : 
                              (darkMode ? 'bg-neon-purple text-white' : 'bg-purple-100 text-purple-800')}
                          `}>
                            {cls.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              className={darkMode ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-500 hover:bg-gray-50"}
                              size="sm"
                              onClick={() => handleActionClick("View", cls.id, "Class")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              className={darkMode ? "text-red-500 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}
                              size="sm"
                              onClick={() => handleActionClick("Delete", cls.id, "Class")}
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
          )}

          {currentTab === "uploads" && (
            <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Content Uploads</h2>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    className={darkMode ? "border-neon-purple text-neon-purple hover:bg-neon-purple/10" : "border-purple-500 text-purple-500"}
                    onClick={() => toast({ title: "Upload Video", description: "Video upload form opened" })}
                  >
                    <Video className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                  <Button 
                    variant="outline"
                    className={darkMode ? "border-neon-blue text-neon-blue hover:bg-neon-blue/10" : "border-blue-500 text-blue-500"}
                    onClick={() => toast({ title: "Upload Resource", description: "Resource upload form opened" })}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${darkMode ? 'border-neon-blue/50 bg-neon-blue/5' : 'border-blue-300 bg-blue-50'}`}>
                  <div className="flex flex-col items-center justify-center">
                    <Upload className={`h-12 w-12 mb-4 ${darkMode ? 'text-neon-blue' : 'text-blue-500'}`} />
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Upload Recorded Classes
                    </h3>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                      Drag and drop video files or click to browse
                    </p>
                    <Button 
                      className={darkMode ? 'bg-neon-blue text-black hover:bg-neon-blue/90' : 'bg-blue-600 hover:bg-blue-700'}
                      onClick={() => toast({ title: "File Browser", description: "Video file browser opened" })}
                    >
                      Browse Files
                    </Button>
                    <p className={`mt-4 text-xs ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                      Supported formats: MP4, MOV, AVI, up to 1.5GB
                    </p>
                  </div>
                </div>
                
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${darkMode ? 'border-neon-purple/50 bg-neon-purple/5' : 'border-purple-300 bg-purple-50'}`}>
                  <div className="flex flex-col items-center justify-center">
                    <FileText className={`h-12 w-12 mb-4 ${darkMode ? 'text-neon-purple' : 'text-purple-500'}`} />
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Upload Resources
                    </h3>
                    <p className={`mb-4 text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                      Drag and drop documents or click to browse
                    </p>
                    <Button 
                      className={darkMode ? 'bg-neon-purple text-white hover:bg-neon-purple/90' : 'bg-purple-600 hover:bg-purple-700'}
                      onClick={() => toast({ title: "File Browser", description: "Document file browser opened" })}
                    >
                      Browse Files
                    </Button>
                    <p className={`mt-4 text-xs ${darkMode ? 'text-white/50' : 'text-gray-400'}`}>
                      Supported formats: PDF, DOCX, PPTX, XLSX, up to 100MB
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Uploads</h3>
              <div className="overflow-x-auto">
                <table className={`w-full border-collapse ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  <thead>
                    <tr className={darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}>
                      <th className="text-left py-3 px-4">File Name</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Size</th>
                      <th className="text-left py-3 px-4">Uploaded By</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-right py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}>
                      <td className="py-3 px-4">Physics_Lecture_1.mp4</td>
                      <td className="py-3 px-4">
                        <Badge className={darkMode ? 'bg-neon-purple text-white' : 'bg-purple-100 text-purple-800'}>
                          Video
                        </Badge>
                      </td>
                      <td className="py-3 px-4">245 MB</td>
                      <td className="py-3 px-4">Jane Smith</td>
                      <td className="py-3 px-4">2023-06-15</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            className={darkMode ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-500 hover:bg-gray-50"}
                            size="sm"
                            onClick={() => toast({ title: "View Video", description: "Opening video player" })}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            className={darkMode ? "text-red-500 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}
                            size="sm"
                            onClick={() => toast({ title: "Delete Video", description: "Video deleted successfully" })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}>
                      <td className="py-3 px-4">Math_Formulas.pdf</td>
                      <td className="py-3 px-4">
                        <Badge className={darkMode ? 'bg-neon-blue text-black' : 'bg-blue-100 text-blue-800'}>
                          Document
                        </Badge>
                      </td>
                      <td className="py-3 px-4">2.5 MB</td>
                      <td className="py-3 px-4">Jane Smith</td>
                      <td className="py-3 px-4">2023-06-14</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            className={darkMode ? "text-white/70 hover:text-white hover:bg-white/10" : "text-gray-500 hover:bg-gray-50"}
                            size="sm"
                            onClick={() => toast({ title: "View Document", description: "Opening document viewer" })}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            className={darkMode ? "text-red-500 hover:text-red-400 hover:bg-red-500/10" : "text-red-500 hover:bg-red-50"}
                            size="sm"
                            onClick={() => toast({ title: "Delete Document", description: "Document deleted successfully" })}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {currentTab === "analytics" && (
            <div className="space-y-6">
              <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
                <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Revenue Overview</h2>
                <div className="h-80 w-full">
                  <div className="text-center py-20">
                    <BarChart2 className={`mx-auto h-12 w-12 mb-4 ${darkMode ? 'text-neon-blue' : 'text-blue-500'}`} />
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Chart Visualization
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                      Revenue data visualization would be displayed here
                    </p>
                  </div>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
                  <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>User Activity</h2>
                  <div className="h-60 w-full">
                    <div className="text-center py-16">
                      <Users className={`mx-auto h-10 w-10 mb-4 ${darkMode ? 'text-neon-purple' : 'text-purple-500'}`} />
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        User Activity Chart
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                        User activity data visualization would be displayed here
                      </p>
                    </div>
                  </div>
                </Card>
                
                <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
                  <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Class Engagement</h2>
                  <div className="h-60 w-full">
                    <div className="text-center py-16">
                      <Video className={`mx-auto h-10 w-10 mb-4 ${darkMode ? 'text-neon-green' : 'text-green-500'}`} />
                      <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        Class Engagement Chart
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                        Class engagement data visualization would be displayed here
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {currentTab === "live" && (
            <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
              <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Live Session Monitor</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className={`p-4 border rounded-lg ${darkMode ? 'border-neon-purple bg-neon-purple/10' : 'border-purple-200 bg-purple-50'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Advanced Physics Live Class
                    </h3>
                    <Badge className={darkMode ? 'bg-red-500 text-white animate-pulse' : 'bg-red-100 text-red-800 animate-pulse'}>
                      LIVE NOW
                    </Badge>
                  </div>
                  <div className={`aspect-video bg-black rounded-lg flex items-center justify-center mb-3 ${darkMode ? 'border border-neon-purple' : 'border border-purple-300'}`}>
                    <div className="text-center">
                      <Radio className={`h-10 w-10 mb-2 ${darkMode ? 'text-neon-purple' : 'text-purple-500'}`} />
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                        Live Video Feed
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Instructor: <span className="font-semibold">Dr. Richard Feynman</span>
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Duration: <span className="font-semibold">45:12</span>
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Students: <span className="font-semibold">28 active</span>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 border rounded-lg ${darkMode ? 'border-neon-blue bg-neon-blue/10' : 'border-blue-200 bg-blue-50'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Web Development Workshop
                    </h3>
                    <Badge className={darkMode ? 'bg-red-500 text-white animate-pulse' : 'bg-red-100 text-red-800 animate-pulse'}>
                      LIVE NOW
                    </Badge>
                  </div>
                  <div className={`aspect-video bg-black rounded-lg flex items-center justify-center mb-3 ${darkMode ? 'border border-neon-blue' : 'border border-blue-300'}`}>
                    <div className="text-center">
                      <Radio className={`h-10 w-10 mb-2 ${darkMode ? 'text-neon-blue' : 'text-blue-500'}`} />
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-500'}`}>
                        Live Video Feed
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Instructor: <span className="font-semibold">Sarah Connor</span>
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Duration: <span className="font-semibold">32:45</span>
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-white/70' : 'text-gray-600'}`}>
                        Students: <span className="font-semibold">45 active</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Upcoming Live Sessions</h3>
              <table className={`w-full border-collapse ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <thead>
                  <tr className={darkMode ? 'border-b border-white/20' : 'border-b border-gray-200'}>
                    <th className="text-left py-3 px-4">Class Name</th>
                    <th className="text-left py-3 px-4">Instructor</th>
                    <th className="text-left py-3 px-4">Date & Time</th>
                    <th className="text-left py-3 px-4">Duration</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}>
                    <td className="py-3 px-4">Data Science Fundamentals</td>
                    <td className="py-3 px-4">Alan Turing</td>
                    <td className="py-3 px-4">Tomorrow, 10:00 AM</td>
                    <td className="py-3 px-4">1 hour</td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={darkMode ? 'border-neon-green text-neon-green hover:bg-neon-green/10' : 'border-green-500 text-green-500 hover:bg-green-50'}
                        onClick={() => toast({ title: "Edit Session", description: "Session edit form opened" })}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                  <tr className={`${darkMode ? 'border-b border-white/10 hover:bg-white/5' : 'border-b border-gray-100 hover:bg-gray-50'} transition-colors`}>
                    <td className="py-3 px-4">Mathematics Advanced Topics</td>
                    <td className="py-3 px-4">Jane Smith</td>
                    <td className="py-3 px-4">Friday, 2:00 PM</td>
                    <td className="py-3 px-4">1.5 hours</td>
                    <td className="py-3 px-4 text-right">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={darkMode ? 'border-neon-green text-neon-green hover:bg-neon-green/10' : 'border-green-500 text-green-500 hover:bg-green-50'}
                        onClick={() => toast({ title: "Edit Session", description: "Session edit form opened" })}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
