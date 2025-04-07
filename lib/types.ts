export interface User {
    _id?: string;
    address: string;
    role: UserRole;
    name?: string;
    email?: string;
    organization?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type UserRole = "government" | "contractor" | "auditor";
  
  export interface Project {
    _id?: string;
    name: string;
    description: string;
    budget: number;
    startDate: Date;
    endDate: Date;
    status: ProjectStatus;
    owner: string; // Government authority's address
    contractor?: string; // Selected contractor's address
    createdAt: Date;
    updatedAt: Date;
    milestones: Milestone[];
    documents?: Document[];
  }
  
  export type ProjectStatus = "open" | "in-progress" | "completed" | "cancelled";
  
  export interface Milestone {
    _id?: string;
    projectId: string;
    name: string;
    description: string;
    amount: number;
    deadline: Date;
    status: MilestoneStatus;
    requirements: string;
    createdAt: Date;
    updatedAt: Date;
    verificationSubmissions?: VerificationSubmission[];
  }
  
  export type MilestoneStatus = "pending" | "in-progress" | "completed" | "verified";
  
  export interface Bid {
    _id?: string;
    projectId: string;
    contractor: string; // Contractor's address
    amount: number;
    estimatedStart: Date;
    estimatedCompletion: Date;
    proposal: string;
    status: BidStatus;
    createdAt: Date;
    updatedAt: Date;
    documents?: Document[];
  }
  
  export type BidStatus = "pending" | "approved" | "rejected";
  
  export interface Document {
    _id?: string;
    name: string;
    description?: string;
    url: string;
    type: string;
    size: number;
    createdAt: Date;
    uploadedBy: string; // User address
  }
  
  export interface VerificationSubmission {
    _id?: string;
    milestoneId: string;
    description: string;
    submittedBy: string; // Contractor's address
    submittedAt: Date;
    status: VerificationStatus;
    verifiedBy?: string; // Auditor's address
    verifiedAt?: Date;
    documents?: Document[];
    notes?: string;
  }
  
  export type VerificationStatus = "pending" | "approved" | "rejected";
  
  export interface Transaction {
    _id?: string;
    projectId: string;
    milestoneId?: string;
    type: TransactionType;
    amount: number;
    from: string;
    to: string;
    txHash: string;
    status: TransactionStatus;
    timestamp: Date;
    blockNumber?: number;
    metadata?: Record<string, any>;
  }
  
  export type TransactionType = "funding" | "milestone_payment" | "refund";
  export type TransactionStatus = "pending" | "confirmed" | "failed";
  
  export interface Activity {
    _id?: string;
    userId: string;
    action: ActivityAction;
    entityType: EntityType;
    entityId: string;
    timestamp: Date;
    metadata?: Record<string, any>;
  }
  
  export type ActivityAction = 
    | "created"
    | "updated"
    | "deleted"
    | "submitted"
    | "approved"
    | "rejected"
    | "completed"
    | "verified";
  
  export type EntityType = "project" | "bid" | "milestone" | "verification";
  
  export interface Notification {
    _id?: string;
    userId: string;
    title: string;
    message: string;
    type: NotificationType;
    read: boolean;
    entityType?: EntityType;
    entityId?: string;
    timestamp: Date;
  }
  
  export type NotificationType = "info" | "success" | "warning" | "error";
  
  export interface SmartContractInfo {
    projectId: string;
    contractAddress: string;
    deployedBy: string;
    deployedAt: Date;
    network: string;
    abi: any;
  }