"use client";

import React, { useEffect } from "react";
import Masonry from "react-masonry-css";
import "@/components/MasonryGallery.css";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { useInView } from "react-intersection-observer";
import {
  fetchImagesFromDB,
  fetchImagesFromPicSum,
  Photo,
  FetchPhotosResponse, // Import the unified type
} from "@/services/ImageServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { filter } from "motion/react-client";
import { AnimatePresence, motion } from "motion/react";

interface MasonryGallerySectionProps {
  activeTab?: string;
  filters?: string[];
  useDatabase?: boolean;
  onPhotoClick?: (photo: Photo | string, index: number) => void;
}

const MasonryGallerySection: React.FC<MasonryGallerySectionProps> = ({
  activeTab,
  filters,
  useDatabase = true,
  onPhotoClick,
}) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  // Use FetchPhotosResponse directly
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<FetchPhotosResponse>({
    queryKey: ["photos", filters, useDatabase ? "db" : "picsum"],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      if (useDatabase) {
        return await fetchImagesFromDB(page, filters);
      } else {
        return await fetchImagesFromPicSum(page);
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const photos: (Photo | string)[] =
    data?.pages.flatMap((page) => page.data as (Photo | string)[]) ?? [];
  const getDynamicColumns = (photoCount: number) => {
    if (photoCount <= 1) return 1;
    if (photoCount === 2) return 2;
    if (photoCount === 3) return 3;
    return 4; // default for larger sets
  };

  const breakpointColumnsObj = {
    default: getDynamicColumns(photos.length),
    1600: getDynamicColumns(photos.length),
    1024: Math.min(getDynamicColumns(photos.length), 3),
    700: Math.min(getDynamicColumns(photos.length), 2),
  };
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handlePhotoClick = (photo: Photo | string, index: number) => {
    if (onPhotoClick) {
      onPhotoClick(photo, index);
    }
  };

  const getPhotoUrl = (photo: Photo | string): string => {
    return typeof photo === "string" ? photo : photo.url;
  };

  const getPhotoTitle = (photo: Photo | string, index: number): string => {
    return typeof photo === "string"
      ? `Gallery image ${index + 1}`
      : photo.title || `Photo by user ${photo.userId}`;
  };

  const getPhotoKey = (photo: Photo | string, index: number): string => {
    return typeof photo === "string" ? `${photo}-${index}` : photo._id;
  };

  if (status === "error") {
    return (
      <div className="flex items-center justify-center py-20 text-red-500">
        Error loading images:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <AnimatePresence mode="popLayout">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map((photo, idx) => {
            const isPhotoObject = typeof photo !== "string";

            return (
              <motion.div
                key={getPhotoKey(photo, idx)}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div
                  className="relative overflow-hidden transition-transform duration-300 cursor-pointer rounded-3xl group hover:scale-105"
                  onClick={() => handlePhotoClick(photo, idx)}
                >
                  <ImageWithSkeleton
                    image={{
                      src: getPhotoUrl(photo),
                      alt: getPhotoTitle(photo, idx),
                      width: 250,
                      height: 350,
                    }}
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40" />

                  {isPhotoObject && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 translate-y-full bg-gradient-to-t from-black/80 to-transparent group-hover:translate-y-0">
                      <h3 className="text-white font-semibold text-sm line-clamp-1">
                        {(photo as Photo).title}
                      </h3>
                      {(photo as Photo).tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(photo as Photo).tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-xs text-white bg-white/20 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </Masonry>
      </AnimatePresence>

      <div
        ref={ref}
        className="flex items-center justify-center w-full py-20"
        role="status"
        aria-live="polite"
      >
        {status === "pending" && (
          <div className="text-black loading loading-spinner loading-xl" />
        )}
        {isFetchingNextPage && (
          <div className="text-black loading loading-spinner loading-lg" />
        )}
        {!hasNextPage && photos.length > 0 && (
          <p className="text-gray-500">No more images to load</p>
        )}
      </div>
    </div>
  );
};

export default MasonryGallerySection;
