import React from "react";

interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string;
  size?: "m" | "l";
  className?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  size = "l",
  name,
  className,
  disabled,
  onChange,
}) => {
  const sizeClasses = {
    m: "h-12 py-3",
    l: "h-14 py-4",
  };
  return (
    <input
      type={type}
      name={name}
      disabled={disabled}
      className={`input bg-gray-200 transition-colors text-[16px] duration-300 w-full text-black focus:outline-0 focus:bg-white-500 disabled:text-gray-300 disabled:border-gray-200 disabled:bg-white-500 focus:border-gray-800 rounded-3xl pl-6 pr-4 ${sizeClasses[size]} ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputField;
