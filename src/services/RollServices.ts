import api from "@/lib/axios";

export function fetchRollById(rollId: string) {
  return api.get(`/rolls/${rollId}`);
}

export async function addPhotoToRolls(rollIds: string[], photoId: string) {
  return api.post(`/rolls/add`, {
    rollIds,
    photoId,
  });
}

export async function addPhotoToRoll(rollId: string, photoId: string) {
  return api.post(`/rolls/add`, {
    rollIds: [rollId],
    photoId,
  });
}
