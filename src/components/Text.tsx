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
    s: "text-[13px] md:text-[18px]",
    m: "text-[16px] md:text-[18px]",
    l: "text-[18px] md:text-[20px]",
    xl: `text-[20px] md:text-[24px]`,
    xxl: "text-[24px] md:text-[30px]",
  };
  return (
    <div id={id} className={`font-figtree ${className} ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

export default Text;
