import React, { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";

interface PasswordInputFieldProps {
  name?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  name,
  placeholder,
  onChange,
}) => {
  const [type, setType] = useState("password");

  const handleTogglePassword = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        name={name}
        className="input bg-gray-200 transition-colors duration-300 w-full text-black focus:outline-0 focus:border-gray-800 rounded-3xl h-14 pl-6 pr-4 py-3.5"
        placeholder={placeholder}
        onChange={onChange}
      />
      <button
        onClick={handleTogglePassword}
        className="absolute inset-y-0 right-0 flex items-center text-black text-[32px] pr-5 cursor-pointer"
      >
        {type === "password" ? <EyeIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
};

export default PasswordInputField;
