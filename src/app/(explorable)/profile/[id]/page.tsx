import ProfilePageClient from "./ProfilePageClient";
import api from "@/lib/axios";
import { notFound } from "next/navigation";

export default async function ProfilePageWrapper(context: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await context.params;
  try {
    const res = await api.get(`/profile/${id}`);
    const profileData = res.data.data;

    if (!profileData) throw notFound();

    return <ProfilePageClient profileData={profileData} />;
  } catch (err) {
    throw notFound();
  }
}
