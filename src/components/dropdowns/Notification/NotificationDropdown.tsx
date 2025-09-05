"use client";

import React from "react";
import NotificationButton from "../../buttons/NotificationButton";
import Heading from "../../Heading";
import NotificationItem from "./NotificationItem";
import { notificationDatas } from "@/app/datas/notificationDatas";
import IconDropdown from "../IconDropdown";

const NotificationDropdown = () => {
  return (
    <div>
      <IconDropdown Tag={NotificationButton}>
        <Heading alignment="center" size="m" className="py-6">
          Notifications
        </Heading>
        {notificationDatas.map((notification, idx) => (
          <NotificationItem
            key={idx}
            src={notification.src}
            username={notification.username}
            className={
              idx === notificationDatas.length - 1 ? "rounded-b-2xl" : ""
            }
          />
        ))}
      </IconDropdown>
    </div>
  );
};

export default NotificationDropdown;
