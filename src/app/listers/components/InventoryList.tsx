"use client";

import React, { useState } from "react";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
import { Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProducts } from "@/lib/queries/product/useUserProducts";
import { useRouter } from "next/navigation";

interface InventoryItem {
  id: string;
  name: string;
  size: string;
  color: string;
  pricePerDay: string;
  itemValue: string;
  listedDate: string;
  isAvailable: boolean;
  isRented: boolean;
  status: "Active" | "Disabled";
  imageUrl: string;
}

const InventoryItemCard: React.FC<InventoryItem> = ({
  id,
  name,
  size,
  color,
  pricePerDay,
  itemValue,
  listedDate,
  isAvailable,
  isRented,
  imageUrl,
}) => {
  let statusText = isAvailable ? "Available" : isRented ? "Rented" : "Disabled";
  let dotClass = isAvailable
    ? "bg-green-600"
    : isRented
      ? "bg-blue-600"
      : "bg-gray-400";

  const router = useRouter();

  const handleManage = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/listers/inventory/product-details/${id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-3 sm:p-4 border border-gray-200 rounded-xl bg-white hover:shadow-md transition-shadow duration-150">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-16 h-16 sm:w-14 sm:h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
              <Paragraph1
                className={`text-xs font-semibold ${
                  isAvailable
                    ? "text-green-600"
                    : isRented
                      ? "text-blue-600"
                      : "text-gray-600"
                }`}
              >
                {statusText}
              </Paragraph1>
            </div>
            <Paragraph1 className="font-semibold text-gray-800 truncate text-base">
              {name}
            </Paragraph1>
            <Paragraph1 className="text-sm text-gray-500">
              Size: {size} | {color}
            </Paragraph1>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3 py-3 border-t border-gray-100">
          <div>
            <Paragraph1 className="text-xs text-gray-500 mb-0.5">Price/Day</Paragraph1>
            <Paragraph1 className="font-semibold text-black text-sm">
              {pricePerDay}
            </Paragraph1>
          </div>

          <div>
            <Paragraph1 className="text-xs text-gray-500 mb-0.5">Value</Paragraph1>
            <Paragraph1 className="font-semibold text-black text-sm">
              {itemValue}
            </Paragraph1>
          </div>

          <div>
            <Paragraph1 className="text-xs text-gray-500 mb-0.5">Listed</Paragraph1>
            <Paragraph1 className="font-semibold text-black text-sm">
              {listedDate}
            </Paragraph1>
          </div>
        </div>

        <button
          type="button"
          onClick={handleManage}
          className="w-full py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150"
        >
          Manage Item
        </button>
      </div>
    </motion.div>
  );
};

const InventoryList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Active" | "Disabled">("Active");

  const { data, isLoading } = useUserProducts();

  const products = (data as any)?.list ?? [];

  const mappedInventory: InventoryItem[] =
    products?.map((item: any) => {
      const firstUpload = item.attachments?.uploads?.[0];
      const imageUrl = firstUpload?.url || "https://via.placeholder.com/100x100?text=No+Image";
      const isActive = item.isActive !== false;
      
      return {
        id: item.id,
        name: item.name || "Untitled",
        size: item.size || "-",
        color: item.color || "-",
        pricePerDay: `₦${(item.dailyPrice || item.pricePerDay || 0).toLocaleString()}`,
        itemValue: `₦${(item.originalValue || 0).toLocaleString()}`,
        listedDate: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-",
        isAvailable: isActive && !item.isRented,
        isRented: item.isRented || false,
        status: isActive ? "Active" : "Disabled",
        imageUrl,
      };
    }) ?? [];

  const filteredInventory = mappedInventory.filter(
    (item) => item.status === activeTab,
  );

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center mb-6">
        <Paragraph3 className="text-xl sm:text-2xl font-semibold text-black">
          Inventory
        </Paragraph3>
        <Link
          href="/listers/inventory/product-upload"
          className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150"
        >
          <Plus className="w-4 h-4" />
          <Paragraph1>Add New Item</Paragraph1>
        </Link>
      </div>

      <div className="mb-6 p-1 bg-white rounded-xl shadow-sm inline-flex border border-gray-200 relative w-full sm:w-auto">
        {(["Active", "Disabled"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 sm:flex-none px-6 py-2 text-sm font-semibold rounded-lg transition duration-150 z-10 ${
              activeTab === tab
                ? "text-white"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-black rounded-lg -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              />
            )}
            {tab}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item) => (
              <InventoryItemCard key={item.id} {...item} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full p-8 text-center text-gray-500 bg-white rounded-xl border border-gray-200"
            >
              No {activeTab.toLowerCase()} items found.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InventoryList;
