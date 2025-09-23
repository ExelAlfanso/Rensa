"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import React, { useState } from "react";

interface IconDropdownProps {
  id?: string;
  children?: React.ReactNode;
  Tag?: React.ElementType;
  size?: number;
  position?: "left" | "right" | "center";
  weight?:
    | "bold"
    | "duotone"
    | "fill"
    | "light"
    | "regular"
    | "thin"
    | undefined;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  children,
  size = 32,
  Tag = undefined,
  position = "center",
  weight = "fill",
}) => {
  const positionClasses = {
    left: "right-0",
    right: "left-0",
    center: "-left-23",
  };
  const [open, setOpen] = useState(false);
  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));
  return (
    <div className="relative" ref={dropdownRef}>
      {Tag && (
        <Tag
          weight={weight}
          size={size}
          className="hover:text-black-200 transition-colors duration-200 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      <ul
        className={`absolute ${
          positionClasses[position]
        } menu dropdown top-10 mt-2 w-66 flex flex-col items-center rounded-3xl bg-white-200 p-0 shadow-lg transform transition-all duration-200 ease-out origin-top
          ${
            open
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {children}
      </ul>
    </div>
  );
};

export default IconDropdown;
