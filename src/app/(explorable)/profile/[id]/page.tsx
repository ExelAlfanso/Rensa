import ProfilePageClient from "./ProfilePageClient";
import api from "@/lib/axios";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export default async function ProfilePageWrapper({
  params,
}: {
  params: Params;
}) {
  try {
    const res = await api.get(`/profile/${params.id}`);
    const profileData = res.data.data;

    if (!profileData) throw notFound();

    return <ProfilePageClient profileData={profileData} />;
  } catch (err) {
    throw notFound();
  }
}
