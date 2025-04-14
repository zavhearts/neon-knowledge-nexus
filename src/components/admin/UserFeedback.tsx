
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Star, Flag, ThumbsUp, ThumbsDown } from "lucide-react";

const UserFeedback = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">User Feedback</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Review and manage user comments and suggestions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Feedback",
            value: "842",
            icon: <MessageCircle className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Average Rating",
            value: "4.7/5",
            icon: <Star className="h-4 w-4" />,
            color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
          },
          {
            title: "Reports",
            value: "12",
            icon: <Flag className="h-4 w-4" />,
            color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
          },
          {
            title: "Positive",
            value: "92%",
            icon: <ThumbsUp className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className={`p-2 rounded-md ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest comments and ratings from users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                user: "Sarah Johnson",
                course: "Advanced Income Tax",
                rating: 5,
                comment: "The content was extremely helpful and well-organized. I especially appreciated the practical examples and case studies.",
                date: "2 hours ago"
              },
              {
                user: "Michael Chen",
                course: "Business Accounting",
                rating: 4,
                comment: "Great course overall, though some sections could use more detailed explanations. The practice exercises were excellent.",
                date: "Yesterday"
              },
              {
                user: "Aisha Patel",
                course: "Financial Management",
                rating: 5,
                comment: "The instructor's teaching style made complex concepts easy to understand. I feel much more confident in my knowledge now.",
                date: "2 days ago"
              },
              {
                user: "David Wilson",
                course: "Tax Planning Strategies",
                rating: 3,
                comment: "Content was good but the platform had technical issues during my live session. Would appreciate better technical support.",
                date: "3 days ago",
                flagged: true
              }
            ].map((feedback, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{feedback.user}</p>
                      <div className="flex">
                        {Array(5).fill(0).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`} />
                        ))}
                      </div>
                      {feedback.flagged && (
                        <span className="px-2 py-0.5 text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded-full">
                          Flagged
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {feedback.course} • {feedback.date}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                      <ThumbsUp className="h-4 w-4" />
                    </button>
                    <button className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded">
                      <Flag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Feedback Management Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for feedback functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement user feedback functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Feedback collection forms and interfaces</li>
            <li>Rating system with star or numerical ratings</li>
            <li>Comment moderation system</li>
            <li>Notification system for addressing urgent feedback</li>
            <li>Response management for addressing user concerns</li>
            <li>Analytics to track feedback trends over time</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserFeedback;
