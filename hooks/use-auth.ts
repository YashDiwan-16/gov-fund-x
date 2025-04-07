"use client";

import { useState, useEffect } from "react";
import { connectWallet } from "@/lib/blockchain";
import { UserRole } from "@/lib/types";

interface AuthState {
  isConnected: boolean;
  account: string | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isConnected: false,
    account: null,
    role: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if MetaMask is connected
        if (typeof window !== "undefined" && window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          
          if (accounts && accounts.length > 0) {
            // Get user role from localStorage (in a real app, this would be from API)
            const storedRole = localStorage.getItem("userRole") as UserRole | null;
            
            setAuthState({
              isConnected: true,
              account: accounts[0],
              role: storedRole,
              isLoading: false,
              error: null,
            });
          } else {
            setAuthState({
              isConnected: false,
              account: null,
              role: null,
              isLoading: false,
              error: null,
            });
          }
        } else {
          setAuthState({
            isConnected: false,
            account: null,
            role: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        setAuthState({
          isConnected: false,
          account: null,
          role: null,
          isLoading: false,
          error: "Failed to check wallet connection",
        });
      }
    };

    checkConnection();

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // Get user role from localStorage (in a real app, this would be from API)
          const storedRole = localStorage.getItem("userRole") as UserRole | null;
          
          setAuthState((prev) => ({
            ...prev,
            isConnected: true,
            account: accounts[0],
            role: storedRole,
          }));
        } else {
          setAuthState((prev) => ({
            ...prev,
            isConnected: false,
            account: null,
            role: null,
          }));
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, []);

  const connect = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const accounts = await connectWallet();
      
      if (accounts && accounts.length > 0) {
        // Get user role from localStorage (in a real app, this would be from API)
        const storedRole = localStorage.getItem("userRole") as UserRole | null;
        
        setAuthState({
          isConnected: true,
          account: accounts[0],
          role: storedRole,
          isLoading: false,
          error: null,
        });
        
        return true;
      } else {
        setAuthState({
          isConnected: false,
          account: null,
          role: null,
          isLoading: false,
          error: "Failed to connect wallet",
        });
        
        return false;
      }
    } catch (error) {
      setAuthState({
        isConnected: false,
        account: null,
        role: null,
        isLoading: false,
        error: "Failed to connect wallet",
      });
      
      return false;
    }
  };

  const disconnect = () => {
    // Clear user data
    localStorage.removeItem("userRole");
    
    setAuthState({
      isConnected: false,
      account: null,
      role: null,
      isLoading: false,
      error: null,
    });
  };

  const setRole = (role: UserRole) => {
    // Store role in localStorage (in a real app, this would be sent to API)
    localStorage.setItem("userRole", role);
    
    setAuthState((prev) => ({
      ...prev,
      role,
    }));
  };

  return {
    ...authState,
    connect,
    disconnect,
    setRole,
  };
}