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
      initialValue={"Latest"}
      values={filters}
      onChange={(e) => setFilter?.(e.currentTarget.innerText)}
    />
  );
};

export default ProfileRollFilterDropdown;
