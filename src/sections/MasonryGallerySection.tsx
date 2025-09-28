"use client";

import React, { useCallback, useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "@/components/MasonryGallery.css";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { useInView } from "react-intersection-observer";

interface MasonryGallerySectionProps {
  activeTab?: string;
}

const MasonryGallerySection: React.FC<MasonryGallerySectionProps> = ({
  activeTab,
}) => {
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1024: 3,
    700: 2,
  };

  const [photos, setPhotos] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 1 });
  const [batchCount, setBatchCount] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async (page: number) => {
    setLoading(true);
    const newImages = Array.from({ length: 10 }, () => {
      const h = 300 + Math.floor(Math.random() * 200);
      return `https://picsum.photos/200/${h}?random=${Math.random()}`;
    });
    setPhotos((prev) => [...prev, ...newImages]);
    setBatchCount(newImages.length);
    setLoadedCount(0);
  }, []);

  useEffect(() => {
    fetchImages(page);
  }, [page, fetchImages]);

  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Once all images in the batch are loaded AND sentinel is in view → fetch next page
    if (loadedCount === batchCount && batchCount > 0 && inView) {
      setPage((prev) => prev + 1);
    }
    if (loadedCount === batchCount && batchCount > 0) {
      setLoading(false); // all loaded, hide spinner
    }
  }, [loadedCount, batchCount, inView]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((src, idx) => (
          <div key={idx}>
            <div className="relative overflow-hidden cursor-pointer rounded-3xl group">
              <ImageWithSkeleton
                image={{
                  src: src,
                  alt: `Image ${idx}`,
                  width: 250,
                  height: 350,
                }}
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40"></div>
            </div>
          </div>
        ))}
      </Masonry>

      <div
        ref={ref}
        className="flex items-center justify-center w-10 h-10 py-20"
      >
        {loading && (
          <div className="text-black loading loading-spinner loading-xl"></div>
        )}
      </div>
    </div>
  );
};

export default MasonryGallerySection;
