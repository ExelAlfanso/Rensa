import RollCard from "@/components/cards/RollCard";
import Heading from "@/components/Heading";
import api from "@/lib/axios";
import type { RollDocument } from "@/models/Roll";
import Image from "next/image";
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let profileData = null;
  try {
    const res = await api.get(`/profile/${id}`);
    profileData = res.data.data;
    console.log("Profile Data:", profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
      <div className="w-[131px] h-[131px] relative rounded-full overflow-hidden">
        <Image
          src={profileData?.user?.avatar || "/profile.jpg"}
          alt={profileData?.user?.username || "User Avatar"}
          fill
          className="w-full h-full object-cover"
        />
      </div>
      <Heading size="l" className="text-black">
        @{profileData?.user?.username || "User Name"}
      </Heading>
      <div className="grid gap-3 grid-cols-5">
        {profileData.rolls && profileData.rolls.length > 0 ? (
          profileData.rolls.map(
            (roll: {
              _id: string;
              name: string;
              photos: string[];
              previewPhotos: string[];
              createdAt: string;
            }) => (
              <RollCard
                key={roll._id}
                name={roll.name}
                imageUrls={roll.previewPhotos}
                createdAt={roll.createdAt}
              />
            )
          )
        ) : (
          <p className="text-gray-500">No rolls found.</p>
        )}
      </div>
    </div>
  );
}
