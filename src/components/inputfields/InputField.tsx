"use client";
import React from "react";
interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string;
  size?: "m" | "l";
  className?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  Icon?: React.ElementType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  size = "l",
  name,
  className,
  disabled,
  Icon,
  iconPosition = "right",
  onChange,
}) => {
  const sizeClasses = {
    m: "h-12 py-3",
    l: "h-16 py-4",
  };
  return (
    <>
      {!Icon && (
        <input
          type={type}
          name={name}
          disabled={disabled}
          className={`input bg-gray-200 transition-colors text-[16px] duration-300 w-full text-black focus:outline-0 focus:bg-white-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-white-500 focus:border-gray-800 rounded-3xl placeholder:text-primary pl-6 pr-4 ${sizeClasses[size]} ${className}`}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {Icon && (
        <div className="relative flex items-center">
          <input
            type={type}
            name={name}
            disabled={disabled}
            className={`input bg-gray-200 transition-colors text-[16px] duration-300 w-full text-black focus:outline-0 focus:bg-white-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-white-500 focus:border-gray-800 rounded-3xl placeholder:text-primary ${
              iconPosition === "left" ? "pl-11" : "pl-6"
            } pr-4 ${sizeClasses[size]} ${className}`}
            placeholder={placeholder}
            onChange={onChange}
          />
          <div
            className={`absolute inset-y-0 ${
              iconPosition === "left" ? "left-0 pl-5" : "right-0 pr-5"
            } flex items-center text-black text-[32px] cursor-pointer`}
          >
            <Icon className={`${disabled ? "text-gray-300" : ""}`} size={20} />
          </div>
        </div>
      )}
    </>
  );
};

export default InputField;
