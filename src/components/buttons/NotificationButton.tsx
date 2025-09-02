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
    <summary
      id={id}
      className={`btn bg-transparent border-0 outline-0 ring-0 cursor-pointer hover:text-gray-800 transition-colors duration-300 text-primary ${className}`}
    >
      <BellIcon size={32} weight="fill"></BellIcon>
      {children}
    </summary>
  );
};

export default NotificationButton;
