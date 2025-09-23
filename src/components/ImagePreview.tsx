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
    <>
      <LinkButton href={"/explore"} Icon={XIcon}></LinkButton>
      <div className="w-4xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="rounded-3xl"
        ></Image>
      </div>
    </>
  );
};
export default ImagePreview;
