"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Heading from "../Heading";
import { formatDate } from "@/utils/DateFormatter";
import { PencilIcon } from "@phosphor-icons/react";
import SmallIconButton from "../buttons/SmallIconButton";
import { useEditRoll } from "@/providers/EditRollProvider";
import { useAuthStore } from "@/stores/useAuthStore";

interface RollCardProps {
  id: string;
  userId?: string; // owner of the roll
  name: string;
  imageUrls: string[];
  createdAt?: string;
}

const RollCard: React.FC<RollCardProps> = ({
  id,
  userId,
  name,
  imageUrls,
  createdAt,
}) => {
  const { user } = useAuthStore();
  const isOwner = user?.id === userId;
  const { openEditor } = useEditRoll();

  const previews = imageUrls.slice(0, 4);
  let previewGridCols = "";
  if (previews.length <= 1) previewGridCols = "grid-cols-1";
  else if (previews.length === 2) previewGridCols = "grid-cols-1 grid-rows-2";
  else previewGridCols = "grid-rows-2 grid-cols-2";

  return (
    <Link href={`/roll/${id}`} className="group">
      <div className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-200 h-full w-[170px] md:w-[265px] p-3 border border-gray-300 cursor-pointer">
        <div className={`gap-[10px] grid ${previewGridCols}`}>
          {previews.length < 1 && (
            <div className="w-full aspect-square max-h-[150px] md:max-h-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
          {previews.map((url, idx) => {
            const count = previews.length;
            const baseClass = "relative w-full aspect-square";
            const sizeClass =
              count === 1
                ? "max-h-[150px] md:max-h-[200px]"
                : count === 2 || count === 4
                ? "max-h-[40px] md:max-h-[90px]"
                : count === 3
                ? "max-h-[40px] md:max-h-[90px]"
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

        <Heading size="s" className="text-black font-forum mt-2">
          {name}
        </Heading>

        {createdAt && (
          <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

        {/* Edit button (only for owner) */}
        {isOwner && (
          <div className="absolute top-3 right-3 pointer-events-auto">
            <SmallIconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openEditor({ rollId: id, name });
              }}
              className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <PencilIcon size={16} weight="bold" />
            </SmallIconButton>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RollCard;
