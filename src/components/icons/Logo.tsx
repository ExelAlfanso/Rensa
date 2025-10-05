import React from "react";

import Image from "next/image";

interface LogoProps {
  size?: string;
  className?: string;
  color?: string;
}
const Logo: React.FC<LogoProps> = ({
  size = "s",
  className,
  color = "black",
}) => {
  const sizeClasses: Record<string, string> = {
    s: "w-10 h-10 md:w-12 md:h-12",
    m: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <Image
        src={`${color === "black" ? "/logo.svg" : "/whiteLogo.svg"}`}
        alt="Logo"
        fill
        className="object-contain aspect-square"
      />
    </div>
  );
};

export default Logo;
