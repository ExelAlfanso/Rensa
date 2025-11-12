import {
  getPhotoUrl,
  getPhotoTitle,
  getPhotoUserId,
} from "@/utils/MasonryGalleryUtils";
import { PlusIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import Link from "next/link";
import RollDropdown from "./dropdowns/rolls/RollDropdown";
import { ImageWithSkeleton } from "./ImageWithSkeleton";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import Text from "./Text";

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
            onClick={(e) => e.stopPropagation()}
            className={`absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40 ${
              isDropdownOpen ? "opacity-40" : "opacity-0"
            }`}
          />

          <div
            className={`transition-opacity duration-300 opacity-0 bg-gradient-to-t group-hover:opacity-100  ${
              isDropdownOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-0 right-0 w-full p-4">
              <div className="flex flex-row justify-between">
                <RollDropdown
                  isOpen={isDropdownOpen}
                  setIsOpen={onToggleDropdown}
                  closeAll={closeAllDropdowns}
                  photoId={id || ""}
                />
                <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full border-2 border-white bg-white">
                  <PlusIcon className="text-black text-[16px]" />
                </div>
              </div>
            </div>
            <Text
              size={"xs"}
              className="absolute bottom-0 right-0 p-4 font-normal"
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
