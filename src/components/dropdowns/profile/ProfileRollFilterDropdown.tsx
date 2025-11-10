"use client";

import React from "react";
import TertiaryDropdown from "../TertiaryDropdown";

interface ProfileRollFilterDropdownProps {
  setFilter?: (filter: string) => void;
}

const ProfileRollFilterDropdown: React.FC<ProfileRollFilterDropdownProps> = ({
  setFilter,
}) => {
  const filters = ["Latest", "Oldest", "Most Popular", "Least Popular"];
  return (
    <TertiaryDropdown
      className="w-48"
      initialValue={"Latest"}
      values={filters}
      onChange={(value) => setFilter?.(value)}
    />
  );
};

export default ProfileRollFilterDropdown;
