"use client";

import { useState, useEffect } from "react";
import { isMetaMaskInstalled, connectWallet } from "@/lib/blockchain";

interface MetaMaskState {
  isInstalled: boolean;
  isConnected: boolean;
  account: string | null;
  chainId: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useMetaMask() {
  const [metamaskState, setMetamaskState] = useState<MetaMaskState>({
    isInstalled: false,
    isConnected: false,
    account: null,
    chainId: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const checkMetaMask = async () => {
      const installed = isMetaMaskInstalled();
      
      if (installed) {
        try {
          const accounts = await window.ethereum?.request({ method: "eth_accounts" });
          const chainId = await window.ethereum?.request({ method: "eth_chainId" });
          
          setMetamaskState({
            isInstalled: true,
            isConnected: accounts && accounts.length > 0,
            account: accounts && accounts.length > 0 ? accounts[0] : null,
            chainId,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          setMetamaskState({
            isInstalled: true,
            isConnected: false,
            account: null,
            chainId: null,
            isLoading: false,
            error: "Failed to access MetaMask",
          });
        }
      } else {
        setMetamaskState({
          isInstalled: false,
          isConnected: false,
          account: null,
          chainId: null,
          isLoading: false,
          error: null,
        });
      }
    };

    checkMetaMask();

    // Listen for chain changes
    if (typeof window !== "undefined" && window.ethereum) {
      const handleChainChanged = (chainId: string) => {
        setMetamaskState((prev) => ({ ...prev, chainId }));
        // Reload the page when chain changes as recommended by MetaMask
        window.location.reload();
      };

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        setMetamaskState((prev) => ({
          ...prev,
          isConnected: accounts.length > 0,
          account: accounts.length > 0 ? accounts[0] : null,
        }));
      };

      window.ethereum.on("chainChanged", handleChainChanged);
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum?.removeListener("chainChanged", handleChainChanged);
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const connect = async () => {
    if (!metamaskState.isInstalled) {
      window.open("https://metamask.io/download/", "_blank");
      return false;
    }

    try {
      setMetamaskState((prev) => ({ ...prev, isLoading: true, error: null }));
      const accounts = await connectWallet();
      const chainId = await window.ethereum?.request({ method: "eth_chainId" });
      
      setMetamaskState({
        isInstalled: true,
        isConnected: accounts && accounts.length > 0,
        account: accounts && accounts.length > 0 ? accounts[0] : null,
        chainId,
        isLoading: false,
        error: null,
      });
      
      return accounts && accounts.length > 0;
    } catch (error) {
      setMetamaskState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to connect to MetaMask",
      }));
      
      return false;
    }
  };

  const switchChain = async (chainId: string) => {
    if (!metamaskState.isInstalled) return false;

    try {
      setMetamaskState((prev) => ({ ...prev, isLoading: true, error: null }));
      
      await window.ethereum?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      
      setMetamaskState((prev) => ({
        ...prev,
        chainId,
        isLoading: false,
      }));
      
      return true;
    } catch (error: any) {
      // If the chain is not added to MetaMask
      if (error.code === 4902) {
        // In a real app, you would add the chain here
        // But for simplicity, we'll just return false
        setMetamaskState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Chain not added to MetaMask",
        }));
        
        return false;
      }
      
      setMetamaskState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to switch chain",
      }));
      
      return false;
    }
  };

  return {
    ...metamaskState,
    connect,
    switchChain,
  };
}