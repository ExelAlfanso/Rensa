import { carouselData } from "@/app/datas/carouselDatas";
import Image from "next/image";
export default function Carousel() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center", // important to center horizontally
      });
    }
  };
  return (
    <div className="carousel w-full h-[76vh]">
      {carouselData.map((slide, index) => {
        const prevId =
          carouselData[(index - 1 + carouselData.length) % carouselData.length]
            .id;
        const nextId = carouselData[(index + 1) % carouselData.length].id;

        return (
          <div
            key={slide.id}
            id={slide.id}
            className="carousel-item relative w-full h-[40vh] md:h-[52vh]"
          >
            {/* Image wrapper */}
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0} // preload first image
              />
            </div>

            {/* Content */}
            <div className="absolute top-[25vh] md:top-[30vh] xl:right-[5vw] right-[5vw] w-[40vw] md:w-[25vw] xl:w-[15vw] bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
              <div className="p-6 md:text-[18px] flex flex-col font-figtree text-[12px] font-semibold text-primary">
                {slide.title}
                <div className="text-[8px] md:text-[10px] lg:text-[12px]">
                  {slide.specs.map((s, i) => (
                    <div key={i} className="font-light mt-2 text-black-200">
                      {s.label}
                      <div className="font-thin lg:mt-1 text-black">
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <button
                onClick={() => handleScroll(prevId)}
                className="btn btn-circle"
              >
                ❮
              </button>
              <button
                onClick={() => handleScroll(nextId)}
                className="btn btn-circle"
              >
                ❯
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
