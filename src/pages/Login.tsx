
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, Home, Lock, Mail, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const DEMO_CREDENTIALS = [
  { role: "student", email: "student@example.com", password: "password123" },
  { role: "teacher", email: "teacher@example.com", password: "password123" },
  { role: "admin", email: "admin@example.com", password: "password123" }
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = DEMO_CREDENTIALS.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.role}!`,
        });

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "teacher") {
          navigate("/teacher");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Try the demo credentials shown below.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-dark-blue dark:to-dark-blue/80 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-royal-blue hover:text-royal-blue/80 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <img 
            src="/lovable-uploads/6d0b63c4-3fcf-4756-8c97-c249e6e91073.png" 
            alt="Easy Win" 
            className="h-12" 
          />
        </div>
        
        <div className="bg-white dark:bg-dark-blue/50 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-dark-blue dark:text-white text-center">Sign In</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white dark:bg-dark-blue/30 border-gray-300 dark:border-gray-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 bg-white dark:bg-dark-blue/30 border-gray-300 dark:border-gray-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-royal-blue hover:bg-royal-blue/80 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Logging in...</span>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-8">
            <p className="text-gray-700 dark:text-gray-300 text-center mb-2">Demo Credentials:</p>
            <div className="space-y-2 text-sm">
              {DEMO_CREDENTIALS.map((cred, index) => (
                <div key={index} className="p-2 bg-gray-100 dark:bg-dark-blue/70 rounded">
                  <p className="font-semibold capitalize text-royal-blue">{cred.role}:</p>
                  <p className="text-gray-700 dark:text-gray-300">Email: {cred.email}</p>
                  <p className="text-gray-700 dark:text-gray-300">Password: {cred.password}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-royal-blue hover:text-royal-blue/80 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">Quick access for demo purposes:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link to="/dashboard" className="text-royal-blue hover:underline">Student Dashboard</Link>
              <span className="text-gray-400">|</span>
              <Link to="/teacher" className="text-teal hover:underline">Teacher Dashboard</Link>
              <span className="text-gray-400">|</span>
              <Link to="/admin" className="text-gold hover:underline">Admin Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
