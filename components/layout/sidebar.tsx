"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Gavel,
  Milestone,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { text } from "@/data/en";

interface SidebarProps {
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  label?: string;
}

const navItems: NavItem[] = [
  {
    title: text.sidebar.dashboard,
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: text.sidebar.projects,
    href: "/projects",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: text.sidebar.bids,
    href: "/bids",
    icon: <Gavel className="h-5 w-5" />,
  },
  {
    title: text.sidebar.milestones,
    href: "/milestones",
    icon: <Milestone className="h-5 w-5" />,
  },
  {
    title: text.sidebar.profile,
    href: "/profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    title: text.sidebar.settings,
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-semibold text-lg bg-gradient-to-r from-gov-700 to-gov-500 bg-clip-text text-transparent"
          >
            {text.app.name}
          </motion.div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="py-4 space-y-1 px-3">
          <AnimatePresence mode="wait">
            {navItems.map((item) => (
              <div key={item.href}>
                <Button
                  asChild
                  variant={pathname.includes(item.href) ? "default" : "ghost"}
                  size={collapsed ? "icon" : "default"}
                  
                >
                  <Link href={item.href}>
                    <motion.div
                      className={cn(
                        "flex items-center",
                        !collapsed && "justify-start space-x-3"
                      )}
                    >
                      <motion.div
                        initial={false}
                        animate={{
                          scale: pathname.includes(item.href) ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.icon}
                      </motion.div>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: "auto" }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </motion.div>
                  </Link>
                </Button>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}