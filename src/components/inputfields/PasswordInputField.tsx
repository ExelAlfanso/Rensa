import React, { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import InputField from "./InputField";

interface PasswordInputFieldProps {
  name?: string;
  placeholder?: string;
  size?: "m" | "l";
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  name,
  size = "l",
  placeholder,
  onChange,
}) => {
  const [type, setType] = useState("password");

  const handleTogglePassword = () => {
    setType(type === "password" ? "text" : "password");
  };
  return (
    <div className="relative">
      <InputField
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        size={size}
      ></InputField>
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
