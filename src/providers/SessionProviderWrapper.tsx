"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { AuthSyncProvider } from "./AuthSyncProvider";
import { NotificationProvider } from "./NotificationProvider";

export default function SessionProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthSyncProvider>{children}</AuthSyncProvider>
    </SessionProvider>
  );
}
