
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Video, Users, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ZoomMeetingRequest, createZoomMeeting } from "@/services/zoomService";

interface ZoomMeetingFormProps {
  onSuccess?: (meetingId: string) => void;
  onCancel?: () => void;
}

const ZoomMeetingForm: React.FC<ZoomMeetingFormProps> = ({ onSuccess, onCancel }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingData, setMeetingData] = useState<Partial<ZoomMeetingRequest>>({
    topic: "",
    type: 2, // scheduled meeting
    duration: 60,
    password: "",
    agenda: "",
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: false,
      mute_upon_entry: true,
      watermark: false,
      approval_type: 0,
      registration_type: 1,
      audio: "both",
      auto_recording: "none"
    }
  });
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeHour, setTimeHour] = useState("10");
  const [timeMinute, setTimeMinute] = useState("00");
  const [timeAmPm, setTimeAmPm] = useState("AM");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (name: string, value: boolean | string | number) => {
    setMeetingData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a meeting date",
        variant: "destructive"
      });
      return;
    }
    
    if (!meetingData.topic) {
      toast({
        title: "Topic Required",
        description: "Please enter a meeting topic",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a date string in ISO format
      const hour = parseInt(timeHour) + (timeAmPm === "PM" && timeHour !== "12" ? 12 : 0);
      const minute = parseInt(timeMinute);
      const meetingDate = new Date(date);
      meetingDate.setHours(hour);
      meetingDate.setMinutes(minute);
      
      const fullMeetingData: ZoomMeetingRequest = {
        ...meetingData as ZoomMeetingRequest,
        start_time: meetingDate.toISOString(),
      };
      
      const result = await createZoomMeeting(fullMeetingData);
      
      if (onSuccess) {
        onSuccess(result.id);
      }
    } catch (error) {
      console.error("Failed to create meeting:", error);
      toast({
        title: "Error",
        description: "Failed to create the meeting. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="cyber-card p-6">
      <h2 className="text-xl font-bold mb-6 animated-text">Schedule a Zoom Meeting</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="topic">Meeting Topic</Label>
            <Input 
              id="topic"
              name="topic"
              value={meetingData.topic}
              onChange={handleInputChange}
              placeholder="Enter meeting topic"
              className="bg-cyber-darker border-neon-blue/30"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="agenda">Description (Optional)</Label>
            <Textarea 
              id="agenda"
              name="agenda"
              value={meetingData.agenda}
              onChange={handleInputChange}
              placeholder="Enter meeting description"
              className="bg-cyber-darker border-neon-blue/30 h-24"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline" 
                    className="w-full justify-start text-left font-normal bg-cyber-darker border-neon-blue/30"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-cyber-dark border-neon-blue/50">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Time</Label>
              <div className="flex items-center space-x-2">
                <select 
                  value={timeHour}
                  onChange={e => setTimeHour(e.target.value)}
                  className="bg-cyber-darker border border-neon-blue/30 rounded-md px-3 py-2"
                >
                  {Array.from({length: 12}, (_, i) => i + 1).map(hour => (
                    <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>
                  ))}
                </select>
                <span className="text-white">:</span>
                <select 
                  value={timeMinute}
                  onChange={e => setTimeMinute(e.target.value)}
                  className="bg-cyber-darker border border-neon-blue/30 rounded-md px-3 py-2"
                >
                  {['00', '15', '30', '45'].map(minute => (
                    <option key={minute} value={minute}>{minute}</option>
                  ))}
                </select>
                <select 
                  value={timeAmPm}
                  onChange={e => setTimeAmPm(e.target.value)}
                  className="bg-cyber-darker border border-neon-blue/30 rounded-md px-3 py-2"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input 
                id="duration"
                name="duration"
                type="number"
                min="15"
                step="15"
                value={meetingData.duration}
                onChange={handleInputChange}
                className="bg-cyber-darker border-neon-blue/30"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Meeting Password (Optional)</Label>
              <Input 
                id="password"
                name="password"
                value={meetingData.password}
                onChange={handleInputChange}
                placeholder="Set a password"
                className="bg-cyber-darker border-neon-blue/30"
              />
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-lg font-semibold mb-3">Meeting Options</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Host Video</Label>
                  <p className="text-sm text-white/60">Start with host video on</p>
                </div>
                <Switch 
                  checked={meetingData.settings?.host_video}
                  onCheckedChange={value => handleSettingsChange('host_video', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Participant Video</Label>
                  <p className="text-sm text-white/60">Start with participant video on</p>
                </div>
                <Switch 
                  checked={meetingData.settings?.participant_video}
                  onCheckedChange={value => handleSettingsChange('participant_video', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Join Before Host</Label>
                  <p className="text-sm text-white/60">Allow participants to join before host</p>
                </div>
                <Switch 
                  checked={meetingData.settings?.join_before_host}
                  onCheckedChange={value => handleSettingsChange('join_before_host', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Mute On Entry</Label>
                  <p className="text-sm text-white/60">Mute participants upon entry</p>
                </div>
                <Switch 
                  checked={meetingData.settings?.mute_upon_entry}
                  onCheckedChange={value => handleSettingsChange('mute_upon_entry', value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          {onCancel && (
            <Button 
              type="button" 
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
          <Button 
            type="submit"
            className="cyber-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ZoomMeetingForm;
