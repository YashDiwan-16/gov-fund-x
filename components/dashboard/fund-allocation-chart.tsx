"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

// Mock data for the chart
const data = [
  {
    name: "Jan",
    allocated: 45000,
    spent: 35000,
  },
  {
    name: "Feb",
    allocated: 52000,
    spent: 48000,
  },
  {
    name: "Mar",
    allocated: 48000,
    spent: 42000,
  },
  {
    name: "Apr",
    allocated: 63000,
    spent: 56000,
  },
  {
    name: "May",
    allocated: 70000,
    spent: 60000,
  },
  {
    name: "Jun",
    allocated: 85000,
    spent: 70000,
  },
];

export function FundAllocationChart() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues with next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set colors based on theme
  const isDarkTheme = theme === "dark";
  const colors = {
    allocated: isDarkTheme ? "#60a5fa" : "#3b82f6",
    spent: isDarkTheme ? "#a78bfa" : "#8b5cf6",
    text: isDarkTheme ? "#94a3b8" : "#64748b",
    grid: isDarkTheme ? "#334155" : "#e2e8f0",
    background: isDarkTheme ? "#1e293b" : "#ffffff",
  };

  // Format large numbers for display
  const formatAmount = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value;
  };

  if (!mounted) {
    return <div className="h-full flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={{ stroke: colors.grid }}
          tick={{ fill: colors.text, fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={{ stroke: colors.grid }}
          tick={{ fill: colors.text, fontSize: 12 }}
          tickFormatter={(value) => formatAmount(value).toString()}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.background,
            border: `1px solid ${colors.grid}`,
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
          }}
          formatter={(value) => [`${value} ETH`, undefined]}
          labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
        />
        <Legend
          wrapperStyle={{ fontSize: "0.875rem", paddingTop: "1rem" }}
          formatter={(value) => <span style={{ color: colors.text }}>{value}</span>}
        />
        <Bar
          dataKey="allocated"
          name="Allocated Funds"
          fill={colors.allocated}
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
        <Bar
          dataKey="spent"
          name="Spent Funds"
          fill={colors.spent}
          radius={[4, 4, 0, 0]}
          barSize={30}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}