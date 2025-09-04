import Image, { ImageProps } from "next/image";
import { useState } from "react";

export const ImageWithSkeleton = (props: {
  image: Omit<ImageProps, "width" | "height"> & {
    width: number;
    height: number;
  };
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div className="relative w-full h-auto transition-transform duration-300 transform group-hover:scale-105">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="skeleton bg-[#D5D5D5] animate-none w-full h-full"></div>
        </div>
      )}
      <Image {...props.image} loading="lazy" onLoad={() => setLoaded(true)} />
    </div>
  );
};
