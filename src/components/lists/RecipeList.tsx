import { CameraIcon } from "@phosphor-icons/react";
import React from "react";
import Text from "../Text";
import { PhotoMetadata } from "@/models/Photo";

interface RecipeListProps {
  metadata?: PhotoMetadata;
}

const RecipeList: React.FC<RecipeListProps> = ({ metadata }) => {
  return (
    <div>
      <span className="inline-flex items-center justify-center gap-4">
        <CameraIcon size={32} />
        [Camera]
      </span>
      <div className="grid grid-cols-2 gap-2 mt-4 h-75 overflow-y-scroll no-scrollbar">
        {metadata?.exif &&
          Object.entries(metadata.exif).map(([key, value]) => (
            <div key={key}>
              <Text size="s" className="text-white-700 mb-2">
                {key}
              </Text>
              <Text size="s">{value}</Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecipeList;
