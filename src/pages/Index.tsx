
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Rocket, BookOpen, Video, Users, FileText, TestTube, Star } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";

// Animated counter component
const Counter = ({ end, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Start counting after a delay
    const timer = setTimeout(() => {
      // Animate count from 0 to end
      let start = 0;
      const duration = 2000; // 2 seconds
      const step = end / (duration / 16); // 60fps
      
      const interval = setInterval(() => {
        start = Math.min(start + step, end);
        setCount(Math.floor(start));
        
        if (start >= end) {
          clearInterval(interval);
        }
      }, 16);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <div className="text-center p-6 bg-white dark:bg-dark-blue/50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-2 text-royal-blue dark:text-royal-blue flex justify-center">
        <Icon className="h-10 w-10" />
      </div>
      <div className="text-4xl font-bold mb-1 text-dark-blue dark:text-white">
        {count.toLocaleString()}+
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">{label}</div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-white to-gray-100 dark:from-dark-blue dark:to-dark-blue/90">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-radial from-royal-blue/5 to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-block mb-4 px-4 py-1 rounded-full border border-royal-blue/50 bg-royal-blue/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-royal-blue text-sm font-medium">The Future of Learning</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark-blue dark:text-white">
              Easy Win Learning Hub
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light mb-8">
              Empowering Learning, Inspiring Future
            </h2>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/signup">
                <Button className="bg-royal-blue hover:bg-royal-blue/80 text-white font-semibold px-8 py-6 text-lg rounded-md transition-all">
                  Start Learning
                  <ChevronRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="border-royal-blue text-royal-blue hover:bg-royal-blue/10 px-8 py-6 text-lg rounded-md">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative mx-auto max-w-md">
              {/* Frame effect */}
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-royal-blue via-teal to-gold opacity-75 blur-md"></div>
              
              <div className="bg-white dark:bg-dark-blue/50 backdrop-blur-sm rounded-2xl p-1 relative">
                <div className="bg-white dark:bg-dark-blue/80 rounded-xl overflow-hidden">
                  <img 
                    src="/lovable-uploads/6d0b63c4-3fcf-4756-8c97-c249e6e91073.png" 
                    alt="Easy Win Learning Hub" 
                    className="w-full h-auto rounded-xl p-8"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute top-6 right-6 p-3 bg-white/80 dark:bg-dark-blue/80 backdrop-blur-sm rounded-full shadow-lg animate-float">
                    <Rocket className="text-royal-blue" size={24} />
                  </div>
                  
                  <div className="absolute bottom-6 left-6 max-w-[80%] p-4 bg-white/80 dark:bg-dark-blue/80 backdrop-blur-sm rounded-lg">
                    <p className="text-dark-blue dark:text-white text-sm">
                      "The future of education is immersive, interactive, and personalized."
                    </p>
                  </div>
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
    <div className="py-20 bg-gray-50 dark:bg-dark-blue/70">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark-blue dark:text-white mb-2">Our Impact in Numbers</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of students already using Easy Win Learning Hub to accelerate their education
          </p>
        </div>
        
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
    <div className="py-20 px-4 bg-white dark:bg-dark-blue">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dark-blue dark:text-white">
          Futuristic Learning Experience
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-royal-blue">
              <BookOpen className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Interactive Courses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Engage with cutting-edge courses designed by industry experts with immersive content and practical exercises.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-teal">
              <Video className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Live Classes</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join real-time sessions with instructors, participate in discussions, and get your questions answered instantly.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-gold">
              <Users className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Learning Community</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Connect with peers, collaborate on projects, and share knowledge in our vibrant student community.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-royal-blue">
              <FileText className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Comprehensive Resources</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access a vast library of study materials, presentations, PDFs, and reference documents.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-teal">
              <TestTube className="h-10 w-10 mb-2" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">Practice Tests</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Test your knowledge with adaptive quizzes and mock exams that provide instant feedback and analytics.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div 
            className="p-6 rounded-lg bg-white dark:bg-dark-blue/50 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-4 text-gold">
              <svg className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16V21M12 21H7M12 21H17M17 12H19C20.1046 12 21 11.1046 21 10V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V10C3 11.1046 3.89543 12 5 12H7M17 12L12 16L7 12M17 12H7" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-dark-blue dark:text-white">AI-Powered Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get personalized learning paths and recommendations based on your progress and learning style.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CTASection = () => {
  return (
    <div className="py-20 px-4 bg-gradient-to-r from-royal-blue/10 to-teal/10 dark:from-royal-blue/20 dark:to-teal/20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark-blue dark:text-white">
          Ready to Transform Your Learning Experience?
        </h2>
        <p className="text-lg mb-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join thousands of students already using Easy Win Learning Hub to accelerate their education and career.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-royal-blue hover:bg-royal-blue/80 text-white px-8 py-3 text-lg font-medium"
            onClick={() => window.location.href = '/courses'}
          >
            Explore Courses
          </Button>
          <Button 
            variant="outline" 
            className="border-royal-blue text-royal-blue hover:bg-royal-blue/10 px-8 py-3 text-lg"
            onClick={() => window.open('/live-classes', '_blank')}
          >
            Join Live Classes
          </Button>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <MainLayout hideHomeButton={true}>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
