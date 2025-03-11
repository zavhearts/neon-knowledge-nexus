
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Book, Video, TestTube, 
  DollarSign, BarChart, Activity, 
  User, Settings, Bell, Eye, UserX, 
  Trash2, Calendar, BookOpenCheck
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for admin dashboard
const ACTIVE_USERS = 1245;
const ACTIVE_CLASSES = 87;
const TOTAL_REVENUE = 12450;
const COURSES_COUNT = 36;

// Mock user data
const USERS = [
  { id: 1, name: "John Doe", role: "Student", status: "Active", lastLogin: "2023-10-20" },
  { id: 2, name: "Jane Smith", role: "Teacher", status: "Active", lastLogin: "2023-10-22" },
  { id: 3, name: "Robert Brown", role: "Student", status: "Banned", lastLogin: "2023-10-15" },
  { id: 4, name: "Emily Davis", role: "Student", status: "Active", lastLogin: "2023-10-21" },
  { id: 5, name: "Michael Wilson", role: "Teacher", status: "Active", lastLogin: "2023-10-22" },
];

// Mock class data
const CLASSES = [
  { id: 1, title: "Intro to Web Development", instructor: "Jane Smith", status: "Live", students: 28 },
  { id: 2, title: "Advanced Python Programming", instructor: "Michael Wilson", status: "Scheduled", students: 22 },
  { id: 3, title: "Machine Learning Basics", instructor: "Jane Smith", status: "Recorded", students: 45 },
  { id: 4, title: "Cybersecurity Fundamentals", instructor: "Alex Johnson", status: "Recorded", students: 32 },
];

