"use client";

import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
import { Fragment } from "react";
import Link from "next/link";
import { Check, X, Clock, FileText, User, MessageSquare, AlertCircle } from "lucide-react";
import { cn, formatAddress } from "@/lib/utils";

// Mock data for recent activities
const activities = [
  {
    id: "act1",
    action: "verified",
    entityType: "milestone",
    entityId: "m123",
    entityName: "Foundation Completion",
    projectName: "City Park Renovation",
    projectId: "1",
    userId: "0x1234...5678",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "act2",
    action: "submitted",
    entityType: "bid",
    entityId: "b456",
    entityName: "Bid for Municipal Building",
    projectName: "Municipal Building Extension",
    projectId: "2",
    userId: "0x2345...6789",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "act3",
    action: "created",
    entityType: "project",
    entityId: "p789",
    entityName: "Smart Traffic System",
    projectName: "Smart Traffic System", // Same as entityName in this case
    projectId: "3",
    userId: "0x3456...7890",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "act4",
    action: "approved",
    entityType: "milestone",
    entityId: "m789",
    entityName: "Design Documentation",
    projectName: "City Park Renovation",
    projectId: "1",
    userId: "0x4567...8901",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: "act5",
    action: "commented",
    entityType: "milestone",
    entityId: "m456",
    entityName: "Equipment Installation",
    projectName: "Municipal Building Extension",
    projectId: "2",
    userId: "0x5678...9012",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

function getActionIcon(action: string) {
  switch (action) {
    case "approved":
      return <Check className="h-4 w-4 text-green-500" />;
    case "rejected":
      return <X className="h-4 w-4 text-red-500" />;
    case "verified":
      return <Check className="h-4 w-4 text-blue-500" />;
    case "created":
      return <FileText className="h-4 w-4 text-purple-500" />;
    case "submitted":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "commented":
      return <MessageSquare className="h-4 w-4 text-gray-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-500" />;
  }
}

function getActionLabel(action: string, entityType: string) {
  switch (action) {
    case "approved":
      return `approved a ${entityType}`;
    case "rejected":
      return `rejected a ${entityType}`;
    case "verified":
      return `verified a ${entityType}`;
    case "created":
      return `created a new ${entityType}`;
    case "submitted":
      return `submitted a ${entityType}`;
    case "commented":
      return `commented on a ${entityType}`;
    default:
      return `updated a ${entityType}`;
  }
}

export function RecentActivity() {
  // Group activities by date (today, yesterday, earlier)
  const groupedActivities = activities.reduce(
    (groups, activity) => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const activityDate = new Date(activity.timestamp);
      
      if (
        activityDate.getDate() === today.getDate() &&
        activityDate.getMonth() === today.getMonth() &&
        activityDate.getFullYear() === today.getFullYear()
      ) {
        groups.today.push(activity);
      } else if (
        activityDate.getDate() === yesterday.getDate() &&
        activityDate.getMonth() === yesterday.getMonth() &&
        activityDate.getFullYear() === yesterday.getFullYear()
      ) {
        groups.yesterday.push(activity);
      } else {
        groups.earlier.push(activity);
      }
      
      return groups;
    },
    { today: [], yesterday: [], earlier: [] } as Record<string, typeof activities>
  );

  const activityGroups = [
    { label: "Today", activities: groupedActivities.today },
    { label: "Yesterday", activities: groupedActivities.yesterday },
    { label: "Earlier", activities: groupedActivities.earlier },
  ].filter((group) => group.activities.length > 0);

  return (
    <div className="space-y-4">
      {activityGroups.length > 0 ? (
        activityGroups.map((group, groupIndex) => (
          <div key={group.label}>
            <h4 className="text-sm font-medium mb-2">{group.label}</h4>
            <ul className="space-y-4">
              {group.activities.map((activity, index) => (
                <motion.li
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 + groupIndex * 0.1 }}
                  className="text-sm"
                >
                  <div className="flex">
                    <div className="mr-3 relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span
                        className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-white dark:bg-slate-900 p-1"
                      >
                        {getActionIcon(activity.action)}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <p>
                        <Link
                          href="#"
                          className="font-medium text-foreground hover:text-gov-600 dark:hover:text-gov-400"
                        >
                          {formatAddress(activity.userId)}
                        </Link>{" "}
                        {getActionLabel(activity.action, activity.entityType)}{" "}
                        <Link
                          href={`/projects/${activity.projectId}`}
                          className="font-medium text-foreground hover:text-gov-600 dark:hover:text-gov-400"
                        >
                          {activity.entityName}
                        </Link>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistance(activity.timestamp, new Date(), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No recent activity</p>
        </div>
      )}
    </div>
  );
}