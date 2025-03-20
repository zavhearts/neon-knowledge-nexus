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
  TestTube,
  Home,
  LogOut,
  DownloadCloud,
  Upload,
  Sun,
  Moon
} from "lucide-react";
import { Link } from "react-router-dom";
import GamificationBar from "@/components/gamification/GamificationBar";
import SmartMockTest from "@/components/quiz/SmartMockTest";
import VirtualAssistant from "@/components/landing/VirtualAssistant";

const USER = {
  name: "Alex Johnson",
  email: "student@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

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

const RESOURCES = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals PDF",
    type: "PDF",
    size: "2.4 MB",
    course: "Introduction to Cybersecurity",
    date: "2023-09-15"
  },
  {
    id: 2,
    title: "Web Development Cheatsheet",
    type: "PDF",
    size: "1.2 MB",
    course: "Web Development Masterclass",
    date: "2023-09-20"
  },
  {
    id: 3,
    title: "Data Science Case Study",
    type: "ZIP",
    size: "4.7 MB",
    course: "Data Science Fundamentals",
    date: "2023-09-18"
  },
  {
    id: 4,
    title: "Python Programming - Video Tutorial",
    type: "MP4",
    size: "156 MB",
    course: "Data Science Fundamentals",
    date: "2023-09-22"
  }
];

