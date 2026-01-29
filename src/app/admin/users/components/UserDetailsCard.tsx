"use client";

import React from "react";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";

interface UserDetailsCardProps {
  user: {
    name: string;
    role: string;
    status: string;
    avatar: string;
    email: string;
    phone: string;
    joinDate: string;
    walletBalance: string;
    totalRentals: number;
    disputesRaised: number;
  };
}

export default function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <div className="bg-white p-6 max-w-md border border-gray-100 rounded-2xl shadow-sm">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex flex-col gap-1">
          <Paragraph3 className="text-xl font-bold text-gray-900">
            {user.name}
          </Paragraph3>
          <Paragraph1 className="text-sm text-gray-500">{user.role}</Paragraph1>
          <div className="mt-1 px-3 py-1 bg-green-50 text-green-600 rounded-full w-fit">
            <Paragraph1 className="text-xs font-medium">
              {user.status}
            </Paragraph1>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-8" />

      {/* Contact Information */}
      <div className="mb-8">
        <Paragraph3 className="text-sm font-bold mb-6 text-black">
          Contact Information
        </Paragraph3>

        <div className="space-y-4">
          <div>
            <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              EMAIL
            </Paragraph1>
            <Paragraph1 className="text-sm text-gray-700">
              {user.email}
            </Paragraph1>
          </div>

          <div>
            <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              PHONE
            </Paragraph1>
            <Paragraph1 className="text-sm text-gray-700">
              {user.phone}
            </Paragraph1>
          </div>

          <div>
            <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              JOIN DATE
            </Paragraph1>
            <Paragraph1 className="text-sm text-gray-700">
              {user.joinDate}
            </Paragraph1>
          </div>
        </div>
      </div>

      <hr className="border-gray-100 mb-8" />

      {/* Account Statistics */}
      <div>
        <Paragraph3 className="text-sm font-bold mb-6 text-black">
          Account Statistics
        </Paragraph3>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50/50 p-4 rounded-xl">
            <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              WALLET BALANCE
            </Paragraph1>
            <Paragraph1 className="text-lg font-bold text-gray-900">
              {user.walletBalance}
            </Paragraph1>
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl">
            <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              TOTAL RENTALS
            </Paragraph1>
            <Paragraph1 className="text-lg font-bold text-gray-900">
              {user.totalRentals}
            </Paragraph1>
          </div>
        </div>

        <div className="bg-gray-50/50 p-4 rounded-xl">
          <Paragraph1 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            DISPUTES RAISED
          </Paragraph1>
          <Paragraph1 className="text-lg font-bold text-gray-900">
            {user.disputesRaised}
          </Paragraph1>
        </div>
      </div>
    </div>
  );
}
