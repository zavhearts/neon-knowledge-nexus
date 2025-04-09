
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Team member data
const teamMembers = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Founder",
    bio: "Visionary leader with over 15 years of experience in educational technology.",
    avatar: "https://i.pravatar.cc/300?img=12",
    linkedin: "https://linkedin.com/in/",
    email: "alex@easywin.com"
  },
  {
    id: 2,
    name: "Jamie Smith",
    role: "Developer",
    bio: "Full-stack developer specialized in educational platforms and interactive learning tools.",
    avatar: "https://i.pravatar.cc/300?img=32",
    linkedin: "https://linkedin.com/in/",
    email: "jamie@easywin.com"
  },
  {
    id: 3,
    name: "Taylor Morgan",
    role: "Co-Developer",
    bio: "Frontend expert focused on creating intuitive and engaging user experiences.",
    avatar: "https://i.pravatar.cc/300?img=23",
    linkedin: "https://linkedin.com/in/",
    email: "taylor@easywin.com"
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "Co-Developer",
    bio: "Backend specialist with expertise in educational data management and analytics.",
    avatar: "https://i.pravatar.cc/300?img=67",
    linkedin: "https://linkedin.com/in/",
    email: "jordan@easywin.com"
  },
  {
    id: 5,
    name: "Casey Rivera",
    role: "Co-Developer",
    bio: "Mobile and responsive design expert ensuring seamless learning across all devices.",
    avatar: "https://i.pravatar.cc/300?img=42",
    linkedin: "https://linkedin.com/in/",
    email: "casey@easywin.com"
  },
  {
    id: 6,
    name: "Riley Kim",
    role: "Technical Supporter",
    bio: "IT specialist ensuring smooth operations and providing technical assistance to users.",
    avatar: "https://i.pravatar.cc/300?img=54",
    linkedin: "https://linkedin.com/in/",
    email: "riley@easywin.com"
  }
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-charcoal-black">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Vision Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-blue dark:text-white mb-6">
              About Us
            </h1>
            <div className="h-1 w-24 bg-royal-blue mx-auto mb-8"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-royal-blue dark:text-neon-cyan mb-8">
              Our Vision
            </h2>
            <p className="text-2xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto mb-12">
              "Empowering learning and inspiring future"
            </p>
            
            <div className="max-w-2xl mx-auto bg-white dark:bg-mystic-blue/30 shadow-md rounded-lg p-8 mb-16">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Our Mission</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Learn with advanced technology at an affordable cost.
              </p>
            </div>
          </div>
          
          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-dark-blue dark:text-white mb-12">
              Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex justify-center">
                  <Card className="w-full max-w-sm bg-white dark:bg-mystic-blue/20 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-mystic-blue/20 hover:-translate-y-1 border border-gray-100 dark:border-mystic-blue/30">
                    <div className="p-6">
                      <div className="flex flex-col items-center">
                        <Avatar className="w-32 h-32 rounded-full border-4 border-blue-50 dark:border-mystic-blue/30 mb-4 shadow-md">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {member.name}
                        </h3>
                        
                        <div className="inline-block bg-blue-100 dark:bg-mystic-blue text-blue-800 dark:text-neon-cyan text-sm font-medium px-3 py-1 rounded-full mb-3">
                          {member.role}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                          {member.bio}
                        </p>
                        
                        <div className="flex space-x-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a 
                                  href={member.linkedin} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="bg-blue-50 dark:bg-mystic-blue/50 hover:bg-blue-100 dark:hover:bg-mystic-blue/80 text-blue-600 dark:text-neon-cyan p-2 rounded-full transition-colors"
                                >
                                  <Linkedin size={20} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>LinkedIn Profile</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <a 
                                  href={`mailto:${member.email}`}
                                  className="bg-blue-50 dark:bg-mystic-blue/50 hover:bg-blue-100 dark:hover:bg-mystic-blue/80 text-blue-600 dark:text-neon-cyan p-2 rounded-full transition-colors"
                                >
                                  <Mail size={20} />
                                </a>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send Email</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="text-center pb-8">
            <Link to="/">
              <Button className="bg-royal-blue hover:bg-royal-blue/80">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