const Admin = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    toast({
      title: darkMode ? "Light Mode Activated" : "Dark Mode Activated",
      description: "Dashboard theme has been updated.",
    });
  };

  const handleAction = (action: string, id: number, type: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} action performed on ${type} #${id}.`,
    });
  };

  // Filtered users based on search
  const filteredUsers = USERS.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout>
      <div className={`min-h-screen bg-cyber-dark ${darkMode ? 'bg-circuit-pattern' : 'bg-white/5'}`}>
        <div className="holographic-background"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold animated-text">Admin Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={toggleTheme}
              className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
            >
              Toggle Theme
            </Button>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="admin-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <Users className="h-6 w-6 text-neon-blue" />
              </div>
              <p className="text-4xl font-bold mb-2">{ACTIVE_USERS}</p>
              <div className="flex items-center text-white/60 text-sm">
                <span className="text-green-400 mr-1">+24</span>
                <span>since last week</span>
              </div>
            </Card>
            
            <Card className="admin-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Active Classes</h3>
                <Video className="h-6 w-6 text-neon-purple" />
              </div>
              <p className="text-4xl font-bold mb-2">{ACTIVE_CLASSES}</p>
              <div className="flex items-center text-white/60 text-sm">
                <span className="text-green-400 mr-1">+12</span>
                <span>since last month</span>
              </div>
            </Card>
            
            <Card className="admin-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Revenue</h3>
                <DollarSign className="h-6 w-6 text-neon-green" />
              </div>
              <p className="text-4xl font-bold mb-2">${TOTAL_REVENUE}</p>
              <div className="flex items-center text-white/60 text-sm">
                <span className="text-green-400 mr-1">+8.5%</span>
                <span>since last month</span>
              </div>
            </Card>
            
            <Card className="admin-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Courses</h3>
                <Book className="h-6 w-6 text-neon-pink" />
              </div>
              <p className="text-4xl font-bold mb-2">{COURSES_COUNT}</p>
              <div className="flex items-center text-white/60 text-sm">
                <span className="text-green-400 mr-1">+3</span>
                <span>new this month</span>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="users" className="mb-8">
            <TabsList className="mb-6 bg-cyber-darker">
              <TabsTrigger value="users" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                <Users className="h-4 w-4 mr-2" />
                User Management
              </TabsTrigger>
              <TabsTrigger value="classes" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                <Video className="h-4 w-4 mr-2" />
                Class Management
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                <BarChart className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="users">
              <Card className="admin-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">User Management</h2>
                  <div className="flex items-center">
                    <Input 
                      placeholder="Search users..." 
                      className="mr-2 bg-cyber-darker border-neon-blue/30"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => toast({ title: "Add User", description: "User creation form will appear here." })}>
                      Add User
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Last Login</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
                                <User className="h-4 w-4 text-neon-blue" />
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={user.role === "Teacher" ? "outline" : "default"}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={user.status === "Active" ? "bg-green-500" : "bg-red-500"}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{user.lastLogin}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8"
                                onClick={() => handleAction("View", user.id, "user")}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8 border-red-500 text-red-500 hover:bg-red-500/10"
                                onClick={() => handleAction("Ban", user.id, "user")}
                              >
                                <UserX className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8 border-red-700 text-red-700 hover:bg-red-700/10"
                                onClick={() => handleAction("Delete", user.id, "user")}
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
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 text-white/20" />
                    <h3 className="text-xl font-semibold mb-2">No users found</h3>
                    <p className="text-white/60">Try adjusting your search parameters</p>
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="classes">
              <Card className="admin-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Class Management</h2>
                  <Button onClick={() => toast({ title: "New Class", description: "Class creation form will appear here." })}>
                    Add Class
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left py-3 px-4">Title</th>
                        <th className="text-left py-3 px-4">Instructor</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Students</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {CLASSES.map(cls => (
                        <tr key={cls.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center mr-3">
                                <Video className="h-4 w-4 text-neon-blue" />
                              </div>
                              {cls.title}
                            </div>
                          </td>
                          <td className="py-3 px-4">{cls.instructor}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                cls.status === "Live" ? "bg-red-500" : 
                                cls.status === "Scheduled" ? "bg-neon-blue" : 
                                "bg-green-500"
                              }
                            >
                              {cls.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{cls.students}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8"
                                onClick={() => handleAction("View", cls.id, "class")}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8"
                                onClick={() => handleAction("Edit", cls.id, "class")}
                              >
                                <BookOpenCheck className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="px-2 py-1 h-8 border-red-700 text-red-700 hover:bg-red-700/10"
                                onClick={() => handleAction("Delete", cls.id, "class")}
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
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="admin-card p-6">
                  <h2 className="text-2xl font-bold mb-4">User Activity</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Daily Active Users</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Course Completion Rate</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Live Class Attendance</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Resource Downloads</span>
                        <span>91%</span>
                      </div>
                      <Progress value={91} className="h-2" />
                    </div>
                  </div>
                </Card>
                
                <Card className="admin-card p-6">
                  <h2 className="text-2xl font-bold mb-4">Revenue Breakdown</h2>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <p className="text-white/60 mb-1">Subscriptions</p>
                      <p className="text-2xl font-bold">$8,350</p>
                    </div>
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <p className="text-white/60 mb-1">One-time Purchases</p>
                      <p className="text-2xl font-bold">$4,100</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Monthly Plans</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-cyber-darker rounded-full overflow-hidden">
                        <div className="h-full bg-neon-blue" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Annual Plans</span>
                        <span>22%</span>
                      </div>
                      <div className="h-2 bg-cyber-darker rounded-full overflow-hidden">
                        <div className="h-full bg-neon-purple" style={{ width: "22%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Course Purchases</span>
                        <span>33%</span>
                      </div>
                      <div className="h-2 bg-cyber-darker rounded-full overflow-hidden">
                        <div className="h-full bg-neon-green" style={{ width: "33%" }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="admin-card p-6 lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-4">Monthly Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <div className="flex items-center">
                        <Activity className="h-8 w-8 text-neon-blue mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">User Growth</p>
                          <p className="text-xl font-bold">+24.8%</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <div className="flex items-center">
                        <Bell className="h-8 w-8 text-neon-purple mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Engagement</p>
                          <p className="text-xl font-bold">+12.3%</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-8 w-8 text-neon-green mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Class Completion</p>
                          <p className="text-xl font-bold">78.5%</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-cyber-darker rounded-lg">
                      <div className="flex items-center">
                        <TestTube className="h-8 w-8 text-neon-pink mr-3" />
                        <div>
                          <p className="text-white/60 text-sm">Test Pass Rate</p>
                          <p className="text-xl font-bold">92.7%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-8 border border-dashed border-white/20 rounded-lg">
                    <BarChart className="h-16 w-16 mx-auto mb-4 text-neon-blue" />
                    <p className="text-lg mb-4">Detailed analytics charts will be displayed here</p>
                    <Button onClick={() => toast({ title: "Analytics", description: "Detailed analytics will be implemented soon." })}>
                      Generate Report
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card className="admin-card p-6">
                <h2 className="text-2xl font-bold mb-6">Dashboard Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 mb-2">Dashboard Name</label>
                        <Input defaultValue="Easy Win Admin Dashboard" className="bg-cyber-darker border-neon-blue/30" />
                      </div>
                      <div>
                        <label className="block text-white/70 mb-2">Timezone</label>
                        <select className="w-full bg-cyber-darker border border-neon-blue/30 rounded-md px-3 py-2 text-white">
                          <option>UTC (Universal Time Coordinated)</option>
                          <option>EST (Eastern Standard Time)</option>
                          <option>CST (Central Standard Time)</option>
                          <option>PST (Pacific Standard Time)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dark Mode</span>
                        <Button 
                          variant={darkMode ? "default" : "outline"} 
                          onClick={toggleTheme}
                          size="sm"
                        >
                          {darkMode ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <Button 
                          variant="default"
                          size="sm"
                          onClick={() => toast({ title: "Notifications", description: "Email notifications enabled." })}
                        >
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Browser Notifications</span>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => toast({ title: "Notifications", description: "Browser notifications enabled." })}
                        >
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SMS Notifications</span>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => toast({ title: "Notifications", description: "SMS notifications enabled." })}
                        >
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button 
                    className="bg-neon-blue text-black hover:bg-neon-blue/80"
                    onClick={() => toast({ title: "Settings Saved", description: "Your dashboard settings have been updated." })}
                  >
                    Save Settings
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Admin;
