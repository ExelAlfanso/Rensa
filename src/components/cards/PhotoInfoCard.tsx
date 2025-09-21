"use client";

import React, { useEffect } from "react";
import Button from "../buttons/Button";
import Heading from "../Heading";
import Text from "../Text";
import Comment from "../Comment";

import {
  BookmarkSimpleIcon,
  CameraIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import IconButton from "../buttons/IconButton";
import ProfileIconButton from "../buttons/ProfileIconButton";
import { formatDate } from "@/utils/DateFormatter";
import { PhotoMetadata } from "@/models/Photo";
import RecipeList from "../lists/RecipeList";
import ProfileBadge from "../badges/ProfileBadge";
import CommentInputField from "../inputfields/CommentInputField";
import api from "@/lib/axios";
interface PhotoInfoCardProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  userId: string;
  metadata?: PhotoMetadata;
}
//TODO: Comment feature
//TODO: Save feature
//TODO: Bookmark feature

const PhotoInfoCard: React.FC<PhotoInfoCardProps> = ({
  id,
  className,
  children,
  title,
  description,
  metadata,
  userId,
}) => {
  const [username, setUsername] = React.useState("Loading...");
  const [avatarUrl, setAvatarUrl] = React.useState("/profile.jpg");

  useEffect(() => {
    fetchProfileData(userId);
  }, [userId]);

  const fetchProfileData = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}`);
      if (response) {
        setUsername(response.data.username);
        setAvatarUrl(response.data.avatarUrl);
      }
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };
  return (
    <div
      id={id}
      className={`flex flex-col gap-1.5 bg-white-200 ${className} shadow-lg p-10 rounded-3xl text-primary`}
    >
      <div className="inline-flex items-center justify-between w-full">
        <span className="text-black inline-flex items-center justify-center">
          <Text size="s">24</Text>
          <BookmarkSimpleIcon weight="fill" size={28} />
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

          <Button color="primary">Save</Button>
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
        <Text size="m" className="text-black-200 max-w-[350px]">
          {description}
        </Text>
      </div>
      <div>
        <RecipeList metadata={metadata}></RecipeList>
      </div>
      <div>
        <Heading size="m" className="mb-5">
          Comments
        </Heading>
        <div className="overflow-y-scroll no-scrollbar h-35">
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
          <Comment>Nice looking picture mate!</Comment>
        </div>
        <CommentInputField></CommentInputField>
      </div>

      {children}
    </div>
  );
};

export default PhotoInfoCard;
