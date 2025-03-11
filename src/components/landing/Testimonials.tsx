
import React from "react";
import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

interface TestimonialProps {
  name: string;
  role: string;
  rating: number;
  content: string;
  image?: string;
  delay: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  rating, 
  content, 
  image, 
  delay 
}) => {
  const maxRating = 5;
  
  return (
    <motion.div 
      className="cyber-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Rating stars */}
      <div className="flex mb-4">
        {[...Array(maxRating)].map((_, i) => (
          <Star 
            key={i} 
            size={18} 
            className={i < rating ? "text-neon-blue fill-neon-blue" : "text-gray-600"} 
          />
        ))}
      </div>
      
      {/* Content */}
      <p className="text-gray-300 mb-6 text-sm">{content}</p>
      
      {/* User */}
      <div className="flex items-center">
        <div className="mr-3">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-10 h-10 rounded-full object-cover border border-neon-blue/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-cyber-light flex items-center justify-center border border-neon-blue/30">
              <User size={20} className="text-neon-blue" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-white font-medium text-sm">{name}</h4>
          <p className="text-gray-400 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Developer",
      rating: 5,
      content: "The futuristic interface and immersive learning experience completely changed how I approach online education. The AI assistance helped me understand complex concepts quickly.",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Sarah Williams",
      role: "Data Scientist",
      rating: 5,
      content: "The mock tests and analytics provided invaluable insights into my progress. The holographic UI makes learning feel like something from the future!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Chen",
      role: "Cybersecurity Expert",
      rating: 4,
      content: "The live classes feature is exceptional. Being able to interact with instructors in real-time while having access to all the futuristic tools made learning engaging.",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    {
      name: "Emily Rodriguez",
      role: "UX Designer",
      rating: 5,
      content: "As a designer, I appreciate the attention to detail in the interface. The neon aesthetics and smooth animations make learning a visual treat. Great content too!",
      image: "https://randomuser.me/api/portraits/women/28.jpg"
    }
  ];

  return (
    <section className="py-20 bg-cyber-darker relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Our <span className="animated-text">Students Say</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear from our community of learners about their experiences with 
            EasyWin Learning Hub.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              rating={testimonial.rating}
              content={testimonial.content}
              image={testimonial.image}
              delay={0.1 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
