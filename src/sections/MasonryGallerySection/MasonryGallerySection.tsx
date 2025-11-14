"use client";

import React, { useEffect } from "react";
import "@/components/MasonryGallery.css";
import { useInView } from "react-intersection-observer";
import {
  fetchImagesFromDB,
  fetchImagesFromPicSum,
  fetchImagesFromRoll, // 🆕 New service
  Photo,
  FetchPhotosResponse,
} from "@/services/ImageServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import MasonryGalleryGrid from "./MasonryGalleryGrid";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";

interface MasonryGallerySectionProps {
  activeTab?: string;
  filters?: string[];
  useDatabase?: boolean;
  rollId?: string; // 🆕 Optional roll source
  onPhotoClick?: (photo: Photo | string, index: number) => void;
}

const MasonryGallerySection: React.FC<MasonryGallerySectionProps> = ({
  activeTab,
  filters,
  useDatabase = true,
  rollId, // 🆕 destructure it
}) => {
  const { ref, inView } = useInView({ threshold: 0.5 });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<FetchPhotosResponse>({
    queryKey: ["photos", filters, useDatabase ? "db" : "picsum", rollId],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;

      // 🧩 Priority order:
      // 1️⃣ Roll (if provided)
      // 2️⃣ DB (default)
      // 3️⃣ Picsum (fallback)
      if (rollId) {
        return await fetchImagesFromRoll(rollId, page, filters);
      } else if (useDatabase) {
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

  const photos: (PopulatedPhoto | string)[] =
    data?.pages.flatMap((page) => page.data as (PopulatedPhoto | string)[]) ??
    [];

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      <MasonryGalleryGrid photos={photos} />

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
        {/* {!hasNextPage && photos.length > 0 && (
          <p className="text-gray-500">No more images to load</p>
        )} */}
      </div>
    </div>
  );
};

export default MasonryGallerySection;
