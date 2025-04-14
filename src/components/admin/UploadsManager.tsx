
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Upload, FileCheck, FileX, HardDrive } from "lucide-react";

const UploadsManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Uploads Management</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage content uploads and storage
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Files",
            value: "1,284",
            icon: <HardDrive className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Today's Uploads",
            value: "24",
            icon: <Upload className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Successful",
            value: "23",
            icon: <FileCheck className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          },
          {
            title: "Failed",
            value: "1",
            icon: <FileX className="h-4 w-4" />,
            color: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
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
          <CardTitle>Recent Uploads</CardTitle>
          <CardDescription>Recently uploaded content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Income Tax Module 4.pdf", size: "2.8 MB", date: "Today", status: "success" },
              { name: "Class Recording - Accounting.mp4", size: "245 MB", date: "Today", status: "success" },
              { name: "Finance Quiz Bank.xlsx", size: "1.2 MB", date: "Yesterday", status: "success" },
              { name: "Introduction to Economics.pptx", size: "4.5 MB", date: "Yesterday", status: "success" },
              { name: "Student Database Backup.sql", size: "72 MB", date: "2 days ago", status: "failed" }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <span className={`p-1 rounded-md ${
                    file.status === "success" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}>
                    {file.status === "success" ? <FileCheck className="h-4 w-4" /> : <FileX className="h-4 w-4" />}
                  </span>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {file.size} • Uploaded {file.date}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  file.status === "success" 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {file.status === "success" ? "Success" : "Failed"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Storage allocation and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total Storage Usage</span>
                <span className="text-sm font-medium">42.8 GB / 100 GB</span>
              </div>
              <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '42.8%' }}></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { type: "Documents", usage: "12.4 GB", percentage: 29, color: "bg-blue-500" },
                { type: "Videos", usage: "24.6 GB", percentage: 57.5, color: "bg-purple-500" },
                { type: "Images", usage: "5.8 GB", percentage: 13.5, color: "bg-amber-500" }
              ].map((storage, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{storage.type}</span>
                    <span>{storage.usage}</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${storage.color}`} style={{ width: `${storage.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upload Management Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for upload functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement upload management functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>File storage infrastructure (cloud storage like AWS S3 or Supabase Storage)</li>
            <li>Upload component with drag-and-drop support</li>
            <li>File validation and security checks</li>
            <li>Content delivery network for efficiently serving files</li>
            <li>File management system with metadata tracking</li>
            <li>Access control and permissions management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadsManager;
