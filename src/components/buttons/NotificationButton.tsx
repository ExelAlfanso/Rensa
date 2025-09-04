"use client";

import { BellIcon } from "@phosphor-icons/react";
import React from "react";

interface NotificationButtonProps {
  id?: string;
  className?: string;
  popoverTarget: string;
  onClick?: () => void;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  id,
  className,
  popoverTarget,
  onClick,
}) => {
  return (
    <button
      id={id}
      popoverTarget={popoverTarget}
      className={`btn bg-transparent border-0 outline-0 ring-0 cursor-pointer hover:text-gray-800 transition-colors duration-300 text-primary ${className}`}
      style={{ anchorName: "--anchor-1" } as React.CSSProperties}
      onClick={onClick}
    >
      <BellIcon size={32} weight="fill"></BellIcon>
    </button>
  );
};

export default NotificationButton;
