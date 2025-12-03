import { api } from "@/lib/axios";

/**
 * Retrieves profile data for the given profile ID.
 *
 * @param id - The profile identifier to fetch.
 * @returns The profile data object from the HTTP response.
 */
export function fetchProfile(id: string) {
  return api.get(`/profile/${id}`).then((res) => res.data.data);
}