import React from "react";
import RollCard from "@/components/cards/RollCard";

export interface Roll {
  _id: string;
  userId: string;
  name: string;
  previewPhotos: string[];
  createdAt: string;
}

interface RollListProps {
  rolls: Roll[];
}

export default function RollList({ rolls }: RollListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-5">
      {rolls.length > 0 ? (
        rolls.map((roll) => (
          <RollCard
            key={roll._id}
            id={roll._id}
            userId={roll.userId}
            name={roll.name}
            imageUrls={roll.previewPhotos}
            createdAt={roll.createdAt}
          />
        ))
      ) : (
        <p className="text-gray-500">No rolls found.</p>
      )}
    </div>
  );
}
