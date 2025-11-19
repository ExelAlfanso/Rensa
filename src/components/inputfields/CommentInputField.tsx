import React, { useEffect } from "react";
import InputField from "./InputField";
import { ChatTeardropIcon } from "@phosphor-icons/react";
import { useAtom } from "jotai";
import commentAtom from "@/stores/atoms/CommentSection/commentAtom";
import photoCommentsAtom, {
  CommentType,
} from "@/stores/atoms/CommentSection/photoCommentsAtom";
import { useAuthStore } from "@/stores/useAuthStore";
import api from "@/lib/axios";
interface CommentInputFieldProps {
  id?: string;
}
const CommentInputField: React.FC<CommentInputFieldProps> = ({ id }) => {
  const { user } = useAuthStore();
  const [comment, setComment] = useAtom(commentAtom);
  const [, setComments] = useAtom(photoCommentsAtom);
  const handleSubmit = async () => {
    if (comment.trim() === "" || comment.length === 0 || comment.length > 500) {
      return;
    }
    setComments((prevComments: CommentType[]) => [
      ...prevComments,
      {
        _id: Math.random().toString(36).substr(2, 9),
        text: comment,
        userId: {
          _id: user?.id || "unknown",
          username: user?.name || "Anonymous",
          avatarUrl: user?.image || "/profile.jpg",
        },
        createdAt: new Date().toISOString(),
      },
    ]);
    setComment("");

    try {
      const res = await api.post(`/photos/${id}/comments`, {
        text: comment,
        userId: user?.id,
      });
      console.log("Comment posted successfully:", res.data);
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  // useEffect(() => {
  //   console.log("Comments updated:", comment);
  // }, [comment]);
  return (
    <InputField
      type={"text"}
      size="m"
      Icon={ChatTeardropIcon}
      iconPosition="left"
      placeholder="Comment"
      value={comment}
      onChange={(e) => {
        setComment(e.target.value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmit();
        }
      }}
    ></InputField>
  );
};

export default CommentInputField;
