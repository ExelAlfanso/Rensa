"use client";

import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "@/components/MasonryGallery.css";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { useInView } from "react-intersection-observer";
import axios from "axios";

//TODO: replace fetch images from unsplash api

interface MasonryGallerySectionProps {
  activeTab?: string;
}
// const images = [];
// const images = [
//   "https://picsum.photos/300/200",
//   "https://picsum.photos/300/500",
//   "https://picsum.photos/300/350",
//   "https://picsum.photos/300/450",
//   "https://picsum.photos/300/420",
//   "https://picsum.photos/300/380",
//   "https://picsum.photos/300/360",
//   "https://picsum.photos/300/410",
//   "https://picsum.photos/300/390",
//   "https://picsum.photos/300/430",
//   "https://picsum.photos/300/340",
//   "https://picsum.photos/300/470",
//   "https://picsum.photos/300/400",
//   "https://picsum.photos/300/450",
//   "https://picsum.photos/300/420",
//   "https://picsum.photos/300/390",
//   "https://picsum.photos/300/360",
//   "https://picsum.photos/300/480",
//   "https://picsum.photos/300/440",
//   "https://picsum.photos/300/410",
//   "https://picsum.photos/300/370",
//   "https://picsum.photos/300/430",
//   "https://picsum.photos/300/350",
//   "https://picsum.photos/300/460",
//   "https://picsum.photos/300/380",
//   "https://picsum.photos/300/420",
//   "https://picsum.photos/300/390",
//   "https://picsum.photos/300/470",
//   "https://picsum.photos/300/440",
//   "https://picsum.photos/300/360",
//   "https://picsum.photos/300/410",
//   "https://picsum.photos/300/430",
//   "https://picsum.photos/300/370",
//   "https://picsum.photos/300/450",
//   "https://picsum.photos/300/390",
//   "https://picsum.photos/300/420",
//   "https://picsum.photos/300/360",
//   "https://picsum.photos/300/480",
//   "https://picsum.photos/300/440",
//   "https://picsum.photos/300/410",
//   "https://picsum.photos/300/370",
//   "https://picsum.photos/300/430",
//   "https://picsum.photos/300/350",
//   "https://picsum.photos/300/460",
//   "https://picsum.photos/300/380",
//   "https://picsum.photos/300/420",
//   "https://picsum.photos/300/390",
//   "https://picsum.photos/300/470",
//   "https://picsum.photos/300/360",
// ];

const MasonryGallerySection: React.FC<MasonryGallerySectionProps> = ({
  activeTab,
}) => {
  const breakpointColumnsObj = {
    default: 5,
    1600: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  const [photos, setPhotos] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 1 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMore = async () => {
      if (inView && !loading) {
        setLoading(true);
        setPage((prev) => prev + 1);
        setLoading(false);
      }
    };
    loadMore();
  }, [inView, loading]);

  const fetchImages = async (page: number) => {
    const newImages = Array.from({ length: 10 }, () => {
      const h = 300 + Math.floor(Math.random() * 200);
      return `https://picsum.photos/200/${h}`;
    });
    setPhotos((prev) => [...prev, ...newImages]);
  };

  // const fetchImages = async (page: number) => {
  //   try {
  //     const res = await axios.get("/api/unsplashes");
  //     const urls = res.data.map((data: any) => data.urls && data.urls.regular);
  //     setPhotos((prev) => [...prev, ...urls]);
  //     console.log(res);
  //   } catch (err) {
  //     console.error("Error fetching images:", err);
  //   }
  // };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  return (
    <div className="flex items-center justify-center">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {photos.map((src, idx) => (
          <div key={idx}>
            <div className="relative overflow-hidden cursor-pointer rounded-2xl group">
              <ImageWithSkeleton
                image={{
                  src: src,
                  alt: `Image ${idx}`,
                  width: 250,
                  height: 350,
                }}
              ></ImageWithSkeleton>
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40"></div>
            </div>
          </div>
        ))}
      </Masonry>
      <div ref={ref} className="h-10"></div>
    </div>
  );
};

export default MasonryGallerySection;
