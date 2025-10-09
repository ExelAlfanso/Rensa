"use client";
import React from "react";
import Text from "../Text";
// import "./InputField.css";

interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string;
  label?: string;
  size?: "m" | "l" | "xl" | "xxl";
  className?: string;
  disabled?: boolean;
  iconPosition?: "left" | "right";
  Icon?: React.ElementType;
  value?: string | number | object;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  size = "l",
  name,
  label,
  className,
  disabled,
  Icon,
  value,
  iconPosition = "right",
  onChange,
  onKeyDown,
}) => {
  const sizeClasses = {
    m: "h-10 md:h-12 md:py-3",
    l: "h-12 md:h-16 md:py-4",
    xl: "h-20 md:h-20 md:py-5",
    xxl: "h-24 md:h-24 md:pt-6 md:pb-20",
  };
  const defaultStyling =
    "w-full input bg-gray-200 transition-colors text-[12px] md:text-[16px] duration-300 text-black focus:outline-0 focus:bg-white-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-white-500 focus:border-gray-800 rounded-3xl placeholder:text-primary pl-6 pr-4";
  return (
    <>
      {label && (
        <label className={`mb-1 text-left `}>
          <Text size="s" className="text-gray-700 ">
            {label}
          </Text>
        </label>
      )}
      {!Icon && type !== "textarea" && (
        <input
          type={type}
          name={name}
          disabled={disabled}
          value={value as string | number | undefined}
          className={`  ${defaultStyling} ${sizeClasses[size]} ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      )}

      {type === "textarea" && (
        <textarea
          name={name}
          disabled={disabled}
          value={value as string | number | undefined}
          className={`  ${defaultStyling} ${sizeClasses[size]} ${className}`}
          placeholder={placeholder}
          onChange={onChange}
          rows={6}
        />
      )}

      {Icon && (
        <div className="relative flex items-center">
          <input
            type={type}
            name={name}
            value={value as string | number | undefined}
            disabled={disabled}
            className={` ${defaultStyling} ${
              iconPosition === "left" ? "pl-11" : "pl-6"
            } pr-4 ${sizeClasses[size]} ${className}`}
            placeholder={placeholder}
            onChange={onChange}
          />
          <div
            className={`absolute inset-y-0 ${
              iconPosition === "left" ? "left-0 pl-5" : "right-0 pr-5"
            } flex items-center text-black cursor-pointer`}
          >
            <Icon className={`${disabled ? "text-gray-300" : ""}`} size={20} />
          </div>
        </div>
      )}
    </>
  );
};

export default InputField;
