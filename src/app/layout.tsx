import type { Metadata } from "next";
import { Forum, Figtree } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/wrappers/SessionProviderWrapper";
import { LoadingProvider } from "@/context/LoadingContext";

const forum = Forum({
  subsets: ["latin"],
  weight: ["400"],
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Project Rensa",
  description: "Where every picture tells its recipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${forum.className} ${figtree.className} `}>
        <SessionProviderWrapper>
          <LoadingProvider>{children}</LoadingProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
