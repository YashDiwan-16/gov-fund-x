"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface MilestoneVerification {
  id: string;
  title: string;
  projectTitle: string;
  description: string;
  deliverables: {
    id: string;
    title: string;
    status: "pending" | "completed" | "rejected";
    notes?: string;
  }[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: string;
  }[];
  status: "pending" | "in-review" | "approved" | "rejected";
  progress: number;
}

const mockMilestone: MilestoneVerification = {
  id: "1",
  title: "UI/UX Design Phase",
  projectTitle: "Government Website Redesign",
  description: "Complete the user interface and experience design for the new government portal",
  deliverables: [
    {
      id: "1",
      title: "Wireframes",
      status: "completed",
      notes: "All wireframes have been created and reviewed"
    },
    {
      id: "2",
      title: "User Flow Diagrams",
      status: "completed",
      notes: "User flows have been documented and approved"
    },
    {
      id: "3",
      title: "Design System",
      status: "pending",
      notes: "In progress, awaiting final approval"
    },
    {
      id: "4",
      title: "Interactive Prototypes",
      status: "pending",
      notes: "Prototypes are being developed"
    }
  ],
  attachments: [
    {
      id: "1",
      name: "wireframes.pdf",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      id: "2",
      name: "user-flows.fig",
      type: "FIG",
      size: "1.8 MB"
    }
  ],
  status: "in-review",
  progress: 50
};

export default function MilestoneVerificationPage({ params }: { params: { id: string } }) {
  const [verificationNotes, setVerificationNotes] = useState("");
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null);

  const handleVerification = (status: "approved" | "rejected") => {
    // Handle verification submission
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Milestone
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{mockMilestone.title}</CardTitle>
                  <CardDescription>{mockMilestone.projectTitle}</CardDescription>
                </div>
                <Badge
                  variant={
                    mockMilestone.status === "approved"
                      ? "default"
                      : mockMilestone.status === "in-review"
                      ? "secondary"
                      : mockMilestone.status === "rejected"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {mockMilestone.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-4">{mockMilestone.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{mockMilestone.progress}%</span>
                  </div>
                  <Progress value={mockMilestone.progress} className="h-2" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Deliverables</h3>
                  {mockMilestone.deliverables.map((deliverable) => (
                    <Card key={deliverable.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(deliverable.status)}
                              <h4 className="font-medium">{deliverable.title}</h4>
                            </div>
                            {deliverable.notes && (
                              <p className="text-sm text-gray-500">{deliverable.notes}</p>
                            )}
                          </div>
                          <Badge
                            variant={
                              deliverable.status === "completed"
                                ? "default"
                                : deliverable.status === "rejected"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {deliverable.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Attachments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockMilestone.attachments.map((attachment) => (
                      <Card key={attachment.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{attachment.name}</h4>
                              <p className="text-sm text-gray-500">
                                {attachment.type} • {attachment.size}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Verification Notes</Label>
                  <Textarea
                    placeholder="Add any notes or comments about the verification"
                    className="min-h-[100px]"
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button
                variant="destructive"
                onClick={() => handleVerification("rejected")}
              >
                Reject Milestone
              </Button>
              <Button
                onClick={() => handleVerification("approved")}
              >
                Approve Milestone
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">All deliverables submitted</p>
                    <p className="text-sm text-gray-500">Verify all required deliverables are present</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Quality standards met</p>
                    <p className="text-sm text-gray-500">Check if deliverables meet quality requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-1" />
                  <div>
                    <p className="font-medium">Documentation complete</p>
                    <p className="text-sm text-gray-500">Review all documentation and attachments</p>
                  </div>
                </div>
              </div>
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
                    <p className="font-medium">Wireframes submitted</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">User flows approved</p>
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