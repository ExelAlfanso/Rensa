import { CaretDownIcon } from "@phosphor-icons/react";
import React from "react";
import Text from "@/components/Text";

const RollDropdown = () => {
  return (
    <div className="flex flex-row items-center gap-2 font-semibold cursor-pointer">
      <Text size={"xs"}>All Photos</Text> <CaretDownIcon weight="bold" />
    </div>
  );
};

export default RollDropdown;
