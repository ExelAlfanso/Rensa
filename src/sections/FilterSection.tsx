"use client";
import FilterList from "@/components/lists/FilterList";
import ExploreTabs from "@/components/tabs/ExploreTabs";
import React, { useState } from "react";
import MasonryGalleryPage from "./MasonryGallerySection";

const FilterSection = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <FilterList></FilterList>
      <div className="border-t border-white-700 w-full my-11"></div>
      <ExploreTabs setActiveTab={setActiveTab} className="mb-10"></ExploreTabs>
      <MasonryGalleryPage activeTab={activeTab}></MasonryGalleryPage>
    </>
  );
};

export default FilterSection;
