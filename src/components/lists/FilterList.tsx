import { FilterLists } from "@/app/datas/filterDatas";
import React from "react";
import Text from "../Text";

const FilterList = () => {
  return (
    <div className="px-3 md:px-0">
      <div className="grid grid-rows-2 grid-cols-2 lg:flex lg:flex-row md:justify-between text-black w-full pt-50 mb-11">
        {FilterLists.map((list, idx) => {
          return (
            <div key={idx}>
              <Text size="s" className="text-white-700 font-light">
                {list.title}
              </Text>
              <div
                className={`grid ${
                  list.column === 1 ? "grid-cols-1" : "gap-x-10 grid-cols-2"
                }`}
              >
                {list.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="font-forum text-[14px] sm:text-[20px] lg:text-2xl 2xl:text-3xl"
                  >
                    <button
                      className={`cursor-pointer hover:text-gray-700 transition-colors duration-300 mr-5
                  }`}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn border-0 outline-0 ring-0 bg-[#BC0E0E] rounded-full">
        Clear
      </button>
    </div>
  );
};

export default FilterList;
