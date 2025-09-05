"use client";

import React from "react";

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
  return (
    <div>
      {Tag && <Tag popoverTarget="popover-1" />}
      <ul
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: "--anchor-1" } as React.CSSProperties}
        className="inline-flex items-center justify-center p-0 shadow-sm menu dropdown dropdown-center bg-white-200 rounded-3xl z-1 w-66"
      >
        {children}
      </ul>
    </div>
  );
};

export default IconDropdown;
