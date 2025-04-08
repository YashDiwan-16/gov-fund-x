"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

interface BidFormData {
  amount: string;
  deliveryTime: string;
  description: string;
  timeline: string;
  qualifications: string;
}

export default function BidSubmissionPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<BidFormData>({
    amount: "",
    deliveryTime: "",
    description: "",
    timeline: "",
    qualifications: ""
  });

  const handleChange = (field: keyof BidFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Project
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Submit Bid</CardTitle>
          <CardDescription>
            Fill in your bid details below
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Bid Amount</Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="Enter bid amount"
                  value={formData.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Estimated Delivery Time</Label>
                <Input
                  id="deliveryTime"
                  placeholder="e.g., 3 months"
                  value={formData.deliveryTime}
                  onChange={(e) => handleChange("deliveryTime", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Bid Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your approach to the project"
                className="min-h-[100px]"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Detailed Timeline</Label>
              <Textarea
                id="timeline"
                placeholder="Provide a detailed timeline of your proposed work"
                className="min-h-[100px]"
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">Qualifications & Experience</Label>
              <Textarea
                id="qualifications"
                placeholder="Describe your relevant experience and qualifications"
                className="min-h-[100px]"
                value={formData.qualifications}
                onChange={(e) => handleChange("qualifications", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <p className="text-sm text-gray-500">
                  Drag and drop files here, or click to select files
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              Submit Bid
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 