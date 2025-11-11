"use client";

import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import Text from "../Text";
import Comment from "../Comment";

import { BookmarkSimpleIcon, CaretDownIcon } from "@phosphor-icons/react";
import IconButton from "../buttons/IconButton";
import { formatDate } from "@/utils/DateFormatter";
import { PhotoMetadata } from "@/models/Photo";
import RecipeList from "../lists/RecipeList";
import ProfileBadge from "../badges/ProfileBadge";
import CommentInputField from "../inputfields/CommentInputField";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import PrimaryButton from "../buttons/PrimaryButton";
interface PhotoInfoCardProps {
  id?: string;
  className?: string;
  bookmarks?: number;
  initialBookmarks?: number;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  userId: string;
  metadata?: PhotoMetadata;
  bookmarkedBy?: string[];
}
//TODO: Comment feature
//TODO: Save feature

const PhotoInfoCard: React.FC<PhotoInfoCardProps> = ({
  id,
  className,
  children,
  title,
  initialBookmarks,
  description,
  metadata,
  userId,
  bookmarkedBy,
}) => {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id as string | undefined;
  const [username, setUsername] = useState("Loading...");
  const [avatarUrl, setAvatarUrl] = useState("/profile.jpg");
  const [isBookmarked, setIsBookmarked] = useState(
    currentUserId ? bookmarkedBy?.includes(currentUserId) : false
  );

  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  useEffect(() => {
    setIsBookmarked(
      currentUserId ? bookmarkedBy?.includes(currentUserId) : false
    );
    fetchProfileData(userId);
  }, [userId, currentUserId, bookmarkedBy]);

  const handleBookmarkToggle = async () => {
    setIsBookmarked((prev) => !prev);
    setBookmarks((prev) => (isBookmarked ? (prev || 0) - 1 : (prev || 0) + 1));
    try {
      const action = isBookmarked ? "decrement" : "increment";

      const res = await api.post(`/photos/bookmark/${id}`, {
        action,
        userId: currentUserId,
      });
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfileData = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`);
      const user = response.data.data.user;
      setUsername(user.username);
      setAvatarUrl(user.avatarUrl);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };
  return (
    <div
      id={id}
      className={`flex flex-col gap-1.5 bg-white-200 ${className} shadow-lg p-10 rounded-3xl text-primary w-full lg:max-w-3xl xl:w-[30%]`}
    >
      <div className="inline-flex items-center justify-between w-full">
        <span className="text-black inline-flex items-center justify-center">
          <Text size="s">{bookmarks}</Text>
          <button onClick={handleBookmarkToggle}>
            {isBookmarked ? (
              <BookmarkSimpleIcon
                weight="fill"
                size={28}
                className="hover:scale-110 transition-transform cursor-pointer focus:border-0"
              />
            ) : (
              <BookmarkSimpleIcon
                weight="regular"
                size={28}
                className="hover:scale-110 transition-transform cursor-pointer focus:border-0"
              />
            )}
          </button>
        </span>
        <div className="inline-flex gap-5">
          <IconButton
            Icon={CaretDownIcon}
            color="tertiary"
            iconPosition={"right"}
            paddingX={1}
          >
            All Photos
          </IconButton>

          <PrimaryButton>Save</PrimaryButton>
        </div>
      </div>
      <div className="mb-9">
        <div className="mb-7">
          <Text size="s" className="text-white-700">
            {formatDate(metadata?.uploadedAt || "")}
          </Text>
          <Heading size="m">{title}</Heading>
        </div>
        <ProfileBadge
          avatarUrl={avatarUrl}
          username={username}
          alt={username}
          className="mb-5"
        />
        <p className="text-[16px] text-black-200 max-w-[350px]">
          {description}
        </p>
      </div>
      <div>
        <RecipeList metadata={metadata}></RecipeList>
      </div>
      <div>
        <Heading size="m" className="mb-5">
          Comments
        </Heading>
        <div className="overflow-y-scroll no-scrollbar h-35">
          {/*TODO: Map through comments and render them*/}
          <Comment username="user1">Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
          <Comment>Nice looking picture mate!</Comment>
        </div>
        <CommentInputField></CommentInputField>
      </div>

      {children}
    </div>
  );
};

export default PhotoInfoCard;
