
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, CalendarCheck, Book, Clock } from "lucide-react";

const ClassManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Class Management</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage courses, classes, and schedules
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Courses",
            value: "64",
            icon: <Book className="h-4 w-4" />,
            color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
          },
          {
            title: "Active Classes",
            value: "48",
            icon: <GraduationCap className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Scheduled Classes",
            value: "12",
            icon: <CalendarCheck className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Hours Taught",
            value: "1,280",
            icon: <Clock className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
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
          <CardTitle>Class Administration</CardTitle>
          <CardDescription>
            This is where you would manage courses, schedule classes, and assign instructors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement class management functionality, you would need a backend service to:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Create and manage course catalogs</li>
            <li>Schedule and track classes</li>
            <li>Assign instructors and students to classes</li>
            <li>Handle course materials and resources</li>
            <li>Manage attendance and participation</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClassManagement;
