"use client";

import ExploreTabs from "@/components/tabs/ExploreTabs";
import { useState } from "react";
import FilterList from "../../components/lists/FilterList";
import MasonryGalleryPage from "@/sections/MasonryGallerySection";
export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-white-500 px-[260px]">
      <section
        id="filter"
        className="text-black flex flex-row justify-between w-full"
      >
        <FilterList></FilterList>
      </section>
      <div className="border-t border-white-700 w-full my-11"></div>
      <ExploreTabs setActiveTab={setActiveTab} className="mb-10"></ExploreTabs>
      <MasonryGalleryPage activeTab={activeTab}></MasonryGalleryPage>
    </div>
  );
}
