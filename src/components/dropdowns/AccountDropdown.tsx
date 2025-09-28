"use client";

import React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { accountDropdownDatas } from "@/app/datas/accountDropdownDatas";
import IconDropdown from "./IconDropdown";
import Heading from "../Heading";
import Image from "next/image";
import Text from "../Text";
import DropdownItem from "./DropdownItem";

interface AccountDropdownProps {
  src: string;
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
}

const AccountDropdown = ({ src, user }: AccountDropdownProps) => {
  return (
    <div className="relative z-50">
      <IconDropdown
        weight="regular"
        position="left"
        Tag={CaretDownIcon}
        iconSize={24}
      >
        <DropdownItem
          href="/profile"
          className="flex flex-col items-start justify-start gap-2 roundend-t-2xl"
        >
          <div className="flex flex-row justify-center items-center gap-3 ">
            <div className="relative rounded-full w-10 h-10 md:w-12 md:h-12">
              <Image
                src={src}
                fill
                alt="Profile"
                className="object-cover rounded-full aspect-square"
              />
            </div>
            <div>
              <Text>{user?.name}</Text>
              <Text className="text-gray-600 font-light" size="s">
                Free Plan
              </Text>
            </div>
          </div>
        </DropdownItem>
        <div className="border-t border-white-700 w-[90%] my-2"></div>
        {accountDropdownDatas.map((item, idx) => (
          <DropdownItem key={idx} href={item.href}>
            <item.icon className="w-6 h-6 md:w-8 md:h-8 mr-2" />
            <Text size="m">{item.title}</Text>
          </DropdownItem>
        ))}
      </IconDropdown>
    </div>
  );
};

export default AccountDropdown;
