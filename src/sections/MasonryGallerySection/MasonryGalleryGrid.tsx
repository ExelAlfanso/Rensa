import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import { getPhotoKey } from "@/utils/MasonryGalleryUtils";
import { AnimatePresence } from "motion/react";
import Masonry from "react-masonry-css";
import PhotoCard from "@/components/PhotoCard";
import { useState } from "react";

interface MasonryGalleryGridProps {
  photos: (PopulatedPhoto | string)[];
}

const MasonryGalleryGrid: React.FC<MasonryGalleryGridProps> = ({ photos }) => {
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  const handleToggleDropdown = (photoId: string | null) => {
    setActiveDropdownId((prev) => (prev === photoId ? null : photoId));
  };

  const getDynamicColumns = (photoCount: number) => {
    if (photoCount <= 1) return 1;
    if (photoCount === 2) return 2;
    if (photoCount === 3) return 3;
    if (photoCount === 4) return 4;
    return 5;
  };

  const breakpointColumnsObj = {
    default: getDynamicColumns(photos.length),
    1920: Math.min(getDynamicColumns(photos.length), 5),
    1600: Math.min(getDynamicColumns(photos.length), 4),
    1280: Math.min(getDynamicColumns(photos.length), 3),
    900: Math.min(getDynamicColumns(photos.length), 2),
    640: 2,
  };
  const masonryWidthClass = photos.length > 5 ? "w-full" : "w-auto";

  return (
    <AnimatePresence mode="popLayout">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={`${masonryWidthClass} my-masonry-grid`}
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, idx) => {
          const photoId = (photo as PopulatedPhoto)._id || idx.toString();
          return (
            <PhotoCard
              key={getPhotoKey(photo, photoId)}
              id={photoId}
              photo={photo}
              isDropdownOpen={activeDropdownId === photoId}
              onToggleDropdown={() => handleToggleDropdown(photoId)}
              closeAllDropdowns={() => setActiveDropdownId(null)}
            />
          );
        })}
      </Masonry>
    </AnimatePresence>
  );
};

export default MasonryGalleryGrid;
