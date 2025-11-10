import AccentButton from "@/components/buttons/AccentButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import RollCard from "@/components/cards/RollCard";
import ProfileRollFilterDropdown from "@/components/dropdowns/profile/ProfileRollFilterDropdown";
import TertiaryDropdown from "@/components/dropdowns/TertiaryDropdown";
import Heading from "@/components/Heading";
import api from "@/lib/axios";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await api.get(`/profile/${id}`);
    const profileData = res.data.data;

    if (!profileData) throw notFound();

    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
        <div className="w-[131px] h-[131px] relative rounded-full overflow-hidden">
          <Image
            src={profileData.user?.avatar || "/profile.jpg"}
            alt={profileData.user?.username || "User Avatar"}
            fill
            className="w-full h-full object-cover"
          />
        </div>
        <Heading size="l" className="text-black">
          @{profileData.user?.username || "User Name"}
        </Heading>
        <div className="flex flex-row items-center justify-center gap-4 w-25">
          <AccentButton>Share</AccentButton>
          <AccentButton>Edit Profile</AccentButton>
        </div>
        <div className="flex flex-col items-start justify-center gap-6">
          <ProfileRollFilterDropdown />
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
      </div>
    );
  } catch (error) {
    throw notFound();
  }
}
