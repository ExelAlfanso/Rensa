"use client";
import ExploreNavBar from "@/components/navbar/ExploreNavBar";
import { EditRollProvider } from "@/providers/EditRollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EditRollProvider>
      <div className="flex items-center justify-center">
        <ExploreNavBar />
        {children}
      </div>
    </EditRollProvider>
  );
}
