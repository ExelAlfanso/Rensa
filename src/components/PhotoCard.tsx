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
import { useEffect, useState } from "react";
import {
  addPhotoToRoll,
  fetchIsSavedToRolls,
  removePhotoFromRoll,
} from "@/services/RollServices";

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
  const [selectedRoll, setSelectedRoll] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [savedRoll, setSavedRoll] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [savedToRolls, setSavedToRolls] = useState<string[]>([]);

  const handleSaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedRoll) {
      console.warn("No roll selected");
      return;
    }

    try {
      setIsLoading(true);
      console.log(`Adding photo ${id} to roll ${selectedRoll.name}`);
      await addPhotoToRoll(selectedRoll.id, id || "");
      setSavedRoll({ id: selectedRoll.id, name: selectedRoll.name });
      setSaved(true);
      // Optionally show a toast or close dropdown
    } catch (error) {
      console.error("Failed to add photo to roll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsaveClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsLoading(true);
      console.log(`Removed photo ${id} from roll ${savedRoll?.name}`);
      await removePhotoFromRoll(savedRoll?.id || "", id || "");
      setSaved(false);
      // Optionally show a toast or close dropdown
    } catch (error) {
      console.error("Failed to add photo to roll:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchSavedRolls = async () => {
    if (!id) return;
    try {
      const res = await fetchIsSavedToRolls(id);
      setSavedToRolls(res || []);
    } catch (error) {
      console.error("Failed to check saved rolls:", error);
    }
  };

  useEffect(() => {
    handleFetchSavedRolls();
  }, [id]);

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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
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
                  selectedRoll={selectedRoll}
                  disabled={isSaved}
                  setSelectedRoll={setSelectedRoll}
                  savedToRolls={savedToRolls}
                />

                {/* Save Button */}
                <button
                  onClick={isSaved ? handleUnsaveClick : handleSaveClick}
                  disabled={!selectedRoll || isLoading}
                  className={`w-[32px] h-[32px] flex items-center justify-center rounded-full border-2 cursor-pointer transition-colors duration-200
                    ${
                      isSaved
                        ? "bg-black border-black text-white"
                        : "bg-white border-white text-black"
                    }
                    ${isLoading ? "opacity-70 cursor-wait" : ""}
                  `}
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
