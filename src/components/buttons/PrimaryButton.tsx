import React from "react";
import Button, { ButtonProps } from "./Button";

const PrimaryButton: React.FC<ButtonProps> = ({
  id,
  className,
  href,
  children,
  onClick,
  type,
  disabled,
}) => {
  return (
    <Button
      type={type}
      id={id}
      onClick={onClick}
      href={href}
      disabled={disabled}
      className={`btn-primary hover:bg-black-300 focus:bg-black-400 disabled:bg-black-200 ${className}`}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
