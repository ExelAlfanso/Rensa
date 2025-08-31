import React from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "primary" | "secondary" | "tertiary";
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  onClick,
  type,
}) => {
  const typeClasses: { [key in ButtonProps["type"]]: string } = {
    primary: `btn-primary hover:bg-black-300 focus:bg-black-400`,
    secondary: `btn-secondary hover:bg-orange-300 focus:bg-orange-700`,
    tertiary: `btn-ghost hover:text-gray-400 hover:bg-transparent focus:text-primary`,
  };
  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className={`btn btn-lg border-0 outline-0 ring-0 ${typeClasses[type]} rounded-[50px] text-[16px] font-semibold px-6 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
