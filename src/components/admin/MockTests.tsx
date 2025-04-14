
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileCheck, ClipboardCheck, Award, Percent } from "lucide-react";

const MockTests = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Mock Tests</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage test banks and monitor student performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Tests",
            value: "128",
            icon: <FileCheck className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Attempts Today",
            value: "43",
            icon: <ClipboardCheck className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Avg. Score",
            value: "76%",
            icon: <Percent className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          },
          {
            title: "High Scorers",
            value: "38",
            icon: <Award className="h-4 w-4" />,
            color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Tests</CardTitle>
            <CardDescription>Most frequently taken tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Income Tax Foundation", attempts: 482, avgScore: 68 },
                { name: "Business Accounting Basics", attempts: 356, avgScore: 72 },
                { name: "Financial Management Principles", attempts: 298, avgScore: 65 },
                { name: "Advanced Tax Planning", attempts: 245, avgScore: 58 }
              ].map((test, index) => (
                <div key={index} className="flex justify-between items-center pb-2 border-b last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{test.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {test.attempts} attempts
                    </p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    test.avgScore >= 70 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                      : test.avgScore >= 60
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                  }`}>
                    Avg: {test.avgScore}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Categories</CardTitle>
            <CardDescription>Distribution by subject area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Income Tax", count: 42, color: "bg-blue-100" },
                { name: "Accounting", count: 36, color: "bg-green-100" },
                { name: "Finance", count: 28, color: "bg-purple-100" },
                { name: "Business Law", count: 22, color: "bg-amber-100" }
              ].map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-neutral-500">{category.count} tests</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                    <div 
                      className={`${category.color} h-2 rounded-full`} 
                      style={{ width: `${(category.count / 128) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Mock Test Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for mock test functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement mock tests functionality, you would need backend services for:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Test bank management with question and answer storage</li>
            <li>Random test generation algorithms</li>
            <li>Automated scoring and feedback systems</li>
            <li>Performance analytics and reporting</li>
            <li>User progress tracking across multiple attempts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockTests;
