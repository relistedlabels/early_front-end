"use client";

import React from "react";
import { motion } from "framer-motion";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
import { useProductRentals } from "@/lib/queries/rental/useRentals";

interface RentalsHistoryProps {
  productId: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatus = (rental: { isReturned: boolean; isOverdue: boolean }) => {
  if (rental.isReturned) return "Completed";
  if (rental.isOverdue) return "Overdue";
  return "Active";
};

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-[#E8F8F0] text-[#1DB954]";
    case "Overdue":
      return "bg-red-100 text-red-600";
    case "Active":
      return "bg-blue-100 text-blue-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const RentalsHistory: React.FC<RentalsHistoryProps> = ({ productId }) => {
  const { data: rentals, isLoading, error } = useProductRentals(productId);

  if (isLoading) {
    return (
      <div className="w-full mt-6 sm:mt-8">
        <Paragraph3 className="text-lg font-bold text-black mb-4">
          Rentals History
        </Paragraph3>
        <div className="text-center py-8 text-gray-500">
          Loading rental history...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mt-6 sm:mt-8">
        <Paragraph3 className="text-lg font-bold text-black mb-4">
          Rentals History
        </Paragraph3>
        <div className="text-center py-8 text-red-500">
          Failed to load rental history
        </div>
      </div>
    );
  }

  if (!rentals || rentals.length === 0) {
    return (
      <div className="w-full mt-6 sm:mt-8">
        <Paragraph3 className="text-lg font-bold text-black mb-4">
          Rentals History
        </Paragraph3>
        <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <Paragraph1 className="text-gray-500">
            No rental history yet
          </Paragraph1>
          <Paragraph1 className="text-gray-400 text-sm mt-1">
            Rentals will appear here once customers rent this item
          </Paragraph1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 sm:mt-8">
      <Paragraph3 className="text-lg font-bold text-black mb-4">
        Rentals History
      </Paragraph3>

      <div className="space-y-3">
        {rentals.map((rental, index) => {
          const status = getStatus(rental);
          const renterName = rental.user?.profile
            ? `${rental.user.profile.firstName} ${rental.user.profile.lastName?.charAt(0) || ""}.`
            : "Unknown";

          return (
            <motion.div
              key={rental.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white border border-gray-300 rounded-2xl p-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Paragraph1 className={`inline-block px-3 py-1 text-sm font-bold rounded-lg ${getStatusStyle(status)}`}>
                    {status}
                  </Paragraph1>
                  <button className="text-sm font-bold text-black underline hover:text-gray-600 transition-colors">
                    View
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Paragraph1 className="text-xs text-gray-400 font-medium uppercase mb-0.5">
                      Order Date
                    </Paragraph1>
                    <Paragraph1 className="font-semibold text-black text-sm">
                      {formatDate(rental.createdAt)}
                    </Paragraph1>
                  </div>

                  <div>
                    <Paragraph1 className="text-xs text-gray-400 font-medium uppercase mb-0.5">
                      Dresser
                    </Paragraph1>
                    <Paragraph1 className="font-semibold text-black text-sm">
                      {renterName}
                    </Paragraph1>
                  </div>

                  <div>
                    <Paragraph1 className="text-xs text-gray-400 font-medium uppercase mb-0.5">
                      Duration
                    </Paragraph1>
                    <Paragraph1 className="font-semibold text-black text-sm">
                      {rental.days} {rental.days === 1 ? "Day" : "Days"}
                    </Paragraph1>
                  </div>

                  <div>
                    <Paragraph1 className="text-xs text-gray-400 font-medium uppercase mb-0.5">
                      Earning
                    </Paragraph1>
                    <Paragraph1 className="font-semibold text-black text-sm">
                      {formatCurrency(rental.totalAmount)}
                    </Paragraph1>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RentalsHistory;
