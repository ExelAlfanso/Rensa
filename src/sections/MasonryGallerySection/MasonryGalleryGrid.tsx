import RollDropdown from "@/components/dropdowns/RollDropdown";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import {
  getPhotoKey,
  getPhotoUrl,
  getPhotoTitle,
  getPhotoUserId,
} from "@/utils/MasonryGalleryUtils";
import { PlusIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import Masonry from "react-masonry-css";
import Text from "@/components/Text";

interface MasonryGalleryGridProps {
  photos: (PopulatedPhoto | string)[];
}

const MasonryGalleryGrid: React.FC<MasonryGalleryGridProps> = ({ photos }) => {
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

  return (
    <AnimatePresence mode="popLayout">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid w-full"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((photo, idx) => {
          const isPhotoObject = typeof photo !== "string";
          const photoId = isPhotoObject ? (photo as PopulatedPhoto)._id : null;

          return (
            <motion.div
              key={getPhotoKey(photo, idx)}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <Link
                href={photoId ? `/photo/${photoId}` : "#"}
                prefetch={false}
                className="block"
              >
                <div className="relative overflow-hidden transition-transform duration-300 cursor-pointer rounded-3xl group hover:scale-105">
                  <ImageWithSkeleton
                    image={{
                      src: getPhotoUrl(photo),
                      alt: getPhotoTitle(photo, idx),
                      width: 350,
                      height: 450,
                    }}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40" />

                  <div className="duration-300 bg-gradient-to-t group-hover:opacity-100 opacity-0 transition-opacity">
                    <div className="absolute w-full top-0 right-0 p-4">
                      <div className="flex flex-row justify-between">
                        <RollDropdown />
                        <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full border-2 border-white bg-white">
                          <PlusIcon className="text-black text-[16px]" />
                        </div>
                      </div>
                    </div>
                    <Text
                      size={"xs"}
                      className="absolute bottom-0 right-0 p-4 "
                    >
                      @{getPhotoUserId(photo)?.username}
                    </Text>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </Masonry>
    </AnimatePresence>
  );
};

export default MasonryGalleryGrid;
