"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarClock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, truncateText } from "@/lib/utils";
import { ProjectStatus } from "@/lib/types";
import { PROJECT_STATUS_CONFIG } from "@/lib/constants";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  budget: string;
  deadline: string;
  progress: number;
  status: ProjectStatus;
}

export function ProjectCard({
  id,
  title,
  description,
  budget,
  deadline,
  progress,
  status,
}: ProjectCardProps) {
  const statusConfig = PROJECT_STATUS_CONFIG[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col h-full"
    >
      <div className="p-6 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              statusConfig.bgColor,
              statusConfig.color
            )}
          >
            {statusConfig.label}
          </div>
          <span className="text-sm font-semibold">{budget}</span>
        </div>
        
        <Link href={`/projects/${id}`} className="group">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-gov-600 dark:group-hover:text-gov-400 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground mb-4">
          {truncateText(description, 100)}
        </p>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <CalendarClock className="h-4 w-4 mr-1" />
          <span>Deadline: {deadline}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full",
                progress < 30 ? "bg-red-500" :
                progress < 70 ? "bg-amber-500" :
                "bg-green-500"
              )}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t p-4">
        <Button asChild variant="ghost" size="sm" className="w-full">
          <Link href={`/projects/${id}`} className="group">
            View Project Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}