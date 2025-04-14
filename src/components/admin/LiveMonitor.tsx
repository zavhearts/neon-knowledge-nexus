
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MonitorPlay, Users, Radio, Signal } from "lucide-react";

const LiveMonitor = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Live Monitor</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Monitor active classes and system status
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Active Sessions",
            value: "8",
            icon: <MonitorPlay className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Current Users",
            value: "342",
            icon: <Users className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "Bandwidth Usage",
            value: "48 Mbps",
            icon: <Signal className="h-4 w-4" />,
            color: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
          },
          {
            title: "Server Status",
            value: "Optimal",
            icon: <Radio className="h-4 w-4" />,
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
            <CardTitle>Live Classes</CardTitle>
            <CardDescription>Currently active classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Advanced Income Tax", instructor: "Sarah Johnson", participants: 48, time: "00:42:15" },
                { name: "Business Accounting", instructor: "Michael Chen", participants: 36, time: "01:15:30" },
                { name: "Financial Management", instructor: "David Wilson", participants: 29, time: "00:22:45" }
              ].map((session, index) => (
                <div key={index} className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium">{session.name}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      {session.instructor} • {session.participants} participants
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-2 py-1 rounded text-xs">
                    {session.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time system metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "CPU Usage", value: "42%", status: "normal" },
                { name: "Memory Usage", value: "3.8 GB / 8 GB", status: "normal" },
                { name: "Storage", value: "156 GB / 500 GB", status: "normal" },
                { name: "Network Latency", value: "24ms", status: "optimal" }
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="font-medium">{metric.name}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{metric.value}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      metric.status === "optimal" 
                        ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Live Monitoring Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for live monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement live monitoring functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Real-time communication with WebSockets</li>
            <li>Server status monitoring APIs</li>
            <li>User session tracking system</li>
            <li>Video streaming integration for live class monitoring</li>
            <li>System metrics collection and reporting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveMonitor;
