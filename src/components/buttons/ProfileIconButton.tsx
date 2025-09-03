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
  size = "12",
}) => {
  const sizeClasses: Record<string, string> = {
    "8": "w-8 h-8",
    "10": "w-10 h-10",
    "12": "w-12 h-12",
    "16": "w-16 h-16",
    "20": "w-20 h-20",
  };

  return (
    <button
      className={`relative ${sizeClasses[size]} transition-all duration-300 rounded-full cursor-pointer hover:opacity-50`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-full aspect-square"
      />
    </button>
  );
};

export default ProfileButton;
