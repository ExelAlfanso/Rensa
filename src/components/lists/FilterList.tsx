import React, { useEffect, useState } from "react";
import { FilterLists } from "@/app/datas/filterDatas";
import Text from "../Text";

interface FilterListProps {
  onFilterChange: React.Dispatch<React.SetStateAction<string[]>>;
  filters: string[];
  handleClearFilters: () => void;
}

const FilterList: React.FC<FilterListProps> = ({
  onFilterChange,
  filters,
  handleClearFilters,
}) => {
  // local UI state for toggled filters
  const [activeFilters, setActiveFilters] = useState<string[]>(filters);

  // ✅ Sync to parent only AFTER local state changes
  useEffect(() => {
    onFilterChange(activeFilters);
  }, [activeFilters, onFilterChange]);

  const toggleFilter = (label: string) => {
    const lower = label.toLowerCase();
    setActiveFilters((prev) =>
      prev.includes(lower) ? prev.filter((f) => f !== lower) : [...prev, lower]
    );
  };

  const handleClearFiltersClick = () => {
    setActiveFilters([]);
    handleClearFilters();
  };

  return (
    <div className="px-3">
      <div className="grid grid-rows-2 grid-cols-2 lg:flex lg:flex-row md:justify-between text-black w-full pt-50 mb-11">
        {FilterLists.map((list, idx) => (
          <div key={idx}>
            <Text size="s" className="text-white-700 font-light">
              {list.title}
            </Text>
            <div
              className={`grid ${
                list.column === 1 ? "grid-cols-1" : "gap-x-10 grid-cols-2"
              }`}
            >
              {list.items.map((item, idx) => {
                const isActive = activeFilters.includes(
                  item.label.toLowerCase()
                );
                return (
                  <div
                    key={idx}
                    className="font-forum text-[14px] sm:text-[20px] lg:text-2xl 2xl:text-3xl"
                  >
                    <button
                      onClick={() => toggleFilter(item.label)}
                      className="relative cursor-pointer hover:text-gray-700 transition-colors duration-300 mr-5 pb-1"
                    >
                      <span>{item.label}</span>
                      {/* underline animation */}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] w-full bg-orange-500 transform transition-transform duration-300 origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <button
          onClick={handleClearFiltersClick}
          className="btn border-0 outline-0 ring-0 hover:bg-red-500 bg-[#BC0E0E] rounded-full"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default FilterList;
