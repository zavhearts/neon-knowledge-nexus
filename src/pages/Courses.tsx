
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Clock, Star, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Mock course data
const COURSES = [
  {
    id: 1,
    title: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity, including threat detection, prevention, and mitigation strategies.",
    instructor: "Dr. Alex Johnson",
    duration: "8 weeks",
    level: "Beginner",
    rating: 4.8,
    students: 1245,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Technology"
  },
  {
    id: 2,
    title: "Advanced Data Science",
    description: "Dive deep into data analysis, machine learning algorithms, and predictive modeling techniques.",
    instructor: "Prof. Sarah Williams",
    duration: "12 weeks",
    level: "Advanced",
    rating: 4.9,
    students: 892,
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Data Science"
  },
  {
    id: 3,
    title: "Web Development Masterclass",
    description: "Master the art of creating responsive, dynamic websites using modern frameworks and tools.",
    instructor: "Mark Anderson",
    duration: "10 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 1578,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Programming"
  },
  {
    id: 4,
    title: "Digital Marketing Essentials",
    description: "Learn the core principles of digital marketing, including SEO, social media, and content strategy.",
    instructor: "Lisa Chen",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.6,
    students: 1123,
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Marketing"
  },
  {
    id: 5,
    title: "AI and Machine Learning Fundamentals",
    description: "Understand the core concepts of artificial intelligence and machine learning algorithms.",
    instructor: "Dr. Michael Torres",
    duration: "9 weeks",
    level: "Intermediate",
    rating: 4.9,
    students: 876,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Technology"
  },
  {
    id: 6,
    title: "UX/UI Design Principles",
    description: "Learn how to create intuitive, user-centered designs that enhance user experience.",
    instructor: "Emma Richardson",
    duration: "7 weeks",
    level: "Intermediate",
    rating: 4.7,
    students: 932,
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    category: "Design"
  }
];

// Define categories
const CATEGORIES = ["All", "Technology", "Data Science", "Programming", "Marketing", "Design"];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewCourse = (courseId: number) => {
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      toast({
        title: "Course Selected",
        description: `You selected ${course.title}. Full course details coming soon!`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-cyber-dark bg-circuit-pattern pb-20">
        <div className="relative holographic-bg py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2 animated-text text-center">
              Explore Courses
            </h1>
            <p className="text-xl mb-8 text-white/80 text-center">
              Discover cutting-edge courses designed to boost your skills and knowledge
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative">
                <Input
                  placeholder="Search courses, topics, or instructors..."
                  className="bg-cyber-light/30 border-neon-blue/50 py-6 pl-12 text-white placeholder:text-white/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {CATEGORIES.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`${
                      selectedCategory === category 
                        ? "bg-neon-blue text-black" 
                        : "border-neon-blue/50 text-white"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <div key={course.id} className="cyber-card group h-full flex flex-col">
                <div className="relative h-48 mb-4 overflow-hidden neon-border">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-darker to-transparent"></div>
                  <Badge className="absolute top-3 right-3 bg-neon-blue text-black font-medium">
                    {course.level}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-white/70 mb-4 text-sm flex-grow">{course.description}</p>
                
                <div className="flex items-center mt-auto text-sm text-white/60 mb-3">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{course.instructor}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-white">{course.rating} ({course.students})</span>
                  </div>
                  <Button 
                    className="bg-neon-blue text-black hover:bg-neon-blue/80"
                    onClick={() => handleViewCourse(course.id)}
                  >
                    View Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-white/20" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-white/60 mb-8">Try changing your search criteria or browse all courses</p>
              <Button 
                className="cyber-button"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Browse All Courses
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Courses;
