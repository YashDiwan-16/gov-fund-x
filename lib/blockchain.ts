import { Eip1193Provider, ethers } from "ethers";
import { SmartContractInfo } from "./types";

// Contract ABIs - This is a simplified version, actual ABIs will be more complex
const projectFundingABI = [
  // Events
  "event ProjectCreated(uint256 indexed projectId, address indexed owner, uint256 budget)",
  "event MilestoneAdded(uint256 indexed projectId, uint256 indexed milestoneId, uint256 amount)",
  "event BidSubmitted(uint256 indexed projectId, address indexed contractor, uint256 amount)",
  "event BidApproved(uint256 indexed projectId, address indexed contractor)",
  "event MilestoneCompleted(uint256 indexed projectId, uint256 indexed milestoneId)",
  "event MilestoneVerified(uint256 indexed projectId, uint256 indexed milestoneId, address indexed auditor)",
  "event PaymentReleased(uint256 indexed projectId, uint256 indexed milestoneId, address indexed contractor, uint256 amount)",
  
  // Functions
  "function createProject(string memory name, string memory description, uint256 budget, uint256 startDate, uint256 endDate) external returns (uint256)",
  "function addMilestone(uint256 projectId, string memory name, string memory description, uint256 amount, uint256 deadline, string memory requirements) external",
  "function submitBid(uint256 projectId, uint256 amount, uint256 estimatedStart, uint256 estimatedCompletion, string memory proposal) external",
  "function approveBid(uint256 projectId, address contractor) external",
  "function submitMilestoneCompletion(uint256 projectId, uint256 milestoneId, string memory evidence) external",
  "function verifyMilestone(uint256 projectId, uint256 milestoneId, bool approved) external",
  "function releaseMilestonePayment(uint256 projectId, uint256 milestoneId) external",
  
  // View functions
  "function getProject(uint256 projectId) external view returns (string memory name, string memory description, uint256 budget, uint256 startDate, uint256 endDate, address owner, address contractor, uint8 status)",
  "function getMilestone(uint256 projectId, uint256 milestoneId) external view returns (string memory name, string memory description, uint256 amount, uint256 deadline, string memory requirements, uint8 status)",
  "function getBid(uint256 projectId, address contractor) external view returns (uint256 amount, uint256 estimatedStart, uint256 estimatedCompletion, string memory proposal, uint8 status)",
];

/**
 * Checks if MetaMask is installed
 */
export function isMetaMaskInstalled(): boolean {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
}

/**
 * Requests account access from MetaMask
 */
export async function connectWallet(): Promise<string[]> {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed");
  }
  
  try {
    const accounts = await window.ethereum?.request({ method: "eth_requestAccounts" });
    return accounts;
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw error;
  }
}

/**
 * Gets the current Ethereum provider
 */
export function getProvider(): ethers.BrowserProvider | null {
  if (!isMetaMaskInstalled()) {
    return null;
  }
  
  return new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
}

/**
 * Gets a signer for transactions
 */
export async function getSigner(): Promise<ethers.JsonRpcSigner | null> {
  const provider = getProvider();
  if (!provider) {
    return null;
  }
  
  try {
    return await provider.getSigner();
  } catch (error) {
    console.error("Error getting signer:", error);
    return null;
  }
}

/**
 * Creates a contract instance for a specific project
 */
export function getProjectContract(contractInfo: SmartContractInfo): ethers.Contract | null {
  const provider = getProvider();
  if (!provider) {
    return null;
  }
  
  return new ethers.Contract(
    contractInfo.contractAddress,
    contractInfo.abi || projectFundingABI,
    provider
  );
}

/**
 * Creates a writable contract instance (for sending transactions)
 */
export async function getSignedContract(contractInfo: SmartContractInfo): Promise<ethers.Contract | null> {
  const signer = await getSigner();
  if (!signer) {
    return null;
  }
  
  return new ethers.Contract(
    contractInfo.contractAddress,
    contractInfo.abi || projectFundingABI,
    signer
  );
}

/**
 * Deploys a new project funding contract
 */
export async function deployProjectContract(
  projectId: string,
  projectName: string,
  budget: number
): Promise<string> {
  const signer = await getSigner();
  if (!signer) {
    throw new Error("No signer available");
  }
  
  // This is a simplified deployment - in reality, you'd use a proper factory pattern
  // or other deployment mechanism optimized for your use case
  const contractFactory = new ethers.ContractFactory(
    projectFundingABI,
    "0x...", // Bytecode would go here - omitted for brevity
    signer
  );
  
  try {
    const contract = await contractFactory.deploy(projectId, projectName, ethers.parseEther(budget.toString()));
    await contract.waitForDeployment();
    return await contract.getAddress();
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
}

/**
 * Listens for contract events
 */
export function listenForContractEvents(
  contractInfo: SmartContractInfo,
  eventName: string,
  callback: (event: any) => void
): void {
  const contract = getProjectContract(contractInfo);
  if (!contract) {
    return;
  }
  
  contract.on(eventName, callback);
}

/**
 * Stops listening for contract events
 */
export function removeContractEventListener(
  contractInfo: SmartContractInfo,
  eventName: string,
  callback: (event: any) => void
): void {
  const contract = getProjectContract(contractInfo);
  if (!contract) {
    return;
  }
  
  contract.off(eventName, callback);
}

//disconnect wallet
export async function disconnectWallet() {
  window.ethereum?.removeListener("accountsChanged", () => {});
}