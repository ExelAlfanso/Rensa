import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
const TextAreaInputField: React.FC<TextAreaProps> = ({ label, ...props }) => (
  <div className="flex flex-col">
    {label && (
      <label className="text-[13px] text-black-200 font-figtree font-medium mb-1">
        {label}
      </label>
    )}
    <textarea
      {...props}
      className="w-full bg-gray-200 text-[16px] rounded-3xl px-4 py-3 text-sm focus:outline-gray-800 focus:bg-[#FAFAFA]"
      rows={6}
    />
  </div>
);

export default TextAreaInputField;
