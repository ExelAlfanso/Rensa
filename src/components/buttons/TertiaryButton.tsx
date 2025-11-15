import React from "react";
import Button, { ButtonProps } from "./Button";

const TertiaryButton: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  href,
  onClick,
  type,
}) => {
  return (
    <Button
      type={type}
      id={id}
      href={href}
      onClick={onClick}
      className={`btn-ghost text-primary hover:bg-transparent hover:text-black-200 hover:border-white-600 border-1 border-primary ${className}`}
    >
      {children}
    </Button>
  );
};

export default TertiaryButton;
