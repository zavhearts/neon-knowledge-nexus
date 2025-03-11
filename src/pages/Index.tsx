
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, BookOpen, Video, Users, FileText, TestTube } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-cyber-dark bg-circuit-pattern">
        {/* Hero Section */}
        <section className="relative holographic-bg py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-cyber-darker opacity-70"></div>
            <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animated-text">
              Easy Win Learning Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-neon-blue animate-pulse-glow">
              Empowering Learning, Inspiring Future
            </p>
            <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
              Dive into our futuristic e-learning platform with interactive courses, live classes, 
              comprehensive resources, and an innovative learning experience.
            </p>
            <Link to="/courses">
              <Button className="cyber-button group text-lg">
                Get Started 
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyber-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center animated-text">
              Futuristic Learning Experience
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-blue">
                  <BookOpen className="h-10 w-10 mb-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Courses</h3>
                <p className="text-white/70">
                  Engage with cutting-edge courses designed by industry experts with immersive content and practical exercises.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-purple">
                  <Video className="h-10 w-10 mb-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Classes</h3>
                <p className="text-white/70">
                  Join real-time sessions with instructors, participate in discussions, and get your questions answered instantly.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-pink">
                  <Users className="h-10 w-10 mb-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learning Community</h3>
                <p className="text-white/70">
                  Connect with peers, collaborate on projects, and share knowledge in our vibrant student community.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-green">
                  <FileText className="h-10 w-10 mb-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
                <p className="text-white/70">
                  Access a vast library of study materials, presentations, PDFs, and reference documents.
                </p>
              </div>
              
              {/* Feature 5 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-blue">
                  <TestTube className="h-10 w-10 mb-2" />
                </div>
                <h3 className="text-xl font-bold mb-2">Practice Tests</h3>
                <p className="text-white/70">
                  Test your knowledge with adaptive quizzes and mock exams that provide instant feedback and analytics.
                </p>
              </div>
              
              {/* Feature 6 */}
              <div className="cyber-card group">
                <div className="mb-4 text-neon-purple">
                  <svg className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16V21M12 21H7M12 21H17M17 12H19C20.1046 12 21 11.1046 21 10V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V10C3 11.1046 3.89543 12 5 12H7M17 12L12 16L7 12M17 12H7" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
                <p className="text-white/70">
                  Get personalized learning paths and recommendations based on your progress and learning style.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 relative holographic-bg">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cyber-dark opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animated-text">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Join thousands of students already using Easy Win Learning Hub to accelerate their education and career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button className="cyber-button">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/live-classes">
                <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10">
                  Join Live Classes
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
