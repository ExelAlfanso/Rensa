import React from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "submit" | "reset" | "button";
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`btn btn-primary ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
