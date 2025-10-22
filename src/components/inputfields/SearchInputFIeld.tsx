"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import IconInputField from "./IconInputField";
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
    <IconInputField
      type="text"
      placeholder="Search"
      Icon={MagnifyingGlassIcon}
      iconPosition="right"
      onChange={(e) => console.log(e.target.value)}
    />
  );
};

export default SearchInputField;
