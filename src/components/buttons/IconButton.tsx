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
  weight?: "regular" | "bold";
  Icon?: React.ElementType;
  paddingX?: number;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = "button",
  color = "primary",
  children,
  iconPosition,
  Icon,
  paddingX = 6,
  weight = "regular",
  className,
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
    <Tag type={type} paddingX={paddingX} className={className}>
      {iconPosition === "left" && Icon && <Icon weight={weight} size={18} />}
      {children}
      {iconPosition === "right" && Icon && <Icon weight={weight} size={18} />}
    </Tag>
  );
};

export default IconButton;
