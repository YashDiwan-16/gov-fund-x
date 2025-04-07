export const text = {
    app: {
      name: "GovFund",
      tagline: "Transparent Blockchain-Based Government Fund Allocation",
      description:
        "A secure platform for transparent and efficient government fund allocation to construction contractors using blockchain technology.",
    },
    
    auth: {
      connectWallet: "Connect Wallet",
      connectWalletDescription:
        "Connect your Ethereum wallet to access the platform.",
      walletConnected: "Wallet Connected",
      switchAccount: "Switch Account",
      disconnectWallet: "Disconnect Wallet",
      roles: {
        title: "Select Your Role",
        government: "Government Authority",
        contractor: "Contractor",
        auditor: "Auditor",
      },
    },
  
    home: {
      hero: {
        title: "Revolutionizing Government Fund Allocation",
        subtitle:
          "Secure, transparent, and efficient blockchain-based fund disbursement for construction projects",
        cta: "Get Started",
      },
      features: {
        title: "Why Choose GovFund?",
        transparency: {
          title: "Full Transparency",
          description:
            "Every transaction and approval is recorded on the blockchain, ensuring complete transparency.",
        },
        security: {
          title: "Enhanced Security",
          description:
            "Smart contracts automate fund disbursement based on verified milestones, eliminating fraud.",
        },
        efficiency: {
          title: "Streamlined Process",
          description:
            "Automated verification and payment processes reduce bureaucracy and speed up project completion.",
        },
        accountability: {
          title: "Built-in Accountability",
          description:
            "Immutable records and milestone verification ensure all parties fulfill their obligations.",
        },
      },
      howItWorks: {
        title: "How It Works",
        steps: [
          {
            title: "Project Registration",
            description:
              "Government authorities register construction projects with detailed specifications and budgets.",
          },
          {
            title: "Contractor Bidding",
            description:
              "Qualified contractors submit bids for projects through the platform.",
          },
          {
            title: "Smart Contract Deployment",
            description:
              "Once a bid is approved, a smart contract is deployed to manage fund allocation.",
          },
          {
            title: "Milestone Verification",
            description:
              "As contractors complete project milestones, auditors verify completion on the blockchain.",
          },
          {
            title: "Automated Fund Release",
            description:
              "Smart contracts automatically release funds to contractors upon milestone verification.",
          },
        ],
      },
      testimonials: {
        title: "What Users Say About Us",
        items: [
          {
            quote:
              "GovFund has transformed how we manage construction projects. The transparency and efficiency have eliminated the usual delays and disputes over payments.",
            author: "Sarah Johnson",
            role: "Municipal Project Manager",
          },
          {
            quote:
              "As a contractor, getting paid promptly for completed work has always been a challenge. With GovFund, payments are automatic once milestones are verified.",
            author: "Michael Chen",
            role: "Construction Contractor",
          },
          {
            quote:
              "The audit trail on the blockchain makes our job so much easier. We can verify every transaction and ensure compliance with government regulations.",
            author: "David Rodriguez",
            role: "Government Auditor",
          },
        ],
      },
      cta: {
        title: "Ready to Transform Fund Allocation?",
        description:
          "Join the platform that's bringing transparency and efficiency to government construction projects.",
        button: "Join Now",
      },
    },
  
    dashboard: {
      welcome: "Welcome to your dashboard,",
      overview: "Platform Overview",
      stats: {
        activeProjects: "Active Projects",
        pendingBids: "Pending Bids",
        completedMilestones: "Completed Milestones",
        totalFundsAllocated: "Total Funds Allocated",
      },
      recentActivity: {
        title: "Recent Activity",
        noActivity: "No recent activity",
        viewAll: "View All Activity",
      },
      yourProjects: {
        title: "Your Projects",
        noProjects: "No projects found",
        viewAll: "View All Projects",
      },
    },
  
    projects: {
      title: "Projects",
      createProject: "Create Project",
      filterProjects: "Filter Projects",
      searchPlaceholder: "Search projects...",
      statuses: {
        all: "All Projects",
        open: "Open",
        inProgress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      projectCard: {
        budget: "Budget",
        deadline: "Deadline",
        milestones: "Milestones",
        status: "Status",
        viewDetails: "View Details",
      },
      projectDetails: {
        description: "Description",
        owner: "Project Owner",
        contractor: "Assigned Contractor",
        timeframe: "Project Timeframe",
        milestones: "Project Milestones",
        files: "Project Files",
        bidNow: "Bid Now",
        editProject: "Edit Project",
      },
      createForm: {
        title: "Create New Project",
        projectName: "Project Name",
        description: "Description",
        budget: "Budget (ETH)",
        startDate: "Start Date",
        endDate: "End Date",
        addMilestone: "Add Milestone",
        uploadFiles: "Upload Project Files",
        createProjectButton: "Create Project",
      },
    },
  
    bids: {
      title: "Bids",
      createBid: "Submit Bid",
      filterBids: "Filter Bids",
      searchPlaceholder: "Search bids...",
      statuses: {
        all: "All Bids",
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
      },
      bidCard: {
        bidAmount: "Bid Amount",
        estimatedCompletion: "Estimated Completion",
        contractor: "Contractor",
        status: "Status",
        viewDetails: "View Details",
      },
      bidDetails: {
        projectName: "Project Name",
        bidAmount: "Bid Amount",
        timeframe: "Proposed Timeframe",
        approveReject: "Approve/Reject Bid",
        approve: "Approve Bid",
        reject: "Reject Bid",
      },
      bidForm: {
        title: "Submit a Bid",
        projectSelect: "Select Project",
        bidAmount: "Bid Amount (ETH)",
        estimatedStart: "Estimated Start Date",
        estimatedCompletion: "Estimated Completion Date",
        proposalDescription: "Proposal Description",
        additionalDocument: "Additional Documents",
        submitBidButton: "Submit Bid",
      },
      comparison: {
        title: "Bid Comparison",
        bidAmount: "Bid Amount",
        timeframe: "Timeframe",
        experience: "Experience",
        pastProjects: "Past Projects",
        ratings: "Ratings",
      },
    },
  
    milestones: {
      title: "Milestones",
      filterMilestones: "Filter Milestones",
      searchPlaceholder: "Search milestones...",
      statuses: {
        all: "All Milestones",
        pending: "Pending",
        inProgress: "In Progress",
        completed: "Completed",
        verified: "Verified",
      },
      milestoneCard: {
        project: "Project",
        deadline: "Deadline",
        amount: "Amount",
        status: "Status",
        viewDetails: "View Details",
      },
      milestoneDetails: {
        projectName: "Project Name",
        description: "Description",
        amount: "Payment Amount",
        deadline: "Deadline",
        requirements: "Completion Requirements",
        submitVerification: "Submit for Verification",
        verify: "Verify Milestone",
      },
      verification: {
        title: "Submit Milestone Verification",
        description: "Completion Description",
        uploadEvidence: "Upload Evidence",
        additionalNotes: "Additional Notes",
        submitButton: "Submit for Verification",
      },
    },
  
    profile: {
      title: "Profile",
      personalInfo: {
        title: "Personal Information",
        name: "Full Name",
        email: "Email Address",
        walletAddress: "Wallet Address",
        role: "Platform Role",
        updateButton: "Update Profile",
      },
      accountSettings: {
        title: "Account Settings",
        changePassword: "Change Password",
        notificationSettings: "Notification Settings",
        dataManagement: "Data Management",
      },
      activity: {
        title: "Account Activity",
        recentLogins: "Recent Logins",
        deviceList: "Connected Devices",
      },
    },
  
    sidebar: {
      dashboard: "Dashboard",
      projects: "Projects",
      bids: "Bids",
      milestones: "Milestones",
      profile: "Profile",
      settings: "Settings",
    },
  
    footer: {
      description: "A transparent blockchain-based platform for government fund allocation to construction contractors.",
      copyright: "All rights reserved.",
      social: {
        github: "https://github.com/govfund",
        twitter: "https://twitter.com/govfund",
        email: "contact@govfund.io",
      },
      sections: {
        platform: {
          title: "Platform",
          links: [
            { text: "How it Works", href: "/how-it-works" },
            { text: "Features", href: "/features" },
            { text: "Security", href: "/security" },
            { text: "Pricing", href: "/pricing" },
          ],
        },
        resources: {
          title: "Resources",
          links: [
            { text: "Documentation", href: "/docs" },
            { text: "API", href: "/api" },
            { text: "Guides", href: "/guides" },
            { text: "Blog", href: "/blog" },
          ],
        },
        legal: {
          title: "Legal",
          links: [
            { text: "Privacy Policy", href: "/privacy" },
            { text: "Terms of Service", href: "/terms" },
            { text: "Cookie Policy", href: "/cookies" },
            { text: "Compliance", href: "/compliance" },
          ],
        },
      },
      compliance: {
        secure: "Secured by Blockchain",
        privacy: "Privacy Protected",
        transparency: "Full Transparency",
      },
    },
  
    common: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      status: {
        pending: "Pending",
        approved: "Approved",
        rejected: "Rejected",
        inProgress: "In Progress",
        completed: "Completed",
        verified: "Verified",
        cancelled: "Cancelled",
      },
      errors: {
        required: "This field is required",
        invalidInput: "Invalid input",
        walletConnection: "Failed to connect wallet. Please try again.",
        transactionError: "Transaction failed. Please try again.",
        serverError: "Server error. Please try again later.",
      },
    },
  };