import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string): string {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4
  )}`;
}

export function formatCurrency(
  amount: number,
  currency: string = "ETH",
  decimals: number = 4
): string {
  return `${amount.toFixed(decimals)} ${currency}`;
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getProgressColor(progress: number): string {
  if (progress < 30) return "text-red-500";
  if (progress < 70) return "text-yellow-500";
  return "text-green-500";
}

export function getStatusColor(
  status: "pending" | "approved" | "rejected" | "in-progress" | "completed"
): string {
  const statusColors = {
    pending: "text-yellow-500",
    approved: "text-green-500",
    rejected: "text-red-500",
    "in-progress": "text-blue-500",
    completed: "text-purple-500",
  };
  
  return statusColors[status] || "text-gray-500";
}

export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}