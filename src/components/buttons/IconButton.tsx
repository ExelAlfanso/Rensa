import React from "react";
import Button from "./Button";
import { PlusIcon } from "@phosphor-icons/react";

interface IconButtonProps {
  type?: "submit" | "button";
  iconPosition: "left" | "right";
  color?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = "button",
  color = "primary",
  children,
  iconPosition,
}) => {
  return (
    <Button type={type} color={color}>
      {iconPosition === "left" && <PlusIcon size={18} />}
      {children}
      {iconPosition === "right" && <PlusIcon size={18} />}
    </Button>
  );
};

export default IconButton;
