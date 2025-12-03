import { use } from "react";
import ProfilePageClient from "./ProfilePageClient";
import { api } from "@/lib/axios";
import { notFound } from "next/navigation";

/**
 * Fetches profile data for the specified profile id from the API.
 *
 * @param id - The profile identifier to retrieve
 * @returns The profile data object for the specified id
 */
function fetchProfile(id: string) {
  return api.get(`/profile/${id}`).then((res) => res.data.data);
}

export default function ProfilePageWrapper({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // you can also use() params!

  const profileData = use(fetchProfile(id)); // 🔥 This is where use() shines

  if (!profileData) {
    notFound();
  }

  return <ProfilePageClient profileData={profileData} />;
}