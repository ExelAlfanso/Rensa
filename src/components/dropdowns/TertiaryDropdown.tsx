"use client";

import React, { useEffect, useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import Text from "../Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import TertiaryButton from "../buttons/TertiaryButton";
interface TertiaryDropdownProps {
  placeholder?: string;
  values: string[];
  label?: string;
  initialValue: string;
  onChange?: (value: string) => void;
  className?: string;
}

const TertiaryDropdown: React.FC<TertiaryDropdownProps> = ({
  values,
  label,
  placeholder,
  initialValue,
  onChange,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const [value, setValue] = useState<string>(initialValue);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    setValue(target.innerText);
    onChange?.(target.innerText);
    setIsOpen(false);
  };
  useEffect(() => {
    console.log("isOpen changed:", isOpen);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className} text-primary`}>
      {label && (
        <label className="text-[13px] text-black-200 font-figtree font-medium mb-1">
          {label}
        </label>
      )}
      <TertiaryButton onClick={() => setIsOpen((prev) => !prev)}>
        <Text size="m">{value || placeholder || "Select an option"}</Text>
      </TertiaryButton>
      <div
        className={`absolute left-0 mt-2 w-full z-10 bg-white border border-gray-300 rounded-2xl shadow-md
              origin-top transform transition-transform duration-200 ease-out
              ${isOpen ? "scale-y-100" : "scale-y-0"}
              ${
                (values?.length ?? 0) > 6 ? "grid grid-cols-2" : "flex flex-col"
              }`}
      >
        {values?.map((val, index) => (
          <button
            key={index}
            onClick={(e) => handleClick(e)}
            className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 font-semibold text-primary"
          >
            {val}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer "
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <CaretDownIcon
          size={20}
          className="hover:text-orange-500 transition-colors duration-200"
        />
      </button>
    </div>
  );
};

export default TertiaryDropdown;
