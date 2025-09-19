import { XIcon } from "@phosphor-icons/react";
import React from "react";

interface TagChipProps {
  tag: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const TagChip: React.FC<TagChipProps> = ({
  tag,
  onClick,
  disabled = false,
}) => {
  return (
    <span className="flex flex-wrap items-center gap-2 p-2 bg-black border border-gray-200 rounded-full text-white-200">
      {tag}
      <button onClick={onClick} type="button" disabled={disabled}>
        <XIcon size={10} color={"white"}></XIcon>
      </button>
    </span>
  );
};

export default TagChip;
