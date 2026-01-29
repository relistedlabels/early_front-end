"use client";

import React from "react";
// Assuming Paragraph components are available
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";

const RentalsOvertimeChart: React.FC = () => {
  // Static data for the legend and tooltip shown in the image
  const legendData = [
    { label: "Revenue", color: "text-blue-600", dotClass: "bg-blue-600" },
    { label: "Orders", color: "text-purple-600", dotClass: "bg-purple-600" },
  ];

  // Placeholder data for the tooltip/average box
  const averageData = [
    { label: "Aug 2025", value: "₦5.8k", dotClass: "bg-blue-600" },
    { label: "Aug 2024", value: "₦8.5k", dotClass: "bg-purple-600" },
  ];

  // Placeholder data for Y-axis labels
  const yAxisLabels = ["₦ 5M", "₦ 1M", "₦ 500k", "₦ 50k", "₦ 0"];

  // Placeholder data for X-axis labels
  const xAxisLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="bg-white sm:col-span-3  p-6 rounded-xl  border border-gray-300 w-full">
      {/* Header and Legend */}
      <div className="flex justify-between items-center mb-6">
        <Paragraph3 className="text-xl font-semibold text-black">
          Rentals Overtime
        </Paragraph3>

        {/* Legend */}
        <div className="flex space-x-4">
          {legendData.map((item) => (
            <div key={item.label} className="flex items-center space-x-1">
              <span className={`w-2 h-2 rounded-full ${item.dotClass}`}></span>
              <Paragraph1 className={`text-sm ${item.color}`}>
                {item.label}
              </Paragraph1>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative h-64 flex">
        {/* Y-Axis Labels (Rough simulation) */}
        <div className="flex flex-col justify-between pr-4 text-right text-gray-500 text-sm h-full">
          {yAxisLabels.map((label, index) => (
            <Paragraph1 key={index}>{label}</Paragraph1>
          ))}
        </div>

        {/* Main Chart Canvas/Placeholder */}
        <div className="flex-1 relative border-l border-gray-200 ml-2">
          {/* Placeholder for the actual Chart Component (e.g., from Recharts) */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            [Placeholder for Chart Library Rendering Area]
          </div>

          {/* Tooltip/Average Box (Absolute positioning, styled to match the image) */}
          <div
            className="absolute p-3 bg-white border border-gray-300 rounded-lg "
            style={{ top: "35%", left: "30%" }} // Positioned approximately where it is in the image
          >
            <Paragraph1 className="text-sm font-semibold text-gray-800 mb-1">
              Average
            </Paragraph1>
            {averageData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center space-x-3 text-xs"
              >
                <div className="flex items-center space-x-1">
                  <span
                    className={`w-2 h-2 rounded-full ${item.dotClass}`}
                  ></span>
                  <Paragraph1 className="text-gray-600">
                    {item.label}
                  </Paragraph1>
                </div>
                <Paragraph1 className="font-medium text-gray-800">
                  {item.value}
                </Paragraph1>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* X-Axis Labels */}
      <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-200">
        {xAxisLabels.map((label, index) => (
          <Paragraph1
            key={index}
            className="text-sm text-gray-500 w-full text-center"
          >
            {label}
          </Paragraph1>
        ))}
      </div>
    </div>
  );
};

export default RentalsOvertimeChart;
