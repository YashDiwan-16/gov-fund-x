"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  BarChart,
  FileText,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname } from "next/navigation";
import { ConnectWalletButton } from "@/components/auth/connect-wallet-button";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <BarChart className="h-4 w-4 mr-2" />,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    label: "Bids",
    href: "/bids",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    label: "Milestones",
    href: "/milestones",
    icon: <FileText className="h-4 w-4 mr-2" />,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: <User className="h-4 w-4 mr-2" />,
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="  flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gov-700 to-gov-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">GF</span>
            </div>
          </motion.div>
          <motion.span
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-gov-700 to-gov-500 bg-clip-text text-transparent"
          >
            GovFund
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              size="sm"
              asChild
              
            >
              <Link href={item.href} className="flex items-center">
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <ConnectWalletButton />
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-slate-900 border-t"
          >
            <div className="  py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Button
                    variant={pathname === item.href ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href ? "bg-gov-600 hover:bg-gov-700" : ""
                    )}
                  >
                    <Link href={item.href} className="flex items-center">
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}