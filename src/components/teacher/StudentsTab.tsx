
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";

interface StudentItem {
  id: number;
  name: string;
  email: string;
  progress: number;
  lastActive: string;
}

interface StudentsTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleAction: (action: string, id: number, type: string) => void;
  students: StudentItem[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({
  searchTerm,
  setSearchTerm,
  handleAction,
  students,
}) => {
  return (
    <Card className="cyber-card p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Students</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
          <Input
            placeholder="Search students..."
            className="pl-10 bg-cyber-light/30 border-neon-blue/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Progress</th>
              <th className="text-left py-3 px-4">Last Active</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4">{student.name}</td>
                <td className="py-3 px-4">{student.email}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-40 bg-white/20 rounded-full h-2 mr-2">
                      <div 
                        className={`h-2 rounded-full ${
                          student.progress > 80 ? 'bg-neon-green' : 
                          student.progress > 60 ? 'bg-neon-blue' : 
                          'bg-neon-pink'
                        }`}
                        style={{ width: `${student.progress}%` }}
                      ></div>
                    </div>
                    <span>{student.progress}%</span>
                  </div>
                </td>
                <td className="py-3 px-4">{student.lastActive}</td>
                <td className="py-3 px-4 text-right">
                  <Button 
                    variant="ghost" 
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    size="sm"
                    onClick={() => handleAction("View", student.id, "Student")}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default StudentsTab;
