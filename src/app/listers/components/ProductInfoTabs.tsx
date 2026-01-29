"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paragraph1 } from "@/common/ui/Text";

type TabID = "details" | "styling" | "care";

interface ProductInfoTabsProps {
  composition?: string;
  measurement?: string;
  careInstruction?: string;
  stylingTip?: string;
  warning?: string;
}

const ProductInfoTabs: React.FC<ProductInfoTabsProps> = ({
  composition = "",
  measurement = "",
  careInstruction = "",
  stylingTip = "",
  warning = "",
}) => {
  const [activeTab, setActiveTab] = useState<TabID>("details");

  const tabs = [
    {
      id: "details" as TabID,
      label: "Product details",
      content: [
        composition && `Composition: ${composition}`,
        measurement && `Measurements: ${measurement}`,
        warning && `Warning: ${warning}`,
      ].filter(Boolean).join("\n\n") || "No product details available.",
    },
    {
      id: "styling" as TabID,
      label: "Styling",
      content: stylingTip || "No styling tips available.",
    },
    {
      id: "care" as TabID,
      label: "Product Care",
      content: careInstruction || "No care instructions available.",
    },
  ];

  return (
    <div className="w-full max-w-2xl border border-gray-300 rounded-2xl p-4 mt-6">
      <div className="relative flex p-1 bg-gray-50 border border-gray-300 rounded-xl mb-6 w-full">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative w-full px-6 py-2 text-sm font-semibold transition-colors duration-200 z-10 ${
                isActive ? "text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-[#33332D] rounded-lg z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Paragraph1>{tab.label}</Paragraph1>
            </button>
          );
        })}
      </div>

      <div className="min-h-[100px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Paragraph1 className="text-gray-600 leading-relaxed whitespace-pre-line">
              {tabs.find((t) => t.id === activeTab)?.content}
            </Paragraph1>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductInfoTabs;
