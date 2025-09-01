import React from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  role?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color: "primary" | "secondary" | "tertiary";
  type?: "submit" | "button";
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  onClick,
  color = "primary",
  role,
  type,
}) => {
  const colorClasses: { [key in ButtonProps["color"]]: string } = {
    primary: `btn-primary hov er:bg-black-300 focus:bg-black-400`,
    secondary: `btn-secondary hover:bg-orange-300 focus:bg-orange-700`,
    tertiary: `btn-ghost hover:text-gray-400 hover:bg-transparent focus:text-primary`,
  };
  return (
    <button
      type={type}
      id={id}
      role={role}
      onClick={onClick}
      className={`btn flex border-0 outline-0 ring-0 ${colorClasses[color]} rounded-[50px] text-[16px] font-semibold px-6 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
