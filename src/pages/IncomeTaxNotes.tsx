
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const IncomeTaxNotes = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        <Card className="shadow-lg border-blue-100">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-2xl text-blue-700">6th Semester Income Tax Notes - Version 1</CardTitle>
            <CardDescription>Comprehensive notes for Income Tax preparation</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-blue-800">Income Tax Notes PDF</h3>
                  <p className="text-sm text-gray-600">Complete study material for 6th semester</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Topics Covered:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Introduction to Income Tax Act</li>
                  <li>Definition of Income and Tax Liability</li>
                  <li>Residential Status and Incidence of Tax</li>
                  <li>Income from Salaries</li>
                  <li>Income from House Property</li>
                  <li>Income from Business and Profession</li>
                  <li>Capital Gains</li>
                  <li>Income from Other Sources</li>
                  <li>Deductions from Gross Total Income</li>
                  <li>Computation of Total Income and Tax Liability</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h3 className="font-medium text-blue-800 mb-2">Note to Students:</h3>
                <p className="text-gray-700">
                  These notes are compiled based on the latest syllabus and tax regulations. 
                  Make sure to refer to the current year's tax amendments while studying.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-blue-100 bg-blue-50">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm text-gray-600">Last Updated: March 25, 2025</p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Download className="mr-2 h-4 w-4" />
                Download Notes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default IncomeTaxNotes;
