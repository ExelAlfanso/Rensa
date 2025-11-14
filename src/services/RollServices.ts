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
  return api.delete(`/rolls/${rollId}/photos/${photoId}`);
}

export async function fetchIsSavedToRolls(photoId: string) {
  const res = await api.get(`/rolls/is-saved`, {
    params: { photoId },
  });
  return res.data.data.rollIds;
}

export async function updateRollDetails(
  rollId: string,
  name: string,
  description: string
) {
  return api.patch(`/rolls/${rollId}`, { name, description });
}
