"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  Bell,
  Menu,
  X,
  FileText,
  Settings,
  LogOut,
  HelpCircle,
  Mail,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Wallet,
  LucideIcon,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  Header2Plus,
  HeaderAny,
  Paragraph1,
  Paragraph3,
} from "@/common/ui/Text";
import { UserProfileBadge } from "./UserProfileBadge";
import { useUserStore } from "@/store/useUserStore";

// --------------------
// Types
// --------------------
export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export type UserProfile = {
  name: string;
  role?: string;
  avatarUrl?: string;
};

interface DashboardLayoutProps {
  children: ReactNode;
  brand?: string;
}

// --------------------
// Reusable Sidebar Nav
// --------------------
const SidebarNav: React.FC<{
  navItems: NavItem[];
  onItemClick?: () => void;
}> = ({ navItems, onItemClick }) => {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={onItemClick}
          className={`flex items-center p-3 rounded-xl transition duration-150 ${
            item.isActive
              ? "bg-white text-black font-semibold"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          <item.icon className="w-5 h-5 mr-3" />
          <Paragraph1 className="text-sm">{item.name}</Paragraph1>
        </Link>
      ))}
    </nav>
  );
};

// --------------------
// Sidebar Footer
// --------------------
const SidebarFooter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => (
  <div className="mt-8 space-y-2 border-t border-gray-700 pt-6">
    <button
      onClick={onLogout}
      className="flex items-center w-full p-3 rounded-xl text-gray-300 hover:bg-gray-800 transition"
    >
      <LogOut className="w-5 h-5 mr-3" />
      <Paragraph1 className="text-sm">Log Out</Paragraph1>
    </button>
    <Link
      href="/contact-us"
      className="flex items-center p-3 text-gray-500 text-xs mt-4 hover:text-gray-300 transition"
    >
      <HelpCircle className="w-4 h-4 mr-2" />
      <Paragraph1 className="text-xs">Help & Support</Paragraph1>
    </Link>
  </div>
);

// --------------------
// Main Layout
// --------------------
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  brand = "DASHBOARD",
}) => {
  const pathname = usePathname();
  const userName = useUserStore((s) => s.name) || "Lister";
  const clearUser = useUserStore((s) => s.clearUser);

  const navItems: NavItem[] = [
    {
      name: "Inventory",
      href: "/listers/inventory",
      icon: Package,
      isActive: pathname.startsWith("/listers/inventory"),
    },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((p) => !p);
  
  const handleLogout = () => {
    clearUser();
    window.location.href = "/auth/sign-in";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen overflow-hidden hide-scrollbar overflow-y-auto bg-[#241F20] text-white p-6 sticky top-0">
        <div className="mb-8">
          <Image
            src="/images/logo.svg"
            alt="Relisted Labels"
            width={140}
            height={45}
            className="brightness-0 invert"
          />
        </div>

        {/* Profile */}
        <div className="flex items-center border-b border-gray-700 pb-4 mb-6">
          <UserProfileBadge />
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <SidebarNav navItems={navItems} />
        </div>

        <SidebarFooter onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#241F20] text-white p-6 transform transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-start mb-8">
          <Image
            src="/images/logo.svg"
            alt="Relisted Labels"
            width={120}
            height={40}
            className="brightness-0 invert"
          />
          <button onClick={toggleMobile}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center border-b border-gray-700 pb-4 mb-4 space-x-3">
          <UserProfileBadge />
        </div>
        <SidebarNav navItems={navItems} onItemClick={toggleMobile} />
        <div className="mt-auto pt-6 border-t border-gray-700 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-xl text-gray-300 hover:bg-gray-800 transition"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <Paragraph1 className="text-sm">Log Out</Paragraph1>
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobile}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 sm:px-8 h-14 sm:h-16 bg-[#241F20] border-b border-gray-800">
          <div className="md:hidden">
            <button onClick={toggleMobile} className="p-1">
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="hidden md:block" />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <Paragraph3 className="text-white font-medium text-xs sm:text-base">Early Access</Paragraph3>
          </div>

          <div className="hidden md:flex items-center gap-3 text-white">
            <span className="text-sm text-gray-300">Welcome, {userName.split(' ')[0]}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] overflow-y-auto p-3 sm:p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
