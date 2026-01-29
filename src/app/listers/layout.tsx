"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/lib/queries/auth/useMe";
import FullPageLoader from "@/common/ui/FullPageLoader";

export default function CuratorsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading } = useMe();

  useEffect(() => {
    if (isLoading) return;
    
    if (!user) {
      router.replace("/auth/sign-in");
      return;
    }

    if (!user.profile) {
      router.replace("/auth/profile-setup");
      return;
    }
  }, [user, isLoading, router]);

  if (isLoading) return <FullPageLoader />;

  if (!user || !user.profile) {
    return <FullPageLoader />;
  }

  return <>{children}</>;
}
