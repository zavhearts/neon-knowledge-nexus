
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Eye, Edit, Trash2, MoreHorizontal, List, Video } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomVideoPlayer from "../video/CustomVideoPlayer";
import CourseCreationModal from "./CourseCreationModal";

interface CourseClass {
  id: number;
  title: string;
  type: string;
  students: number;
  date: string;
  status: string;
  videoUrl?: string;
  resources?: {
    type: string;
    name: string;
    url: string;
  }[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  classes: number[];
  createdAt: string;
  students: number;
}

interface CoursesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleUploadClick: (type: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  classes: CourseClass[];
}

const CoursesTab: React.FC<CoursesTabProps> = ({
  searchTerm,
  setSearchTerm,
  handleUploadClick,
  handleAction,
  classes,
}) => {
  const [selectedClass, setSelectedClass] = useState<CourseClass | null>(null);
  const [viewingClass, setViewingClass] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);
  
  // Sample courses data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced Web Development Masterclass",
      description: "Learn modern web development techniques with React, Node.js, and more",
      thumbnailUrl: "https://sample-videos.com/img/Sample-jpg-image-1mb.jpg",
      classes: [1, 3],
      createdAt: "2023-09-10",
      students: 32
    },
    {
      id: 2,
      title: "Data Science & Machine Learning",
      description: "Comprehensive course covering data analysis, visualization, and machine learning algorithms",
      thumbnailUrl: "https://sample-videos.com/img/Sample-jpg-image-500kb.jpg",
      classes: [2, 4],
      createdAt: "2023-09-05",
      students: 45
    }
  ]);
  
  const handleViewClass = (classItem: CourseClass) => {
    setSelectedClass(classItem);
    setViewingClass(true);
  };
  
  const handleCourseCreation = (courseData: Course) => {
    setCourses([...courses, courseData]);
  };
  
  const toggleCourseExpansion = (courseId: number) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
    }
  };
  
  const getClassesForCourse = (courseClassIds: number[]) => {
    return classes.filter(cls => courseClassIds.includes(cls.id));
  };
  
  // Enhanced classes with sample resources
  const enhancedClasses = classes.map(cls => ({
    ...cls,
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    resources: [
      { type: "PDF", name: "Lecture Notes", url: "https://example.com/notes.pdf" },
      { type: "PDF", name: "Practice Problems", url: "https://example.com/problems.pdf" },
      { type: "XLSX", name: "Calculation Sheet", url: "https://example.com/calc.xlsx" }
    ]
  }));
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Card className="cyber-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Courses</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
              <Input
                placeholder="Search courses..."
                className="pl-10 bg-cyber-light/30 border-neon-blue/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowCourseModal(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </div>
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {filteredCourses.map((course) => (
              <div key={course.id} className="border border-white/20 rounded-lg overflow-hidden bg-cyber-light/5">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-32 md:h-auto">
                    <img 
                      src={course.thumbnailUrl} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-white">{course.title}</h3>
                      <div className="flex items-center mt-2 md:mt-0">
                        <Badge className="bg-neon-blue mr-2">
                          {course.classes.length} Classes
                        </Badge>
                        <Badge className="bg-neon-green text-black">
                          {course.students} Students
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="ml-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-cyber-darker border-neon-blue/50">
                            <DropdownMenuLabel>Course Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem 
                              className="cursor-pointer"
                              onClick={() => handleAction("Edit", course.id, "Course")}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Course
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() => toggleCourseExpansion(course.id)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Classes
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleAction("Delete", course.id, "Course")}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Course
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <p className="text-white/70 text-sm mb-3">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-white/50">Created on: {course.createdAt}</div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-neon-blue border-neon-blue/50"
                        onClick={() => toggleCourseExpansion(course.id)}
                      >
                        <List className="h-4 w-4 mr-2" />
                        {expandedCourse === course.id ? "Hide Classes" : "View Classes"}
                      </Button>
                    </div>
                  </div>
                </div>
                
                {expandedCourse === course.id && (
                  <div className="border-t border-white/20 p-4">
                    <h4 className="font-medium mb-3 flex items-center">
                      <Video className="h-4 w-4 mr-2 text-neon-blue" />
                      Classes in this Course
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-2 px-4">Title</th>
                            <th className="text-left py-2 px-4">Type</th>
                            <th className="text-left py-2 px-4">Students</th>
                            <th className="text-left py-2 px-4">Date</th>
                            <th className="text-left py-2 px-4">Status</th>
                            <th className="text-right py-2 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getClassesForCourse(course.classes).map((cls) => (
                            <tr key={cls.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                              <td className="py-2 px-4">{cls.title}</td>
                              <td className="py-2 px-4">
                                <Badge className={cls.type === "Live" ? "bg-neon-purple text-white" : "bg-neon-green text-black"}>
                                  {cls.type}
                                </Badge>
                              </td>
                              <td className="py-2 px-4">{cls.students}</td>
                              <td className="py-2 px-4">{cls.date}</td>
                              <td className="py-2 px-4">
                                <Badge className={cls.status === "Published" ? "bg-neon-blue text-black" : "bg-neon-pink text-white"}>
                                  {cls.status}
                                </Badge>
                              </td>
                              <td className="py-2 px-4 text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    className="text-white/70 hover:text-white hover:bg-white/10"
                                    size="sm"
                                    onClick={() => handleViewClass(cls)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    className="text-neon-blue hover:text-neon-blue/80 hover:bg-neon-blue/10"
                                    size="sm"
                                    onClick={() => handleAction("Edit", cls.id, "Class")}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed border-white/30 rounded-lg">
            <List className="h-16 w-16 text-white/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Courses Found</h3>
            <p className="text-white/50 mb-4">Start creating your first course to organize your classes</p>
            <Button onClick={() => setShowCourseModal(true)}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </div>
        )}
      </Card>

      <Dialog open={viewingClass} onOpenChange={setViewingClass}>
        <DialogContent className="bg-cyber-darker border-neon-blue/50 max-w-6xl p-0">
          {selectedClass && (
            <CustomVideoPlayer
              videoUrl={selectedClass.videoUrl || ""}
              title={selectedClass.title}
              resources={selectedClass.resources || []}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <CourseCreationModal 
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        onSave={handleCourseCreation}
        availableClasses={enhancedClasses}
      />
    </>
  );
};

export default CoursesTab;
