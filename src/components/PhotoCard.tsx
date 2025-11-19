import {
  getPhotoUrl,
  getPhotoTitle,
  getPhotoUserId,
} from "@/utils/MasonryGalleryUtils";
import { PlusIcon, CheckIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import RollDropdown from "./dropdowns/rolls/RollDropdown";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import Text from "./Text";
import usePhotoRoll from "@/hooks/usePhotoRoll";

interface PhotoCardProps {
  id: string | null;
  photo: string | PopulatedPhoto;
  isDropdownOpen: boolean;
  onToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  closeAllDropdowns: () => void;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  photo,
  isDropdownOpen,
  onToggleDropdown,
  closeAllDropdowns,
}) => {
  const {
    selectedRoll,
    setSelectedRoll,
    isLoading,
    isSaved,
    savedToRolls,
    saveToRoll,
    removeFromRoll,
  } = usePhotoRoll(id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="m-3 mb-5"
    >
      <Link href={id ? `/photo/${id}` : "#"} prefetch={false} className="block">
        <div
          className={`relative overflow-hidden transition-transform duration-300 cursor-pointer rounded-3xl group ${
            isDropdownOpen ? "scale-103" : "scale-100"
          }`}
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
            className={`absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40 pointer-events-none ${
              isDropdownOpen ? "opacity-40" : "opacity-0"
            }`}
          />

          <div
            className={`transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
              isDropdownOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-0 right-0 w-full p-4 flex justify-between pointer-events-auto">
              <RollDropdown
                isOpen={isDropdownOpen}
                setIsOpen={onToggleDropdown}
                closeAll={closeAllDropdowns}
                selectedRoll={selectedRoll}
                disabled={isSaved}
                setSelectedRoll={setSelectedRoll}
                savedToRolls={savedToRolls}
              />

              <button
                onClick={isSaved ? removeFromRoll : saveToRoll}
                disabled={!selectedRoll || isLoading}
                className={`w-[32px] h-[32px] flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 text-black hover:bg-white-700
              ${
                isSaved
                  ? "bg-black border-black text-white"
                  : "bg-white border-white text-black"
              }
              ${isLoading ? "opacity-70 cursor-wait" : ""}`}
              >
                {isLoading ? (
                  <div className="loading loading-spinner text-current" />
                ) : isSaved ? (
                  <CheckIcon size={16} weight="bold" />
                ) : (
                  <PlusIcon size={16} />
                )}
              </button>
            </div>

            <Text
              size={"xs"}
              className="absolute bottom-0 right-0 p-4 font-normal pointer-events-none"
            >
              @{getPhotoUserId(photo)?.username}
            </Text>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default PhotoCard;
