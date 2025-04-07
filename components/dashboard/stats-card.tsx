"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowDown, Layers, FileCheck, BarChart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: "project" | "bid" | "milestone" | "funds";
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  const trendColors = {
    up: "text-green-600 dark:text-green-500",
    down: "text-red-600 dark:text-red-500",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  const iconMap = {
    project: <Layers className="h-5 w-5" />,
    bid: <FileCheck className="h-5 w-5" />,
    milestone: <BarChart className="h-5 w-5" />,
    funds: <Wallet className="h-5 w-5" />,
  };

  const iconColors = {
    project: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    bid: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    milestone: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    funds: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border bg-card p-6 shadow-sm transition-all duration-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="text-2xl font-bold mt-1"
          >
            {value}
          </motion.div>
          <div className={cn("flex items-center mt-1", trendColors[trend])}>
            {trend === "up" ? (
              <ArrowUp className="h-3.5 w-3.5 mr-1" />
            ) : trend === "down" ? (
              <ArrowDown className="h-3.5 w-3.5 mr-1" />
            ) : null}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <div className={cn("rounded-full p-2.5", iconColors[icon])}>
          {iconMap[icon]}
        </div>
      </div>
    </motion.div>
  );
}