import React, { useState } from "react";
import InputField from "./InputField";
import { ChatTeardropIcon } from "@phosphor-icons/react";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";
import { CommentType } from "@/sections/CommentSection";

interface CommentInputFieldProps {
  id?: string;
  onAddComment: (c: CommentType) => void;
}

const CommentInputField: React.FC<CommentInputFieldProps> = ({
  id,
  onAddComment,
}) => {
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    const tempId = Math.random().toString(36).substr(2, 9);

    const newComment: CommentType = {
      _id: tempId,
      text: comment,
      userId: {
        _id: user?.id || "unknown",
        username: user?.name || "Anonymous",
        avatarUrl: user?.image || "/profile.jpg",
      },
      createdAt: new Date().toISOString(),
    };

    onAddComment(newComment);
    setComment("");

    try {
      await api.post(`/photos/${id}/comments`, {
        text: newComment.text,
        userId: user?.id,
      });
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <InputField
      type="text"
      size="m"
      Icon={ChatTeardropIcon}
      iconPosition="left"
      placeholder="Comment"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
      }}
    />
  );
};

export default CommentInputField;
