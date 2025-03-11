
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, MessageSquare, ThumbsUp, Mic } from "lucide-react";

// Mock live classes data
const UPCOMING_CLASSES = [
  {
    id: 1,
    title: "Advanced Network Security Concepts",
    description: "Deep dive into advanced network security protocols and implementation strategies.",
    instructor: "Dr. Sarah Chen",
    course: "Introduction to Cybersecurity",
    date: "2023-10-15",
    time: "14:00 - 15:30",
    duration: "90 minutes",
    enrolled: 42,
    capacity: 50,
    status: "upcoming", // upcoming, live, completed
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    title: "Responsive Design with CSS Grid & Flexbox",
    description: "Learn how to create responsive layouts using modern CSS techniques.",
    instructor: "Mark Anderson",
    course: "Web Development Masterclass",
    date: "2023-10-16",
    time: "10:00 - 11:30",
    duration: "90 minutes",
    enrolled: 38,
    capacity: 45,
    status: "upcoming",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    title: "Data Visualization with Python",
    description: "Create effective data visualizations using matplotlib, seaborn, and plotly.",
    instructor: "Dr. Michael Torres",
    course: "Data Science Fundamentals",
    date: "2023-10-12",
    time: "16:00 - 17:30",
    duration: "90 minutes",
    enrolled: 45,
    capacity: 45,
    status: "live",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  },
  {
    id: 4,
    title: "UX Research Methods & Techniques",
    description: "Explore user experience research methodologies and practical applications.",
    instructor: "Emma Richardson",
    course: "UX/UI Design Principles",
    date: "2023-10-11",
    time: "13:00 - 14:30",
    duration: "90 minutes",
    enrolled: 36,
    capacity: 40,
    status: "completed",
    image: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

// Mock recorded classes
const RECORDED_CLASSES = [
  {
    id: 1,
    title: "Introduction to Cybersecurity Principles",
    description: "Overview of key cybersecurity concepts and foundational principles.",
    instructor: "Dr. Sarah Chen",
    course: "Introduction to Cybersecurity",
    date: "2023-09-30",
    duration: "85 minutes",
    views: 245,
    likes: 42,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    title: "HTML5 Semantic Elements",
    description: "Detailed explanation of HTML5 semantic tags and their appropriate usage.",
    instructor: "Mark Anderson",
    course: "Web Development Masterclass",
    date: "2023-09-28",
    duration: "72 minutes",
    views: 318,
    likes: 56,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    title: "Python Data Structures",
    description: "Comprehensive review of Python data structures for efficient data handling.",
    instructor: "Dr. Michael Torres",
    course: "Data Science Fundamentals",
    date: "2023-09-25",
    duration: "94 minutes",
    views: 287,
    likes: 49,
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern pb-20">
      <div className="relative holographic-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 animated-text text-center">
            Live Classes
          </h1>
          <p className="text-xl mb-8 text-white/80 text-center">
            Join interactive classes with real-time instructor guidance and peer collaboration
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button 
              className={`${activeTab === "upcoming" ? "bg-neon-blue text-black" : "bg-cyber-light/20 text-white"} px-6 py-2`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming & Live
            </Button>
            <Button 
              className={`${activeTab === "recorded" ? "bg-neon-blue text-black" : "bg-cyber-light/20 text-white"} px-6 py-2`}
              onClick={() => setActiveTab("recorded")}
            >
              Recorded Sessions
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {activeTab === "upcoming" && (
          <div>
            {/* Live Now Section */}
            {UPCOMING_CLASSES.some(cls => cls.status === "live") && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                  Live Now
                </h2>
                
                <div className="grid grid-cols-1 gap-6">
                  {UPCOMING_CLASSES.filter(cls => cls.status === "live").map(cls => (
                    <Card key={cls.id} className="cyber-card p-6 border border-red-500 shadow-neon-glow">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-64 mb-4 md:mb-0 md:mr-6">
                          <div className="aspect-video rounded-lg overflow-hidden neon-border relative bg-cyber-light/20">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Video className="h-16 w-16 text-neon-blue animate-pulse" />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 flex items-center">
                              <div className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></div>
                              LIVE
                            </Badge>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img 
                                  src={cls.image} 
                                  alt={cls.instructor} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-sm font-medium">{cls.instructor}</span>
                            </div>
                            <Badge className="bg-neon-blue/20 text-neon-blue">
                              <Users className="h-3 w-3 mr-1" />
                              {cls.enrolled}/{cls.capacity}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{cls.title}</h3>
                          </div>
                          <p className="text-white/70 text-sm mb-4">{cls.description}</p>
                          
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-sm text-white/60">
                              <Calendar className="h-4 w-4 mr-1 text-neon-purple" />
                              <span>{new Date(cls.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-sm text-white/60">
                              <Clock className="h-4 w-4 mr-1 text-neon-purple" />
                              <span>{cls.time}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            <Button className="cyber-button bg-red-500 border-red-500 shadow-none hover:bg-red-600">
                              Join Live Session
                            </Button>
                            <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat
                            </Button>
                            <Button variant="outline" className="border-neon-purple text-neon-purple hover:bg-neon-purple/10">
                              <Mic className="h-4 w-4 mr-2" />
                              Raise Hand
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upcoming Classes Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Upcoming Classes</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {UPCOMING_CLASSES.filter(cls => cls.status === "upcoming").map(cls => (
                  <Card key={cls.id} className="cyber-card p-6">
                    <div className="flex">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 neon-border">
                        <img 
                          src={cls.image} 
                          alt={cls.instructor} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{cls.title}</h3>
                        <p className="text-white/60 text-sm mb-2">
                          Instructor: {cls.instructor} • {cls.course}
                        </p>
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">{cls.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Badge className="bg-neon-blue/20 text-neon-blue flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(cls.date).toLocaleDateString()}
                          </Badge>
                          <Badge className="bg-neon-purple/20 text-neon-purple flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {cls.time}
                          </Badge>
                          <Badge className="bg-neon-green/20 text-neon-green flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {cls.enrolled}/{cls.capacity}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                      <div className="text-sm text-white/60">
                        Duration: {cls.duration}
                      </div>
                      <Button className="bg-neon-blue text-black hover:bg-neon-blue/80">
                        Set Reminder
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Past Classes Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recently Completed</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {UPCOMING_CLASSES.filter(cls => cls.status === "completed").map(cls => (
                  <Card key={cls.id} className="cyber-card p-6 opacity-80 hover:opacity-100 transition-opacity">
                    <div className="flex">
                      <div className="w-16 h-16 rounded-full overflow-hidden mr-4 grayscale">
                        <img 
                          src={cls.image} 
                          alt={cls.instructor} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{cls.title}</h3>
                        <p className="text-white/60 text-sm mb-2">
                          Instructor: {cls.instructor} • {cls.course}
                        </p>
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">{cls.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Badge className="bg-gray-500/20 text-gray-300 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(cls.date).toLocaleDateString()}
                          </Badge>
                          <Badge className="bg-gray-500/20 text-gray-300 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {cls.time}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                      <Button className="bg-gray-500 text-white hover:bg-gray-600">
                        View Recording
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "recorded" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Recorded Sessions</h2>
            
            <div className="grid grid-cols-1 gap-6">
              {RECORDED_CLASSES.map(cls => (
                <Card key={cls.id} className="cyber-card p-6">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 mb-4 md:mb-0 md:mr-6">
                      <div className="aspect-video rounded-lg overflow-hidden neon-border relative bg-cyber-light/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="h-16 w-16 text-neon-blue" />
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            <img 
                              src={cls.image} 
                              alt={cls.instructor} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{cls.instructor}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/60">
                          <ThumbsUp className="h-3 w-3 mr-1 text-neon-purple" />
                          <span>{cls.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold">{cls.title}</h3>
                      </div>
                      <p className="text-white/70 text-sm mb-4">{cls.description}</p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="flex items-center text-sm text-white/60">
                          <Calendar className="h-4 w-4 mr-1 text-neon-purple" />
                          <span>{new Date(cls.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/60">
                          <Clock className="h-4 w-4 mr-1 text-neon-purple" />
                          <span>{cls.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-white/60">
                          <Users className="h-4 w-4 mr-1 text-neon-purple" />
                          <span>{cls.views} views</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4">
                        <Button className="cyber-button">
                          Watch Recording
                        </Button>
                        <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                          Download Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveClasses;
