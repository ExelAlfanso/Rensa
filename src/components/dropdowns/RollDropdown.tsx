import { CaretDownIcon } from "@phosphor-icons/react";
import React, { useState } from "react";
import Text from "@/components/Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Heading from "../Heading";
import SearchInputField from "../inputfields/SearchInputField";

const RollDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="font-semibold cursor-pointer"
    >
      <button
        onClick={handleClick}
        className={`flex flex-row items-center gap-2 w-full px-4 py-2 cursor-pointer rounded-3xl ring-0 outline-0`}
      >
        <Text size={"xs"}>All Photos</Text> <CaretDownIcon weight="bold" />
      </button>
      <ul
        className={`origin-top z-10 absolute top-15 bg-white-200 border text-primary border-gray-500 rounded-2xl transition-transform duration-300 ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }  "grid grid-cols-2" : "flex flex-col"}`}
      >
        <Heading alignment="center" size="m" className="py-6">
          Rolls
        </Heading>
        <SearchInputField></SearchInputField>
      </ul>
    </div>
  );
};

export default RollDropdown;
