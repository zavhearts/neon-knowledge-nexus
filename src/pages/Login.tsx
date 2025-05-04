
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { LogIn, Home, Lock, Mail, User, ArrowRight } from "lucide-react";
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
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
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
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    // Simulate API call to send password reset email
    setTimeout(() => {
      // Check if email exists in demo credentials
      const userExists = DEMO_CREDENTIALS.some(user => user.email === resetEmail);
      
      if (userExists || resetEmail.includes('@')) {
        setResetSent(true);
        toast({
          title: "Reset Link Sent",
          description: "If an account exists with this email, you will receive reset instructions.",
        });
      } else {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address.",
          variant: "destructive",
        });
      }
      
      setResetLoading(false);
    }, 1500);
  };

  const closeForgotPasswordDialog = () => {
    setForgotPasswordOpen(false);
    setResetEmail("");
    setResetSent(false);
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
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
                <button 
                  type="button" 
                  onClick={() => setForgotPasswordOpen(true)}
                  className="text-sm text-royal-blue hover:text-royal-blue/80 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
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
          
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Don't have an account?{" "}
              <Link to="/signup" className="text-royal-blue hover:text-royal-blue/80 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={closeForgotPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {!resetSent ? 
                "Enter your email address and we'll send you a link to reset your password." :
                "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
              }
            </DialogDescription>
          </DialogHeader>
          
          {!resetSent ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email address"
                    className="pl-10"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter className="sm:justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={closeForgotPasswordDialog}
                  disabled={resetLoading}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={resetLoading || !resetEmail.trim()}
                >
                  {resetLoading ? (
                    <span className="animate-pulse">Sending...</span>
                  ) : (
                    <>
                      Send Reset Link <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          ) : (
            <DialogFooter>
              <Button onClick={closeForgotPasswordDialog} className="w-full">
                Back to Login
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
