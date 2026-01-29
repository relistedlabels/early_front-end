"use client";

import React from "react";
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

type Role = "RENTER" | "LISTER";

interface RoleOptionProps {
  title: string;
  description: string;
  imageUrl: string;
  onContinue: (role: Role) => void;
  roleKey: Role;
}

const RoleOption: React.FC<RoleOptionProps> = ({
  title,
  description,
  imageUrl,
  onContinue,
  roleKey,
}) => {
  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col transition hover:shadow-xl">
      <div className="h-64 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>

      <div className="mt-4 flex flex-col grow">
        <Paragraph3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </Paragraph3>
        <Paragraph1 className="text-sm text-gray-600 grow mb-4">
          {description}
        </Paragraph1>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => onContinue(roleKey)}
          className="w-full py-3 text-sm font-semibold text-white bg-[#231F20] rounded-lg hover:bg-gray-800 transition"
        >
          <Paragraph1>Continue as a {title}</Paragraph1>
        </button>
      </div>
    </div>
  );
};

const AccountRoleSelector: React.FC = () => {
  const router = useRouter();
  const setUser = useUserStore((s) => s.setUser);

  const handleContinue = () => {
    setUser({ role: "LISTER" });
    router.push("/auth/create-account/sign-up");
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center sm:p-4">
      <div className="max-w-xl w-full bg-white p-2 py-10 sm:p-10 sm:rounded-xl shadow-2xl text-center">
        <div className="mb-6 flex justify-center">
          <img src="/images/logo1.svg" alt="Logo" />
        </div>

        <div className="mb-2 inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Early Access
        </div>

        <Paragraph3 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, Lister!
        </Paragraph3>
        <Paragraph1 className="text-sm text-gray-600 mb-8">
          You have been invited to join Relisted Labels as an early access lister. Create your account and start listing your fashion pieces.
        </Paragraph1>

        <div className="max-w-sm mx-auto">
          <RoleOption
            title="Lister"
            description="List your fashion pieces and earn by sharing your wardrobe with others."
            imageUrl="/images/sin2.jpg"
            onContinue={() => handleContinue()}
            roleKey="LISTER"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountRoleSelector;
