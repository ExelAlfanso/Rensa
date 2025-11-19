import React, { forwardRef } from "react";
import ProfileBadge from "./badges/ProfileBadge";
import { formatTimeAgo } from "@/utils/DateFormatter";
import Text from "@/components/Text";

interface CommentProps {
  id?: string;
  className?: string;
  avatarUrl?: string;
  children?: React.ReactNode;
  username?: string;
  userId?: string;
  disableBorder?: boolean;
  createdAt?: string;
}

const Comment = forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      id,
      className = "",
      children,
      username = "Unknown",
      avatarUrl = "/profile.jpg",
      disableBorder = false,
      userId = "",
      createdAt,
    },
    ref
  ) => {
    const time = createdAt ? formatTimeAgo(createdAt) : "Just now";

    return (
      <div id={id} ref={ref} className={`text-[13px] ${className}`}>
        <div className="flex flex-row items-center justify-between">
          <ProfileBadge
            username={username}
            avatarUrl={avatarUrl}
            className="mb-2"
            href={`/profile/${userId}`}
          />

          <Text size="xs" className="text-white-700 mb-1">
            {time}
          </Text>
        </div>

        <p className="font-figtree text-black">{children}</p>

        {!disableBorder && (
          <div className="border-t border-white-700 w-full my-2" />
        )}
      </div>
    );
  }
);

Comment.displayName = "Comment";
export default Comment;
