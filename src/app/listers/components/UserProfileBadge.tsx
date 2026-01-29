"use client";

import { User } from "lucide-react";
import { Paragraph1 } from "@/common/ui/Text";
import { useProfile } from "@/lib/queries/user/useProfile";
import { useUserStore } from "@/store/useUserStore";

export function UserProfileBadge() {
  const userId = useUserStore((s) => s.userId ?? undefined);
  const name = useUserStore((s) => s.name)?.trim() || "New user";
  const role = useUserStore((s) => s.role);

  const { data: profile, isLoading } = useProfile(userId);

  const avatar = profile?.avatar;

  if (isLoading) return null;

  return (
    <div className="flex items-center gap-3">
      {/* Avatar */}
      <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Name & Role */}
      <div className="hidden lg:block">
        <Paragraph1 className="text-sm font-medium text-white">
          {name}
        </Paragraph1>

        {role && (
          <Paragraph1 className="text-xs text-gray-500">
           - {role.toUpperCase()} -
          </Paragraph1>
        )}
      </div>
    </div>
  );
}
