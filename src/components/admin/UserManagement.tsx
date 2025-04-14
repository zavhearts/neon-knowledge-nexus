
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, UserPlus, UserCheck, UserX } from "lucide-react";

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">User Management</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage users, roles, and permissions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Users",
            value: "12,458",
            icon: <User className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "New Registrations",
            value: "128",
            icon: <UserPlus className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Active Users",
            value: "8,743",
            icon: <UserCheck className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          },
          {
            title: "Suspended Users",
            value: "24",
            icon: <UserX className="h-4 w-4" />,
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
          <CardTitle>User Administration</CardTitle>
          <CardDescription>
            This is where you would manage users, assign roles, and handle permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement user management functionality, you would need to integrate with a backend service
            like Supabase, Firebase, or your own custom API. This would typically include:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>User authentication and authorization</li>
            <li>User registration and profile management</li>
            <li>Role-based access control</li>
            <li>User activity tracking and analytics</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
