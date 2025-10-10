import React, { KeyboardEvent } from "react";
import InputField from "./InputField";
import { XIcon } from "@phosphor-icons/react";
import TagChip from "../chips/TagChip";

interface TagsInputFieldProps {
  label?: string;
  placeholder?: string;
  tags: string[];
  handleTags: (value: string | string[]) => void;
}

const TagsInputField: React.FC<TagsInputFieldProps> = ({
  label,
  tags,
  handleTags,
  placeholder,
}) => {
  const addTag = (tag: string) => {
    handleTags(tag.trim());
    setInputValue("");
  };
  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    handleTags(newTags);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue) addTag(inputValue);
    }
  };
  const [inputValue, setInputValue] = React.useState("");
  return (
    <div>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {tags.map((tag, index) => (
          <TagChip
            key={index}
            tag={tag}
            onClick={() => removeTag(tag)}
          ></TagChip>
        ))}
      </div>
      <InputField
        type="text"
        placeholder={placeholder}
        value={inputValue}
        label={label}
        className="flex-grow"
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default TagsInputField;
