import React from "react";
import ProfileIcon from "../icons/ProfileIcon";

interface ProfileButtonProps {
  src: string;
  alt: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ src, alt }) => {
  return (
    <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-300">
      <ProfileIcon src={src} alt={alt} />
    </button>
  );
};

export default ProfileButton;
