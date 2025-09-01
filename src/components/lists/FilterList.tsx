import { FilterLists } from "@/app/datas/filterDatas";
import React from "react";

const FilterList = () => {
  return (
    <>
      {FilterLists.map((list, idx) => {
        return (
          <div key={idx}>
            <h3 className="text-[18px] text-white-700 font-light">
              {list.title}
            </h3>
            <div
              className={`grid ${
                list.column === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {list.items.map((item, idx) => (
                <div key={idx} className="mr-5 font-serif text-3xl">
                  <button
                    className={`cursor-pointer hover:text-gray-700 transition-colors duration-300 ${
                      list.column === 1 ? "" : "mr-10"
                    }
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
    </>
  );
};

export default FilterList;
