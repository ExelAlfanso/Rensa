import api from "@/lib/axios";

export function fetchRollById(rollId: string) {
  return api.get(`/rolls/${rollId}`);
}

export async function addPhotosToRolls(rollIds: string[], photoId: string) {
  return api.post(`/rolls/add`, {
    rollIds,
    photoId,
  });
}
