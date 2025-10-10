// BaseInputField.tsx
import React from "react";

interface BaseInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const BaseInputField: React.FC<BaseInputFieldProps> = ({ label, ...props }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-[13px] text-black-200 font-figtree font-medium mb-1">
        {label}
      </label>
    )}
    <input
      {...props}
      className="w-full pl-6 pr-4 bg-gray-200 rounded-3xl px-4 py-3 text-sm focus:outline-none focus:bg-white h-12 md:h-16 md:py-4 text-black placeholder:text-primary transition-colors duration-300 font-figtree text-[12px] md:text-[16px]"
    />
  </div>
);

export default BaseInputField;
