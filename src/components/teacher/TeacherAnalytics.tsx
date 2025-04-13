
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { MessageCircle, Star, TrendingUp, Users, Video } from "lucide-react";

// Sample data for charts and analytics
const feedbackData = [
  { id: 1, studentName: "Alex Johnson", message: "The explanations were very clear and easy to understand.", date: "2023-10-05", rating: 5 },
  { id: 2, studentName: "Sarah Williams", message: "Great content but could use more practical examples.", date: "2023-10-03", rating: 4 },
  { id: 3, studentName: "Michael Brown", message: "The pace was a bit too fast for me to follow at times.", date: "2023-09-28", rating: 3 },
  { id: 4, studentName: "Jessica Davis", message: "Excellent teaching style! Looking forward to more videos.", date: "2023-09-25", rating: 5 },
  { id: 5, studentName: "David Miller", message: "The audio quality could be improved in some sections.", date: "2023-09-20", rating: 4 }
];

const videoPerformanceData = [
  { id: 1, title: "Introduction to Cybersecurity", views: 156, avgWatchTime: 8.5, completionRate: 72, engagement: 24 },
  { id: 2, title: "Data Science Fundamentals", views: 203, avgWatchTime: 12.3, completionRate: 85, engagement: 37 },
  { id: 3, title: "Advanced Web Development", views: 112, avgWatchTime: 6.7, completionRate: 61, engagement: 15 },
  { id: 4, title: "Machine Learning Basics", views: 245, avgWatchTime: 10.8, completionRate: 78, engagement: 42 }
];

const weeklyViewsData = [
  { day: "Mon", views: 45 },
  { day: "Tue", views: 38 },
  { day: "Wed", views: 62 },
  { day: "Thu", views: 58 },
  { day: "Fri", views: 70 },
  { day: "Sat", views: 89 },
  { day: "Sun", views: 65 }
];

const monthlyViewsData = [
  { month: "Jan", views: 320 },
  { month: "Feb", views: 450 },
  { month: "Mar", views: 380 },
  { month: "Apr", views: 520 },
  { month: "May", views: 630 },
  { month: "Jun", views: 580 },
  { month: "Jul", views: 750 },
  { month: "Aug", views: 690 },
  { month: "Sep", views: 820 }
];

interface TeacherAnalyticsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const TeacherAnalytics: React.FC<TeacherAnalyticsProps> = ({ selectedTab, onTabChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Teacher Analytics</h2>
      
      <Tabs value={selectedTab} onValueChange={onTabChange} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="feedback" className="text-lg py-2">
            <MessageCircle className="h-4 w-4 mr-2" />
            Student Feedback
          </TabsTrigger>
          <TabsTrigger value="performance" className="text-lg py-2">
            <TrendingUp className="h-4 w-4 mr-2" />
            Video Performance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-blue mb-2">4.2</div>
                <div className="flex items-center mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-white/70">Average Rating</p>
              </div>
            </Card>
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-purple mb-2">18</div>
                <div className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-1 text-neon-purple" />
                </div>
                <p className="text-sm text-white/70">Total Feedbacks</p>
              </div>
            </Card>
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-green mb-2">7</div>
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-1 text-neon-green" />
                </div>
                <p className="text-sm text-white/70">Videos with Feedback</p>
              </div>
            </Card>
          </div>
          
          <Card className="cyber-card p-6">
            <h3 className="text-lg font-medium mb-4">Recent Feedback</h3>
            <div className="space-y-4">
              {feedbackData.map(feedback => (
                <div key={feedback.id} className="border border-white/10 rounded-lg p-4 bg-cyber-light/5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className="bg-neon-blue/20 rounded-full w-10 h-10 flex items-center justify-center text-neon-blue">
                        {feedback.studentName.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{feedback.studentName}</p>
                        <p className="text-xs text-white/50">{feedback.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= feedback.rating ? "text-yellow-500 fill-yellow-500" : "text-white/20"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-white/80 text-sm">{feedback.message}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-blue mb-2">716</div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1 text-neon-blue" />
                </div>
                <p className="text-sm text-white/70">Total Views</p>
              </div>
            </Card>
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-purple mb-2">9.6</div>
                <p className="text-sm text-white/70">Avg. Watch Minutes</p>
              </div>
            </Card>
            <Card className="cyber-card p-4">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-5xl font-bold text-neon-green mb-2">74%</div>
                <p className="text-sm text-white/70">Avg. Completion Rate</p>
              </div>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="cyber-card p-6">
              <h3 className="text-lg font-medium mb-4">Weekly Views</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="day" tick={{ fill: '#ffffff80' }} />
                    <YAxis tick={{ fill: '#ffffff80' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a202c', borderColor: 'rgba(0,119,204,0.5)' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="views" fill="#0077cc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="cyber-card p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Views Trend</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyViewsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="month" tick={{ fill: '#ffffff80' }} />
                    <YAxis tick={{ fill: '#ffffff80' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1a202c', borderColor: 'rgba(255,0,122,0.5)' }}
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="views" stroke="#ff007a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
          
          <Card className="cyber-card p-6 mt-6">
            <h3 className="text-lg font-medium mb-4">Video Performance Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4">Video Title</th>
                    <th className="text-center py-3 px-4">Views</th>
                    <th className="text-center py-3 px-4">Avg Watch Time (min)</th>
                    <th className="text-center py-3 px-4">Completion Rate</th>
                    <th className="text-center py-3 px-4">Engagement</th>
                  </tr>
                </thead>
                <tbody>
                  {videoPerformanceData.map(video => (
                    <tr key={video.id} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-3 px-4">{video.title}</td>
                      <td className="py-3 px-4 text-center">{video.views}</td>
                      <td className="py-3 px-4 text-center">{video.avgWatchTime}</td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className={`mr-1 ${video.completionRate > 75 ? 'text-green-500' : video.completionRate > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                            {video.completionRate}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Badge className="bg-neon-blue/20 text-neon-blue">
                          {video.engagement} comments
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherAnalytics;
