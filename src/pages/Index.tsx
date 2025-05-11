
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Rocket, BookOpen, Video, Users, Star, FileText, TestTube } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import EventsSlider from "@/components/landing/EventsSlider";
import { useTheme } from "@/components/theme/theme-provider";

// Circuit animation canvas component for the logo
const CircuitCanvas = ({ className }) => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let logoElement = document.querySelector('.logo-element');
    let logoRect = logoElement ? logoElement.getBoundingClientRect() : { left: 0, top: 0, width: 100, height: 100 };
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      logoElement = document.querySelector('.logo-element');
      if (!logoElement) return;
      
      logoRect = logoElement.getBoundingClientRect();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Circuit lines
    class Circuit {
      constructor() {
        this.startX = logoRect.left + logoRect.width / 2 + (Math.random() * 30 - 15);
        this.startY = logoRect.top + logoRect.height / 2 + (Math.random() * 30 - 15);
        this.points = [];
        this.maxPoints = 5 + Math.floor(Math.random() * 5);
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.5 + Math.random() * 2;
        this.pulse = 0;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.color = theme === 'dark' ? '#38bdf8' : '#007BFF';
        this.lifespan = 100 + Math.random() * 50;
        this.life = 0;
        this.branched = false;
        this.branchChance = 0.2;
        
        this.generatePoints();
      }
      
      generatePoints() {
        let x = this.startX;
        let y = this.startY;
        this.points.push({ x, y });
        
        for (let i = 0; i < this.maxPoints; i++) {
          // Create a path with 90 degree turns
          const turnDirection = Math.floor(Math.random() * 4);
          let distance = 20 + Math.random() * 100;
          
          if (turnDirection === 0) x += distance; // right
          else if (turnDirection === 1) x -= distance; // left
          else if (turnDirection === 2) y += distance; // down
          else y -= distance; // up
          
          this.points.push({ x, y });
        }
      }
      
      update() {
        this.pulse += this.pulseSpeed;
        this.life++;
        
        // Create branches randomly
        if (!this.branched && this.life > 20 && Math.random() < this.branchChance) {
          this.branched = true;
          return new Circuit();
        }
        
        return null;
      }
      
      draw(ctx) {
        const alpha = Math.sin(this.pulse) * 0.5 + 0.5;
        const fadeOut = Math.max(0, 1 - this.life / this.lifespan);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha * fadeOut;
        
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        
        // Draw circuit with straight lines and 90 degree turns
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        
        ctx.stroke();
        
        // Draw pulse
        const pulseProgress = (this.life / 20) % 1;
        if (pulseProgress < 1 && this.life < this.lifespan - 20) {
          for (let i = 0; i < this.points.length - 1; i++) {
            const segmentLength = Math.sqrt(
              Math.pow(this.points[i+1].x - this.points[i].x, 2) + 
              Math.pow(this.points[i+1].y - this.points[i].y, 2)
            );
            
            const totalLength = segmentLength * (i + pulseProgress);
            
            // Calculate pulse position
            let pulseX = this.points[i].x;
            let pulseY = this.points[i].y;
            
            if (i < this.points.length - 1) {
              const dx = this.points[i+1].x - this.points[i].x;
              const dy = this.points[i+1].y - this.points[i].y;
              
              if (i === Math.floor(pulseProgress * (this.points.length - 1))) {
                const segmentPulseProgress = (pulseProgress * (this.points.length - 1)) % 1;
                pulseX += dx * segmentPulseProgress;
                pulseY += dy * segmentPulseProgress;
                
                // Draw pulse
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
              }
            }
          }
        }
        
        ctx.globalAlpha = 1;
      }
      
      isDead() {
        return this.life > this.lifespan;
      }
    }
    
    let circuits = [];
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create new circuits occasionally
      if (Math.random() < 0.05 && circuits.length < 20) {
        circuits.push(new Circuit());
      }
      
      // Update and draw circuits
      for (let i = circuits.length - 1; i >= 0; i--) {
        const newCircuit = circuits[i].update();
        if (newCircuit) circuits.push(newCircuit);
        
        circuits[i].draw(ctx);
        
        // Remove dead circuits
        if (circuits[i].isDead()) {
          circuits.splice(i, 1);
        }
      }
      
      animationFrameId = window.requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`} />;
};

// Text typing animation component with corrected text
const TypedText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          index++;
        } else {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, 80);
      
      return () => clearInterval(typingInterval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <h2 className="text-xl md:text-2xl font-light mb-8 text-gray-700 dark:text-gray-200">
      <span className="relative">
        {displayText}
        <span className={`inline-block h-6 w-0.5 bg-royal-blue dark:bg-neon-blue ml-1 ${isComplete ? 'animate-pulse' : ''}`}></span>
      </span>
    </h2>
  );
};

const Counter = ({ end, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const step = end / (duration / 16);
      
      const interval = setInterval(() => {
        start = Math.min(start + step, end);
        setCount(Math.floor(start));
        
        if (start >= end) {
          clearInterval(interval);
          controls.start({ scale: [1.05, 1], transition: { duration: 0.3 } });
        }
      }, 16);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [end, delay, controls]);

  return (
    <motion.div 
      className="text-center p-6 bg-white/80 dark:bg-cyber-darker/80 backdrop-blur-sm rounded-lg shadow-md border border-royal-blue/20 dark:border-neon-blue/20 hover:shadow-lg hover:border-royal-blue/50 dark:hover:border-neon-blue/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.3)" }}
    >
      <motion.div 
        className="mb-2 text-royal-blue dark:text-neon-blue flex justify-center" 
        animate={controls}
      >
        <Icon className="h-10 w-10 animate-pulse" />
      </motion.div>
      <motion.div 
        className="text-4xl font-bold mb-1 text-dark-blue dark:text-white"
        animate={controls}
      >
        {count.toLocaleString()}+
      </motion.div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </motion.div>
  );
};

// Sci-fi effect for "The Future of Learning" text
const FutureOfLearningText = () => {
  return (
    <motion.div 
      className="inline-block mb-4 px-4 py-2 rounded-md border border-royal-blue/50 dark:border-neon-blue/30 bg-black text-white dark:bg-black/80 backdrop-blur-sm font-space-grotesk relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="text-neon-blue text-sm md:text-base font-medium relative z-10">
        The Future of Learning
      </span>
      
      {/* Scanner line animation */}
      <span className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-royal-blue dark:via-neon-blue to-transparent animate-scanner-line"></span>
      </span>
      
      {/* Glitch effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-royal-blue/20 dark:from-neon-blue/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </motion.div>
  );
};

const HeroSection = () => {
  const { theme } = useTheme();
  
  // Staggered animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-white to-gray-100 dark:from-cyber-dark dark:to-cyber-darker">
      {/* Animated background elements */}
      <CircuitCanvas className="z-10" />
      <div className="absolute inset-0 bg-cyber-grid opacity-20 animate-circuit-animation"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-royal-blue/20 dark:from-neon-blue/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-royal-blue/20 dark:from-neon-blue/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <FutureOfLearningText />
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-blue dark:text-white font-space-grotesk tracking-tight"
              variants={item}
            >
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan bg-clip-text text-transparent animate-text-shimmer">
                  Easy Win Learning Hub
                </span>
                <span className="absolute -inset-0.5 bg-gradient-to-r from-royal-blue/20 to-teal/20 dark:from-neon-blue/20 dark:to-neon-cyan/20 blur-md rounded-lg opacity-70 animate-pulse-glow"></span>
              </span>
            </motion.h1>
            
            <motion.div variants={item}>
              <TypedText text="Empowering Learning, Inspiring Future" delay={600} />
            </motion.div>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Link to="/signup">
                <Button className="relative overflow-hidden bg-royal-blue hover:bg-royal-blue/80 dark:bg-neon-blue dark:hover:bg-neon-blue/80 text-white dark:text-black font-semibold px-8 py-6 text-lg rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-pulse-glow hover:animate-none">
                  <span className="relative z-10 font-space-grotesk">Start Learning</span>
                  <ChevronRight className="ml-2 relative z-10" size={20} />
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-royal-blue/0 via-white/20 dark:via-white/30 to-royal-blue/0 -translate-x-full hover:animate-shine"></span>
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue/10 dark:border-neon-blue dark:text-neon-blue dark:hover:bg-neon-blue/10 px-8 py-6 text-lg rounded-md transition-all relative overflow-hidden group hover:-translate-y-1">
                  <span className="relative z-10 font-space-grotesk">Explore Courses</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.3,
              type: "spring",
              stiffness: 100
            }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Holographic frame effect with improved visibility */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-royal-blue via-teal to-gold dark:from-neon-blue dark:via-neon-purple dark:to-neon-pink opacity-75 blur-md animate-pulse-glow"></div>
              
              <div className="bg-white dark:bg-cyber-darker/50 backdrop-blur-sm rounded-2xl p-1 relative">
                <div className="bg-white dark:bg-cyber-darker/80 rounded-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/6db8a32c-58a8-4d1e-9c82-e1c9efa2a040.png" 
                    alt="Easy Win Learning Hub" 
                    className="w-full h-auto rounded-xl p-8 logo-element"
                  />
                  
                  <motion.div 
                    className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-cyber-darker/80 backdrop-blur-sm rounded-full shadow-lg"
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Rocket className="text-royal-blue dark:text-neon-blue" size={24} />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute bottom-6 left-6 max-w-[80%] p-4 bg-white/80 dark:bg-cyber-darker/80 backdrop-blur-sm rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  >
                    <p className="text-dark-blue dark:text-white text-sm high-contrast-text">
                      "The future of education is immersive, interactive, and personalized."
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="py-20 bg-gray-50/80 dark:bg-cyber-darker/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background circuit pattern */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark-blue dark:text-white mb-2 font-space-grotesk">Our Impact in Numbers</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of students already using Easy Win Learning Hub to accelerate their education
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Counter end={25000} label="Students" icon={Users} delay={0} />
          <Counter end={120} label="Courses" icon={BookOpen} delay={200} />
          <Counter end={50} label="Live Classes Weekly" icon={Video} delay={400} />
          <Counter end={4.8} label="Average Rating" icon={Star} delay={600} />
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="py-20 px-4 bg-white dark:bg-dark-blue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-royal-blue/5 dark:to-neon-blue/5"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue dark:text-white font-space-grotesk"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="relative">
            Futuristic Learning Experience
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan"></span>
          </span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-royal-blue dark:text-neon-blue group-hover:animate-pulse">
              <BookOpen className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Interactive Courses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Engage with cutting-edge courses designed by industry experts with immersive content and practical exercises.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan mt-4 transition-all duration-300"></div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-teal dark:text-neon-cyan group-hover:animate-pulse">
              <Video className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Live Classes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join real-time sessions with instructors, participate in discussions, and get your questions answered instantly.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal to-royal-blue dark:from-neon-cyan dark:to-neon-blue mt-4 transition-all duration-300"></div>
          </motion.div>
          
          {/* Continue with other cards */}
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-gold dark:text-neon-green group-hover:animate-pulse">
              <Users className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Learning Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with peers, collaborate on projects, and share knowledge in our vibrant student community.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold to-royal-blue dark:from-neon-green dark:to-neon-blue mt-4 transition-all duration-300"></div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-royal-blue dark:text-neon-blue group-hover:animate-pulse">
              <FileText className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Comprehensive Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access a vast library of study materials, presentations, PDFs, and reference documents.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan mt-4 transition-all duration-300"></div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-teal dark:text-neon-cyan group-hover:animate-pulse">
              <TestTube className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Practice Tests</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Test your knowledge with adaptive quizzes and mock exams that provide instant feedback and analytics.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-teal to-royal-blue dark:from-neon-cyan dark:to-neon-blue mt-4 transition-all duration-300"></div>
          </motion.div>
          
          <motion.div 
            className="p-6 rounded-lg bg-white/80 dark:bg-dark-blue/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-neon-blue/20 group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 123, 255, 0.2)" }}
          >
            <div className="mb-4 text-gold dark:text-neon-green group-hover:animate-pulse">
              <svg className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V21M12 21H7M12 21H17M17 12H19C20.1046 12 21 11.1046 21 10V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V10C3 11.1046 3.89543 12 5 12H7M17 12L12 16L7 12M17 12H7" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">AI-Powered Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized learning paths and recommendations based on your progress and learning style.
            </p>
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-gold to-royal-blue dark:from-neon-green dark:to-neon-blue mt-4 transition-all duration-300"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="py-20 px-4 bg-gradient-to-r from-royal-blue/10 to-teal/10 dark:from-royal-blue/5 dark:to-teal/5 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 animate-circuit-animation"></div>
      
      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-blue dark:text-white font-space-grotesk">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join thousands of students already using Easy Win Learning Hub to accelerate their education and career.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-royal-blue hover:bg-royal-blue/80 dark:bg-neon-blue dark:hover:bg-neon-blue/80 text-white dark:text-black px-8 py-3 text-lg font-medium relative overflow-hidden group"
            onClick={() => window.location.href = '/courses'}
          >
            <span className="relative z-10">Explore Courses</span>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-royal-blue/0 via-white/20 dark:via-white/30 to-royal-blue/0 -translate-x-full group-hover:animate-shine"></span>
          </Button>
          <Button 
            variant="outline" 
            className="border-royal-blue text-royal-blue hover:bg-royal-blue/10 dark:border-neon-blue dark:text-neon-blue dark:hover:bg-neon-blue/10 px-8 py-3 text-lg group"
            onClick={() => window.open('/live-classes', '_blank')}
          >
            <span className="relative z-10">Join Live Classes</span>
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-royal-blue to-teal dark:from-neon-blue dark:to-neon-cyan transition-all duration-300"></span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const Index = () => {
  return (
    <MainLayout hideHomeButton={true}>
      <HeroSection />
      <EventsSlider />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
