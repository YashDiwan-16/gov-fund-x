"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, DollarSign, Users, FileText, CheckCircle } from "lucide-react";

interface ProjectDetails {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  status: "open" | "in-progress" | "completed";
  progress: number;
  requirements: string[];
  milestones: {
    id: string;
    title: string;
    status: "pending" | "in-progress" | "completed";
    dueDate: string;
  }[];
  bids: {
    id: string;
    bidder: string;
    amount: string;
    deliveryTime: string;
    status: "pending" | "accepted" | "rejected";
  }[];
}

const mockProject: ProjectDetails = {
  id: "1",
  title: "Government Website Redesign",
  description: "Modernize the existing government portal with improved UX and accessibility. The project involves redesigning the user interface, implementing new features, and ensuring compliance with accessibility standards.",
  budget: "$50,000 - $75,000",
  deadline: "2024-05-15",
  status: "in-progress",
  progress: 45,
  requirements: [
    "Responsive design for all devices",
    "WCAG 2.1 AA compliance",
    "Integration with existing backend systems",
    "Multi-language support",
    "Advanced search functionality",
    "User authentication system",
    "Analytics dashboard"
  ],
  milestones: [
    {
      id: "1",
      title: "UI/UX Design Phase",
      status: "completed",
      dueDate: "2024-04-01"
    },
    {
      id: "2",
      title: "Frontend Development",
      status: "in-progress",
      dueDate: "2024-04-15"
    },
    {
      id: "3",
      title: "Backend Integration",
      status: "pending",
      dueDate: "2024-04-30"
    },
    {
      id: "4",
      title: "Testing & QA",
      status: "pending",
      dueDate: "2024-05-10"
    }
  ],
  bids: [
    {
      id: "1",
      bidder: "Tech Solutions Inc.",
      amount: "$65,000",
      deliveryTime: "3 months",
      status: "accepted"
    },
    {
      id: "2",
      bidder: "Digital Innovations",
      amount: "$70,000",
      deliveryTime: "4 months",
      status: "rejected"
    }
  ]
};

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{mockProject.title}</CardTitle>
                  <CardDescription className="mt-2">{mockProject.description}</CardDescription>
                </div>
                <Badge
                  variant={
                    mockProject.status === "open"
                      ? "default"
                      : mockProject.status === "in-progress"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {mockProject.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">{mockProject.budget}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">{mockProject.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Bids</p>
                    <p className="font-medium">{mockProject.bids.length}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{mockProject.progress}%</span>
                </div>
                <Progress value={mockProject.progress} className="h-2" />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="milestones">Milestones</TabsTrigger>
                  <TabsTrigger value="bids">Bids</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Requirements</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {mockProject.requirements.map((req, index) => (
                        <li key={index} className="text-gray-600">{req}</li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="milestones">
                  <div className="space-y-4">
                    {mockProject.milestones.map((milestone) => (
                      <Card key={milestone.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{milestone.title}</h4>
                              <p className="text-sm text-gray-500">Due: {milestone.dueDate}</p>
                            </div>
                            <Badge
                              variant={
                                milestone.status === "completed"
                                  ? "default"
                                  : milestone.status === "in-progress"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {milestone.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="bids">
                  <div className="space-y-4">
                    {mockProject.bids.map((bid) => (
                      <Card key={bid.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{bid.bidder}</h4>
                              <p className="text-sm text-gray-500">
                                Amount: {bid.amount} | Delivery: {bid.deliveryTime}
                              </p>
                            </div>
                            <Badge
                              variant={
                                bid.status === "accepted"
                                  ? "default"
                                  : bid.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {bid.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full">Update Progress</Button>
              <Button variant="outline" className="w-full">Edit Project</Button>
              <Button variant="outline" className="w-full">View Documents</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">UI/UX Design Phase Completed</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium">New Requirements Added</p>
                    <p className="text-sm text-gray-500">1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 