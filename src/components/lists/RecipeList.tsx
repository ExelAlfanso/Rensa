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
      <span className="inline-flex items-center justify-center gap-4 font-semibold">
        <CameraIcon size={32} />
        {metadata?.exif?.Model || `${metadata?.exif?.Brand} Camera Model`}
      </span>
      <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-4 overflow-y-scroll h-75 no-scrollbar">
        {metadata?.exif &&
          Object.entries(metadata.exif).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <div key={key}>
                  <Text size="xs" className="mb-2 text-white-700">
                    {key}
                  </Text>
                  <Text size="xs">
                    {value.map((item, index) => (
                      <span key={index} className="mr-2">
                        {String(item)}
                      </span>
                    ))}
                  </Text>
                </div>
              );
            } else if (typeof value === "object") {
              return (
                <div key={key}>
                  <Text size="xs" className="mb-2 text-white-700">
                    {key}
                  </Text>
                  <Text size="xs">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey}>
                        <Text size="xs">{subKey}</Text>
                        <Text size="xs">{String(subValue)}</Text>
                      </div>
                    ))}
                  </Text>
                </div>
              );
            } else {
              return (
                <div key={key}>
                  <Text size="xs" className="mb-2 text-white-700">
                    {key}
                  </Text>
                  <Text size="xs">{value}</Text>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default RecipeList;
