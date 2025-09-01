import React from "react";

interface InputFieldProps {
  type: string;
  placeholder?: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  name,
  onChange,
}) => {
  return (
    <input
      type={type}
      name={name}
      className="input bg-transparent autofill:bg-transparent transition-colors duration-300 w-full text-black focus:outline-0 focus:border-[#2A83E4] rounded-3xl h-14 px-4 py-3.5
        "
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputField;
