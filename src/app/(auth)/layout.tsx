"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import ForestSection from "@/sections/ForestSection";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      router.push("/explore");
    }
  }, [session, router]);
  if (status === "loading") {
    return <LoadingOverlay />;
  }
  return (
    <section className="w-full flex min-h-screen md:flex-row">
      <div className="hidden w-0 md:block md:w-1/4">
        <ForestSection />
      </div>
      <div className="flex w-full items-center justify-center bg-white md:w-3/4">
        {children}
      </div>
    </section>
  );
}
