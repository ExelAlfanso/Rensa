"use client";

import UploadButton from "@/components/buttons/UploadButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useSession } from "next-auth/react";

export default function UploadPage() {
  const { status } = useSession();
  if (status === "loading") return <LoadingOverlay></LoadingOverlay>;
  return (
    <div className="min-h-screen flex flex-col bg-white-500 items-center justify-center text-primary">
      <UploadButton></UploadButton>
    </div>
  );
}
