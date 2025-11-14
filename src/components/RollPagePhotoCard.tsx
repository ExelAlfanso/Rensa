import { getPhotoUrl, getPhotoTitle } from "@/utils/MasonryGalleryUtils";
import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import { useEffect, useState } from "react";
import { removePhotoFromRoll } from "@/services/RollServices";
import { TrashIcon } from "@phosphor-icons/react";

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
      console.log(`Removed photo ${id} from roll ${id}`);
      await removePhotoFromRoll(rollId, id);
      if (onPhotoRemoved) {
        onPhotoRemoved(id);
      }
      // Optionally show a toast or close dropdown
    } catch (error) {
      console.error("Failed to add photo to roll:", error);
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
      <Link
        href={id ? `/photo/${id}` : "#"}
        onClick={(e) => e.stopPropagation()}
        prefetch={false}
        className="block"
      >
        <div
          className={`relative overflow-hidden transition-transform duration-300 cursor-pointer rounded-3xl group`}
        >
          <ImageWithSkeleton
            image={{
              src: getPhotoUrl(photo),
              alt: getPhotoTitle(photo, id),
              width: 350,
              height: 450,
            }}
          />
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40`}
          />

          <div
            className={`transition-opacity duration-300 opacity-0 bg-gradient-to-t group-hover:opacity-100  `}
          >
            <div className="absolute top-0 right-0 w-full p-4">
              <div className="flex flex-row justify-end">
                <button
                  onClick={handleUnsaveClick}
                  disabled={isLoading}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 bg-white text-black hover:bg-white-700 ${
                    isLoading ? "opacity-70 cursor-wait" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="loading loading-spinner text-current" />
                  ) : (
                    <TrashIcon size={16} weight="bold" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default RollPagePhotoCard;
