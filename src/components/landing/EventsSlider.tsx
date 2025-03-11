
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "AI in Education: Future Trends",
    description: "Join our expert panel as they discuss how AI is transforming education and what to expect in the next decade.",
    date: "Oct 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual Webinar",
    attendees: 245,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Quantum Computing Workshop",
    description: "An introductory workshop to quantum computing principles and their applications in modern technology.",
    date: "Oct 22, 2023",
    time: "10:00 AM - 1:00 PM",
    location: "Virtual Classroom",
    attendees: 178,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Cybersecurity Masterclass",
    description: "Learn the latest techniques in cybersecurity from industry professionals and ethical hackers.",
    date: "Nov 5, 2023",
    time: "3:00 PM - 6:00 PM",
    location: "Virtual Workshop",
    attendees: 312,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Future of Web Development",
    description: "Explore cutting-edge web technologies and frameworks that will define the next generation of web applications.",
    date: "Nov 12, 2023",
    time: "1:00 PM - 3:00 PM",
    location: "Virtual Conference",
    attendees: 193,
    image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const EventsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      startAutoPlay();
    }
  };

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlay) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay]);

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const [direction, setDirection] = useState(1);

  const slideNext = () => {
    setDirection(1);
    nextSlide();
  };

  const slidePrev = () => {
    setDirection(-1);
    prevSlide();
  };

  return (
    <section className="py-20 bg-cyber-dark relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Upcoming <span className="animated-text">Events</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with our latest webinars, workshops, and special learning sessions 
            designed to enhance your knowledge and skills.
          </p>
        </motion.div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="overflow-hidden rounded-xl relative h-[450px] md:h-[400px]">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full h-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                <div className="relative h-48 md:h-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyber-darker via-cyber-darker/70 to-transparent md:bg-gradient-to-l z-10"></div>
                  <img 
                    src={events[currentIndex].image} 
                    alt={events[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 md:p-8 bg-cyber-darker flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    {events[currentIndex].title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm md:text-base mb-6">
                    {events[currentIndex].description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-300">
                      <Calendar size={18} className="text-neon-blue mr-3" />
                      <span className="text-sm">{events[currentIndex].date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Clock size={18} className="text-neon-blue mr-3" />
                      <span className="text-sm">{events[currentIndex].time}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <MapPin size={18} className="text-neon-blue mr-3" />
                      <span className="text-sm">{events[currentIndex].location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Users size={18} className="text-neon-blue mr-3" />
                      <span className="text-sm">{events[currentIndex].attendees} people attending</span>
                    </div>
                  </div>
                  
                  <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium w-full mt-auto transition-all hover:shadow-neon-glow">
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={slidePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full glassmorphic flex items-center justify-center text-white hover:text-neon-blue transition-colors"
            aria-label="Previous event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={slideNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full glassmorphic flex items-center justify-center text-white hover:text-neon-blue transition-colors"
            aria-label="Next event"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-neon-blue w-8" 
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSlider;
