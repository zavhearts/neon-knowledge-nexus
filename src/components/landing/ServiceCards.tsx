
import React from "react";
import { motion } from "framer-motion";
import { BookOpen, FileText, Video, MessageSquare, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link, color, delay }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      } 
    },
    hover: { 
      y: -10,
      boxShadow: `0 0 25px 5px ${color}33`,
      border: `1px solid ${color}80`,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <motion.div
      className="cyber-card flex flex-col h-full"
      style={{ 
        borderColor: `${color}30`, 
      }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div 
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
        style={{ 
          backgroundColor: `${color}15`,
          color: color,
          boxShadow: `0 0 15px 1px ${color}40`
        }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
      <Link 
        to={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-sm font-medium transition-colors"
        style={{ color }}
      >
        Explore {title} →
      </Link>
    </motion.div>
  );
};

const ServiceCards = () => {
  const services = [
    {
      icon: <BookOpen size={24} />,
      title: "Courses",
      description: "Access a wide range of recorded video lectures taught by industry experts.",
      link: "/courses",
      color: "#00f7ff", // neon-blue
    },
    {
      icon: <FileText size={24} />,
      title: "Resources",
      description: "Download study materials including notes, PDFs and interactive resources.",
      link: "/resources",
      color: "#8B5CF6", // neon-purple
    },
    {
      icon: <Video size={24} />,
      title: "Live Classes",
      description: "Join interactive live learning sessions and get your questions answered in real-time.",
      link: "/live-classes",
      color: "#D946EF", // neon-pink
    },
    {
      icon: <MessageSquare size={24} />,
      title: "Community",
      description: "Connect with peers and instructors in our vibrant learning community.",
      link: "/community",
      color: "#10B981", // neon-green
    },
    {
      icon: <FileCheck size={24} />,
      title: "Mock Tests",
      description: "Practice with our adaptive tests and get detailed performance analytics.",
      link: "/mock-tests",
      color: "#F97316", // bright orange
    }
  ];

  return (
    <section className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-cyber-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-cyber-dark to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Our <span className="animated-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive learning services designed to provide you with the best 
            educational experience in a futuristic environment.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
              color={service.color}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
