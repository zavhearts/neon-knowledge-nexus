
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
          navigate("/dashboard");
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
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center text-neon-blue hover:text-neon-blue/80 transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <span className="text-2xl font-bold animated-text">Easy Win</span>
        </div>
        
        <div className="cyber-card">
          <h1 className="text-3xl font-bold mb-6 animated-text text-center">Sign In</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-white/70">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-white/70">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-button"
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
            <p className="text-white/70 text-center mb-2">Demo Credentials:</p>
            <div className="space-y-2 text-sm text-white/60">
              {DEMO_CREDENTIALS.map((cred, index) => (
                <div key={index} className="p-2 bg-cyber-light/20 rounded">
                  <p className="font-semibold capitalize text-neon-blue">{cred.role}:</p>
                  <p>Email: {cred.email}</p>
                  <p>Password: {cred.password}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Don't have an account?{" "}
              <Link to="/signup" className="text-neon-blue hover:text-neon-blue/80 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
