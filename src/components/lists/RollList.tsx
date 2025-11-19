import React from "react";
import RollCard from "@/components/cards/RollCard";
import CreateNewRollCard from "../cards/CreateNewRollCard";
import { useAuthStore } from "@/stores/useAuthStore";

export interface Roll {
  _id: string;
  userId: string;
  name: string;
  previewPhotos: string[];
  createdAt: string;
}

interface RollListProps {
  rolls: Roll[];
  isOwner: boolean;
}

export default function RollList({ rolls, isOwner }: RollListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      {isOwner && <CreateNewRollCard key="create-new-roll" />}
      {rolls.length > 0 &&
        rolls.map((roll) => (
          <RollCard
            key={roll._id}
            id={roll._id}
            userId={roll.userId}
            name={roll.name}
            imageUrls={roll.previewPhotos}
            createdAt={roll.createdAt}
          />
        ))}
    </div>
  );
}
