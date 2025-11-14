import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import { getPhotoKey } from "@/utils/MasonryGalleryUtils";
import { AnimatePresence } from "motion/react";
import Masonry from "react-masonry-css";
import RollPagePhotoCard from "@/components/RollPagePhotoCard";

interface RollPageMasonryGalleryGridProps {
  photos: (PopulatedPhoto | string)[];
  rollId: string;
  onPhotoRemoved?: (photoId: string) => void;
}

const RollPageMasonryGalleryGrid: React.FC<RollPageMasonryGalleryGridProps> = ({
  photos,
  rollId,
  onPhotoRemoved,
}) => {
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
        {photos.length === 0 && (
          <div>
            <p className="text-center text-gray-500 col-span-full py-10">
              No photos available.
            </p>
          </div>
        )}
        {photos.map((photo, idx) => {
          const photoId = (photo as PopulatedPhoto)._id || idx.toString();
          return (
            <RollPagePhotoCard
              key={getPhotoKey(photo, photoId)}
              id={photoId}
              photo={photo}
              rollId={rollId}
              onPhotoRemoved={onPhotoRemoved}
            />
          );
        })}
      </Masonry>
    </AnimatePresence>
  );
};

export default RollPageMasonryGalleryGrid;
