"use client";
import ExploreNavBar from "@/components/navbar/ExploreNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center">
        <ExploreNavBar />
        {children}
      </body>
    </html>
  );
}
