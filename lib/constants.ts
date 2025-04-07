import { ProjectStatus, MilestoneStatus, BidStatus, UserRole } from "./types";

// Network configurations
export const ETHEREUM_NETWORKS = {
  mainnet: {
    chainId: "0x1",
    name: "Ethereum Mainnet",
    symbol: "ETH",
    explorer: "https://etherscan.io",
  },
  goerli: {
    chainId: "0x5",
    name: "Goerli Testnet",
    symbol: "ETH",
    explorer: "https://goerli.etherscan.io",
  },
  sepolia: {
    chainId: "0xaa36a7",
    name: "Sepolia Testnet",
    symbol: "ETH",
    explorer: "https://sepolia.etherscan.io",
  },
};

// Default network - should match your deployment environment
export const DEFAULT_NETWORK = ETHEREUM_NETWORKS.sepolia;

// Status display configurations
export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; color: string; bgColor: string }
> = {
  open: {
    label: "Open for Bids",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-yellow-700 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  completed: {
    label: "Completed",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  cancelled: {
    label: "Cancelled",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
};

export const MILESTONE_STATUS_CONFIG: Record<
  MilestoneStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Pending",
    color: "text-gray-700 dark:text-gray-400",
    bgColor: "bg-gray-100 dark:bg-gray-800",
  },
  "in-progress": {
    label: "In Progress",
    color: "text-yellow-700 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  completed: {
    label: "Completed",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  verified: {
    label: "Verified",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
};

export const BID_STATUS_CONFIG: Record<
  BidStatus,
  { label: string; color: string; bgColor: string }
> = {
  pending: {
    label: "Pending Review",
    color: "text-yellow-700 dark:text-yellow-400",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  approved: {
    label: "Approved",
    color: "text-green-700 dark:text-green-400", 
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
};

// User role configurations
export const USER_ROLE_CONFIG: Record<
  UserRole,
  { label: string; color: string; permissions: string[] }
> = {
  government: {
    label: "Government Authority",
    color: "text-purple-700 dark:text-purple-400",
    permissions: [
      "create_project",
      "approve_bid",
      "view_all_projects",
      "manage_funds",
    ],
  },
  contractor: {
    label: "Contractor",
    color: "text-blue-700 dark:text-blue-400",
    permissions: [
      "submit_bid",
      "view_own_projects",
      "complete_milestone",
    ],
  },
  auditor: {
    label: "Auditor",
    color: "text-green-700 dark:text-green-400",
    permissions: [
      "verify_milestone",
      "view_all_projects",
      "view_transactions",
    ],
  },
};

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    nonce: "/api/auth/nonce",
    verify: "/api/auth/verify",
    profile: "/api/auth/profile",
  },
  projects: {
    list: "/api/projects",
    detail: "/api/projects/:id",
    create: "/api/projects",
    update: "/api/projects/:id",
    delete: "/api/projects/:id",
  },
  bids: {
    list: "/api/bids",
    detail: "/api/bids/:id",
    create: "/api/bids",
    update: "/api/bids/:id",
    approve: "/api/bids/:id/approve",
    reject: "/api/bids/:id/reject",
  },
  milestones: {
    list: "/api/milestones",
    detail: "/api/milestones/:id",
    create: "/api/milestones",
    update: "/api/milestones/:id",
    complete: "/api/milestones/:id/complete",
    verify: "/api/milestones/:id/verify",
  },
  transactions: {
    list: "/api/transactions",
    detail: "/api/transactions/:id",
  },
};

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 10;

// File upload configurations
export const FILE_UPLOAD_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/zip",
  ],
};