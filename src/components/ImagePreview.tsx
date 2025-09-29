"use client";
import React from "react";
import Image from "next/image";
import { XIcon } from "@phosphor-icons/react";
import LinkButton from "./LinkButton";
interface ImagePreviewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 relative">
      <LinkButton
        className="self-start"
        href={"/explore"}
        Icon={XIcon}
      ></LinkButton>
      <div className="w-full xl:max-w-3xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-3xl"
        ></Image>
      </div>
    </div>
  );
};
export default ImagePreview;
