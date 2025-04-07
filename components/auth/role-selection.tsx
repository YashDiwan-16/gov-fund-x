"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConnectWalletButton } from "./connect-wallet-button";
import { text } from "@/data/en";
import { motion, AnimatePresence } from "framer-motion";
import { UserRole } from "@/lib/types";
import { Building2, HardHat, ClipboardCheck } from "lucide-react";

export function RoleSelection() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check if wallet is connected from localStorage or using window.ethereum
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          setIsWalletConnected(accounts && accounts.length > 0);
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
    
    // Listen for wallet connection events
    const handleAccountsChanged = (accounts: string[]) => {
      setIsWalletConnected(accounts && accounts.length > 0);
    };
    
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  // Mock function to handle role selection
  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsLoading(true);
    
    try {
      // This would normally make an API call to store the user's role
      // For now, we'll just simulate a delay and redirect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the role in localStorage for demo purposes
      localStorage.setItem("userRole", selectedRole);
      
      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error setting user role:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Role options with icons and descriptions
  const roleOptions: {
    value: UserRole;
    label: string;
    icon: React.ReactNode;
    description: string;
  }[] = [
    {
      value: "government",
      label: text.auth.roles.government,
      icon: <Building2 className="h-5 w-5" />,
      description: "Create projects, approve bids, and manage fund allocation."
    },
    {
      value: "contractor",
      label: text.auth.roles.contractor,
      icon: <HardHat className="h-5 w-5" />,
      description: "Submit bids, manage projects, and receive funds."
    },
    {
      value: "auditor",
      label: text.auth.roles.auditor,
      icon: <ClipboardCheck className="h-5 w-5" />,
      description: "Verify project milestones and monitor fund disbursement."
    }
  ];

  return (
    <div className="space-y-6">
      {!isWalletConnected ? (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground mb-6">
            Please connect your wallet to continue
          </p>
          <ConnectWalletButton />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key="role-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-center">
                {text.auth.roles.title}
              </h3>
              
              <div className="space-y-3">
                {roleOptions.map((role) => (
                  <motion.div
                    key={role.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      type="button"
                      className={`w-full p-4 rounded-lg border text-left transition-all ${
                        selectedRole === role.value
                          ? "bg-gov-50 dark:bg-gov-900/20 border-gov-500 dark:border-gov-400 ring-1 ring-gov-500 dark:ring-gov-400"
                          : "bg-card hover:bg-muted"
                      }`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <div className="flex items-start">
                        <div className={`rounded-full p-2 mr-3 ${
                          selectedRole === role.value 
                            ? "bg-gov-100 dark:bg-gov-900/30 text-gov-600 dark:text-gov-400" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {role.icon}
                        </div>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {role.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              className="w-full bg-gov-600 hover:bg-gov-700"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}