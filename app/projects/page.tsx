"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: "open" | "in-progress" | "completed";
  bids: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Government Website Redesign",
    description: "Modernize the existing government portal with improved UX and accessibility",
    budget: "$50,000 - $75,000",
    deadline: "2024-05-15",
    status: "open",
    bids: 5
  },
  {
    id: "2",
    title: "Public Health Data Dashboard",
    description: "Create an interactive dashboard for tracking public health metrics",
    budget: "$30,000 - $45,000",
    deadline: "2024-06-01",
    status: "in-progress",
    bids: 3
  },
  // Add more mock projects as needed
];

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button className="bg-primary hover:bg-primary/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search projects..."
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
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Badge
                  variant={
                    project.status === "open"
                      ? "default"
                      : project.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Budget:</span>
                  <span className="font-medium">{project.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Deadline:</span>
                  <span className="font-medium">{project.deadline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Bids:</span>
                  <span className="font-medium">{project.bids}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 