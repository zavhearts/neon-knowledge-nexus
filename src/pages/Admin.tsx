import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
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
  DollarSign,
  MessageCircle,
  Edit,
  AlertCircle,
  RefreshCcw,
  RefreshCw,
  Database,
  Shield,
  Image
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import EditContentModal from "@/components/teacher/EditContentModal";

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

// Sample feedback data
const FEEDBACKS = [
  { id: 1, userId: 1, userName: "John Doe", userType: "Student", content: "The physics lecture videos are great, but they load slowly sometimes.", rating: 4, date: "2023-06-15", status: "New" },
  { id: 2, userId: 3, userName: "Robert Brown", userType: "Student", content: "I found the mathematics exercises too difficult.", rating: 3, date: "2023-06-14", status: "Reviewed" },
  { id: 3, userId: 2, userName: "Jane Smith", userType: "Teacher", content: "The zoom integration was problematic during my last class.", rating: 2, date: "2023-06-13", status: "New" },
  { id: 4, userId: 4, userName: "Emily Johnson", userType: "Student", content: "Really enjoying the interactive quizzes!", rating: 5, date: "2023-06-12", status: "Reviewed" },
];

// Sample content data
const CONTENT_LIST = [
  { id: 1, title: "Introduction to Physics", description: "Basic principles of physics", type: "Course", authorId: 2, authorName: "Jane Smith", thumbnailUrl: "/lovable-uploads/0895bf65-bed5-4685-82ff-8f07bedd103d.png" },
  { id: 2, title: "Algebra Fundamentals", description: "Core concepts of algebra", type: "Course", authorId: 2, authorName: "Jane Smith", thumbnailUrl: "/lovable-uploads/052ffcf4-d984-4cf5-8e56-67e1638a8861.png" },
  { id: 3, title: "Physics Formulas PDF", description: "Complete list of important formulas", type: "Resource", authorId: 2, authorName: "Jane Smith", thumbnailUrl: "/lovable-uploads/067a49d5-8a1a-4b2e-899f-ca0ca9318f7f.png" },
  { id: 4, title: "Web Development Cheatsheet", description: "HTML, CSS, and JavaScript quick references", type: "Resource", authorId: 5, authorName: "Sarah Connor", thumbnailUrl: "/lovable-uploads/6d0b63c4-3fcf-4756-8c97-c249e6e91073.png" },
];

// Sample website sections data
const WEBSITE_SECTIONS = [
  { id: 1, name: "Homepage Hero", type: "Section", lastUpdated: "2023-06-10" },
  { id: 2, name: "Services Cards", type: "Component", lastUpdated: "2023-06-08" },
  { id: 3, name: "Testimonials", type: "Component", lastUpdated: "2023-06-05" },
  { id: 4, name: "Footer Links", type: "Section", lastUpdated: "2023-06-01" },
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("users");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null);
  const [isEditContentModalOpen, setIsEditContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>(null);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    toast({
      title: `Theme Changed`,
      description: `Switched to ${!darkMode ? "dark" : "light"} mode`,
    });
  };

  const handleActionClick = (action: string, id: number, type: string) => {
    if (action === "Terminate" && type === "User") {
      toast({
        title: `User Termination`,
        description: `User #${id} has been terminated for policy violation.`,
        variant: "destructive",
      });
    } else if (action === "Edit" && type === "Content") {
      const content = CONTENT_LIST.find(item => item.id === id);
      if (content) {
        setContentToEdit(content);
        setIsEditContentModalOpen(true);
      }
    } else {
      toast({
        title: `${action} ${type} #${id}`,
        description: `${action} action performed on ${type.toLowerCase()} #${id}`,
      });
    }
  };

  const handleContentSave = (updatedContent: any) => {
    toast({
      title: "Content Updated",
      description: `${updatedContent.type} "${updatedContent.title}" has been updated successfully.`,
    });
    // In a real app, you would update your database here
  };

  const markFeedbackAsReviewed = (id: number) => {
    // In a real app, you would update your database here
    toast({
      title: "Feedback Marked as Reviewed",
      description: `Feedback #${id} has been marked as reviewed.`,
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
              <li>
                <button
                  onClick={() => setCurrentTab("feedback")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "feedback"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <MessageCircle className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">USER FEEDBACK</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("website")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "website"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Edit className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">WEBSITE CONTROL</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab("content")}
                  className={`w-full flex items-center px-4 py-3 rounded-md group transition-all ${
                    currentTab === "content"
                      ? darkMode ? 'bg-neon-blue text-black' : 'bg-blue-600 text-white' 
                      : darkMode ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <FileText className="mr-3 h-5 w-5" />
                  <span className="font-orbitron tracking-wider">CONTENT MANAGEMENT</span>
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
              {currentTab === "feedback" && "User Feedback"}
              {currentTab === "website" && "Website Control"}
              {currentTab === "content" && "Content Management"}
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
                              onClick={() => handleActionClick("Terminate", user.id, "User")}
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

          {currentTab === "feedback" && (
            <Card className={`p-6 ${darkMode ? 'cyber-card' : 'bg-white border-blue-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>User Feedback</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search feedback..."
                      className={`pl-10 ${darkMode ? 'bg-cyber-light/30 border-neon-blue/50' : 'bg-white border-gray-300'}`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Feedback List</h3>
                  
                  {FEEDBACKS.map((feedback) => (
                    <div 
                      key={feedback.id} 
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 feedback-comment ${
                        selectedFeedback === feedback.id ? 
                          (darkMode ? 'bg-neon-blue/20 border border-neon-blue/50' : 'bg-blue-50 border border-blue-200') : 
                          (darkMode ? 'bg-cyber-dark border border-white/10' : 'bg-white border border-gray-200')
                      }`}
                      onClick={() => setSelectedFeedback(feedback.id)}
                    >
                      <div className="flex justify-
