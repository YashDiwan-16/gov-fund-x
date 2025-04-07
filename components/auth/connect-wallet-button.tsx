"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatAddress } from "@/lib/utils";
import { connectWallet, disconnectWallet, isMetaMaskInstalled } from "@/lib/blockchain";
import { text } from "@/data/en";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, LogOut, Copy, ExternalLink, LifeBuoy } from "lucide-react";

// Add type declaration for Ethereum provider
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
  }
}

export function ConnectWalletButton() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMetaMask = async () => {
      setHasMetaMask(isMetaMaskInstalled());
      
      // Check if user is already connected
      if (isMetaMaskInstalled() && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts && accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking accounts:", error);
        }
      }
    };
    
    checkMetaMask();
    
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          setAccount(null);
        } else {
          setAccount(accounts[0]);
        }
      });
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const handleConnect = async () => {
    if (!hasMetaMask) {
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    
    setIsConnecting(true);
    
    try {
      const accounts = await connectWallet();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    // setAccount(null);
  // MetaMask doesn't provide a direct method to disconnect
  // We can only clear the local state to simulate disconnection
  setAccount(null);
  try{
  await  disconnectWallet();
  }
  catch(error){
    console.error("Error disconnecting wallet:", error);
  }
  
  // Optional: You could also clear any stored connection data
  // For example, if you're storing the connection in localStorage
  // localStorage.removeItem('walletConnected');
  
  // If you're using a wallet connection library that supports disconnection
  // you would call that method here
    
  };

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {!account ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {text.common.loading}
              </span>
            ) : (
              <span className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                {text.auth.connectWallet}
              </span>
            )}
          </Button>
        </motion.div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="border-blue-500 text-blue-600 hover:text-blue-700 hover:border-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:border-blue-300"
              >
                <Wallet className="mr-2 h-4 w-4" />
                {formatAddress(account)}
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-72" align="end">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1 border-b pb-3">
                <h4 className="font-medium">{text.auth.walletConnected}</h4>
                <div className="text-sm text-muted-foreground break-all">
                  {account}
                </div>
              </div>
              
              <div className="flex flex-col space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={copyAddress}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy Address"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => window.open(`${process.env.NEXT_PUBLIC_BLOCK_EXPLORER}/address/${account}`, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View on Explorer
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => window.open("https://metamask.io/support/", "_blank")}
                >
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  onClick={handleDisconnect}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  {text.auth.disconnectWallet}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}