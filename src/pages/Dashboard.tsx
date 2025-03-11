import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Calendar, 
  Bell, 
  Clock, 
  BarChart, 
  CheckCircle, 
  User, 
  Settings,
  Video,
  FileText,
  TestTube
} from "lucide-react";

// Mock user data
const USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

// Mock enrolled courses
const ENROLLED_COURSES = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    progress: 65,
    nextLesson: "Network Security Fundamentals",
    instructor: "Dr. Sarah Chen",
    dueDate: "2023-10-15",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 2,
    title: "Web Development Masterclass",
    progress: 32,
    nextLesson: "CSS Flexbox & Grid Layouts",
    instructor: "Mark Anderson",
    dueDate: "2023-10-18",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    progress: 78,
    nextLesson: "Predictive Modeling",
    instructor: "Dr. Michael Torres",
    dueDate: "2023-10-12",
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  }
];

// Mock upcoming events
const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Live Session: Advanced Security Concepts",
    date: "2023-10-12 14:00",
    type: "Live Class",
    course: "Introduction to Cybersecurity"
  },
  {
    id: 2,
    title: "Assignment Deadline: Portfolio Website",
    date: "2023-10-15 23:59",
    type: "Assignment",
    course: "Web Development Masterclass"
  },
  {
    id: 3,
    title: "Mock Test: Python Fundamentals",
    date: "2023-10-17 10:00",
    type: "Test",
    course: "Data Science Fundamentals"
  }
];

// Mock recent notifications
const NOTIFICATIONS = [
  {
    id: 1,
    title: "Assignment Graded",
    message: "Your Network Security assignment has been graded. You scored 92%.",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "New Course Material",
    message: "New materials have been added to Data Science Fundamentals.",
    time: "Yesterday"
  },
  {
    id: 3,
    title: "Instructor Announcement",
    message: "Dr. Sarah has posted an important announcement for Cybersecurity.",
    time: "Yesterday"
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern pb-20">
      <div className="relative holographic-bg py-8 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full overflow-hidden neon-border mr-4">
                <img 
                  src={USER.avatar} 
                  alt={USER.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{USER.name}</h1>
                <p className="text-white/70">{USER.email}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-neon-blue text-neon-blue">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="border-neon-purple text-neon-purple">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="courses" className="mt-4" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-cyber-light/20 p-1">
            <TabsTrigger value="courses" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              <BookOpen className="h-4 w-4 mr-2" />
              My Courses
            </TabsTrigger>
            <TabsTrigger value="schedule" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ENROLLED_COURSES.map(course => (
                <Card key={course.id} className="cyber-card p-6">
                  <div className="flex">
                    <div className="w-24 h-24 rounded overflow-hidden mr-4 neon-border">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                      <p className="text-white/70 text-sm mb-2">Instructor: {course.instructor}</p>
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-white/80">Progress</span>
                          <span className="text-sm font-medium text-neon-blue">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2 bg-cyber-light" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/70 text-sm">
                          <Clock className="h-4 w-4 mr-1 text-neon-purple" />
                          <span>Due: {new Date(course.dueDate).toLocaleDateString()}</span>
                        </div>
                        <Button size="sm" className="bg-neon-blue text-black hover:bg-neon-blue/80">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-neon-purple" />
                      <span className="text-white/80">Next Lesson:</span>
                      <span className="ml-2 text-white">{course.nextLesson}</span>
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button className="cyber-button">
                Browse More Courses
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Upcoming Schedule</h2>
            <div className="space-y-4">
              {UPCOMING_EVENTS.map(event => (
                <Card key={event.id} className="cyber-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        {event.type === "Live Class" && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neon-purple/20 text-neon-purple mr-3">
                            <Video className="h-4 w-4" />
                          </div>
                        )}
                        {event.type === "Assignment" && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neon-green/20 text-neon-green mr-3">
                            <FileText className="h-4 w-4" />
                          </div>
                        )}
                        {event.type === "Test" && (
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neon-blue/20 text-neon-blue mr-3">
                            <TestTube className="h-4 w-4" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <p className="text-white/70 text-sm">{event.course}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <div className="text-white/80 text-sm mr-4">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <Button size="sm" className="bg-neon-blue text-black hover:bg-neon-blue/80">
                        {event.type === "Live Class" ? "Join" : "View"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Recent Notifications</h2>
            <div className="space-y-4">
              {NOTIFICATIONS.map(notification => (
                <Card key={notification.id} className="cyber-card p-6">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{notification.title}</h3>
                      <p className="text-white/80">{notification.message}</p>
                    </div>
                    <div className="text-white/60 text-sm">
                      {notification.time}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
            <Card className="cyber-card p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-40 h-40 mx-auto rounded-full overflow-hidden neon-border">
                    <img 
                      src={USER.avatar} 
                      alt={USER.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <Button size="sm" className="bg-neon-blue text-black hover:bg-neon-blue/80">
                      Change Avatar
                    </Button>
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white/60 text-sm mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={USER.name} 
                        className="w-full bg-cyber-light/30 border border-neon-blue/50 rounded px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1">Email</label>
                      <input 
                        type="email" 
                        value={USER.email} 
                        className="w-full bg-cyber-light/30 border border-neon-blue/50 rounded px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (123) 456-7890" 
                        className="w-full bg-cyber-light/30 border border-neon-blue/50 rounded px-4 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm mb-1">Date of Birth</label>
                      <input 
                        type="date" 
                        className="w-full bg-cyber-light/30 border border-neon-blue/50 rounded px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="cyber-button">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
