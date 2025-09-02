import { BellIcon } from "@phosphor-icons/react";
import React from "react";

interface NotificationButtonProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  id,
  className,
  children,
}) => {
  return (
    <div
      id={id}
      className={`cursor-pointer hover:text-gray-800 transition-colors duration-300 ${className}`}
    >
      <BellIcon size={32} weight="fill"></BellIcon>
      {children}
    </div>
  );
};

export default NotificationButton;
