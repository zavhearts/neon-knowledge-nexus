
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Calendar, User, MessageSquare, Clock, Play, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock live classes data
const LIVE_CLASSES = [
  {
    id: 1,
    title: "Advanced Web Development Techniques",
    instructor: "Mark Anderson",
    time: "10:00 AM - 11:30 AM",
    date: "2023-10-25",
    participants: 34,
    status: "Live",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 2,
    title: "Introduction to Cybersecurity",
    instructor: "Dr. Sarah Chen",
    time: "2:00 PM - 3:30 PM",
    date: "2023-10-25",
    participants: 28,
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    instructor: "Dr. Michael Torres",
    time: "4:00 PM - 5:30 PM",
    date: "2023-10-25",
    participants: 42,
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  },
  {
    id: 4,
    title: "UX/UI Design Workshop",
    instructor: "Emma Richardson",
    time: "11:00 AM - 12:30 PM",
    date: "2023-10-26",
    participants: 25,
    status: "Upcoming",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
  }
];

// Mock comments for the live chat
const INITIAL_COMMENTS = [
  { id: 1, user: "Alex J.", message: "Great explanation of the concepts!", time: "2 minutes ago" },
  { id: 2, user: "Maria L.", message: "Could you explain more about responsive design?", time: "5 minutes ago" },
  { id: 3, user: "John D.", message: "Thanks for the detailed walkthrough!", time: "8 minutes ago" }
];

