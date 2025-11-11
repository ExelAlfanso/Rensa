import api from "@/lib/axios";

export function fetchRollById(rollId: string) {
  return api.get(`/rolls/${rollId}`);
}
