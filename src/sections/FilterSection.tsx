"use client";
import FilterList from "@/components/lists/FilterList";
import ExploreTabs from "@/components/tabs/ExploreTabs";
import React, { useEffect, useState } from "react";
import MasonryGalleryPage from "./MasonryGallerySection";

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
    <div className="flex flex-col justify-center">
      <FilterList
        filters={filters}
        onFilterChange={setFilters}
        handleClearFilters={handleClearFilters}
      ></FilterList>
      <div className="border-t border-white-700 w-full my-11"></div>
      <ExploreTabs setActiveTab={setActiveTab} className="mb-10"></ExploreTabs>
      <MasonryGalleryPage
        activeTab={activeTab}
        filters={filters}
      ></MasonryGalleryPage>
    </div>
  );
};

export default FilterSection;
