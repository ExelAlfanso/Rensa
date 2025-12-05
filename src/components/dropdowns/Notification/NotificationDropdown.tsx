"use client";

import React from "react";
import { BellIcon } from "@phosphor-icons/react";
import Heading from "../../Heading";
import Image from "next/image";
import Text from "@/components/Text";
import IconDropdown from "../IconDropdown";
import DropdownItem from "../DropdownItem";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationDropdown = () => {
  const { notifications } = useNotifications();

  return (
    <div className="relative z-50 w-full">
      <IconDropdown Tag={BellIcon}>
        <Heading alignment="center" size="m" className="py-6">
          Notifications
        </Heading>
        {/* {notificationDatas.map((notification, idx) => (
          <DropdownItem
            key={notification.id}
            href={notification.href}
            className={
              idx === notificationDatas.length - 1 ? "rounded-b-2xl" : ""
            }
          >
            <div className={`avatar w-12 h-12 inline mr-3 `}>
              <Image
                src={notification.src || "/profile.jpg"}
                alt="profile"
                fill
                className="object-cover rounded-2xl aspect-square"
              />
            </div>
            <Text size="xs" className="inline">
              <span className="inline font-bold">{notification.username}</span>{" "}
              saved your image
            </Text>
          </DropdownItem>
        ))} */}
        {notifications.length > 0 ? (
          notifications.map((notification, idx) => (
            <DropdownItem
              key={notification.id}
              href={notification.href}
              className={
                idx === notifications.length - 1 ? "rounded-b-2xl" : ""
              }
            >
              <div className={`avatar w-12 h-12 inline mr-3 `}>
                <Image
                  src={notification.user.src || "/profile.jpg"}
                  alt="profile"
                  fill
                  className="object-cover rounded-2xl aspect-square"
                />
              </div>
              <Text size="xs" className="inline">
                <span className="inline font-bold">
                  {notification.user.username}
                </span>{" "}
                saved your image
              </Text>
            </DropdownItem>
          ))
        ) : (
          <Text size="s" className="mb-10 text-gray-400">
            No notifications
          </Text>
        )}
      </IconDropdown>
    </div>
  );
};

export default NotificationDropdown;
