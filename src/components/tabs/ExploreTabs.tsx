"use client";

import { tabDatas } from "@/app/datas/exploreDatas";
import React from "react";
import "./ExploreTabs.css";
interface ExploreTabsProps {
  setActiveTab?: (tab: string) => void;
  className?: string;
}

const ExploreTabs: React.FC<ExploreTabsProps> = ({
  className,
  setActiveTab,
}) => {
  return (
    <div className={`tabs tabs-border ${className}`}>
      {tabDatas.map((tab, idx) => (
        <input
          key={idx}
          type="radio"
          name="my_tabs_2"
          className={`tab transition-all duration-300 hover:text-black-300 text-primary text-[14px] md:text-[20px] `}
          onClick={() => {
            setActiveTab?.(tab.id);
            tab.isActive = !tab.isActive;
          }}
          defaultChecked={tab.id === "tab1"}
          aria-label={tab.label}
        />
      ))}
    </div>
  );
};

export default ExploreTabs;
