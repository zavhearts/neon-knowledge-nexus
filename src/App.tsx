
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import LiveClasses from "./pages/LiveClasses";
import Admin from "./pages/Admin";
import TeacherDashboard from "./pages/TeacherDashboard";
import UploadContent from "./pages/UploadContent";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SmartMockTest from "./components/quiz/SmartMockTest"; // Import the SmartMockTest component
import IncomeTaxNotes from "./pages/IncomeTaxNotes"; // Import the new IncomeTaxNotes component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/live-classes" element={<LiveClasses />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/upload-content" element={<UploadContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mock-test" element={<SmartMockTest />} />
          <Route path="/income-tax-notes" element={<IncomeTaxNotes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
