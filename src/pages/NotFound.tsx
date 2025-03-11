
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cyber-dark holographic-bg">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animated-text cyber-font">404</h1>
        <p className="text-xl text-white/80 mb-8">Oops! The page you're looking for doesn't exist</p>
        <Button 
          className="cyber-button group"
          onClick={handleNavigateHome}
        >
          <Home className="mr-2 h-5 w-5" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
