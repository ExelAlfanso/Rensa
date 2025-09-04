import React from "react";

interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color: "primary" | "secondary" | "tertiary";
  type?: "submit" | "button";
  paddingX?: number;
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  onClick,
  color = "primary",
  paddingX = 6,
  type,
}) => {
  const colorClasses: { [key in ButtonProps["color"]]: string } = {
    primary: `btn-primary hover:bg-black-300 focus:bg-black-400 `,
    secondary: `btn-secondary hover:bg-orange-300 focus:bg-orange-700`,
    tertiary: `btn-ghost text-primary hover:bg-transparent hover:text-black-200 hover:border-white-600 border-1 border-primary`,
  };
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`btn flex border-0 outline-0 ring-0 ${colorClasses[color]} rounded-[50px] text-[16px] font-semibold ${className} px-${paddingX} gap-1`}
    >
      {children}
    </button>
  );
};

export default Button;
