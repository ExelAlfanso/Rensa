"use client";

import React from "react";

interface SmallIconButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const SmallIconButton: React.FC<SmallIconButtonProps> = ({
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

export default SmallIconButton;
