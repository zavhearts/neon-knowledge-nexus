
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Video, Calendar, Clock, Edit, Trash2, Link, ExternalLink } from "lucide-react";
import { ZoomMeeting, getZoomMeetings, deleteZoomMeeting } from "@/services/zoomService";
import { format, parseISO, isPast } from "date-fns";

interface ZoomMeetingsListProps {
  onEdit?: (meetingId: string) => void;
  onSelect?: (meeting: ZoomMeeting) => void;
  refreshTrigger?: number;
}

const ZoomMeetingsList: React.FC<ZoomMeetingsListProps> = ({ 
  onEdit, 
  onSelect,
  refreshTrigger = 0
}) => {
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchMeetings = async () => {
      setIsLoading(true);
      try {
        const data = await getZoomMeetings();
        setMeetings(data);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
        toast({
          title: "Error",
          description: "Failed to load your meetings",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeetings();
  }, [refreshTrigger]);
  
  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Meeting link copied to clipboard",
    });
  };
  
  const handleDelete = async (meetingId: string) => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      try {
        await deleteZoomMeeting(meetingId);
        setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
      } catch (error) {
        console.error("Failed to delete meeting:", error);
        toast({
          title: "Error",
          description: "Failed to cancel the meeting",
          variant: "destructive"
        });
      }
    }
  };
  
  const getMeetingStatus = (meeting: ZoomMeeting) => {
    const startTime = parseISO(meeting.start_time);
    if (isPast(startTime)) {
      return "Completed";
    }
    return "Scheduled";
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Your Zoom Meetings</h3>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="cyber-spinner mx-auto mb-4"></div>
          <p className="text-white/70">Loading your meetings...</p>
        </div>
      ) : meetings.length === 0 ? (
        <Card className="cyber-card p-6 text-center">
          <Video className="h-10 w-10 mx-auto mb-3 text-neon-blue/70" />
          <h3 className="text-lg font-medium mb-2">No Meetings Scheduled</h3>
          <p className="text-white/70 mb-4">You don't have any Zoom meetings scheduled yet.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {meetings.map(meeting => (
            <Card key={meeting.id} className="cyber-card p-4 hover:border-neon-blue/60 transition-colors">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-neon-blue/20 rounded-md">
                    <Video className="h-5 w-5 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">{meeting.topic}</h4>
                    <div className="flex flex-wrap items-center text-sm text-white/70 gap-x-3 gap-y-1">
                      <div className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{format(parseISO(meeting.start_time), "MMM d, yyyy")}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{format(parseISO(meeting.start_time), "h:mm a")} ({meeting.duration} min)</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <Badge className="bg-neon-green/90 text-black">
                    {getMeetingStatus(meeting)}
                  </Badge>
                  
                  <div className="flex items-center ml-auto space-x-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white/70 hover:text-white"
                      onClick={() => handleCopyLink(meeting.join_url)}
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    
                    {onSelect && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-neon-purple hover:text-neon-purple/80"
                        onClick={() => onSelect(meeting)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {onEdit && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-neon-blue hover:text-neon-blue/80"
                        onClick={() => onEdit(meeting.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-500 hover:text-red-400"
                      onClick={() => handleDelete(meeting.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZoomMeetingsList;
