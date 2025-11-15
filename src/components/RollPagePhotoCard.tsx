import { getPhotoUrl, getPhotoTitle } from "@/utils/MasonryGalleryUtils";
import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import { useState } from "react";
import { removePhotoFromRoll } from "@/services/RollServices";
import { TrashIcon } from "@phosphor-icons/react";
import SmallIconButton from "./buttons/SmallIconButton";

interface RollPagePhotoCardProps {
  id: string;
  photo: string | PopulatedPhoto;
  rollId: string;
  onPhotoRemoved?: (photoId: string) => void;
}

const RollPagePhotoCard: React.FC<RollPagePhotoCardProps> = ({
  id,
  photo,
  rollId,
  onPhotoRemoved,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUnsaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);
      await removePhotoFromRoll(rollId, id);
      if (onPhotoRemoved) onPhotoRemoved(id);
    } catch (error) {
      console.error("Failed to remove photo from roll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="m-3 mb-5"
    >
      <Link href={id ? `/photo/${id}` : "#"} prefetch={false}>
        <div className="relative overflow-hidden rounded-3xl group cursor-pointer transition-transform duration-300 hover:scale-[1.02]">
          {/* Image */}
          <ImageWithSkeleton
            image={{
              src: getPhotoUrl(photo),
              alt: getPhotoTitle(photo, id),
              width: 350,
              height: 450,
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none rounded-3xl" />

          {/* Gradient overlay + button */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none rounded-3xl">
            <div className="absolute top-3 right-3 pointer-events-auto">
              <SmallIconButton
                onClick={handleUnsaveClick}
                disabled={isLoading}
                className={`w-[32px] h-[32px] flex items-center justify-center rounded-full transition-colors duration-200 bg-white text-black hover:bg-gray-200 ${
                  isLoading ? "opacity-70 cursor-wait" : ""
                }`}
              >
                {isLoading ? (
                  <div className="text-current loading loading-spinner" />
                ) : (
                  <TrashIcon size={16} weight="bold" />
                )}
              </SmallIconButton>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RollPagePhotoCard;
