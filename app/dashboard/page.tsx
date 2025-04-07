import { ProjectCard } from "@/components/dashboard/project-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { FundAllocationChart } from "@/components/dashboard/fund-allocation-chart";
import { text } from "@/data/en";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="  py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{text.dashboard.welcome}</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your projects today.
          </p>
        </div>
        <Button asChild className="bg-gov-600 hover:bg-gov-700">
          <Link href="/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Create New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={text.dashboard.stats.activeProjects}
          value="12"
          change="+2"
          trend="up"
          icon="project"
        />
        <StatsCard
          title={text.dashboard.stats.pendingBids}
          value="28"
          change="+5"
          trend="up"
          icon="bid"
        />
        <StatsCard
          title={text.dashboard.stats.completedMilestones}
          value="74"
          change="+12"
          trend="up"
          icon="milestone"
        />
        <StatsCard
          title={text.dashboard.stats.totalFundsAllocated}
          value="1.24M ETH"
          change="+240K"
          trend="up"
          icon="funds"
        />
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6 pb-2">
              <h3 className="font-semibold leading-none tracking-tight">
                Fund Allocation
              </h3>
              <p className="text-sm text-muted-foreground">
                Monthly allocation across active projects
              </p>
            </div>
            <div className="p-6 pt-0 h-80">
              <FundAllocationChart />
            </div>
          </div>
        </div>
        <div>
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="flex items-center justify-between p-6 pb-2">
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                  {text.dashboard.recentActivity.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recent updates from your projects
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/activity">
                  {text.dashboard.recentActivity.viewAll}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="p-6 pt-2">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            {text.dashboard.yourProjects.title}
          </h2>
          <Button variant="outline" size="sm" asChild>
            <Link href="/projects">
              {text.dashboard.yourProjects.viewAll}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard
            id="1"
            title="City Park Renovation"
            description="Comprehensive renovation of Central City Park including landscaping, playground equipment, and accessibility improvements."
            budget="120,000 ETH"
            deadline="Dec 15, 2025"
            progress={65}
            status="in-progress"
          />
          <ProjectCard
            id="2"
            title="Municipal Building Extension"
            description="Construction of a new wing for the Municipal Building to house additional government offices and public service spaces."
            budget="450,000 ETH"
            deadline="Mar 30, 2026"
            progress={25}
            status="in-progress"
          />
          <ProjectCard
            id="3"
            title="Smart Traffic System"
            description="Implementation of AI-powered traffic management system across downtown areas to reduce congestion and improve traffic flow."
            budget="85,000 ETH"
            deadline="Aug 10, 2025"
            progress={10}
            status="open"
          />
        </div>
      </div>
    </div>
  );
}
