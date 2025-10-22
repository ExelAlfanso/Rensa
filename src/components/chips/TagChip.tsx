import { XIcon } from "@phosphor-icons/react";
import React from "react";
import Text from "../Text";
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
    <span className="flex justify-between gap-2 w-20 sm:w-25 p-2 pl-4 pr-6 bg-black border rounded-full text-white-200">
      <Text size="xs">{tag}</Text>
      <button onClick={onClick} type="button" disabled={disabled}>
        <XIcon size={10} color={"white"}></XIcon>
      </button>
    </span>
  );
};

export default TagChip;
