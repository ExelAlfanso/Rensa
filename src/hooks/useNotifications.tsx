import { useNotificationContext } from "@/providers/NotificationProvider";

export function useNotifications() {
  const { notifications, clearNotifications } = useNotificationContext();
  return { notifications, clearNotifications };
}
