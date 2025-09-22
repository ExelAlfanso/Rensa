"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { useState } from "react";
import Text from "../Text";
import { CaretDownIcon } from "@phosphor-icons/react";

interface SearchDropdownProps {
  cameraModels: string[];
  value: string;
  onSelect: (model: string) => void;
  label?: string;
  placeholder?: string;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  cameraModels,
  value,
  label,
  placeholder,
  onSelect,
}) => {
  const [search, setSearch] = useState(value ?? "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const filteredModels = cameraModels.filter((m) =>
    m.toLowerCase().includes(String(search).toLowerCase())
  );

  return (
    <div className="relative w-full mt-3" ref={dropdownRef}>
      {label && (
        <Text size="s" className="text-gray-700">
          {label}
        </Text>
      )}
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder ?? "Search camera model..."}
        className="w-full px-4 py-2 text-left bg-gray-200 cursor-pointer rounded-3xl hover:bg-gray-300 ring-0 outline-0"
      />

      {filteredModels.length > 0 && (
        <div
          className={`origin-top z-10 absolute top-15 bg-white-200 border border-gray-500 rounded-2xl transition-transform duration-300 ${
            isOpen ? "scale-y-100" : "scale-y-0"
          }`}
        >
          {/* Scrollable wrapper */}
          <div
            className={`${
              (filteredModels?.length ?? 0) > 6
                ? "grid grid-cols-2"
                : "flex flex-col"
            } max-h-60 overflow-y-auto`}
          >
            {filteredModels.map((model) => (
              <button
                key={model}
                onClick={() => {
                  onSelect(model);
                  setSearch(model);
                  setIsOpen(false);
                }}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-left"
              >
                {model}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        className="absolute right-3 top-1/2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <CaretDownIcon size={20} />
      </button>
    </div>
  );
};
