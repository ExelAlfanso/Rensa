import React, { useState } from "react";
import InputField from "./InputField";
import { ChatTeardropIcon } from "@phosphor-icons/react";

interface CommentInputFieldProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const CommentInputField: React.FC<CommentInputFieldProps> = ({
  id,
  className,
  children,
}) => {
  const [comment, setComment] = useState("");
  return (
    <InputField
      type={"text"}
      size="m"
      Icon={ChatTeardropIcon}
      iconPosition="left"
      placeholder="Comment"
      onChange={(e) => {
        setComment(e.target.value);
      }}
    ></InputField>
  );
};

export default CommentInputField;
