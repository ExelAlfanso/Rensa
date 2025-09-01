"use client";

import React from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import "../../components/MasonryGallery.css";

const images = [
  "https://picsum.photos/300/200",
  "https://picsum.photos/300/500",
  "https://picsum.photos/300/350",
  "https://picsum.photos/300/450",
  "https://picsum.photos/300/420",
  "https://picsum.photos/300/380",
  "https://picsum.photos/300/360",
  "https://picsum.photos/300/410",
  "https://picsum.photos/300/390",
  "https://picsum.photos/300/430",
  "https://picsum.photos/300/340",
  "https://picsum.photos/300/470",
  "https://picsum.photos/300/400",
  "https://picsum.photos/300/450",
  "https://picsum.photos/300/420",
  "https://picsum.photos/300/390",
  "https://picsum.photos/300/360",
  "https://picsum.photos/300/480",
  "https://picsum.photos/300/440",
  "https://picsum.photos/300/410",
  "https://picsum.photos/300/370",
  "https://picsum.photos/300/430",
  "https://picsum.photos/300/350",
  "https://picsum.photos/300/460",
  "https://picsum.photos/300/380",
  "https://picsum.photos/300/420",
  "https://picsum.photos/300/390",
  "https://picsum.photos/300/470",
  "https://picsum.photos/300/440",
  "https://picsum.photos/300/360",
  "https://picsum.photos/300/410",
  "https://picsum.photos/300/430",
  "https://picsum.photos/300/370",
  "https://picsum.photos/300/450",
  "https://picsum.photos/300/390",
  "https://picsum.photos/300/420",
  "https://picsum.photos/300/360",
  "https://picsum.photos/300/480",
  "https://picsum.photos/300/440",
  "https://picsum.photos/300/410",
  "https://picsum.photos/300/370",
  "https://picsum.photos/300/430",
  "https://picsum.photos/300/350",
  "https://picsum.photos/300/460",
  "https://picsum.photos/300/380",
  "https://picsum.photos/300/420",
  "https://picsum.photos/300/390",
  "https://picsum.photos/300/470",
  "https://picsum.photos/300/440",
  "https://picsum.photos/300/360",
];

export default function MasonryGalleyPage() {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="flex items-center justify-center">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((src, idx) => (
          <div key={idx} className="mb-6">
            <div className="relative overflow-hidden cursor-pointer rounded-2xl group">
              <Image
                src={src}
                alt={`Image ${idx}`}
                width={300}
                height={400}
                loading="lazy"
                className="w-full h-auto transition-transform duration-300 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 transition-opacity duration-300 bg-black opacity-0 group-hover:opacity-40"></div>
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
}
