import ExploreNavBar from "@/components/navbar/ExploreNavBar";
import FilterSection from "@/sections/FilterSection";
export default function ExplorePage() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-white-500 px-[260px]">
      <ExploreNavBar></ExploreNavBar>
      <FilterSection></FilterSection>
    </div>
  );
}
