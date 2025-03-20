
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Home, UserPlus, Phone, CheckSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VerificationStep from "@/components/auth/VerificationStep";
import CaptchaStep from "@/components/auth/CaptchaStep";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // Fix type error by changing the initial value to "email" instead of ""
  const [verificationMethod, setVerificationMethod] = useState<"email" | "phone">("email");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const navigate = useNavigate();

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(2);
  };

  const handleVerificationMethodSelect = (method: "email" | "phone") => {
    setVerificationMethod(method);
    setCurrentStep(3);
  };

  const handleVerificationComplete = (method: "email" | "phone") => {
    if (method === "email") {
      setIsEmailVerified(true);
    } else {
      setIsPhoneVerified(true);
    }
    
    // Move to captcha after verification
    setCurrentStep(4);
  };

  const handleCaptchaSuccess = () => {
    setIsCaptchaVerified(true);
    setCurrentStep(5);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
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

  const canSubmitFinal = isEmailVerified || isPhoneVerified;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleInitialSubmit} className="space-y-6">
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
              <label htmlFor="phone" className="block text-white/70">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-5 w-5" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
            >
              Continue
            </Button>
          </form>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white text-center mb-4">Choose Verification Method</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="cyber-button flex flex-col py-8"
                onClick={() => handleVerificationMethodSelect("email")}
              >
                <Mail className="h-10 w-10 mb-2" />
                <span>Verify Email</span>
              </Button>
              
              <Button 
                className="cyber-button flex flex-col py-8"
                onClick={() => handleVerificationMethodSelect("phone")}
              >
                <Phone className="h-10 w-10 mb-2" />
                <span>Verify Phone</span>
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <VerificationStep
            method={verificationMethod}
            email={email}
            phone={phone}
            onComplete={handleVerificationComplete}
            onBack={() => setCurrentStep(2)}
          />
        );
      
      case 4:
        return (
          <CaptchaStep 
            onVerify={handleCaptchaSuccess} 
            onBack={() => setCurrentStep(3)}
          />
        );
      
      case 5:
        return (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="bg-neon-blue/10 border border-neon-blue/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Verification Completed</h3>
                <p className="text-white/80 text-sm">
                  {isEmailVerified ? "Email verified" : ""} 
                  {isPhoneVerified ? "Phone verified" : ""}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div 
                className={`border rounded cursor-pointer transition-colors flex items-center justify-center w-5 h-5 ${
                  acceptedTerms ? "bg-neon-blue border-neon-blue" : "border-white/30"
                }`}
                onClick={() => canSubmitFinal && setAcceptedTerms(!acceptedTerms)}
              >
                {acceptedTerms && <CheckSquare className="h-4 w-4 text-black" />}
              </div>
              <label 
                htmlFor="terms" 
                className={`text-sm ${
                  canSubmitFinal ? "text-white/80 cursor-pointer" : "text-white/40"
                }`}
                onClick={() => canSubmitFinal && setAcceptedTerms(!acceptedTerms)}
              >
                I accept the Terms and Conditions and Privacy Policy
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full cyber-button"
              disabled={loading || !acceptedTerms || !canSubmitFinal}
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
        );
      
      default:
        return null;
    }
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
          
          {/* Progress indicator */}
          <div className="flex justify-between mb-8 relative">
            {[1, 2, 3, 4, 5].map((step) => (
              <div 
                key={step} 
                className={`rounded-full h-4 w-4 z-10 transition-colors ${
                  currentStep >= step 
                    ? "bg-neon-blue" 
                    : "bg-gray-700"
                }`}
              />
            ))}
            <div className="absolute top-2 h-0.5 w-full bg-gray-700 -z-0"></div>
            <div 
              className="absolute top-2 h-0.5 bg-neon-blue -z-0 transition-all" 
              style={{ width: `${(currentStep - 1) * 25}%` }}
            ></div>
          </div>
          
          {renderStep()}
          
          {currentStep === 1 && (
            <div className="mt-6 text-center">
              <p className="text-white/70">
                Already have an account?{" "}
                <Link to="/login" className="text-neon-blue hover:text-neon-blue/80 transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
