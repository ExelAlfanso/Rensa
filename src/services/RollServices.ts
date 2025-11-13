import api from "@/lib/axios";

export function fetchRollById(rollId: string) {
  return api.get(`/rolls/${rollId}`);
}

export async function addPhotoToRoll(rollId: string, photoId: string) {
  return api.post(`/rolls/${rollId}/photos/${photoId}`, {
    rollIds: [rollId],
    photoId,
  });
}

export async function removePhotoFromRoll(rollId: string, photoId: string) {
  return api.post(`/rolls/${rollId}/photos/${photoId}`, {
    rollId,
    photoId,
  });
}
