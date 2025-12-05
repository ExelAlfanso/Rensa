"use client";

import ForestSection from "@/sections/ForestSection";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
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
