"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ArrowUpDown } from "lucide-react";

interface Bid {
  id: string;
  projectTitle: string;
  bidder: string;
  amount: string;
  deliveryTime: string;
  status: "pending" | "accepted" | "rejected";
  submittedDate: string;
}

const mockBids: Bid[] = [
  {
    id: "1",
    projectTitle: "Government Website Redesign",
    bidder: "Tech Solutions Inc.",
    amount: "$65,000",
    deliveryTime: "3 months",
    status: "pending",
    submittedDate: "2024-04-01"
  },
  {
    id: "2",
    projectTitle: "Public Health Data Dashboard",
    bidder: "Data Analytics Pro",
    amount: "$35,000",
    deliveryTime: "2 months",
    status: "accepted",
    submittedDate: "2024-03-28"
  },
  // Add more mock bids as needed
];

export default function BidsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");

  const filteredBids = mockBids
    .filter(bid => 
      bid.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.bidder.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      } else {
        return parseInt(a.amount.replace(/[^0-9]/g, "")) - parseInt(b.amount.replace(/[^0-9]/g, ""));
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Bids</h1>
        <Button variant="outline" onClick={() => setSortBy(sortBy === "date" ? "amount" : "date")}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          Sort by {sortBy === "date" ? "Amount" : "Date"}
        </Button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search bids..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBids.map((bid) => (
          <Card key={bid.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{bid.projectTitle}</CardTitle>
                <Badge
                  variant={
                    bid.status === "pending"
                      ? "secondary"
                      : bid.status === "accepted"
                      ? "default"
                      : "destructive"
                  }
                >
                  {bid.status}
                </Badge>
              </div>
              <CardDescription>Submitted by {bid.bidder}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Bid Amount:</span>
                  <span className="font-medium">{bid.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Delivery Time:</span>
                  <span className="font-medium">{bid.deliveryTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Submitted:</span>
                  <span className="font-medium">{bid.submittedDate}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
              {bid.status === "pending" && (
                <>
                  <Button variant="default" className="flex-1">
                    Accept
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    Reject
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 