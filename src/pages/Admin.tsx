
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SliderController from "@/components/admin/SliderController";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  Users,
  CheckSquare,
  AlertCircle,
  ArrowUpRight,
  Activity,
  Calendar,
  FileCog,
  Clock,
} from "lucide-react";

// Sample data
const statisticsData = [
  {
    title: "Total Users",
    value: "12,458",
    change: "+14.2%",
    icon: <Users className="h-4 w-4" />,
    positive: true
  },
  {
    title: "Courses",
    value: "64",
    change: "+5.3%",
    icon: <FileCog className="h-4 w-4" />,
    positive: true
  },
  {
    title: "Active Classes",
    value: "48",
    change: "+2.8%",
    icon: <Calendar className="h-4 w-4" />,
    positive: true
  },
  {
    title: "System Health",
    value: "99.8%",
    change: "-0.1%",
    icon: <Activity className="h-4 w-4" />,
    positive: false
  },
];

const Admin = () => {
  const [activeView, setActiveView] = useState<string>("dashboard");

  // This would normally determine what content to show based on the activeView state
  const renderContent = () => {
    switch (activeView) {
      case "slider":
        return <SliderController />;
      default:
        return renderDashboardView();
    }
  };

  const renderDashboardView = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Dashboard Overview</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Welcome to the administration control panel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statisticsData.map((stat, index) => (
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
                    <ArrowUpRight className={`h-3 w-3 ${!stat.positive && 'rotate-180'}`} />
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
              <CardTitle>User Activity</CardTitle>
              <CardDescription>User engagement over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-800/50 rounded-md">
                <p className="text-neutral-500">Activity Chart (Placeholder)</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { 
                  title: "Server Update",
                  description: "Scheduled maintenance in 2 days",
                  icon: <Clock className="h-4 w-4" />,
                  severity: "info"
                },
                { 
                  title: "Storage Alert",
                  description: "Disk space usage at 82%",
                  icon: <AlertCircle className="h-4 w-4" />,
                  severity: "warning"
                },
                { 
                  title: "System Health",
                  description: "All systems operational",
                  icon: <CheckSquare className="h-4 w-4" />,
                  severity: "success"
                }
              ].map((alert, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className={`p-2 rounded-md
                    ${alert.severity === "info" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : 
                      alert.severity === "warning" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" :
                      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"}`
                  }>
                    {alert.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{alert.title}</h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{alert.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Popular Courses</CardTitle>
              <CardDescription>Most active courses this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Advanced Income Tax", users: 1245, completion: 78 },
                  { title: "Business Accounting", users: 964, completion: 85 },
                  { title: "Financial Management", users: 782, completion: 62 }
                ].map((course, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {course.users} active users
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {course.completion}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Server Response", value: "124ms", status: "optimal" },
                  { title: "Database Queries", value: "2.3s avg", status: "normal" },
                  { title: "Cache Hit Rate", value: "94%", status: "optimal" }
                ].map((metric, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{metric.title}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {metric.value}
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === "optimal" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}>
                      {metric.status}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Easy Win</title>
      </Helmet>
      <div className="flex h-screen overflow-hidden bg-white dark:bg-dark-bg">
        {/* Admin Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <header className="sticky top-0 z-10 bg-white dark:bg-dark-bg border-b border-neutral-200 dark:border-neutral-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
                  Administration
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Manage your platform settings and content
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Any admin header actions could go here */}
              </div>
            </div>
          </header>
          
          <main className="px-6 py-6">
            {renderContent()}
          </main>
          
          <footer className="border-t border-neutral-200 dark:border-neutral-700 px-6 py-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
            <p>© 2025 Easy Win Admin System. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Admin;
