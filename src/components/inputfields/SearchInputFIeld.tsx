"use client";

import React from "react";
import InputField from "./InputField";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
interface SearchInputFieldProps {
  disabled?: boolean;
  className?: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({
  disabled = false,
  className,
}) => {
  function handleSearch(term: string) {
    console.log(term);
  }
  return (
    <InputField
      type={""}
      onChange={(e) => handleSearch(e.target.value)}
      Icon={MagnifyingGlassIcon}
      placeholder="Search"
      size="m"
      className={`${className}`}
      disabled={disabled}
    ></InputField>
  );
};

export default SearchInputField;
