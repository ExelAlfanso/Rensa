"use client";

import React from "react";
import Button from "./Button";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import TertiaryButton from "./TertiaryButton";

interface IconButtonProps {
  type?: "submit" | "button";
  disabled?: boolean;
  iconPosition: "left" | "right" | "center";
  color?: "primary" | "secondary" | "tertiary";
  children?: React.ReactNode;
  weight?: "regular" | "bold";
  Icon?: React.ElementType;
  paddingX?: number;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = "button",
  color = "primary",
  children,
  iconPosition,
  Icon,
  paddingX = 6,
  disabled = false,
  weight = "regular",
  className,
  onClick,
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
    <Tag
      onClick={onClick}
      disabled={disabled}
      type={type}
      paddingX={paddingX}
      className={className}
    >
      {iconPosition === "left" && Icon && <Icon weight={weight} size={18} />}
      {children}
      {iconPosition === "right" && Icon && <Icon weight={weight} size={18} />}
    </Tag>
  );
};

export default IconButton;
