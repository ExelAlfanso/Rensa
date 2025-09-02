import React from "react";

import Image from "next/image";
interface LogoProps {
  size: number;
}
const Logo = ({ size }: LogoProps) => {
  return <Image src={"/logo.svg"} alt="Logo" width={size} height={size} />;
};

export default Logo;
