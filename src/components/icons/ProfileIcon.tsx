import React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import Image from "next/image";
interface ProfileIconProps {
  id?: string;
  className?: string;
  src: string;
  alt: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({
  id,
  className,
  src,
  alt,
}) => {
  return (
    <div
      id={id}
      className={`flex flex-row gap-2 items-center justify-center ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={48}
        height={48}
        className="rounded-full object-cover"
      />
      <CaretDownIcon size={28} />
    </div>
  );
};

export default ProfileIcon;
