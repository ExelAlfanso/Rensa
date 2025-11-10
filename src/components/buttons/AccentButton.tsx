import React from "react";
import { ButtonProps } from "./Button";
import Link from "next/link";

const AccentButton: React.FC<ButtonProps> = ({
  id,
  className,
  children,
  href,
  onClick,
  disabled,
  type,
}) => {
  const baseClasses = `btn flex border-0 outline-0 ring-0 h-[29px] rounded-[10px] text-[12px] md:text-[16px] font-semibold ${className} px-3 p-0 bg-gray-100 hover:bg-gray-200 text-primary gap-1`;

  if (href && !disabled) {
    return (
      <Link href={href}>
        <div className={`${baseClasses}`}>{children}</div>
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      type={type}
      id={id}
      onClick={onClick}
      className={`${baseClasses} `}
    >
      {children}
    </button>
  );
};

export default AccentButton;
