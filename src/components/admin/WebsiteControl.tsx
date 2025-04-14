
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Globe, 
  Settings, 
  Layout, 
  Lock,
  ShieldCheck,
  BarChart,
  Bell,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const WebsiteControl = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">Website Control</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Manage website settings and configurations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Uptime",
            value: "99.98%",
            icon: <Globe className="h-4 w-4" />,
            color: "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
          },
          {
            title: "Security Status",
            value: "Secure",
            icon: <ShieldCheck className="h-4 w-4" />,
            color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
          },
          {
            title: "SSL Certificate",
            value: "Valid",
            icon: <Lock className="h-4 w-4" />,
            color: "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400"
          },
          {
            title: "Last Backup",
            value: "Today",
            icon: <BarChart className="h-4 w-4" />,
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
          <CardTitle>Website Settings</CardTitle>
          <CardDescription>Configure website behavior and appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <h3 className="text-lg font-medium">General Settings</h3>
            <div className="space-y-4">
              {[
                { 
                  id: "maintenance-mode", 
                  label: "Maintenance Mode",
                  description: "Enable maintenance mode to display a maintenance page to visitors",
                  enabled: false
                },
                { 
                  id: "allow-registration", 
                  label: "Allow User Registration",
                  description: "Allow visitors to create new accounts",
                  enabled: true
                },
                { 
                  id: "email-notifications", 
                  label: "Email Notifications",
                  description: "Send email notifications for system events",
                  enabled: true
                },
                { 
                  id: "enable-analytics", 
                  label: "Enable Analytics",
                  description: "Collect anonymous usage data to improve site experience",
                  enabled: true
                }
              ].map((setting) => (
                <div className="flex items-center justify-between space-x-2" key={setting.id}>
                  <div>
                    <Label htmlFor={setting.id} className="font-medium">{setting.label}</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.enabled} />
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium mt-8">Performance Settings</h3>
            <div className="space-y-4">
              {[
                { 
                  id: "enable-caching", 
                  label: "Enable Caching",
                  description: "Cache pages and assets for faster loading",
                  enabled: true
                },
                { 
                  id: "image-optimization", 
                  label: "Image Optimization",
                  description: "Automatically optimize uploaded images",
                  enabled: true
                },
                { 
                  id: "minify-assets", 
                  label: "Minify Assets",
                  description: "Minify CSS and JavaScript files",
                  enabled: true
                }
              ].map((setting) => (
                <div className="flex items-center justify-between space-x-2" key={setting.id}>
                  <div>
                    <Label htmlFor={setting.id} className="font-medium">{setting.label}</Label>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{setting.description}</p>
                  </div>
                  <Switch id={setting.id} defaultChecked={setting.enabled} />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of system services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Web Server", status: "operational", icon: <CheckCircle2 className="h-4 w-4" /> },
              { name: "Database Server", status: "operational", icon: <CheckCircle2 className="h-4 w-4" /> },
              { name: "Email Service", status: "operational", icon: <CheckCircle2 className="h-4 w-4" /> },
              { name: "Storage Service", status: "operational", icon: <CheckCircle2 className="h-4 w-4" /> },
              { name: "Background Processing", status: "degraded", icon: <Bell className="h-4 w-4" /> },
              { name: "External API Integration", status: "down", icon: <XCircle className="h-4 w-4" /> }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                <span className="font-medium">{service.name}</span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  service.status === "operational" 
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                    : service.status === "degraded" 
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400" 
                      : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {service.icon}
                  <span className="capitalize">{service.status}</span>
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Website Control Integration</CardTitle>
          <CardDescription>
            Implementation guidelines for website control functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            To implement website control functionality, you would need:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
            <li>Settings management system with database backing</li>
            <li>Role-based access control for admin settings</li>
            <li>System status monitoring and reporting</li>
            <li>Backup and restore mechanisms</li>
            <li>Cache management and performance optimization</li>
            <li>Theme and appearance configuration options</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteControl;
