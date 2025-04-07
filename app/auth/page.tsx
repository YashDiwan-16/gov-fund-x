import { RoleSelection } from "@/components/auth/role-selection";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { text } from "@/data/en";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Lock, Zap } from "lucide-react";

export default function AuthPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="  pt-20 pb-16 md:pt-24 md:pb-20 lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mx-auto max-w-md">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">
                  {text.auth.connectWalletDescription}
                </h1>
                <p className="text-muted-foreground">
                  Connect your wallet and select your role to access the platform
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl border shadow-sm p-6">
                <RoleSelection />
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Why use a wallet?
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex flex-col items-center text-center p-2">
                    <ShieldCheck className="h-6 w-6 mb-2 text-green-500" />
                    <span className="font-medium mb-1">Secure</span>
                    <span className="text-xs text-muted-foreground">Your private key never leaves your device</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <Lock className="h-6 w-6 mb-2 text-amber-500" />
                    <span className="font-medium mb-1">Trusted</span>
                    <span className="text-xs text-muted-foreground">Verified by blockchain technologies</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2">
                    <Zap className="h-6 w-6 mb-2 text-blue-500" />
                    <span className="font-medium mb-1">Fast</span>
                    <span className="text-xs text-muted-foreground">No lengthy KYC procedures</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Don't have a wallet?{" "}
                  <Link 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gov-600 hover:text-gov-700 hover:underline"
                  >
                    Install MetaMask
                  </Link>
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-gov-500 to-gov-700 rounded-2xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative bg-white dark:bg-slate-800 rounded-xl border shadow-lg overflow-hidden">
                <div className="h-8 bg-gray-100 dark:bg-gray-700 border-b flex items-center space-x-1.5 px-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="relative w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="Platform dashboard preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                    <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}