import MasonryGalleryPage from "../MasonryGallery/page";
import { FilterLists } from "../datas/filterDatas";
export default function ExplorePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white-500 px-100">
      <section
        id="filter"
        className="text-black flex flex-row justify-between w-full"
      >
        {FilterLists.map((list, idx) => {
          return (
            <div key={idx}>
              <h3 className="text-[18px] text-white-700 font-light">
                {list.title}
              </h3>
              <div
                className={`grid ${
                  idx % 2 === 0 ? "grid-cols-1" : "grid-cols-2"
                }`}
              >
                {list.items.map((item, idx) => (
                  <div key={idx} className="mr-2 font-serif text-3xl">
                    <button className="cursor-pointer">{item.label}</button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <div className="border-t border-white-700 w-full">Default</div>
      <MasonryGalleryPage></MasonryGalleryPage>
    </div>
  );
}
