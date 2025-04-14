
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Users, DollarSign } from "lucide-react";

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Analytics</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Platform performance metrics and insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Active Users",
            value: "8,742",
            change: "+12%",
            icon: <Users className="h-4 w-4" />,
            trend: <TrendingUp className="h-4 w-4" />,
            positive: true
          },
          {
            title: "Course Enrollments",
            value: "24,853",
            change: "+8%",
            icon: <BarChart3 className="h-4 w-4" />,
            trend: <TrendingUp className="h-4 w-4" />,
            positive: true
          },
          {
            title: "Completion Rate",
            value: "68%",
            change: "-2%",
            icon: <PieChart className="h-4 w-4" />,
            trend: <TrendingDown className="h-4 w-4" />,
            positive: false
          },
          {
            title: "Revenue",
            value: "$48,295",
            change: "+15%",
            icon: <DollarSign className="h-4 w-4" />,
            trend: <TrendingUp className="h-4 w-4" />,
            positive: true
          }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800">
                  {stat.icon}
                </span>
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                  {stat.trend}
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
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly user acquisition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-800/50 rounded-md">
              <p className="text-neutral-500">User Growth Chart (Placeholder)</p>
              <p className="text-neutral-400 text-sm">To implement real charts, integrate with a charting library like recharts</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where users come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Direct", percentage: 42, color: "bg-blue-500" },
                { source: "Social Media", percentage: 28, color: "bg-purple-500" },
                { source: "Search", percentage: 18, color: "bg-green-500" },
                { source: "Referral", percentage: 12, color: "bg-amber-500" }
              ].map((source, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{source.source}</span>
                    <span>{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analytics Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for analytics functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement analytics functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Data collection and storage infrastructure</li>
            <li>Event tracking and user behavior analytics</li>
            <li>Integration with data visualization libraries (like recharts)</li>
            <li>Data processing and aggregation services</li>
            <li>Reporting mechanisms and scheduled reports</li>
            <li>Custom metrics and KPI tracking</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
