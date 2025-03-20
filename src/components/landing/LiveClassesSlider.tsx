
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Video, Link, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ZoomMeeting, getZoomMeetings } from "@/services/zoomService";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Slider } from "@/components/ui/slider";

const LiveClassesSlider = () => {
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      setIsLoading(true);
      try {
        const data = await getZoomMeetings();
        setMeetings(data);
      } catch (error) {
        console.error("Failed to fetch Zoom meetings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMeetings();
  }, []);

  const nextSlide = () => {
    if (meetings.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % meetings.length);
  };

  const prevSlide = () => {
    if (meetings.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + meetings.length) % meetings.length);
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
      if (meetings.length > 1) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % meetings.length);
      }
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlay && meetings.length > 1) {
      startAutoPlay();
    }
    
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlay, meetings.length]);

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

  const copyMeetingLink = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Meeting link copied to clipboard!");
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
            Upcoming <span className="animated-text">Live Classes</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join our interactive Zoom sessions with experienced instructors. 
            Learn new skills in real-time and participate in engaging discussions.
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="cyber-spinner"></div>
          </div>
        ) : meetings.length === 0 ? (
          <div className="meeting-card-glow bg-cyber-darker p-8 rounded-lg text-center max-w-xl mx-auto">
            <Video className="h-16 w-16 mx-auto text-neon-blue mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Upcoming Live Classes</h3>
            <p className="text-gray-400 mb-6">
              There are no live classes scheduled at the moment. Check back soon for new sessions!
            </p>
            <Button className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium">
              Browse Recorded Classes
            </Button>
          </div>
        ) : (
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
                  <div className="relative h-48 md:h-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyber-darker via-cyber-darker/70 to-transparent md:bg-gradient-to-l z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center z-20">
                        <Badge className="bg-neon-green text-black mb-4">LIVE CLASS</Badge>
                        <Video className="h-20 w-20 mx-auto text-neon-blue animate-pulse mb-4" />
                        <div className="glassmorphic inline-block px-4 py-2 rounded-full">
                          <Badge className="bg-neon-pink text-white">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{format(parseISO(meetings[currentIndex].start_time), "h:mm a")}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 bg-cyber-darker flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                      {meetings[currentIndex].topic}
                    </h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-300">
                        <Calendar size={18} className="text-neon-blue mr-3" />
                        <span className="text-sm">{format(parseISO(meetings[currentIndex].start_time), "EEEE, MMMM d, yyyy")}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Clock size={18} className="text-neon-blue mr-3" />
                        <span className="text-sm">{format(parseISO(meetings[currentIndex].start_time), "h:mm a")} ({meetings[currentIndex].duration} minutes)</span>
                      </div>
                      
                      <div className="flex items-center text-gray-300">
                        <Video size={18} className="text-neon-blue mr-3" />
                        <span className="text-sm">Zoom Meeting ID: {meetings[currentIndex].id.substring(0, 3)}...{meetings[currentIndex].id.substring(meetings[currentIndex].id.length - 3)}</span>
                      </div>
                      
                      {meetings[currentIndex].password && (
                        <div className="flex items-center text-gray-300">
                          <svg className="text-neon-blue mr-3 h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 8V6a3 3 0 0 0-6 0v2M5 10h14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
                          </svg>
                          <span className="text-sm">Password Protected</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <Button 
                        className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium transition-all hover:shadow-neon-glow"
                        onClick={() => window.open(meetings[currentIndex].join_url, "_blank")}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join Now
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-neon-blue text-neon-blue hover:bg-neon-blue/10"
                        onClick={() => copyMeetingLink(meetings[currentIndex].join_url)}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {meetings.length > 1 && (
              <>
                {/* Navigation arrows */}
                <button 
                  onClick={slidePrev}
                  className="absolute top-1/2 left-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full glassmorphic flex items-center justify-center text-white hover:text-neon-blue transition-colors"
                  aria-label="Previous class"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button 
                  onClick={slideNext}
                  className="absolute top-1/2 right-4 -translate-y-1/2 z-20 w-10 h-10 rounded-full glassmorphic flex items-center justify-center text-white hover:text-neon-blue transition-colors"
                  aria-label="Next class"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                
                {/* Dots indicator */}
                <div className="flex justify-center space-x-2 mt-6">
                  {meetings.map((_, index) => (
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
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveClassesSlider;
