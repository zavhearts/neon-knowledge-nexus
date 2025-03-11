
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Home, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      });
      
      navigate("/login");
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
          <h1 className="text-3xl font-bold mb-6 animated-text text-center">Create Account</h1>
          
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-white/70">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            
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
                  placeholder="Create a password"
                  className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-white/50">Password must be at least 8 characters</p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-button"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Creating Account...</span>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-neon-blue hover:text-neon-blue/80 transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
