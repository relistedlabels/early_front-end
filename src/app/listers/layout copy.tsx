// app/curators/layout.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMe } from "@/lib/queries/auth/useMe";
import FullPageLoader from "@/common/ui/FullPageLoader";
import { useProfile } from "@/lib/queries/user/useProfile";

export default function CuratorsLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading } = useMe();
  console.log("getme user",user)
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  // ⛔ block render until auth check completes
  if (isLoading) return <FullPageLoader />;

  // ⛔ unauthenticated → redirect before render
  if (!user) {
    router.replace("/auth/sign-in");
    return <FullPageLoader />;
  }

  if (!profile ) {
    router.replace("/auth/profile-setup");
    return;
  }

  // optional role gate
  // if (user.role !== "LISTER") {
  //   router.replace("/dev");
  //   return <FullPageLoader />;
  // }

  // ✅ authorized
  return <>{children}</>;
}
