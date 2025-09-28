import React from "react";

import Image from "next/image";

interface LogoProps {
  size?: string;
}
const Logo: React.FC<LogoProps> = ({ size = "s" }) => {
  const sizeClasses: Record<string, string> = {
    s: "w-10 h-10 md:w-12 md:h-12",
    m: "w-16 h-16",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  return (
    <div className={`relative ${sizeClasses[size]} `}>
      <Image
        src={"/logo.svg"}
        alt="Logo"
        fill
        className="object-contain aspect-square"
      />
    </div>
  );
};

export default Logo;
