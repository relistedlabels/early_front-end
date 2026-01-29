"use client";

import React from "react";
import { Paragraph1, Paragraph2 } from "@/common/ui/Text";
import {  Star } from "lucide-react";
import Calendar from "./Calendar";

interface InventoryItemDetailsHeaderProps {
  name?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  dailyPrice?: string;
  itemValue?: string;
  size?: string;
  color?: string;
  condition?: string;
  status?: "Active" | "Disabled";
  onEdit?: () => void;
  onDisable?: () => void;
}

const InventoryItemDetailsHeader: React.FC<InventoryItemDetailsHeaderProps> = ({
  name = "Fendi Arco",
  description = "Black hagfish leather boots",
  rating = 4.9,
  reviewCount = 12,
  dailyPrice = "₦15,000",
  itemValue = "₦500,000",
  size = "Medium",
  color = "Black",
  condition = "New",
  status = "Disabled",
}) => {
  return (
    <div className="w-full max-w-2xl bg-transparent">
      {/* Title & Status */}
      <div className="flex flex-row justify-between items-start gap-2 mb-1">
        <div className="flex flex-wrap items-center gap-2">
          <Paragraph2 className="text-2xl sm:text-3xl font-bold text-black">
            {name}
          </Paragraph2>
          <Paragraph1 className="px-3 py-0.5 bg-gray-200 text-gray-700 text-xs font-bold rounded uppercase tracking-wider">
            {status}
          </Paragraph1>
        </div>

        {/* Calendar */}
       <Calendar />
      </div>

      {/* Description */}
      <Paragraph1 className="text-gray-500 mb-2">
        {description}
      </Paragraph1>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm font-bold text-black ml-1">{rating}</span>
        <span className="text-sm text-gray-500 ml-1">
          ({reviewCount} Reviews)
        </span>
      </div>

      {/* Details Box */}
      <div className="bg-[#F7F7F7] border border-gray-300 rounded-[10px] p-4">
        {/* Prices */}
        <div className="flex flex-row justify-between gap-4 mb-2 border-b border-gray-300 pb-2">
          <div>
            <Paragraph1 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Daily Rental Price
            </Paragraph1>
            <Paragraph2 className="text-xl sm:text-2xl font-bold text-black">
              {dailyPrice}
            </Paragraph2>
          </div>

          <div>
            <Paragraph1 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Item Value
            </Paragraph1>
            <Paragraph2 className="text-xl sm:text-2xl font-bold text-black">
              {itemValue}
            </Paragraph2>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          <div>
            <Paragraph1 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Size
            </Paragraph1>
            <Paragraph1 className="font-bold text-black">{size}</Paragraph1>
          </div>
          <div>
            <Paragraph1 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Color
            </Paragraph1>
            <Paragraph1 className="font-bold text-black">{color}</Paragraph1>
          </div>
          <div>
            <Paragraph1 className="text-xs font-medium text-gray-500 uppercase mb-1">
              Condition
            </Paragraph1>
            <Paragraph1 className="font-bold text-black">
              {condition}
            </Paragraph1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetailsHeader;
