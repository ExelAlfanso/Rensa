import React from "react";

interface HeadingProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  size?: "s" | "m" | "l" | "xl" | "xxl";
}

const Heading: React.FC<HeadingProps> = ({
  id,
  className,
  children,
  size = "xl",
}) => {
  const sizeClasses = {
    s: "text-[24px]",
    m: "text-[30px]",
    l: "text-[38px]",
    xl: "text-[47px]",
    xxl: "text-[59px]",
  };
  return (
    <div id={id} className={`font-serif ${className} ${sizeClasses[size]}`}>
      {children}
    </div>
  );
};

export default Heading;
