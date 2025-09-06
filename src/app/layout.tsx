import type { Metadata } from "next";
import { Forum, Figtree } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/wrappers/SessionProviderWrapper";
import { LoadingProvider } from "@/hooks/useLoading";

const forum = Forum({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-forum",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // ambil beberapa weight
  variable: "--font-figtree",
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
      <body className={`antialiased ${forum.variable} ${figtree.variable}`}>
        <SessionProviderWrapper>
          <LoadingProvider>{children}</LoadingProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
