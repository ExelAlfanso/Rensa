import React from "react";
import ProfileBadge from "./badges/ProfileBadge";
import Text from "./Text";

interface CommentProps {
  id?: string;
  className?: string;
  children?: string;
  username?: string;
}

const Comment: React.FC<CommentProps> = ({
  id,
  className,
  children,
  username,
}) => {
  return (
    <div id={id} className={`${className} text-[13px]`}>
      <ProfileBadge username={username} className="mb-2"></ProfileBadge>
      <h1 className="font-figtree  text-black">{children}</h1>
      <div className="border-t border-white-700 w-full my-2"></div>
    </div>
  );
};

export default Comment;
