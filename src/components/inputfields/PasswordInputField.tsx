import React, { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "@phosphor-icons/react";
import BaseInputField from "./BaseInputField";

interface PasswordInputFieldProps {
  name?: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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
    <div className="relative">
      <BaseInputField
        type={type}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      ></BaseInputField>
      <button
        type="button"
        onClick={handleTogglePassword}
        className="absolute inset-y-0 right-0 flex items-center text-black text-[25px] md:text-[32px] pr-5 cursor-pointer"
      >
        {type === "password" ? <EyeIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
};

export default PasswordInputField;
