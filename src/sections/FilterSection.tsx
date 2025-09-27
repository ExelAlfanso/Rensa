"use client";
import FilterList from "@/components/lists/FilterList";
import ExploreTabs from "@/components/tabs/ExploreTabs";
import React, { useState } from "react";
import MasonryGalleryPage from "./MasonryGallerySection";

const FilterSection = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <div className="flex flex-col justify-center">
      <FilterList></FilterList>
      <div className="border-t border-white-700 w-full my-11"></div>
      <ExploreTabs setActiveTab={setActiveTab} className="mb-10"></ExploreTabs>
      <MasonryGalleryPage activeTab={activeTab}></MasonryGalleryPage>
    </div>
  );
};

export default FilterSection;
