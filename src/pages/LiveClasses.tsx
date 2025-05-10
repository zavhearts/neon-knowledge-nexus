
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Calendar, User, MessageSquare, Clock, Play, Users, Mic, MicOff, VideoOff, ScreenShare, ScreenShareOff, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

// Mock student data
const STUDENTS = [
  { id: 1, name: "Alex Johnson", status: "online", handRaised: false },
  { id: 2, name: "Maria Lopez", status: "online", handRaised: true },
  { id: 3, name: "John Davis", status: "online", handRaised: false },
  { id: 4, name: "Sarah Williams", status: "online", handRaised: false },
  { id: 5, name: "Michael Brown", status: "offline", handRaised: false },
];

interface Comment {
  id: number;
  user: string;
  message: string;
  time: string;
}

const LiveClasses = () => {
  const location = useLocation();
  const { isTeacher = false, startBroadcast = false } = location.state || {};
  
  const [activeClass, setActiveClass] = useState<number | null>(1); // Default to first class
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [isBroadcasting, setIsBroadcasting] = useState(startBroadcast);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [participants, setParticipants] = useState(STUDENTS);
  const [classTitle, setClassTitle] = useState("Live Class Session");
  const [handRaised, setHandRaised] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (startBroadcast) {
      handleStartBroadcast();
    }
  }, [startBroadcast]);
  
  // Mock function to simulate getting user media
  const handleGetUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "Camera and Microphone Connected",
        description: "Your devices are now ready for broadcasting.",
      });
    } catch (error) {
      console.error("Error accessing media devices:", error);
      toast({
        title: "Device Access Error",
        description: "Please check your camera and microphone permissions.",
        variant: "destructive"
      });
    }
  };
  
  const handleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop screen sharing
      setIsScreenSharing(false);
      if (screenShareRef.current && screenShareRef.current.srcObject) {
        const tracks = (screenShareRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        screenShareRef.current.srcObject = null;
      }
      toast({
        title: "Screen Sharing Stopped",
        description: "You're no longer sharing your screen."
      });
    } else {
      // Start screen sharing
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
        toast({
          title: "Screen Sharing Started",
          description: "You're now sharing your screen with participants."
        });
      } catch (error) {
        console.error("Error sharing screen:", error);
        toast({
          title: "Screen Sharing Error",
          description: "Unable to share your screen. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const handleStartBroadcast = () => {
    handleGetUserMedia();
    setIsBroadcasting(true);
    toast({
      title: "Broadcast Started",
      description: "You are now live! Students can see and hear you.",
    });
  };

  const handleStopBroadcast = () => {
    setIsBroadcasting(false);
    setIsRecording(false);
    
    // Stop all media tracks
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    
    if (isScreenSharing && screenShareRef.current && screenShareRef.current.srcObject) {
      const tracks = (screenShareRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    
    toast({
      title: "Broadcast Ended",
      description: "Your live class has ended. Thank you for teaching!",
    });
  };

  const handleToggleMic = () => {
    setIsMicOn(!isMicOn);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTracks = (videoRef.current.srcObject as MediaStream)
        .getAudioTracks();
      
      audioTracks.forEach(track => {
        track.enabled = !isMicOn;
      });
    }
    
    toast({
      title: isMicOn ? "Microphone Muted" : "Microphone Unmuted",
      description: isMicOn ? "Students can no longer hear you." : "Students can now hear you."
    });
  };

  const handleToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTracks = (videoRef.current.srcObject as MediaStream)
        .getVideoTracks();
      
      videoTracks.forEach(track => {
        track.enabled = !isCameraOn;
      });
    }
    
    toast({
      title: isCameraOn ? "Camera Turned Off" : "Camera Turned On",
      description: isCameraOn ? "Students can no longer see you." : "Students can now see you."
    });
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording 
        ? "Your class recording has been saved." 
        : "This class is now being recorded."
    });
  };

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
      if (!isTeacher) {
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
    }
  };

  const toggleVideoPlayback = () => {
    if (isTeacher) return; // Teachers don't toggle video playback
    
    setVideoPlaying(!videoPlaying);
    toast({
      title: videoPlaying ? "Video Paused" : "Video Playing",
      description: videoPlaying ? "You've paused the live stream." : "You're now watching the live stream.",
    });
  };
  
  const handleDeleteComment = (commentId: number) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
    toast({
      title: "Comment Removed",
      description: "The comment has been removed from the chat.",
    });
  };
  
  const handleToggleHand = () => {
    setHandRaised(!handRaised);
    toast({
      title: handRaised ? "Hand Lowered" : "Hand Raised",
      description: handRaised 
        ? "You've lowered your hand." 
        : "You've raised your hand. The instructor will see your request.",
    });
  };
  
  const handleToggleParticipantHand = (participantId: number) => {
    setParticipants(prevParticipants => 
      prevParticipants.map(p => 
        p.id === participantId 
          ? { ...p, handRaised: !p.handRaised } 
          : p
      )
    );
  };
  
  const handleRemoveParticipant = (participantId: number) => {
    const participant = participants.find(p => p.id === participantId);
    if (participant) {
      setParticipants(prevParticipants => 
        prevParticipants.filter(p => p.id !== participantId)
      );
      
      toast({
        title: "Participant Removed",
        description: `${participant.name} has been removed from the class.`,
      });
    }
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
              {isBroadcasting && isTeacher ? classTitle : "Live Learning Experience"}
            </h1>
            <p className="text-xl mb-8 text-white/80 text-center">
              {isTeacher 
                ? (isBroadcasting 
                  ? "You are currently broadcasting to students" 
                  : "Start broadcasting to connect with your students")
                : "Join real-time interactive classes with expert instructors"}
            </p>
            
            {/* Teacher broadcast controls */}
            {isTeacher && (
              <div className="flex justify-center mb-8">
                {!isBroadcasting ? (
                  <Button 
                    onClick={handleStartBroadcast}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg"
                  >
                    <Video className="h-6 w-6 mr-2" />
                    Start Broadcasting
                  </Button>
                ) : (
                  <div className="flex flex-wrap justify-center gap-3">
                    <Button
                      onClick={handleToggleCamera}
                      variant={isCameraOn ? "default" : "outline"}
                      className={isCameraOn ? "bg-neon-blue text-white" : "border-neon-blue text-neon-blue"}
                    >
                      {isCameraOn ? <Video className="h-4 w-4 mr-2" /> : <VideoOff className="h-4 w-4 mr-2" />}
                      {isCameraOn ? "Camera On" : "Camera Off"}
                    </Button>
                    
                    <Button
                      onClick={handleToggleMic}
                      variant={isMicOn ? "default" : "outline"}
                      className={isMicOn ? "bg-neon-blue text-white" : "border-neon-blue text-neon-blue"}
                    >
                      {isMicOn ? <Mic className="h-4 w-4 mr-2" /> : <MicOff className="h-4 w-4 mr-2" />}
                      {isMicOn ? "Mic On" : "Mic Off"}
                    </Button>
                    
                    <Button
                      onClick={handleScreenShare}
                      variant={isScreenSharing ? "default" : "outline"}
                      className={isScreenSharing ? "bg-neon-purple text-white" : "border-neon-purple text-neon-purple"}
                    >
                      {isScreenSharing ? <ScreenShareOff className="h-4 w-4 mr-2" /> : <ScreenShare className="h-4 w-4 mr-2" />}
                      {isScreenSharing ? "Stop Sharing" : "Share Screen"}
                    </Button>
                    
                    <Button
                      onClick={handleToggleRecording}
                      variant={isRecording ? "default" : "outline"}
                      className={isRecording ? "bg-red-500 text-white" : "border-red-500 text-red-500"}
                    >
                      {isRecording ? (
                        <>
                          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
                          Recording
                        </>
                      ) : (
                        <>
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="8" />
                          </svg>
                          Record
                        </>
                      )}
                    </Button>
                    
                    <Button
                      onClick={() => setShowParticipants(!showParticipants)}
                      variant="outline"
                      className="border-neon-green text-neon-green"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Participants ({participants.length})
                    </Button>
                    
                    <Button
                      onClick={() => setShowSettingsDialog(true)}
                      variant="outline"
                    >
                      <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                      </svg>
                      Settings
                    </Button>
                    
                    <Button
                      onClick={handleStopBroadcast}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <X className="h-4 w-4 mr-2" />
                      End Broadcast
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="cyber-card mb-8">
                {isTeacher && isBroadcasting ? (
                  <div className="grid grid-cols-1 gap-4">
                    {/* Teacher's video */}
                    <div className="relative neon-border overflow-hidden" style={{height: "400px"}}>
                      <video 
                        ref={videoRef}
                        autoPlay 
                        playsInline
                        muted={!isMicOn} 
                        className={`w-full h-full object-cover ${!isCameraOn ? 'hidden' : ''}`}
                      />
                      
                      {!isCameraOn && (
                        <div className="absolute inset-0 flex items-center justify-center bg-cyber-darker">
                          <div className="text-center">
                            <VideoOff className="h-16 w-16 mx-auto text-white/30 mb-4" />
                            <p className="text-white/50 text-lg font-medium">Camera is turned off</p>
                          </div>
                        </div>
                      )}
                      
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 text-sm font-medium">
                        LIVE
                      </Badge>
                      
                      {isRecording && (
                        <Badge className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-medium flex items-center">
                          <span className="animate-pulse mr-2 h-2 w-2 rounded-full bg-white"></span>
                          REC
                        </Badge>
                      )}
                    </div>
                    
                    {/* Screen sharing */}
                    {isScreenSharing && (
                      <div className="relative neon-border overflow-hidden" style={{height: "300px"}}>
                        <video 
                          ref={screenShareRef}
                          autoPlay 
                          playsInline 
                          className="w-full h-full object-contain bg-black"
                        />
                        <Badge className="absolute top-4 right-4 bg-neon-purple text-white px-3 py-1 text-sm font-medium">
                          SCREEN SHARE
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : activeClassData ? (
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
                ) : (
                  <div className="flex items-center justify-center h-64 bg-cyber-darker">
                    <p className="text-white/50">No active class selected</p>
                  </div>
                )}
                
                <div className="mt-4">
                  <Tabs defaultValue="chat">
                    <TabsList className="mb-4">
                      <TabsTrigger value="chat">Live Chat</TabsTrigger>
                      <TabsTrigger value="notes">Class Notes</TabsTrigger>
                      <TabsTrigger value="resources">Resources</TabsTrigger>
                      {isTeacher && isBroadcasting && showParticipants && (
                        <TabsTrigger value="participants">Participants</TabsTrigger>
                      )}
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
                              {isTeacher && comment.user !== "You" && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleDeleteComment(comment.id)}
                                  className="text-white/50 hover:text-white/80 ml-2"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <form onSubmit={handleSendComment} className="flex gap-2">
                        <Input 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder={isTeacher ? "Send a message to all students..." : "Type your question or comment..."} 
                          className="flex-grow"
                        />
                        {!isTeacher && (
                          <Button 
                            type="button"
                            variant={handRaised ? "default" : "outline"}
                            className={handRaised ? "bg-amber-500 hover:bg-amber-600" : "border-amber-500 text-amber-500"} 
                            onClick={handleToggleHand}
                          >
                            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15a1.575 1.575 0 103.15 0V7.5a.75.75 0 011.5 0v3.75a.75.75 0 01-1.5 0V9.575a1.575 1.575 0 00-3.15 0V15a.75.75 0 01-1.5 0V9.575a1.575 1.575 0 00-3.15 0V15a.75.75 0 01-1.5 0V7.575a3.075 3.075 0 016.15 0v.675c0-.621.504-1.125 1.125-1.125H14.5a.75.75 0 000-1.5h-3.75a.75.75 0 000 1.5h1.875c-.621 0-1.125.504-1.125 1.125v3.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V10.3c0-2.145-1.689-4.182-3.979-4.932-1.421-.466-2.859-.962-3.892-1.729a.75.75 0 00-1.08.32z" />
                            </svg>
                            {handRaised ? "Lower Hand" : "Raise Hand"}
                          </Button>
                        )}
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
                    
                    {isTeacher && isBroadcasting && (
                      <TabsContent value="participants">
                        <div className="cyber-card p-4">
                          <h3 className="text-xl font-bold mb-3">Participants ({participants.length})</h3>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {participants.map(participant => (
                              <div key={participant.id} className="flex items-center justify-between p-2 border-b border-white/10">
                                <div className="flex items-center">
                                  <div className={`h-2 w-2 rounded-full mr-2 ${participant.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                  <span>{participant.name}</span>
                                  {participant.handRaised && (
                                    <span className="ml-2 text-amber-500">
                                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3.15a1.575 1.575 0 103.15 0V7.5a.75.75 0 011.5 0v3.75a.75.75 0 01-1.5 0V9.575a1.575 1.575 0 00-3.15 0V15a.75.75 0 01-1.5 0V9.575a1.575 1.575 0 00-3.15 0V15a.75.75 0 01-1.5 0V7.575a3.075 3.075 0 016.15 0v.675c0-.621.504-1.125 1.125-1.125H14.5a.75.75 0 000-1.5h-3.75a.75.75 0 000 1.5h1.875c-.621 0-1.125.504-1.125 1.125v3.75c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V10.3c0-2.145-1.689-4.182-3.979-4.932-1.421-.466-2.859-.962-3.892-1.729a.75.75 0 00-1.08.32z" />
                                      </svg>
                                    </span>
                                  )}
                                </div>
                                <div className="flex space-x-2">
                                  {participant.handRaised && (
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="text-xs py-0 h-8"
                                      onClick={() => handleToggleParticipantHand(participant.id)}
                                    >
                                      Lower Hand
                                    </Button>
                                  )}
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-xs py-0 h-8 border-red-400 text-red-400 hover:bg-red-400/10"
                                    onClick={() => handleRemoveParticipant(participant.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              </div>
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
      
      {/* Teacher settings dialog */}
      {isTeacher && (
        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold animated-text">Class Settings</DialogTitle>
            </DialogHeader>
            
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Class Title</label>
                <Input 
                  value={classTitle} 
                  onChange={(e) => setClassTitle(e.target.value)}
                  placeholder="Enter class title" 
                  className="bg-cyber-dark border-neon-blue/30"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Class Options</h4>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Chat Moderation</p>
                    <p className="text-xs text-white/60">Review messages before they appear</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Automatic Recording</p>
                    <p className="text-xs text-white/60">Save recordings automatically</p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Allow Student Audio</p>
                    <p className="text-xs text-white/60">Let students speak during class</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSettingsDialog(false)}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default LiveClasses;
