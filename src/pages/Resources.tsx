
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, FileImage, Film, Music, Book, FileBox, FilePlus2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock resource data
const RESOURCES = [
  {
    id: 1,
    title: "Cybersecurity Fundamentals Guide",
    description: "Comprehensive guide covering the basics of cybersecurity concepts and practices.",
    type: "PDF",
    size: "4.2 MB",
    course: "Introduction to Cybersecurity",
    date: "2023-09-15",
    downloads: 1245,
    icon: FileText
  },
  {
    id: 2,
    title: "Data Visualization Techniques",
    description: "Advanced techniques for creating effective data visualizations with practical examples.",
    type: "PDF",
    size: "5.8 MB",
    course: "Data Science Fundamentals",
    date: "2023-09-12",
    downloads: 876,
    icon: FileText
  },
  {
    id: 3,
    title: "HTML5 & CSS3 Cheat Sheet",
    description: "Quick reference guide for HTML5 tags and CSS3 properties with examples.",
    type: "PDF",
    size: "2.1 MB",
    course: "Web Development Masterclass",
    date: "2023-09-08",
    downloads: 1582,
    icon: FileText
  },
  {
    id: 4,
    title: "Introduction to Machine Learning Algorithms",
    description: "Slide deck covering popular machine learning algorithms and their applications.",
    type: "PPT",
    size: "7.5 MB",
    course: "AI and Machine Learning Fundamentals",
    date: "2023-09-05",
    downloads: 932,
    icon: FileImage
  },
  {
    id: 5,
    title: "Network Security Tutorial Video",
    description: "Step-by-step tutorial on implementing basic network security measures.",
    type: "MP4",
    size: "128 MB",
    course: "Introduction to Cybersecurity",
    date: "2023-09-01",
    downloads: 754,
    icon: Film
  },
  {
    id: 6,
    title: "UX Design Principles Handbook",
    description: "Comprehensive handbook on user experience design principles and best practices.",
    type: "PDF",
    size: "6.3 MB",
    course: "UX/UI Design Principles",
    date: "2023-08-28",
    downloads: 621,
    icon: Book
  },
  {
    id: 7,
    title: "Python Code Examples Archive",
    description: "Collection of Python code examples for data analysis and visualization.",
    type: "ZIP",
    size: "12.4 MB",
    course: "Data Science Fundamentals",
    date: "2023-08-25",
    downloads: 1102,
    icon: FileBox
  },
  {
    id: 8,
    title: "Digital Marketing Strategy Template",
    description: "Customizable template for creating comprehensive digital marketing strategies.",
    type: "XLSX",
    size: "1.8 MB",
    course: "Digital Marketing Essentials",
    date: "2023-08-20",
    downloads: 548,
    icon: FileText
  }
];

// Resource types for filtering
const RESOURCE_TYPES = ["All", "PDF", "PPT", "MP4", "ZIP", "XLSX"];

// Course names for filtering
const COURSES = [
  "All Courses",
  "Introduction to Cybersecurity",
  "Data Science Fundamentals",
  "Web Development Masterclass",
  "AI and Machine Learning Fundamentals",
  "UX/UI Design Principles",
  "Digital Marketing Essentials"
];

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");

  const filteredResources = RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const matchesCourse = selectedCourse === "All Courses" || resource.course === selectedCourse;
    
    return matchesSearch && matchesType && matchesCourse;
  });

  const getIconForType = (type: string) => {
    switch(type) {
      case "PDF": return FileText;
      case "PPT": return FileImage;
      case "MP4": return Film;
      case "ZIP": return FileBox;
      case "XLSX": return FileText;
      default: return FileText;
    }
  };

  const getColorForType = (type: string) => {
    switch(type) {
      case "PDF": return "bg-neon-blue text-black";
      case "PPT": return "bg-neon-purple text-white";
      case "MP4": return "bg-neon-pink text-black";
      case "ZIP": return "bg-neon-green text-black";
      case "XLSX": return "bg-yellow-500 text-black";
      default: return "bg-neon-blue text-black";
    }
  };

  return (
    <div className="min-h-screen bg-cyber-dark bg-circuit-pattern pb-20">
      <div className="relative holographic-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cyber-darker opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-radial from-neon-blue/10 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 animated-text text-center">
            Resource Library
          </h1>
          <p className="text-xl mb-8 text-white/80 text-center">
            Access study materials, presentations, and guides for all your courses
          </p>
          
          {/* Search */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="Search resources by title or description..."
                className="bg-cyber-light/30 border-neon-blue/50 py-6 pl-12 text-white placeholder:text-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neon-blue" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Tabs defaultValue="all" className="mt-4 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <TabsList className="bg-cyber-light/20 p-1 mb-4 md:mb-0">
              <TabsTrigger value="all" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                All Resources
              </TabsTrigger>
              <TabsTrigger value="lectures" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                Lecture Notes
              </TabsTrigger>
              <TabsTrigger value="handouts" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                Handouts
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:bg-neon-blue data-[state=active]:text-black">
                Media
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              <select 
                className="bg-cyber-light/30 border border-neon-blue/50 rounded text-white px-3 py-2"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {RESOURCE_TYPES.map(type => (
                  <option key={type} value={type} className="bg-cyber-dark">
                    {type}
                  </option>
                ))}
              </select>
              
              <select 
                className="bg-cyber-light/30 border border-neon-blue/50 rounded text-white px-3 py-2"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {COURSES.map(course => (
                  <option key={course} value={course} className="bg-cyber-dark">
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredResources.map(resource => {
                const ResourceIcon = getIconForType(resource.type);
                const badgeColor = getColorForType(resource.type);
                
                return (
                  <Card key={resource.id} className="cyber-card p-6">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-neon-blue/10 text-neon-blue mr-4">
                        <ResourceIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                          <Badge className={`${badgeColor}`}>
                            {resource.type}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{resource.description}</p>
                        <div className="flex flex-wrap items-center text-sm text-white/60">
                          <span className="mr-4">{resource.course}</span>
                          <span className="mr-4">{resource.size}</span>
                          <span className="mr-4">{new Date(resource.date).toLocaleDateString()}</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-end">
                      <Button className="bg-neon-blue text-black hover:bg-neon-blue/80">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 mx-auto mb-4 text-white/20" />
                <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                <p className="text-white/60">Try changing your search or filters</p>
              </div>
            )}
          </TabsContent>
          
          {/* Similar content for other tabs */}
          <TabsContent value="lectures" className="mt-0">
            {/* Lecture notes specific content */}
          </TabsContent>
          
          <TabsContent value="handouts" className="mt-0">
            {/* Handouts specific content */}
          </TabsContent>
          
          <TabsContent value="media" className="mt-0">
            {/* Media specific content */}
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 mb-4 border-t border-white/10 pt-8">
          <h2 className="text-2xl font-bold mb-4">Need Additional Resources?</h2>
          <Card className="cyber-card p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <FilePlus2 className="h-12 w-12 text-neon-purple" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Request Study Materials</h3>
                <p className="text-white/70 mb-4">
                  Can't find what you're looking for? Submit a request for specific resources, and our instructors will try to provide them.
                </p>
                <Button className="cyber-button">
                  Submit Resource Request
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Resources;
