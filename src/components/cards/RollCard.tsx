"use client";

import Image from "next/image";
import React from "react";
import Heading from "../Heading";
import { formatDate } from "@/utils/DateFormatter";

interface RollCardProps {
  name: string;
  imageUrls: string[];
  createdAt?: string;
}

const RollCard: React.FC<RollCardProps> = ({ name, imageUrls, createdAt }) => {
  const previews = imageUrls.slice(0, 4);
  let previewGridCols = "";
  if (previews.length === 1) {
    previewGridCols = "grid-cols-1";
  } else if (previews.length === 2) {
    previewGridCols = "grid-cols-1 grid-rows-2";
  } else {
    previewGridCols = "grid-rows-2 grid-cols-2";
  }
  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 w-[265px] h-auto p-3 border border-gray-300 cursor-pointer">
      <div className={`gap-[10px] grid ${previewGridCols} gap-[2px]`}>
        {previews.map((url, idx) => {
          const count = previews.length;

          const baseClass = "relative w-full aspect-square";
          const sizeClass =
            count === 1
              ? "max-h-[200px]"
              : count === 2 || count === 4
              ? "max-h-[90px]"
              : count === 3
              ? "max-h-[90px]"
              : "";
          const spanClass = count === 3 && idx === 2 ? "col-span-2" : "";

          const photoClass = `${baseClass} ${sizeClass} ${spanClass}`;

          return (
            <div key={idx} className={photoClass}>
              <Image
                src={url}
                alt={name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          );
        })}
      </div>

      <div className="">
        <Heading size="s" className="font-forum text-black">
          {name}
        </Heading>
      </div>
      {createdAt && (
        <div className="">
          <p className="text-gray-500 text-sm">{formatDate(createdAt)}</p>
        </div>
      )}
    </div>
  );
};

export default RollCard;
