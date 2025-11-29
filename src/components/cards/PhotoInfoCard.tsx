"use client";

import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import Text from "../Text";

import { BookmarkSimpleIcon } from "@phosphor-icons/react";
import { formatDate } from "@/utils/DateFormatter";
import { PhotoMetadata } from "@/models/Photo";
import RecipeList from "../lists/RecipeList";
import ProfileBadge from "../badges/ProfileBadge";
import api from "@/lib/axios";
import { useSession } from "next-auth/react";
import PrimaryButton from "../buttons/PrimaryButton";
import CommentSection from "@/sections/CommentSection";
import RollDropdownIconButton from "../dropdowns/rolls/RollDropdownIconButton";
import usePhotoRoll from "@/hooks/usePhotoRoll";
import { useAuthStore } from "@/stores/useAuthStore";
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
  title,
  initialBookmarks,
  description,
  metadata,
  userId,
  bookmarkedBy,
}) => {
  const { user } = useAuthStore();
  const [username, setUsername] = useState("Loading...");
  const [avatarUrl, setAvatarUrl] = useState("/profile.jpg");
  const [isBookmarked, setIsBookmarked] = useState(
    user ? bookmarkedBy?.includes(user.id) : false
  );
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  const {
    selectedRoll,
    isLoading,
    isSaved,
    setSelectedRoll,
    savedToRolls,
    saveToRoll,
    removeFromRoll,
  } = usePhotoRoll(id || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setIsBookmarked(user ? bookmarkedBy?.includes(user.id) : false);
    fetchProfileData(userId);
  }, [userId, user, bookmarkedBy, id]);

  const handleBookmarkToggle = async () => {
    setIsBookmarked((prev) => !prev);
    setBookmarks((prev) => (isBookmarked ? (prev || 0) - 1 : (prev || 0) + 1));
    try {
      const action = isBookmarked ? "decrement" : "increment";

      const res = await api.post(`/photos/bookmark/${id}`, {
        action,
        userId: user?.id,
      });
      setBookmarks(res.data.bookmarks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProfileData = async (userId: string) => {
    try {
      const response = await api.get(`/profile/${userId}`);
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
      className={`flex flex-col gap-1.5 bg-white-200 ${className} shadow-lg p-10 rounded-3xl text-primary w-full lg:max-w-3xl xl:w-[40%]`}
    >
      <div className="inline-flex items-center justify-between w-full">
        <span className="text-black inline-flex items-center justify-center">
          <Text size="s">{bookmarks}</Text>
          <button onClick={handleBookmarkToggle}>
            {isBookmarked ? (
              <BookmarkSimpleIcon
                weight="fill"
                size={24}
                className="hover:scale-110 transition-transform cursor-pointer focus:border-0"
              />
            ) : (
              <BookmarkSimpleIcon
                weight="regular"
                size={24}
                className="hover:scale-110 transition-transform cursor-pointer focus:border-0"
              />
            )}
          </button>
        </span>
        <div className="inline-flex gap-5">
          <RollDropdownIconButton
            isOpen={isDropdownOpen}
            setIsOpen={setIsDropdownOpen}
            selectedRoll={selectedRoll}
            setSelectedRoll={setSelectedRoll}
            savedToRolls={savedToRolls}
            disabled={isLoading}
          />

          <PrimaryButton onClick={isSaved ? removeFromRoll : saveToRoll}>
            Save
          </PrimaryButton>
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
      <CommentSection id={id}></CommentSection>
    </div>
  );
};

export default PhotoInfoCard;
