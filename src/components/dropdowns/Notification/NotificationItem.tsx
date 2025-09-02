import Link from "next/link";
import React from "react";
import Image from "next/image";
import Text from "@/components/Text";
const NotificationItem = () => {
  return (
    <li className="hover:bg-white-600 rounded-2xl">
      <Link href="#">
        <div className="avatar w-12 h-12 inline">
          <Image
            src="/profile.jpg"
            alt="Notification"
            fill
            className="object-cover rounded-full aspect-square"
          />
        </div>
        <Text size="s" className="inline">
          username saved your image
        </Text>
      </Link>
    </li>
  );
};

export default NotificationItem;
