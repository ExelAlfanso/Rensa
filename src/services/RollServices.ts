import { api } from "@/lib/axios";

/**
 * Retrieve a roll by its ID.
 *
 * @param rollId - The ID of the roll to fetch
 * @returns The API response containing the roll data
 */
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

export async function fetchDefaultRoll({ queryKey }: any) {
  const [, userId] = queryKey;

  const res = await fetch(`/api/rolls/default?userId=${userId}`);

  if (!res.ok) throw new Error("Failed to fetch default roll");

  return res.json();
}