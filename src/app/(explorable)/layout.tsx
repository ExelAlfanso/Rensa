"use client";
import ExploreNavBar from "@/components/navbar/ExploreNavBar";
import NotificationWrapper from "@/components/NotificationProviderWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center">
      <ExploreNavBar />
      {children}
    </div>
  );
}
