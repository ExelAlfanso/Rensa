import { CaretDownIcon } from "@phosphor-icons/react";

import React from "react";

interface CaretIconProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const CaretIcon: React.FC<CaretIconProps> = ({ id, className, children }) => {
  return (
    <div
      id={id}
      className={`cursor-pointer hover:text-gray-800 transition-colors duration-300 ${className}`}
    >
      <CaretDownIcon size={32}></CaretDownIcon>
      {children}
    </div>
  );
};

export default CaretIcon;
