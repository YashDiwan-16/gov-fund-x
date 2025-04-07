 "use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProjectContract, getSignedContract } from "@/lib/blockchain";
import { SmartContractInfo } from "@/lib/types";

interface ContractState {
  contract: ethers.Contract | null;
  signedContract: ethers.Contract | null;
  isLoading: boolean;
  error: string | null;
}

export function useContract(contractInfo: SmartContractInfo | null) {
  const [contractState, setContractState] = useState<ContractState>({
    contract: null,
    signedContract: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const setupContract = async () => {
      if (!contractInfo) {
        setContractState({
          contract: null,
          signedContract: null,
          isLoading: false,
          error: "No contract information provided",
        });
        return;
      }

      try {
        const contract = getProjectContract(contractInfo);
        const signedContract = await getSignedContract(contractInfo);
        
        setContractState({
          contract,
          signedContract,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setContractState({
          contract: null,
          signedContract: null,
          isLoading: false,
          error: "Failed to load contract",
        });
      }
    };

    setupContract();

    // Listen for account changes to update the signed contract
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = async () => {
        if (contractInfo) {
          try {
            const signedContract = await getSignedContract(contractInfo);
            
            setContractState((prev) => ({
              ...prev,
              signedContract,
            }));
          } catch (error) {
            setContractState((prev) => ({
              ...prev,
              signedContract: null,
              error: "Failed to update signed contract",
            }));
          }
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
  }, [contractInfo]);

  // Method to call a read function on the contract
  const call = async (
    functionName: string,
    ...args: any[]
  ): Promise<any> => {
    if (!contractState.contract) {
      throw new Error("Contract not initialized");
    }

    try {
      return await contractState.contract[functionName](...args);
    } catch (error) {
      console.error(`Error calling ${functionName}:`, error);
      throw error;
    }
  };

  // Method to call a write function on the contract
  const send = async (
    functionName: string,
    ...args: any[]
  ): Promise<ethers.TransactionResponse> => {
    if (!contractState.signedContract) {
      throw new Error("Signed contract not initialized");
    }

    try {
      return await contractState.signedContract[functionName](...args);
    } catch (error) {
      console.error(`Error sending ${functionName}:`, error);
      throw error;
    }
  };

  // Method to listen for events
  const listenForEvent = (
    eventName: string,
    callback: (...args: any[]) => void
  ) => {
    if (!contractState.contract) {
      console.error("Contract not initialized");
      return () => {};
    }

    contractState.contract.on(eventName, callback);
    
    return () => {
      contractState.contract?.off(eventName, callback);
    };
  };

  return {
    ...contractState,
    call,
    send,
    listenForEvent,
  };
}