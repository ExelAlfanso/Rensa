import React from "react";
import Button, { ButtonProps } from "./Button";

const SecondaryButton: React.FC<ButtonProps> = ({
  id,
  className,
  href,
  children,
  onClick,
  type,
}) => {
  return (
    <Button
      type={type}
      id={id}
      href={href}
      onClick={onClick}
      className={`btn-secondary hover:bg-orange-300 focus:bg-orange-700 ${className}`}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
