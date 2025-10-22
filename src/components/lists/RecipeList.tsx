import { CameraIcon } from "@phosphor-icons/react";
import React from "react";
import { PhotoMetadata } from "@/models/Photo";

interface RecipeListProps {
  metadata?: PhotoMetadata;
}

const RecipeList: React.FC<RecipeListProps> = ({ metadata }) => {
  return (
    <div>
      <span className="inline-flex items-center justify-center gap-4 text-[13px]">
        <CameraIcon size={32} />
        {metadata?.exif?.Model || `${metadata?.exif?.Brand} Camera Model`}
      </span>

      <div className="grid grid-cols-2 mt-4 overflow-y-scroll h-50 no-scrollbar font-figtree">
        {metadata?.exif &&
          Object.entries(metadata.exif).map(([key, value]) => {
            if (Array.isArray(value)) {
              return (
                <div key={key}>
                  <h1 className="text-white-700 text-[13px] ">{key}</h1>
                  <p className="text-[13px]">
                    {value.map((item, index) => (
                      <span key={index} className="mr-2">
                        {String(item)}
                      </span>
                    ))}
                  </p>
                </div>
              );
            } else if (typeof value === "object") {
              return (
                <div key={key}>
                  <h1 className="text-white-700 text-[13px] ">{key}</h1>
                  <div className="text-[13px]">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <div key={subKey}>
                        <p className="text-[13px] ">{subKey}</p>
                        <p className="text-[13px]">{String(subValue)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <div key={key}>
                  <h1 className="text-white-700 text-[13px] ">{key}</h1>
                  <p className="text-[13px]">{String(value)}</p>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default RecipeList;
