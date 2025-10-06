"use client";

import React from "react";
import Button from "./Button";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TertiaryButton from "./TertiaryButton";

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
  let Tag = Button;
  if (color === "primary") {
    Tag = PrimaryButton;
  }
  if (color === "secondary") {
    Tag = SecondaryButton;
  }
  if (color === "tertiary") {
    Tag = TertiaryButton;
  }
  return (
    <Tag type={type} paddingX={paddingX}>
      {iconPosition === "left" && Icon && <Icon size={18} />}
      {children}
      {iconPosition === "right" && Icon && <Icon size={18} />}
    </Tag>
  );
};

export default IconButton;
