import React, { useState } from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import Text from "../Text";
import { useOutsideClick } from "@/hooks/useOutsideClick";
interface InputDropdownProps {
  placeholder?: string;
  values?: string[];
  label?: string;
  initialValue?: string | number | object;
  onChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  values,
  label,
  placeholder,
  initialValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));
  const [value, setValue] = useState<string>((initialValue as string) || "");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    setValue(target.innerText);
    onChange?.(e);
    setIsOpen(false);
  };
  return (
    <div ref={dropdownRef} className="relative w-full text-primary">
      <Text size="xs" className="text-gray-700">
        {label}
      </Text>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-2 text-left bg-gray-200 cursor-pointer rounded-3xl hover:bg-gray-300 ring-0 outline-0"
      >
        {value || placeholder || "Select an option"}
      </button>

      <div
        className={`origin-top z-10 absolute top-15 bg-white-200 border border-gray-500 rounded-2xl transition-transform duration-300 ${
          isOpen ? "scale-y-100" : "scale-y-0"
        } ${(values?.length ?? 0) > 6 ? "grid grid-cols-2" : "flex flex-col"}`}
      >
        {values?.map((val, index) => (
          <button
            key={index}
            onClick={(e) => handleClick(e)}
            className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100 text-primary"
          >
            {val}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="absolute right-3 top-1/2 cursor-pointer "
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

export default InputDropdown;
