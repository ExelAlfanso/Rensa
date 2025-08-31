import React from "react";
import Button from "./Button";
import { PlusIcon } from "@phosphor-icons/react";

interface IconButtonProps {
  type: "primary" | "secondary" | "tertiary";
  iconPosition: "left" | "right";
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  type,
  children,
  iconPosition,
}) => {
  return (
    <Button type={type}>
      {iconPosition === "left" && <PlusIcon size={18} />}
      {children}
      {iconPosition === "right" && <PlusIcon size={18} />}
    </Button>
  );
};

export default IconButton;
