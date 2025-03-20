
import { toast } from "@/hooks/use-toast";

// Types for Zoom meetings
export interface ZoomMeeting {
  id: string;
  topic: string;
  start_time: string;
  duration: number;
  password?: string;
  join_url: string;
  status: string;
}

export interface ZoomMeetingRequest {
  topic: string;
  type: number; // 1: instant, 2: scheduled, 3: recurring with no fixed time, 8: recurring with fixed time
  start_time: string;
  duration: number;
  timezone?: string;
  password?: string;
  agenda?: string;
  recurrence?: {
    type: number;
    repeat_interval: number;
    weekly_days?: string;
    monthly_day?: number;
    end_times?: number;
    end_date_time?: string;
  };
  settings?: {
    host_video: boolean;
    participant_video: boolean;
    join_before_host: boolean;
    mute_upon_entry: boolean;
    watermark: boolean;
    approval_type: number;
    registration_type: number;
    audio: string;
    auto_recording: string;
  };
}

// Using mock data for development until Supabase integration is complete
const mockZoomMeetings: ZoomMeeting[] = [
  {
    id: "123456789",
    topic: "Introduction to Cybersecurity",
    start_time: "2023-11-01T14:00:00Z",
    duration: 60,
    password: "sec123",
    join_url: "https://zoom.us/j/123456789",
    status: "waiting"
  },
  {
    id: "987654321",
    topic: "Advanced Web Development",
    start_time: "2023-11-02T15:00:00Z",
    duration: 90,
    password: "web123",
    join_url: "https://zoom.us/j/987654321",
    status: "waiting"
  }
];

// Mock function to create a Zoom meeting
export const createZoomMeeting = async (meetingData: ZoomMeetingRequest): Promise<ZoomMeeting> => {
  // This would be a real API call in production
  console.log("Creating Zoom meeting with data:", meetingData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a mock meeting response
  const newMeeting: ZoomMeeting = {
    id: Math.random().toString(36).substring(2, 15),
    topic: meetingData.topic,
    start_time: meetingData.start_time,
    duration: meetingData.duration,
    password: meetingData.password,
    join_url: `https://zoom.us/j/${Math.random().toString(36).substring(2, 15)}`,
    status: "waiting"
  };
  
  toast({
    title: "Meeting Created",
    description: `Your Zoom meeting "${meetingData.topic}" has been scheduled.`
  });
  
  return newMeeting;
};

// Get all meetings (mock function)
export const getZoomMeetings = async (): Promise<ZoomMeeting[]> => {
  // This would be a real API call in production
  console.log("Fetching Zoom meetings");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [...mockZoomMeetings];
};

// Get a single meeting by ID (mock function)
export const getZoomMeeting = async (meetingId: string): Promise<ZoomMeeting | null> => {
  // This would be a real API call in production
  console.log(`Fetching Zoom meeting with ID: ${meetingId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const meeting = mockZoomMeetings.find(m => m.id === meetingId);
  return meeting || null;
};

// Update a meeting (mock function)
export const updateZoomMeeting = async (meetingId: string, meetingData: Partial<ZoomMeetingRequest>): Promise<ZoomMeeting> => {
  // This would be a real API call in production
  console.log(`Updating Zoom meeting with ID: ${meetingId}`, meetingData);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const mockUpdatedMeeting: ZoomMeeting = {
    id: meetingId,
    topic: meetingData.topic || "Updated Meeting",
    start_time: meetingData.start_time || new Date().toISOString(),
    duration: meetingData.duration || 60,
    password: meetingData.password,
    join_url: `https://zoom.us/j/${meetingId}`,
    status: "waiting"
  };
  
  toast({
    title: "Meeting Updated",
    description: `Your Zoom meeting has been updated successfully.`
  });
  
  return mockUpdatedMeeting;
};

// Delete a meeting (mock function)
export const deleteZoomMeeting = async (meetingId: string): Promise<boolean> => {
  // This would be a real API call in production
  console.log(`Deleting Zoom meeting with ID: ${meetingId}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  toast({
    title: "Meeting Deleted",
    description: `Your Zoom meeting has been cancelled.`
  });
  
  return true;
};
