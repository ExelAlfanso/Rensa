"use client";

import React from "react";

interface IconButtonProps {
  onClick:
    | (() => void)
    | ((e: React.MouseEvent<HTMLButtonElement>) => Promise<void>);
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className,
  disabled,
  children,
}) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onClick(e);
  };
  return (
    <button
      disabled={disabled}
      onClick={onClickHandler}
      className={`${className} text-black hover:bg-white-700 cursor-pointer rounded-full transition-opacity duration-300`}
    >
      {children}
    </button>
  );
};

export default IconButton;
