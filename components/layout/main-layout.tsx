"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  
  // Routes that don't need the sidebar
  const fullWidthRoutes = ["/", "/auth"];
  const isFullWidthRoute = fullWidthRoutes.some(route => pathname === route);

  

  return (
    <div className="flex min-h-screen flex-col">
       <Header />
      <div className="flex flex-1 pt-14">
        {!isFullWidthRoute && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}

        <main
          className={cn(
            "flex-1 transition-all duration-300",
            !isFullWidthRoute && "md:px-8"
          )}
        >
          <div className="min-h-[calc(100vh-10rem)]">
            {children}
          </div>
       
        </main>
      </div>
    </div>
  );
}