import React from "react";
import ProfileBadge from "./badges/ProfileBadge";
import Text from "./Text";

interface CommentProps {
  id?: string;
  className?: string;
  children?: string;
}

const Comment: React.FC<CommentProps> = ({ id, className, children }) => {
  return (
    <div id={id} className={`${className}`}>
      <ProfileBadge className="mb-2"></ProfileBadge>
      <Text size="s">{children}</Text>
      <div className="border-t border-white-700 w-full my-2"></div>
    </div>
  );
};

export default Comment;
