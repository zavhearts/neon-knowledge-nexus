
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  Video,
  Broadcast,
  CheckSquare,
  BarChart3,
  BadgePercent,
  Home,
  LogOut,
  Search,
  Edit,
  Trash2,
  Eye,
  UserPlus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Mock user data
const USERS = [
  { id: 1, name: "John Doe", role: "Student", status: "Active", email: "john@example.com" },
  { id: 2, name: "Jane Smith", role: "Teacher", status: "Banned", email: "jane@example.com" },
  { id: 3, name: "Alex Brown", role: "Student", status: "Active", email: "alex@example.com" },
  { id: 4, name: "Sarah Wilson", role: "Teacher", status: "Active", email: "sarah@example.com" },
  { id: 5, name: "Mark Johnson", role: "Student", status: "Inactive", email: "mark@example.com" },
];

const Admin = () => {
  const [activeSection, setActiveSection] = useState("user-management");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [users, setUsers] = useState(USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [300, 450, 600, 500, 700, 800]
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBanUser = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "Banned" ? "Active" : "Banned" }
        : user
    ));
    
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: user.status === "Banned" ? "User Unbanned" : "User Banned",
        description: `${user.name} has been ${user.status === "Banned" ? "unbanned" : "banned"}.`
      });
    }
  };

  const handleDeleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    
    if (user) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: `${user.name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleViewUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "User Details",
        description: `Viewing details for ${user.name}.`
      });
    }
  };

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "User creation form will be available soon."
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully."
    });
    navigate("/");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sections = [
    { id: "user-management", name: "User Management", icon: Users },
    { id: "class-management", name: "Class Management", icon: Video },
    { id: "live-monitor", name: "Live Monitor", icon: Broadcast },
    { id: "mock-tests", name: "Mock Test Control", icon: CheckSquare },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "ad-management", name: "Ad Management", icon: BadgePercent },
  ];

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";

    // Create fake chart on mount
    const createChart = () => {
      const canvas = document.getElementById("activityChart") as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw line chart
          ctx.beginPath();
          ctx.strokeStyle = isDarkMode ? "#00f3ff" : "#0000ff";
          ctx.lineWidth = 3;
          
          const stepX = canvas.width / (chartData.labels.length - 1);
          const maxData = Math.max(...chartData.data);
          
          // Start drawing lines
          chartData.data.forEach((value, index) => {
            const x = index * stepX;
            const y = canvas.height - (value / maxData) * canvas.height;
            
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            
            // Draw points
            ctx.fillStyle = isDarkMode ? "#00f3ff" : "#0000ff";
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
          });
          
          ctx.stroke();
          
          // Draw labels
          ctx.fillStyle = isDarkMode ? "#ffffff" : "#000000";
          ctx.font = "12px Orbitron";
          chartData.labels.forEach((label, index) => {
            const x = index * stepX;
            ctx.fillText(label, x - 10, canvas.height - 10);
          });
        }
      }
    };
    
    createChart();
  }, [isDarkMode, chartData]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-cyber-dark" : "bg-cyan-50"} flex flex-col`}>
      <div className="holographic-bg"></div>
      
      {/* Theme Toggle */}
      <div className="fixed top-5 right-5 z-10">
        <Button 
          className={`${isDarkMode ? "bg-neon-blue" : "bg-blue-600"} text-black font-orbitron`}
          onClick={toggleTheme}
        >
          Toggle Theme
        </Button>
      </div>
      
      {/* Dashboard */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`w-72 ${isDarkMode ? "bg-[#0b0b22] border-r-[3px] border-neon-blue" : "bg-white/90 border-r-[3px] border-blue-600"} backdrop-blur-md p-6 transition-all`}>
          <div className="flex justify-between items-center">
            <h2 className={`text-2xl font-orbitron font-bold ${isDarkMode ? "text-neon-blue" : "text-blue-600"}`}>EASY WIN ADMIN</h2>
          </div>
          
          <div className="mt-6">
            <Link
              to="/"
              className={`px-4 py-3 rounded-md flex items-center space-x-2 mb-4 ${isDarkMode ? "bg-neon-blue/20 text-white" : "bg-blue-100 text-blue-800"}`}
            >
              <Home className="h-5 w-5" />
              <span className="font-orbitron">Home</span>
            </Link>
            
            <nav className="mt-8 space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className={`w-full px-4 py-3 rounded-md flex items-center space-x-2 transition-all ${
                      activeSection === section.id
                        ? isDarkMode
                          ? "bg-neon-blue text-black" 
                          : "bg-blue-600 text-white"
                        : isDarkMode
                          ? "text-white hover:bg-white/10" 
                          : "text-blue-800 hover:bg-blue-100"
                    } font-orbitron text-sm uppercase tracking-wide`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{section.name}</span>
                  </button>
                );
              })}
            </nav>
            
            <button
              className={`w-full mt-10 px-4 py-3 rounded-md flex items-center space-x-2 ${
                isDarkMode
                  ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              } transition-all font-orbitron text-sm uppercase tracking-wide`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className={`text-3xl font-orbitron font-bold mb-8 ${isDarkMode ? "text-neon-blue" : "text-blue-800"}`}>
            {sections.find(s => s.id === activeSection)?.name || 'Dashboard'}
          </h1>
          
          {activeSection === "user-management" && (
            <>
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg`}>
                  <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                  <p className="text-3xl font-bold">{users.length}</p>
                  <div className="mt-2 text-sm">
                    <span className={`${isDarkMode ? "text-green-400" : "text-green-600"}`}>Active: {users.filter(u => u.status === "Active").length}</span>
                    <span className="mx-2">|</span>
                    <span className={`${isDarkMode ? "text-red-400" : "text-red-600"}`}>Banned: {users.filter(u => u.status === "Banned").length}</span>
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg`}>
                  <h3 className="text-xl font-semibold mb-2">User Roles</h3>
                  <p className="text-3xl font-bold">{users.filter(u => u.role === "Student").length + users.filter(u => u.role === "Teacher").length}</p>
                  <div className="mt-2 text-sm">
                    <span className={`${isDarkMode ? "text-neon-blue" : "text-blue-600"}`}>Students: {users.filter(u => u.role === "Student").length}</span>
                    <span className="mx-2">|</span>
                    <span className={`${isDarkMode ? "text-neon-purple" : "text-purple-600"}`}>Teachers: {users.filter(u => u.role === "Teacher").length}</span>
                  </div>
                </div>
                
                <div className={`p-6 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg`}>
                  <h3 className="text-xl font-semibold mb-2">New Users</h3>
                  <p className="text-3xl font-bold">5</p>
                  <div className="mt-2 text-sm">
                    <span className={`${isDarkMode ? "text-neon-green" : "text-green-600"}`}>Last 7 days</span>
                  </div>
                </div>
              </div>
              
              {/* User Management Table */}
              <div className={`p-6 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg mb-8`}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">User Management</h3>
                  
                  <div className="flex gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        className={`pl-10 ${isDarkMode ? "bg-cyber-light/30 border-neon-blue/50" : "bg-blue-50 border-blue-200"}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      className={isDarkMode ? "bg-neon-blue text-black" : "bg-blue-600 text-white"}
                      onClick={handleAddUser}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={isDarkMode ? "bg-[#7b61ff]" : "bg-blue-600"}>
                        <th className="p-4 text-left font-orbitron text-white">Name</th>
                        <th className="p-4 text-left font-orbitron text-white">Email</th>
                        <th className="p-4 text-left font-orbitron text-white">Role</th>
                        <th className="p-4 text-left font-orbitron text-white">Status</th>
                        <th className="p-4 text-left font-orbitron text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr 
                          key={user.id} 
                          className={`border-b ${isDarkMode ? "border-white/10 hover:bg-white/5" : "border-blue-100 hover:bg-blue-50"} transition-colors`}
                        >
                          <td className="p-4">{user.name}</td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === "Student" 
                                ? isDarkMode ? "bg-neon-blue/20 text-neon-blue" : "bg-blue-100 text-blue-800"
                                : isDarkMode ? "bg-neon-purple/20 text-neon-purple" : "bg-purple-100 text-purple-800"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "Active" 
                                ? isDarkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-800"
                                : user.status === "Banned" 
                                  ? isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-800"
                                  : isDarkMode ? "bg-yellow-500/20 text-yellow-400" : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className={isDarkMode ? "border-neon-blue/50 text-neon-blue hover:bg-neon-blue/10" : "border-blue-300 text-blue-600 hover:bg-blue-50"}
                                onClick={() => handleViewUser(user.id)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className={user.status === "Banned" 
                                  ? isDarkMode ? "border-green-500/50 text-green-400 hover:bg-green-500/10" : "border-green-300 text-green-600 hover:bg-green-50"
                                  : isDarkMode ? "border-red-500/50 text-red-400 hover:bg-red-500/10" : "border-red-300 text-red-600 hover:bg-red-50"
                                }
                                onClick={() => handleBanUser(user.id)}
                              >
                                {user.status === "Banned" ? "Unban" : "Ban"}
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className={isDarkMode ? "border-red-500/50 text-red-400 hover:bg-red-500/10" : "border-red-300 text-red-600 hover:bg-red-50"}
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-white/60">No users found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Analytics Chart */}
              <div className={`p-6 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg`}>
                <h3 className="text-xl font-bold mb-4">User Activity</h3>
                <div className="h-64 w-full">
                  <canvas id="activityChart" height="250"></canvas>
                </div>
              </div>
            </>
          )}
          
          {activeSection !== "user-management" && (
            <div className={`p-8 rounded-lg ${isDarkMode ? "bg-[#15152b] border-2 border-[#7b61ff]/40" : "bg-white border-2 border-blue-200"} shadow-lg text-center`}>
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
              <p className={`${isDarkMode ? "text-white/60" : "text-gray-500"} max-w-md mx-auto`}>
                The {sections.find(s => s.id === activeSection)?.name} section is under development. 
                Please check back soon for updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
