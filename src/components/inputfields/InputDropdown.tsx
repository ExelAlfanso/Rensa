import React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import Text from "../Text";
interface InputDropdownProps {
  placeholder?: string;
  values?: string[];
  label?: string;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  values,
  label,
  placeholder,
}) => {
  const [value, setValue] = React.useState<string>("");
  const handleClick = (val: string) => {
    setValue(val);
  };
  return (
    <div className="relative w-full text-primary">
      <Text size="s" className="text-gray-700">
        {label}
      </Text>
      <button
        popoverTarget="popover-1"
        style={{ anchorName: "--anchor-1" } as React.CSSProperties}
        className="w-full px-4 py-2 text-left bg-gray-200 cursor-pointer rounded-3xl hover:bg-gray-300 ring-0 outline-0"
      >
        {value || placeholder || "Select an option"}
      </button>
      <ul
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
        className={`z-10 ${
          (values?.length ?? 0) > 6 ? "grid grid-cols-2" : "flex flex-col"
        } dropdown menu bg-white border border-gray-300 rounded-md shadow-lg`}
      >
        {values?.map((val, index) => (
          <button
            key={index}
            popoverTarget="popover-1"
            onClick={() => handleClick(val)}
            className="px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
          >
            {val}
          </button>
        ))}
      </ul>
      <CaretDownIcon size={20} className="absolute right-3 top-1/2" />
    </div>
  );
};

export default InputDropdown;
