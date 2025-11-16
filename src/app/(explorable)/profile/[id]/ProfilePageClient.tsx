"use client";

import React, { useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import AccentButton from "@/components/buttons/AccentButton";
import ProfileRollFilterDropdown from "@/components/dropdowns/profile/ProfileRollFilterDropdown";
import RollList, { Roll } from "@/components/lists/RollList";
import { EditRollProvider } from "@/providers/EditRollProvider";
import { useAuthStore } from "@/stores/useAuthStore";

interface ProfilePageClientProps {
  profileData: {
    user: { username: string; avatar?: string };
    rolls: Roll[];
  };
}

//TODO: handle delete on handlerollupdate
export default function ProfilePageClient({
  profileData,
}: ProfilePageClientProps) {
  const { user } = useAuthStore();
  const isOwner = user?.name === profileData.user?.username;
  const [rolls, setRolls] = useState(profileData.rolls);
  const handleRollUpdate = (roll: { rollId: string; name: string }) => {
    setRolls((prev) =>
      prev.map((r) => (r._id === roll.rollId ? { ...r, name: roll.name } : r))
    );
  };
  const handleRollDelete = (rollId: string) => {
    setRolls((prev) => prev.filter((r) => r._id !== rollId));
  };
  return (
    <EditRollProvider
      onRollDelete={handleRollDelete}
      onRollUpdate={handleRollUpdate}
    >
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
        <div className="w-[131px] h-[131px] relative rounded-full overflow-hidden">
          <Image
            src={profileData.user?.avatar || "/profile.jpg"}
            alt={profileData.user?.username || "User Avatar"}
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <Heading size="l" className="text-black mt-4">
          @{profileData.user?.username || "User Name"}
        </Heading>
        <div className="flex flex-row items-center justify-center gap-4 mt-4">
          <AccentButton>Share</AccentButton>
          {isOwner && <AccentButton>Edit Profile</AccentButton>}
        </div>
        <div className="flex flex-col items-start justify-center gap-6 mt-10 xl:mt-0 w-full px-6">
          <ProfileRollFilterDropdown />
          <RollList rolls={rolls} />
        </div>
      </div>
    </EditRollProvider>
  );
}
