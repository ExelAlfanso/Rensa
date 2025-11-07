"use client";

import React from "react";

interface IconInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon: React.ElementType;
  iconPosition?: "left" | "right";
  label?: string;
  containerClassName?: string;
  className?: string;
}

const IconInputField: React.FC<IconInputFieldProps> = ({
  Icon,
  iconPosition = "left",
  label,
  containerClassName = "",
  className = "",
  ...props
}) => {
  return (
    <div className={`relative w-full ${containerClassName}`}>
      {label && (
        <label className="text-[13px] text-black-200 font-figtree font-medium mb-1">
          {label}
        </label>
      )}

      <Icon
        size={20}
        className={`absolute top-1/2 -translate-y-1/2 text-black-400 pointer-events-none ${
          iconPosition === "left" ? "left-5" : "right-8"
        }`}
      />

      <input
        {...props}
        className={`bg-gray-200 rounded-3xl text-[16px] text-black font-figtree 
          placeholder:text-black-300 h-[36px] md:h-[42px] md:py-4 
          focus:outline-none focus:border focus:border-black-200 focus:bg-[#FAFAFA]
          transition-colors duration-200
          ${iconPosition === "left" ? "pl-12 pr-4" : "pl-5 pr-12"} 
          ${className}`}
      />
    </div>
  );
};

export default IconInputField;
