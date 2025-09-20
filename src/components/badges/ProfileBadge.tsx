import React, { useEffect } from "react";
import ProfileIconButton from "../buttons/ProfileIconButton";
import Text from "../Text";
import api from "@/lib/axios";
interface ProfileBadgeProps {
  alt?: string;
  size?: "8" | "10" | "12" | "16" | "20";
  className?: string;
  avatarUrl?: string;
  username?: string;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  alt = "profile picture",
  size = "8",
  className,
  avatarUrl,
  username,
}) => {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ProfileIconButton
        src={avatarUrl || "/profile.jpg"}
        alt={alt}
        size={size}
      ></ProfileIconButton>
      <Text size="s" className="text-white-700 ">
        @{username}
      </Text>
    </span>
  );
};

export default ProfileBadge;
