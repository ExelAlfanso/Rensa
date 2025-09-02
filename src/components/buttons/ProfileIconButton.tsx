import React from "react";
import Image from "next/image";
interface ProfileButtonProps {
  src: string;
  alt: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ src, alt }) => {
  return (
    <button className="relative w-12 h-12 p-2 transition-all duration-300 rounded-full cursor-pointer hover:opacity-50 ">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-full aspect-square"
      />
      {/* <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 rounded-full opacity-0 bg-black/40 hover:opacity-100"></div> */}
    </button>
  );
};

export default ProfileButton;
