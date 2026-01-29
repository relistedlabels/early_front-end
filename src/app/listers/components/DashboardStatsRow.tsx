"use client";

import React from "react";
// Assuming Paragraph components are available
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
// Importing icons needed for the card visualization (based on the image placeholder shapes)
import { Database, ShoppingCart, Archive, Loader } from "lucide-react";

// Define the data structure for a single stat card
interface StatCardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType; // Use React.ElementType for Lucide icons
  isDark?: boolean; // To handle the dark background card
}

// Data matching the provided image
const statData: StatCardData[] = [
  {
    title: "Total Earnings",
    value: "₦1,550,000",
    change: "+3.16%",
    isPositive: true,
    icon: Database, // Placeholder icon
    isDark: true,
  },
  {
    title: "Total Orders",
    value: "150",
    change: "+2.24%",
    isPositive: true,
    icon: ShoppingCart, // Placeholder icon
    isDark: false,
  },
  {
    title: "Active Rentals",
    value: "08",
    change: "-1.18%",
    isPositive: false,
    icon: Archive, // Placeholder icon
    isDark: false,
  },
  {
    title: "Pending Payouts",
    value: "₦350,000",
    change: "+2.24%",
    isPositive: true,
    icon: Loader, // Placeholder icon (using Loader for the rotating circle)
    isDark: false,
  },
];

// Reusable Card Component
const StatCard: React.FC<StatCardData> = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
  isDark = false,
}) => {
  const bgColor = isDark ? "bg-black" : "bg-white";
  const textColor = isDark ? "text-white" : "text-black";
  const titleColor = isDark ? "text-gray-300" : "text-gray-500";
  const iconColor = isDark ? "text-gray-400" : "text-gray-400";
  const changeColor = isPositive ? "text-green-500" : "text-red-500";
  const cardClasses = `p-6 rounded-xl shadow-lg border border-gray-100 flex-1 min-w-[200px] transition-all duration-300 ${bgColor}`;

  return (
    <div className={cardClasses}>
      {/* Title and Icon */}
      <div className="flex justify-between items-start mb-1">
        <Paragraph1 className={`text-sm font-medium ${titleColor}`}>
          {title}
        </Paragraph1>
        <Icon
          className={`w-5 h-5 ${iconColor} ${
            title === "Pending Payouts" ? "animate-spin" : ""
          }`}
        />
      </div>

      {/* Value */}
      <Paragraph3 className={`text-3xl font-bold ${textColor} mt-1 mb-2`}>
        {value}
      </Paragraph3>

      {/* Change Percentage */}
      <div className="flex items-center text-sm">
        <span className={`font-semibold text-xs ${changeColor}`}>{change}</span>
        <span
          className={`text-gray-400 ml-1 text-xs ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          From last month
        </span>
      </div>
    </div>
  );
};

const DashboardStatsRow: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Optional Header (As seen in the full dashboard image) */}
      <div className="block">
        <Paragraph3 className="text-2xl font-semibold text-black">
          Welcome back, Jane!
        </Paragraph3>
        <Paragraph1 className="text-sm text-gray-500">
          Here's Your Current Sales Overview
        </Paragraph1>
      </div>

      {/* Statistics Row Container */}
      <div className="flex flex-wrap gap-4">
        {statData.map((data, index) => (
          <StatCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default DashboardStatsRow;
