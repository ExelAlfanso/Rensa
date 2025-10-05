import Link from "next/link";
import React from "react";

export interface ButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  paddingX?: number;
}

const Button: React.FC<ButtonProps> = ({
  id,
  className,
  href,
  children,
  onClick,
  paddingX = 6,
  type,
}) => {
  if (href) {
    return (
      <Link href={href}>
        <div
          className={`btn flex border-0 outline-0 ring-0 h-8 md:h-12 rounded-[50px] text-[12px] md:text-[16px] font-semibold ${className} px-${paddingX} gap-1}`}
        >
          {children}
        </div>
      </Link>
    );
  }
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`btn flex border-0 outline-0 ring-0 h-8 md:h-12 rounded-[50px] text-[12px] md:text-[16px] font-semibold ${className} px-${paddingX} gap-1`}
    >
      {children}
    </button>
  );
};

export default Button;
