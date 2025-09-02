import React from "react";
import InputField from "./InputField";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
interface SearchInputFieldProps {
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  disabled = false,
  className,
  onChange,
}) => {
  return (
    <div className="relative flex items-center">
      <InputField
        className={`${className}`}
        type={"search"}
        onChange={onChange}
        placeholder={"Search"}
        size={"m"}
        disabled={disabled}
      ></InputField>
      <div className="absolute inset-y-0 right-0 flex items-center text-black text-[32px] pr-5 cursor-pointer">
        <MagnifyingGlassIcon
          className={`${disabled ? "text-gray-300" : ""}`}
          size={20}
        />
      </div>
    </div>
  );
};

export default SearchInputField;
