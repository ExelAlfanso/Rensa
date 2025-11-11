"use client";
import FilterList from "@/components/lists/FilterList";
import ExploreTabs from "@/components/tabs/ExploreTabs";
import React, { useEffect, useState } from "react";
import MasonryGalleryPage from "./MasonryGallerySection/MasonryGallerySection";

const FilterSection = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [filters, setFilters] = useState<string[]>([]);
  const handleClearFilters = () => {
    setFilters([]);
  };
  // useEffect(() => {
  //   console.log(filters);
  // }, [filters]);
  return (
    <div className="flex flex-col justify-center w-full px-[25px] md:px-[30px] lg:px-[70px] xl:px-[90px] 2xl:px-[260px]">
      <FilterList
        filters={filters}
        onFilterChange={setFilters}
        handleClearFilters={handleClearFilters}
      ></FilterList>
      <div className="border-t border-white-700 my-11"></div>
      <ExploreTabs setActiveTab={setActiveTab} className="mb-10"></ExploreTabs>
      <MasonryGalleryPage
        activeTab={activeTab}
        filters={filters}
        useDatabase={true}
      ></MasonryGalleryPage>
    </div>
  );
};

export default FilterSection;
