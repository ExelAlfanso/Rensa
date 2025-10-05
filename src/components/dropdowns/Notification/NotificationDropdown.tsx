"use client";

import React from "react";
import { BellIcon } from "@phosphor-icons/react";
import Heading from "../../Heading";
import Image from "next/image";
import Text from "@/components/Text";
import { notificationDatas } from "@/app/datas/notificationDatas";
import IconDropdown from "../IconDropdown";
import DropdownItem from "../DropdownItem";

const NotificationDropdown = () => {
  return (
    <div className="relative z-50 w-full">
      <IconDropdown Tag={BellIcon}>
        <Heading alignment="center" size="m" className="py-6">
          Notifications
        </Heading>
        {/* this is a p
        laceholder, here will map through notification data state */}
        {notificationDatas.map((notification, idx) => (
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
            <Text size="s" className="inline">
              <span className="inline font-bold">{notification.username}</span>{" "}
              saved your image
            </Text>
          </DropdownItem>
        ))}
      </IconDropdown>
    </div>
  );
};

export default NotificationDropdown;
