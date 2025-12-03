import { api } from "@/lib/axios";

export function fetchProfile(id: string) {
  return api.get(`/profile/${id}`).then((res) => res.data.data);
}
