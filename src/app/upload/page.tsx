"use client";

import UploadButton from "@/components/buttons/UploadButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useSession } from "next-auth/react";

export default function UploadPage() {
  const { data: session, status } = useSession();
  if (status === "loading") return <LoadingOverlay></LoadingOverlay>;
  return <UploadButton userId={session?.user.id}></UploadButton>;
}
