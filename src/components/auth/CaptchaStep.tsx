
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, RefreshCw, Check } from "lucide-react";

interface CaptchaStepProps {
  onVerify: () => void;
  onBack: () => void;
}

// Simple math captcha implementation
const CaptchaStep = ({ onVerify, onBack }: CaptchaStepProps) => {
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return {
      question: `${num1} + ${num2} = ?`,
      answer: (num1 + num2).toString()
    };
  }
  
  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaAnswer("");
  };
  
  const handleVerify = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      if (captchaAnswer === captcha.answer) {
        toast({
          title: "Verification Successful",
          description: "You have been verified as human."
        });
        onVerify();
      } else {
        toast({
          title: "Verification Failed",
          description: "Please try again with the correct answer.",
          variant: "destructive"
        });
        refreshCaptcha();
      }
      setIsVerifying(false);
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white text-center">Human Verification</h2>
      
      <div className="bg-cyber-light/20 border border-neon-blue/30 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white/70 text-sm">Complete the verification</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshCaptcha}
            className="text-white/60 hover:text-white p-1 h-auto"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-center">
          <div className="bg-cyber-darker p-3 rounded-md">
            <span className="text-xl font-bold text-neon-blue tracking-wider">{captcha.question}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full bg-cyber-darker border border-neon-blue/30 rounded-md p-3 text-white focus:border-neon-blue focus:ring focus:ring-neon-blue/20 outline-none"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button 
          onClick={handleVerify}
          className="cyber-button px-8"
          disabled={isVerifying || !captchaAnswer}
        >
          {isVerifying ? (
            "Verifying..."
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" /> Verify
            </>
          )}
        </Button>
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

export default CaptchaStep;
