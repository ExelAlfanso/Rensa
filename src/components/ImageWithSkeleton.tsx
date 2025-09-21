import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

interface ImageWithSkeletonProps {
  image: Omit<ImageProps, "width" | "height"> & {
    width: number;
    height: number;
  };
  onLoad?: () => void;
}

export const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  image,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const handleLoad = () => {
    setLoaded(true);
    if (onLoad) onLoad();
  };
  return (
    <div className="relative w-full h-auto transition-transform duration-300 transform group-hover:scale-105">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="skeleton bg-[#D5D5D5] animate-none w-full h-full"></div>
        </div>
      )}
      <Image
        {...image}
        alt="pic"
        loading="lazy"
        style={{ height: "auto", width: image.width }}
        onLoad={handleLoad}
      />
    </div>
  );
};
