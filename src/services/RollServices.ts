import api from "@/lib/axios";

export function fetchRollsForUser(userId: string) {
  return api.get(`/rolls/user/${userId}`);
}

export function fetchRollById(rollId: string) {
  return api.get(`/rolls/${rollId}`);
}
