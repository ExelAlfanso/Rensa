import { elysiaApi } from "@/lib/axios";

export async function fetchNotifications(
  recipientId: string,
  page = 1,
  limit = 10
) {
  const res = await elysiaApi.post(`/notifications/${recipientId}`, {
    page,
    limit,
  });
  return res.data;
}

export async function sendPhotoSavedNotification(
  actorId: string,
  recipientId: string,
  targetId: string
) {
  const res = await elysiaApi.post(`/notifications/photo-saved`, {});
  return res.data;
}