const LiveClasses = () => {
  const [activeClass, setActiveClass] = useState<number | null>(1); // Default to first class
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(true);

  const handleJoinClass = (classId: number) => {
    setActiveClass(classId);
    toast({
      title: "Joining Live Class",
      description: "You have joined the live class session.",
    });
  };

  const handleRemindMe = (classId: number) => {
    toast({
      title: "Reminder Set",
      description: "You will be notified when this class starts.",
    });
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        user: "You",
        message: newComment,
        time: "Just now"
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
      
      // Simulate instructor response after a delay
      setTimeout(() => {
        const instructorResponse = {
          id: Date.now() + 1,
          user: "Instructor",
          message: "Thanks for your question! I'll address that shortly.",
          time: "Just now"
        };
        setComments(prevComments => [instructorResponse, ...prevComments]);
      }, 5000);
    }
  };

  const toggleVideoPlayback = () => {
    setVideoPlaying(!videoPlaying);
    toast({
      title: videoPlaying ? "Video Paused" : "Video Playing",
      description: videoPlaying ? "You've paused the live stream." : "You're now watching the live stream.",
    });
  };

  const activeClassData = LIVE_CLASSES.find(cls => cls.id === activeClass);

  return (
    <MainLayout>
      <div className="min-h-screen bg-cyber-dark bg-circuit-pattern pb-20">
        <div className="relative holographic-bg py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 animated-text text-center">
              Live Learning Experience
            </h1>
            <p className="text-xl mb-8 text-white/80 text-center">
              Join real-time interactive classes with expert instructors
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeClassData && (
                <div className="cyber-card mb-8">
                  <div className="relative neon-border overflow-hidden" style={{height: "400px"}}>
                    <img 
                      src={activeClassData.thumbnail} 
                      alt={activeClassData.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-center">
                      <Button 
                        className={`rounded-full p-3 ${videoPlaying ? 'bg-red-500' : 'bg-neon-blue'} hover:scale-110 transition-transform`}
                        onClick={toggleVideoPlayback}
                      >
                        <Play className={`h-8 w-8 ${videoPlaying ? '' : 'text-white'}`} />
                      </Button>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-medium">
                      LIVE
                    </Badge>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h2 className="text-2xl font-bold mb-1">{activeClassData.title}</h2>
                      <div className="flex items-center text-white/80 text-sm">
                        <User className="h-4 w-4 mr-1" />
                        <span className="mr-4">{activeClassData.instructor}</span>
                        <Users className="h-4 w-4 mr-1" />
                        <span>{activeClassData.participants} participants</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Tabs defaultValue="chat">
                      <TabsList className="mb-4">
                        <TabsTrigger value="chat">Live Chat</TabsTrigger>
                        <TabsTrigger value="notes">Class Notes</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="chat" className="space-y-4">
                        <div className="h-64 overflow-y-auto p-4 border border-neon-blue/30 rounded-lg bg-cyber-darker">
                          {comments.map(comment => (
                            <div key={comment.id} className="mb-3 last:mb-0">
                              <div className={`flex items-start ${comment.user === "You" ? "justify-end" : ""}`}>
                                <div className={`max-w-[80%] ${comment.user === "You" ? "bg-neon-blue/20" : "bg-white/10"} p-3 rounded-lg`}>
                                  <div className="flex justify-between items-start mb-1">
                                    <span className={`font-medium ${comment.user === "Instructor" ? "text-neon-purple" : ""}`}>{comment.user}</span>
                                    <span className="text-xs text-white/50 ml-2">{comment.time}</span>
                                  </div>
                                  <p className="text-white/90">{comment.message}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <form onSubmit={handleSendComment} className="flex gap-2">
                          <Input 
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Type your message..." 
                            className="flex-grow"
                          />
                          <Button type="submit">Send</Button>
                        </form>
                      </TabsContent>
                      
                      <TabsContent value="notes">
                        <div className="cyber-card p-4">
                          <h3 className="text-xl font-bold mb-3">Class Notes</h3>
                          <p className="text-white/70 mb-2">Key points covered in this session:</p>
                          <ul className="list-disc pl-5 space-y-1 text-white/70">
                            <li>Introduction to web development principles</li>
                            <li>Responsive design techniques and best practices</li>
                            <li>Modern CSS frameworks comparison</li>
                            <li>Performance optimization strategies</li>
                          </ul>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="resources">
                        <div className="cyber-card p-4">
                          <h3 className="text-xl font-bold mb-3">Downloadable Resources</h3>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" onClick={() => alert("Resource downloading...")}>
                              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Lecture Slides (PDF)
                            </Button>
                            <Button variant="outline" className="w-full justify-start" onClick={() => alert("Resource downloading...")}>
                              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Code Examples (ZIP)
                            </Button>
                            <Button variant="outline" className="w-full justify-start" onClick={() => alert("Resource downloading...")}>
                              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Additional Readings (PDF)
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              )}
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4 animated-text">Upcoming Classes</h2>
              <div className="space-y-4">
                {LIVE_CLASSES.map(cls => (
                  <Card key={cls.id} className={`cyber-card p-4 ${activeClass === cls.id ? 'border-2 border-neon-blue' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded overflow-hidden neon-border">
                        <img src={cls.thumbnail} alt={cls.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{cls.title}</h3>
                        <div className="flex items-center text-white/70 text-sm mb-1">
                          <User className="h-3 w-3 mr-1" />
                          <span>{cls.instructor}</span>
                        </div>
                        <div className="flex items-center text-white/70 text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="mr-2">{cls.date}</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{cls.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                      <Badge className={`${cls.status === 'Live' ? 'bg-red-500' : 'bg-neon-blue'}`}>
                        {cls.status}
                      </Badge>
                      {cls.status === 'Live' ? (
                        <Button size="sm" onClick={() => handleJoinClass(cls.id)}>
                          Join Now
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleRemindMe(cls.id)}>
                          Remind Me
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 cyber-card p-6">
                <h3 className="text-xl font-bold mb-3">Your Schedule</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neon-blue" />
                      <span>Today, Oct 25</span>
                    </div>
                    <Badge>3 Classes</Badge>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neon-purple" />
                      <span>Tomorrow, Oct 26</span>
                    </div>
                    <Badge>2 Classes</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-neon-pink" />
                      <span>Friday, Oct 27</span>
                    </div>
                    <Badge>1 Class</Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => alert("View complete schedule coming soon!")}>
                  View Complete Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveClasses;
