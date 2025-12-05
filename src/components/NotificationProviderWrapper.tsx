"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { NotificationProvider } from "@/providers/NotificationProvider";

export default function NotificationProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);

  return (
    <NotificationProvider token={accessToken}>{children}</NotificationProvider>
  );
}
