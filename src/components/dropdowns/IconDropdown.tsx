"use client";

import React, { useState } from "react";

interface IconDropdownProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  Tag?: React.ElementType;
}

const IconDropdown: React.FC<IconDropdownProps> = ({
  children,
  Tag = undefined,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {Tag && <Tag onClick={() => setOpen((prev) => !prev)} />}
      <ul
        className={`absolute -left-23 menu dropdown top-10 mt-2 w-66 flex flex-col items-center rounded-3xl bg-white-200 p-0 shadow-lg transform transition-all duration-200 ease-out origin-top
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