const userGamification = {
  xp: 320,
  level: 4,
  xpToNextLevel: 500,
  totalXp: 1820,
  badges: [
    {
      id: "badge1",
      name: "First Course",
      icon: "trophy",
      achieved: true,
      description: "Completed your first course"
    },
    {
      id: "badge2",
      name: "Quiz Master",
      icon: "award",
      achieved: true,
      description: "Scored 100% on 3 quizzes"
    },
    {
      id: "badge3",
      name: "Early Bird",
      icon: "star",
      achieved: true,
      description: "Attended 5 live sessions"
    },
    {
      id: "badge4",
      name: "Consistent Learner",
      icon: "medal",
      achieved: false,
      description: "Study for 7 consecutive days"
    },
    {
      id: "badge5",
      name: "Resource Explorer",
      icon: "star",
      achieved: false,
      description: "Download 10 learning resources"
    }
  ]
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [darkMode, setDarkMode] = useState(false);
  const [showMockTest, setShowMockTest] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-blue pb-20">
      <div className="bg-white dark:bg-dark-blue/50 shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0">
                <img 
                  src="/lovable-uploads/6d0b63c4-3fcf-4756-8c97-c249e6e91073.png" 
                  alt="Easy Win Learning Hub" 
                  className="h-10"
                />
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 dark:text-gray-300"
                asChild
              >
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 dark:text-gray-300"
                asChild
              >
                <Link to="/login">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </Button>
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full border-2 border-royal-blue"
                  src={USER.avatar}
                  alt={USER.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white dark:bg-dark-blue/50 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-royal-blue mr-4">
                <img 
                  src={USER.avatar} 
                  alt={USER.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1 text-dark-blue dark:text-white">Welcome, {USER.name}</h1>
                <p className="text-gray-600 dark:text-gray-300">{USER.email}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue/10">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="border-teal text-teal hover:bg-teal/10">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-dark-blue/50 rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-royal-blue/10 border-l-4 border-royal-blue">
                <h2 className="font-bold text-dark-blue dark:text-white">Dashboard Menu</h2>
              </div>
              <nav className="p-2">
                <button 
                  onClick={() => setActiveTab("courses")}
                  className={`flex items-center w-full p-3 rounded-md text-left mb-1 ${
                    activeTab === "courses" 
                      ? "bg-royal-blue/10 text-royal-blue" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-blue/30"
                  }`}
                >
                  <BookOpen className="h-5 w-5 mr-3" />
                  My Courses
                </button>
                <button 
                  onClick={() => setActiveTab("schedule")}
                  className={`flex items-center w-full p-3 rounded-md text-left mb-1 ${
                    activeTab === "schedule" 
                      ? "bg-royal-blue/10 text-royal-blue" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-blue/30"
                  }`}
                >
                  <Calendar className="h-5 w-5 mr-3" />
                  Schedule
                </button>
                <button 
                  onClick={() => setActiveTab("resources")}
                  className={`flex items-center w-full p-3 rounded-md text-left mb-1 ${
                    activeTab === "resources" 
                      ? "bg-royal-blue/10 text-royal-blue" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-blue/30"
                  }`}
                >
                  <FileText className="h-5 w-5 mr-3" />
                  Resources
                </button>
                <button 
                  onClick={() => setActiveTab("notifications")}
                  className={`flex items-center w-full p-3 rounded-md text-left mb-1 ${
                    activeTab === "notifications" 
                      ? "bg-royal-blue/10 text-royal-blue" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-blue/30"
                  }`}
                >
                  <Bell className="h-5 w-5 mr-3" />
                  Notifications
                </button>
                <button 
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center w-full p-3 rounded-md text-left mb-1 ${
                    activeTab === "profile" 
                      ? "bg-royal-blue/10 text-royal-blue" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-blue/30"
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile
                </button>
              </nav>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {activeTab === "courses" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">My Enrolled Courses</h2>
                <div className="grid grid-cols-1 gap-6">
                  {ENROLLED_COURSES.map(course => (
                    <Card key={course.id} className="overflow-hidden bg-white dark:bg-dark-blue/50 shadow-md">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-24 h-24 rounded overflow-hidden">
                            <img 
                              src={course.image} 
                              alt={course.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-1 text-dark-blue dark:text-white">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">Instructor: {course.instructor}</p>
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
                                <span className="text-sm font-medium text-royal-blue">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2 bg-gray-200 dark:bg-dark-blue" />
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                                <Clock className="h-4 w-4 mr-1 text-teal" />
                                <span>Due: {new Date(course.dueDate).toLocaleDateString()}</span>
                              </div>
                              <Button size="sm" className="bg-royal-blue hover:bg-royal-blue/80 text-white">
                                Continue
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <p className="text-sm flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-teal" />
                            <span className="text-gray-600 dark:text-gray-300">Next Lesson:</span>
                            <span className="ml-2 text-dark-blue dark:text-white">{course.nextLesson}</span>
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Button className="bg-royal-blue hover:bg-royal-blue/80 text-white">
                    Browse More Courses
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === "schedule" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Upcoming Schedule</h2>
                <div className="space-y-4">
                  {UPCOMING_EVENTS.map(event => (
                    <Card key={event.id} className="bg-white dark:bg-dark-blue/50 shadow-md">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              {event.type === "Live Class" && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-teal/20 text-teal mr-3">
                                  <Video className="h-4 w-4" />
                                </div>
                              )}
                              {event.type === "Assignment" && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gold/20 text-gold mr-3">
                                  <FileText className="h-4 w-4" />
                                </div>
                              )}
                              {event.type === "Test" && (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-royal-blue/20 text-royal-blue mr-3">
                                  <TestTube className="h-4 w-4" />
                                </div>
                              )}
                              <div>
                                <h3 className="text-lg font-semibold text-dark-blue dark:text-white">{event.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{event.course}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center mt-2 md:mt-0">
                            <div className="text-gray-600 dark:text-gray-300 text-sm mr-4">
                              <Calendar className="h-4 w-4 inline mr-1" />
                              {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                            <Button size="sm" className="bg-royal-blue hover:bg-royal-blue/80 text-white">
                              {event.type === "Live Class" ? "Join" : "View"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "resources" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Learning Resources</h2>
                <div className="bg-white dark:bg-dark-blue/50 rounded-lg shadow-md p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-dark-blue dark:text-white mb-2 md:mb-0">Downloadable Materials</h3>
                    <Button variant="outline" className="border-royal-blue text-royal-blue">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Assignment
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-dark-blue/30 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-dark-blue/70">
                        <tr>
                          <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Title</th>
                          <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Type</th>
                          <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Course</th>
                          <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                          <th className="py-3 px-4 text-right text-gray-700 dark:text-gray-300 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {RESOURCES.map(resource => (
                          <tr key={resource.id} className="hover:bg-gray-50 dark:hover:bg-dark-blue/40">
                            <td className="py-3 px-4 text-dark-blue dark:text-white">{resource.title}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{resource.type}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{resource.course}</td>
                            <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{resource.date}</td>
                            <td className="py-3 px-4 text-right">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-royal-blue border-royal-blue hover:bg-royal-blue/10"
                              >
                                <DownloadCloud className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "notifications" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Recent Notifications</h2>
                <div className="space-y-4">
                  {NOTIFICATIONS.map(notification => (
                    <Card key={notification.id} className="bg-white dark:bg-dark-blue/50 shadow-md">
                      <div className="p-6">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-semibold mb-1 text-dark-blue dark:text-white">{notification.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{notification.message}</p>
                          </div>
                          <div className="text-gray-500 dark:text-gray-400 text-sm">
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Your Profile</h2>
                <Card className="bg-white dark:bg-dark-blue/50 shadow-md">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-royal-blue/50">
                          <img 
                            src={USER.avatar} 
                            alt={USER.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-4 text-center">
                          <Button size="sm" className="bg-royal-blue hover:bg-royal-blue/80 text-white">
                            Change Avatar
                          </Button>
                        </div>
                      </div>
                      <div className="md:w-2/3 md:pl-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">Full Name</label>
                            <input 
                              type="text" 
                              value={USER.name} 
                              className="w-full bg-white dark:bg-dark-blue/30 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-dark-blue dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">Email</label>
                            <input 
                              type="email" 
                              value={USER.email} 
                              className="w-full bg-white dark:bg-dark-blue/30 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-dark-blue dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">Phone Number</label>
                            <input 
                              type="tel" 
                              placeholder="+1 (123) 456-7890" 
                              className="w-full bg-white dark:bg-dark-blue/30 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-dark-blue dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">Date of Birth</label>
                            <input 
                              type="date" 
                              className="w-full bg-white dark:bg-dark-blue/30 border border-gray-300 dark:border-gray-600 rounded px-4 py-2 text-dark-blue dark:text-white"
                            />
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button className="bg-royal-blue hover:bg-royal-blue/80 text-white">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            {activeTab === "mock-tests" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-dark-blue dark:text-white">Smart Mock Tests</h2>
                
                {!showMockTest ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Card className="p-6 bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-royal-blue/20 flex items-center justify-center mr-3">
                          <TestTube className="h-5 w-5 text-royal-blue" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-dark-blue dark:text-white">Programming Fundamentals</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Test your coding knowledge</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Difficulty</span>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                            <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>3 questions</span>
                          <span>~5 min</span>
                        </div>
                      </div>
                      <Button 
                        className="w-full bg-royal-blue hover:bg-royal-blue/80 text-white"
                        onClick={() => setShowMockTest(true)}
                      >
                        Start Test
                      </Button>
                    </Card>
                    
                    <Card className="p-6 bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center mr-3">
                          <TestTube className="h-5 w-5 text-teal" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-dark-blue dark:text-white">Data Structures</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">Advanced algorithms & structures</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Difficulty</span>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-300">
                          <span>10 questions</span>
                          <span>~15 min</span>
                        </div>
                      </div>
                      <Button className="w-full bg-teal hover:bg-teal/80 text-white">
                        Start Test
                      </Button>
                    </Card>
                  </div>
                ) : (
                  <div>
                    <Button 
                      variant="outline" 
                      className="mb-4 border-gray-300 dark:border-gray-700" 
                      onClick={() => setShowMockTest(false)}
                    >
                      ← Back to Tests
                    </Button>
                    <SmartMockTest />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <VirtualAssistant />
    </div>
  );
};

export default Dashboard;
