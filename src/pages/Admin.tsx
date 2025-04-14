
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SliderController from "@/components/admin/SliderController";
import { Separator } from "@/components/ui/separator";
import { ThemeProvider } from "@/components/theme/theme-provider";

// Import admin section components
import DashboardView from "@/components/admin/DashboardView";
import UserManagement from "@/components/admin/UserManagement";
import ClassManagement from "@/components/admin/ClassManagement";
import LiveMonitor from "@/components/admin/LiveMonitor";
import MockTests from "@/components/admin/MockTests";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import UploadsManager from "@/components/admin/UploadsManager";
import UserFeedback from "@/components/admin/UserFeedback";
import WebsiteControl from "@/components/admin/WebsiteControl";
import ContentManagement from "@/components/admin/ContentManagement";

const Admin = () => {
  const [activeView, setActiveView] = useState<string>("dashboard");

  // This determines what content to show based on the activeView state
  const renderContent = () => {
    switch (activeView) {
      case "users":
        return <UserManagement />;
      case "classes":
        return <ClassManagement />;
      case "live":
        return <LiveMonitor />;
      case "tests":
        return <MockTests />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "uploads":
        return <UploadsManager />;
      case "feedback":
        return <UserFeedback />;
      case "settings":
        return <WebsiteControl />;
      case "content":
        return <ContentManagement />;
      case "slider":
        return <SliderController />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ThemeProvider>
      <Helmet>
        <title>Admin Dashboard | Easy Win</title>
      </Helmet>
      <div className="flex h-screen overflow-hidden bg-white dark:bg-dark-bg">
        {/* Admin Sidebar */}
        <AdminSidebar activeView={activeView} setActiveView={setActiveView} />
        
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
    </ThemeProvider>
  );
};

export default Admin;
