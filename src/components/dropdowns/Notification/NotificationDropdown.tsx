import React from "react";
import NotificationButton from "../../buttons/NotificationButton";
import Heading from "../../Heading";
import Link from "next/link";
import Image from "next/image";
import Text from "@/components/Text";
import NotificationItem from "./NotificationItem";

interface NotificationDropdownProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  id,
  className,
  children,
}) => {
  return (
    <details className="dropdown dropdown-center">
      <NotificationButton></NotificationButton>
      <ul className="menu dropdown-content bg-white-500 rounded-3xl z-1 w-75 px-5 shadow-sm inline-flex items-center justify-center">
        <Heading alignment="center" size="m" className="py-6">
          Notifications
        </Heading>
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
        <NotificationItem />
      </ul>
    </details>
  );
};

export default NotificationDropdown;
