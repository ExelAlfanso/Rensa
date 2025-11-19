import React, { forwardRef } from "react";
import ProfileBadge from "./badges/ProfileBadge";
import { formatTimeAgo } from "@/utils/DateFormatter";
import Text from "@/components/Text";
interface CommentProps {
  id?: string;
  className?: string;
  avatarUrl?: string;
  children?: string;
  username?: string;
  userId?: string;
  disableBorder?: boolean;
  createdAt?: string;
}

const Comment = forwardRef<HTMLDivElement, CommentProps>(
  (
    {
      id,
      className,
      children,
      username,
      avatarUrl,
      disableBorder,
      userId,
      createdAt,
    },
    ref
  ) => {
    return (
      <div id={id} ref={ref} className={`${className} text-[13px]`}>
        <div className="flex flex-row items-center justify-between">
          <ProfileBadge
            username={username}
            avatarUrl={avatarUrl}
            className="mb-2"
            href={`/profile/${userId}`}
          />
          <Text size="xs" className="text-white-700 mb-1">
            {formatTimeAgo(createdAt || "")}
          </Text>
        </div>
        <h1 className="font-figtree text-black">{children}</h1>

        {!disableBorder && (
          <div className="border-t border-white-700 w-full my-2" />
        )}
      </div>
    );
  }
);
Comment.displayName = "Comment";
export default Comment;
