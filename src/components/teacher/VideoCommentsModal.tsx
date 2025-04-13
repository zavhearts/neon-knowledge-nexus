
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: number;
  studentName: string;
  studentAvatar?: string;
  timestamp: string;
  videoTime: string;
  text: string;
  replies: Reply[];
}

interface Reply {
  id: number;
  author: string;
  isTeacher: boolean;
  text: string;
  timestamp: string;
}

interface VideoCommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
}

const VideoCommentsModal: React.FC<VideoCommentsModalProps> = ({ isOpen, onClose, videoTitle }) => {
  const [replyText, setReplyText] = useState("");
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  
  // Sample comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      studentName: "Alex Johnson",
      timestamp: "2023-10-05 14:25",
      videoTime: "05:32",
      text: "Can you explain the concept of polymorphism in more detail?",
      replies: [
        {
          id: 101,
          author: "Professor Smith",
          isTeacher: true,
          text: "Great question! Polymorphism allows objects of different classes to be treated as objects of a common superclass. It's a way for the same code to be used for different types.",
          timestamp: "2023-10-05 15:10"
        }
      ]
    },
    {
      id: 2,
      studentName: "Sarah Williams",
      timestamp: "2023-10-04 09:12",
      videoTime: "12:45",
      text: "I'm confused about the difference between HTTP and HTTPS. Could you please clarify?",
      replies: []
    },
    {
      id: 3,
      studentName: "Michael Brown",
      timestamp: "2023-10-03 16:08",
      videoTime: "23:17",
      text: "The formula you used at this point seems different from what was in the previous lecture. Is this an alternative approach?",
      replies: [
        {
          id: 102,
          author: "Professor Smith",
          isTeacher: true,
          text: "You're right to notice the difference! This is indeed an alternative approach that's more efficient for large datasets.",
          timestamp: "2023-10-03 17:30"
        }
      ]
    }
  ]);
  
  const handleReply = (commentId: number) => {
    if (!replyText.trim()) return;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              author: "Professor Smith",
              isTeacher: true,
              text: replyText,
              timestamp: new Date().toLocaleString()
            }
          ]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyText("");
    setActiveCommentId(null);
    
    toast({
      title: "Reply Posted",
      description: "Your reply has been posted successfully"
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Student Questions - {videoTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4 pr-2 space-y-6">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="border border-white/10 rounded-lg p-4 bg-cyber-light/5">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 bg-neon-blue/20 text-neon-blue border border-neon-blue/30">
                    <span>{comment.studentName.charAt(0)}</span>
                  </Avatar>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{comment.studentName}</span>
                        <span className="text-xs text-white/50 ml-2">at video time {comment.videoTime}</span>
                      </div>
                      <span className="text-xs text-white/50">{comment.timestamp}</span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                    
                    {/* Replies section */}
                    {comment.replies.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className={`pl-3 border-l-2 ${reply.isTeacher ? "border-neon-blue" : "border-neon-purple"}`}>
                            <div className="flex items-start">
                              <Avatar className={`h-6 w-6 ${reply.isTeacher ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30" : "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"}`}>
                                <span className="text-xs">{reply.author.charAt(0)}</span>
                              </Avatar>
                              <div className="ml-2 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium">
                                    {reply.author}
                                    {reply.isTeacher && (
                                      <span className="ml-1 text-xs bg-neon-blue/20 text-neon-blue px-1 py-0.5 rounded">Teacher</span>
                                    )}
                                  </span>
                                  <span className="text-xs text-white/50">{reply.timestamp}</span>
                                </div>
                                <p className="mt-1 text-sm">{reply.text}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Reply form */}
                    {activeCommentId === comment.id ? (
                      <div className="mt-3 flex items-center">
                        <Input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          className="flex-1 mr-2"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleReply(comment.id);
                            }
                          }}
                        />
                        <Button size="sm" onClick={() => handleReply(comment.id)}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 text-neon-blue"
                        onClick={() => setActiveCommentId(comment.id)}
                      >
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-white/50">
              <MessageCircle className="h-12 w-12 mb-2 opacity-50" />
              <p>No questions from students yet</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VideoCommentsModal;
