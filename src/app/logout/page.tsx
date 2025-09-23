"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    signOut({ callbackUrl: "/login" });
    router.push("/login");
  }, [router]);

  return <LoadingOverlay />;
}
