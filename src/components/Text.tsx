import React from "react";

interface TextProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "s" | "m" | "l" | "xl" | "xxl";
}

const Text: React.FC<TextProps> = ({
  id,
  className,
  children,
  size = "xl",
}) => {
  const sizeClasses = {
    s: "text-[13px]",
    m: "text-[16px]",
    l: "text-[18px]",
    xl: "text-[20px]",
    xxl: "text-[24px]",
  };
  return (
    <div id={id} className={`font-figtree ${className} ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

export default Text;
