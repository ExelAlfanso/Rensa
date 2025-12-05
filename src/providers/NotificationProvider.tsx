"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface NotificationData {
  id: string;
  href: string;
  user: {
    userid: string;
    src: string;
    username: string;
  };
  type: string;
  message: string;
  createdAt?: string;
}

interface NotificationContextType {
  notifications: NotificationData[];
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const { accessToken } = useAuthStore();
  useEffect(() => {
    if (!accessToken) {
      console.log("No token, skipping WebSocket");
      return;
    }

    const WS_URL =
      process.env.NEXT_PUBLIC_ELYSIA_WS_URL ?? "ws://localhost:4000/ws";

    const ws = new WebSocket(`${WS_URL}?token=${accessToken}`);
    wsRef.current = ws;

    ws.onopen = () => console.log("📡 WebSocket connected!");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [...prev, data]);
      } catch (err) {
        console.error("Invalid WS message:", err);
      }
    };

    ws.onerror = (err) => console.error("WS Error:", err);

    ws.onclose = () => console.log("❌ WebSocket disconnected");

    return () => {
      ws.close();
    };
  }, [accessToken]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        clearNotifications: () => setNotifications([]),
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("NotificationProvider not found");
  return ctx;
};
