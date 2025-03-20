
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, ArrowLeft, RotateCcw } from "lucide-react";

interface VerificationStepProps {
  method: "email" | "phone";
  email: string;
  phone: string;
  onComplete: (method: "email" | "phone") => void;
  onBack: () => void;
}

const VerificationStep = ({ method, email, phone, onComplete, onBack }: VerificationStepProps) => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Handle code input change
  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  // Generate a fake verification code
  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Generated verification code: ${code}`);
    return code;
  };
  
  // Send verification code (simulated)
  const sendVerificationCode = () => {
    setIsLoading(true);
    
    // Set countdown
    setCountdown(60);
    setCanResend(false);
    
    // Simulate API call
    setTimeout(() => {
      const code = generateCode();
      
      toast({
        title: `Verification Code Sent`,
        description: method === "email" 
          ? `A code has been sent to ${email}`
          : `A code has been sent to ${phone}`,
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  // Verify the entered code
  const verifyCode = () => {
    setIsLoading(true);
    
    const enteredCode = verificationCode.join("");
    
    // In a real implementation, we would check against the actual sent code
    // Here we're simulating success if the code has 6 digits
    setTimeout(() => {
      if (enteredCode.length === 6) {
        toast({
          title: "Verification Successful",
          description: "Your verification was completed successfully."
        });
        onComplete(method);
      } else {
        toast({
          title: "Verification Failed",
          description: "Please enter a valid 6-digit code.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };
  
  // Handle resend
  const handleResend = () => {
    sendVerificationCode();
  };
  
  // Initialize verification on component mount
  useEffect(() => {
    sendVerificationCode();
  }, []);
  
  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white text-center">
        {method === "email" ? "Email Verification" : "Phone Verification"}
      </h2>
      
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-cyber-light/20 mb-3">
          {method === "email" ? (
            <Mail className="h-8 w-8 text-neon-blue" />
          ) : (
            <Phone className="h-8 w-8 text-neon-blue" />
          )}
        </div>
        <p className="text-white/70">
          {method === "email" 
            ? `We've sent a 6-digit verification code to ${email}` 
            : `We've sent a 6-digit verification code to ${phone}`
          }
        </p>
      </div>
      
      {/* Code input */}
      <div className="flex justify-center space-x-2">
        {verificationCode.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleCodeChange(index, e.target.value)}
            className="w-12 h-14 text-center text-white bg-cyber-light/20 border border-neon-blue/30 rounded-md focus:border-neon-blue focus:ring focus:ring-neon-blue/20 outline-none text-xl font-semibold"
          />
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={verifyCode}
          className="cyber-button px-8"
          disabled={isLoading || verificationCode.join("").length !== 6}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-white/60 text-sm">
          {canResend ? (
            <button 
              onClick={handleResend}
              className="text-neon-blue hover:text-neon-blue/80 flex items-center justify-center mx-auto"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Resend Code
            </button>
          ) : (
            `Resend code in ${countdown}s`
          )}
        </p>
      </div>
      
      <div className="border-t border-gray-700 pt-4 mt-6">
        <Button 
          variant="ghost" 
          className="text-white/70 hover:text-white"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
    </div>
  );
};

export default VerificationStep;
