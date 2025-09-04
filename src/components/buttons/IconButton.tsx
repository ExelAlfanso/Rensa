"use client";

import React from "react";
import Button from "./Button";

interface IconButtonProps {
  type?: "submit" | "button";
  iconPosition: "left" | "right";
  color?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  Icon?: React.ElementType;
  paddingX?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = "button",
  color = "primary",
  children,
  iconPosition,
  Icon,
  paddingX = 6,
}) => {
  return (
    <Button type={type} color={color} paddingX={paddingX}>
      {iconPosition === "left" && Icon && <Icon size={18} />}
      {children}
      {iconPosition === "right" && Icon && <Icon size={18} />}
    </Button>
  );
};

export default IconButton;
