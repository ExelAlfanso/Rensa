import React from "react";
import ProfileIconButton from "../buttons/ProfileIconButton";
import Text from "../Text";
interface ProfileBadgeProps {
  src?: string;
  alt?: string;
  size?: "8" | "10" | "12" | "16" | "20";
  className?: string;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  src = "/profile.jpg",
  alt = "profile picture",
  size = "8",
  className,
}) => {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ProfileIconButton src={src} alt={alt} size={size}></ProfileIconButton>
      <Text size="s" className="text-white-700 ">
        @username
      </Text>
    </span>
  );
};

export default ProfileBadge;
