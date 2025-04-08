"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Milestone {
  id: string;
  projectTitle: string;
  title: string;
  description: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed" | "overdue";
  progress: number;
  deliverables: string[];
}

const mockMilestones: Milestone[] = [
  {
    id: "1",
    projectTitle: "Government Website Redesign",
    title: "UI/UX Design Phase",
    description: "Complete the user interface and experience design for the new government portal",
    dueDate: "2024-04-15",
    status: "in-progress",
    progress: 65,
    deliverables: [
      "Wireframes",
      "User Flow Diagrams",
      "Design System",
      "Interactive Prototypes"
    ]
  },
  {
    id: "2",
    projectTitle: "Public Health Data Dashboard",
    title: "Data Integration",
    description: "Integrate all required data sources into the dashboard",
    dueDate: "2024-04-10",
    status: "completed",
    progress: 100,
    deliverables: [
      "API Connections",
      "Data Validation",
      "Error Handling",
      "Documentation"
    ]
  },
  // Add more mock milestones as needed
];

export default function MilestonesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredMilestones = mockMilestones.filter(milestone => {
    const matchesSearch = 
      milestone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      milestone.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || milestone.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Milestones</h1>
        <Button className="bg-primary hover:bg-primary/90">
          Add Milestone
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search milestones..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="border rounded-md px-3 py-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMilestones.map((milestone) => (
          <Card key={milestone.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{milestone.title}</CardTitle>
                  <CardDescription>{milestone.projectTitle}</CardDescription>
                </div>
                <Badge
                  variant={
                    milestone.status === "completed"
                      ? "default"
                      : milestone.status === "in-progress"
                      ? "secondary"
                      : milestone.status === "overdue"
                      ? "destructive"
                      : "outline"
                  }
                >
                  <div className="flex items-center gap-1">
                    {getStatusIcon(milestone.status)}
                    <span>{milestone.status}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">{milestone.description}</p>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{milestone.progress}%</span>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Deliverables:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {milestone.deliverables.map((deliverable, index) => (
                      <li key={index}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Due Date:</span>
                  <span className="font-medium">{milestone.dueDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
              {milestone.status !== "completed" && (
                <Button variant="default" className="flex-1">
                  Update Progress
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 