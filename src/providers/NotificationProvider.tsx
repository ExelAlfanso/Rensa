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
  const reconnectAttempts = useRef(0);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);
  const connectWebSocket = () => {
    if (!accessToken) return;

    const WS_URL =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT"
        ? "ws://localhost:4000/api/ws"
        : process.env.NEXT_PUBLIC_ELYSIA_WS_URL;
    const ws = new WebSocket(`${WS_URL}?token=${accessToken}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("Connecting to WS at", WS_URL);
      console.log("📡 WebSocket connected!");
      reconnectAttempts.current = 0; // reset reconnect attempts
    };

    ws.onmessage = (event) => {
      console.log("📩 WS Message received:", event.data);
      // try {
      //   const data = JSON.parse(event.data);
      //   setNotifications((prev) => [...prev, data]);
      // } catch (err) {
      //   console.error("Invalid WS message:", err);
      // }
    };

    ws.onerror = (err) => console.error("WS Error:", err);

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");

      if (!accessToken) return; // user logout, stop reconnecting

      const delay = Math.min(1000 * 2 ** reconnectAttempts.current, 30000); // exponential backoff
      reconnectAttempts.current += 1;
      console.log(`🔄 Reconnecting in ${delay / 1000}s...`);

      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);

      reconnectTimeout.current = setTimeout(() => {
        connectWebSocket();
      }, delay);
    };
  };
  useEffect(() => {
    if (!accessToken) {
      console.log("No token, skipping WebSocket");
      return;
    }

    connectWebSocket();

    return () => {
      if (wsRef.current) wsRef.current.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
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
