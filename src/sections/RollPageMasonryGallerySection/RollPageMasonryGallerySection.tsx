"use client";

import React, { useEffect } from "react";
import "@/components/MasonryGallery.css";
import { useInView } from "react-intersection-observer";
import {
  fetchImagesFromRoll, // 🆕 New service
  Photo,
  FetchPhotosResponse,
} from "@/services/ImageServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PopulatedPhoto } from "@/types/PopulatedPhoto";
import RollPageMasonryGalleryGrid from "./RollPageMasonryGalleryGrid";
import { useQueryClient } from "@tanstack/react-query";

interface RollPageMasonryGallerySectionProps {
  activeTab?: string;
  rollId: string;
  onPhotoClick?: (photo: Photo | string, index: number) => void;
}

const RollPageMasonryGallerySection: React.FC<
  RollPageMasonryGallerySectionProps
> = ({ rollId }) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<FetchPhotosResponse>({
    queryKey: ["photos", rollId],
    queryFn: async ({ pageParam }) => {
      const page = pageParam as number;
      return await fetchImagesFromRoll(rollId, page);
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
  const handlePhotoRemoved = (photoId: string) => {
    queryClient.setQueryData(["photos", rollId], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          data: page.data.filter((p: any) => {
            const id = typeof p === "string" ? p : p._id;
            return id !== photoId;
          }),
        })),
      };
    });
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <RollPageMasonryGalleryGrid
        photos={photos}
        rollId={rollId}
        onPhotoRemoved={handlePhotoRemoved}
      />

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
        {status === "success" && !hasNextPage && photos.length === 0 && (
          <p className="text-gray-500">No more images to load</p>
        )}
      </div>
    </div>
  );
};

export default RollPageMasonryGallerySection;
