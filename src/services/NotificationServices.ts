import { elysiaApi } from "@/lib/axios";
import { fetchPhotoOwnerByPhotoId } from "./PhotoServices";

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
  photoId: string // roll / photo / profile
) {
  console.log("Sending photo saved notification...");
  const recipientId = await fetchPhotoOwnerByPhotoId(photoId);
  console.log(
    "actorId:",
    actorId,
    "photoId:",
    photoId,
    "recipientId:",
    recipientId
  );
  const res = await elysiaApi.post(`/notifications/photo-saved`, {
    actorId,
    recipientId,
    photoId,
    type: "photo-saved",
  });
  return res.data;
}
