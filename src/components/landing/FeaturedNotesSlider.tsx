
import React, { useState } from "react";
import { motion } from "framer-motion";
import { File, Clock, Book, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface NoteItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  lastUpdated: string;
  category: string;
  link: string;
}

const featuredNotes: NoteItem[] = [
  {
    id: "income-tax-v1",
    title: "6th Semester Income Tax Notes - Version 1",
    description: "Comprehensive study material covering all aspects of Income Tax for 6th semester students.",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    lastUpdated: "March 25, 2025",
    category: "Taxation",
    link: "/income-tax-notes"
  },
  {
    id: "financial-management",
    title: "Financial Management & Accounting",
    description: "Essential notes for understanding financial management principles and accounting practices.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    lastUpdated: "February 18, 2025",
    category: "Finance",
    link: "/resources"
  },
  {
    id: "advanced-statistics",
    title: "Advanced Statistics for Business",
    description: "Statistical methods and their applications in business decision-making processes.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    lastUpdated: "January 30, 2025",
    category: "Statistics",
    link: "/resources"
  }
];

const FeaturedNotesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredNotes.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredNotes.length) % featuredNotes.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    }),
  };

  const currentNote = featuredNotes[currentIndex];

  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-800">
            Featured <span className="text-blue-600">Study Materials</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our latest study materials and notes to boost your academic performance.
            Stay updated with the most recent course materials.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-lg relative">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <Card className="border-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-96">
                      <img 
                        src={currentNote.thumbnail} 
                        alt={currentNote.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/60 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="text-white z-10">
                          <Badge className="bg-blue-600 text-white mb-4">{currentNote.category}</Badge>
                          <h3 className="text-2xl font-bold mb-2">{currentNote.title}</h3>
                          <div className="flex items-center text-blue-200 mb-6">
                            <Clock size={16} className="mr-2" />
                            <span>Updated: {currentNote.lastUpdated}</span>
                          </div>
                          <Button 
                            className="bg-white text-blue-700 hover:bg-blue-50"
                            onClick={() => navigate(currentNote.link)}
                          >
                            <Book className="mr-2 h-4 w-4" />
                            View Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-8 bg-white">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-4 text-blue-800">
                            {currentNote.title}
                          </h3>
                          <p className="text-gray-600 mb-6">
                            {currentNote.description}
                          </p>
                          
                          <div className="space-y-4">
                            <div className="flex items-center text-gray-700">
                              <File size={18} className="text-blue-600 mr-3" />
                              <span>Comprehensive study material</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <Clock size={18} className="text-blue-600 mr-3" />
                              <span>Last updated: {currentNote.lastUpdated}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => navigate(currentNote.link)}
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Access Full Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {featuredNotes.length > 1 && (
            <>
              <Button
                onClick={prevSlide}
                className="absolute top-1/2 -left-5 -translate-y-1/2 z-20 rounded-full w-10 h-10 p-0 bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                aria-label="Previous note"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button
                onClick={nextSlide}
                className="absolute top-1/2 -right-5 -translate-y-1/2 z-20 rounded-full w-10 h-10 p-0 bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                aria-label="Next note"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
              
              {/* Dots indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {featuredNotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex 
                        ? "bg-blue-600 w-8" 
                        : "bg-blue-200 hover:bg-blue-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNotesSlider;
