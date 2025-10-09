import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}
const TextAreaInputField: React.FC<TextAreaProps> = ({ label, ...props }) => (
  <div className="flex flex-col">
    {label && <label className="text-sm font-medium mb-1">{label}</label>}
    <textarea
      {...props}
      className="w-full bg-gray-200 rounded-3xl px-4 py-3 text-sm focus:outline-none focus:bg-white"
      rows={6}
    />
  </div>
);

export default TextAreaInputField;
