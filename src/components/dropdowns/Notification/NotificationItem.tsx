import Link from "next/link";
import Image from "next/image";
import Text from "@/components/Text";
import React from "react";

interface NotificationItemProps {
  src: string;
  username: string;
  className?: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  src,
  username,
  className,
}) => {
  return (
    <li>
      <Link href="#" className={`px-5 w-full ${className} hover:bg-white-600`}>
        <div className="avatar w-12 h-12 inline mr-3">
          <Image
            src={src || "/profile.jpg"}
            alt="profile"
            fill
            className="object-cover rounded-2xl aspect-square"
          />
        </div>
        <Text size="s" className="inline">
          <span className="inline font-bold">{username}</span> saved your image
        </Text>
      </Link>
    </li>
  );
};

export default NotificationItem;
