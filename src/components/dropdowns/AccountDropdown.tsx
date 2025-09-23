"use client";

import React from "react";
import { CaretDownIcon } from "@phosphor-icons/react";
import { accountDropdownDatas } from "@/app/datas/accountDropdownDatas";
import IconDropdown from "./IconDropdown";
import Heading from "../Heading";
import Text from "../Text";
import DropdownItem from "./DropdownItem";
const AccountDropdown = () => {
  return (
    <div className="relative z-50">
      <IconDropdown
        weight="regular"
        position="center"
        Tag={CaretDownIcon}
        size={24}
      >
        <Heading size={"m"}>Account</Heading>
        {accountDropdownDatas.map((item, idx) => (
          <DropdownItem key={idx} href={item.href}>
            <Text size="m">{item.title}</Text>
          </DropdownItem>
        ))}
      </IconDropdown>
    </div>
  );
};

export default AccountDropdown;
