import FilterSection from "@/sections/FilterSection";
export default function ExplorePage() {
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white-500 px-[25px] md:px-[30px] lg:px-[70px] xl:px-[90px] 2xl:px-[260px]">
      {/* <ExploreNavBar></ExploreNavBar> */}
      <FilterSection></FilterSection>
    </div>
  );
}
