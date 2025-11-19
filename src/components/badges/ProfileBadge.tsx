import React from "react";
import ProfileIconButton from "../buttons/ProfileIconButton";
interface ProfileBadgeProps {
  alt?: string;
  size?: "8" | "10" | "12" | "16" | "20";
  className?: string;
  avatarUrl?: string;
  username?: string;
  href?: string;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({
  alt = "profile picture",
  size = "8",
  className,
  avatarUrl,
  username,
  href,
}) => {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <ProfileIconButton
        src={avatarUrl || "/profile.jpg"}
        alt={alt}
        size={size}
        href={href}
      ></ProfileIconButton>
      <h2 className="text-[13px] font-figtree text-black-200">@{username}</h2>
    </span>
  );
};

export default ProfileBadge;
