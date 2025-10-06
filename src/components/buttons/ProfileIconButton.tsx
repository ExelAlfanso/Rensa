import React from "react";
import Image from "next/image";

interface ProfileButtonProps {
  src: string;
  alt: string;
  size?: "8" | "10" | "12" | "16" | "20"; // restrict to supported Tailwind sizes
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  src,
  alt,
  size = "8",
}) => {
  const sizeClasses: Record<string, string> = {
    "8": "w-8 h-8 md:w-10 md:h-10",
    "10": "w-10 h-10 md:w-12 md:h-12",
    "12": "w-12 h-12 md:w-16 md:h-16",
    "16": "w-16 h-16 md:w-20 md:h-20",
    "20": "w-20 h-20 md:w-32 md:h-32",
  };

  return (
    <button
      className={`relative ${sizeClasses[size]} transition-all duration-300 rounded-full cursor-pointer hover:opacity-50`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 40px, (max-width: 1200px) 60px, 80px"
        className="object-cover rounded-full aspect-square"
      />
    </button>
  );
};

export default ProfileButton;
