
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  FileText, 
  Image, 
  Video,
  FileEdit,
  FilePlus,
  FileX,
  Clock
} from "lucide-react";

const ContentManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Content Management</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Create, edit, and organize website content
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Content",
            value: "348",
            icon: <FileText className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Images",
            value: "215",
            icon: <Image className="h-4 w-4" />,
            color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
          },
          {
            title: "Videos",
            value: "42",
            icon: <Video className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          },
          {
            title: "Last Updated",
            value: "Today",
            icon: <Clock className="h-4 w-4" />,
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
          <CardTitle>Recent Content Updates</CardTitle>
          <CardDescription>Latest content changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                title: "Advanced Income Tax Course Description",
                type: "Text",
                action: "Updated",
                user: "Sarah Johnson",
                time: "2 hours ago",
                icon: <FileEdit className="h-4 w-4" />
              },
              { 
                title: "Business Accounting Course Banner",
                type: "Image",
                action: "Added",
                user: "Michael Chen",
                time: "Yesterday",
                icon: <FilePlus className="h-4 w-4" />
              },
              { 
                title: "Financial Management Case Study",
                type: "Document",
                action: "Updated",
                user: "David Wilson",
                time: "2 days ago",
                icon: <FileEdit className="h-4 w-4" />
              },
              { 
                title: "Introduction to Economics Video",
                type: "Video",
                action: "Added",
                user: "Aisha Patel",
                time: "3 days ago",
                icon: <FilePlus className="h-4 w-4" />
              },
              { 
                title: "Outdated Tax Forms",
                type: "Document",
                action: "Deleted",
                user: "Admin",
                time: "5 days ago",
                icon: <FileX className="h-4 w-4" />
              }
            ].map((content, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${
                    content.action === "Added" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                      : content.action === "Updated" 
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" 
                        : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}>
                    {content.icon}
                  </div>
                  <div>
                    <p className="font-medium">{content.title}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {content.type} • {content.user} • {content.time}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  content.action === "Added" 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                    : content.action === "Updated" 
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {content.action}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Content Management Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for content management functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement content management functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Rich text editor for content creation and editing</li>
            <li>Media library with image and video management</li>
            <li>Content categorization and tagging system</li>
            <li>Version history and content revision tracking</li>
            <li>Content publishing workflow with drafts and scheduling</li>
            <li>User permissions for content access and editing</li>
            <li>Integration with storage services for media files</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
