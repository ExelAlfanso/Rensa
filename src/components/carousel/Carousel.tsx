import CarouselContent from "./CarouselContent";
import CarouselSlide from "./CarouselSlide";
import { carouselData } from "@/app/datas/carouselDatas";

export default function Carousel() {
  return (
    <div className="carousel w-full h-full rounded-3xl shadow-lg">
      {carouselData.map((slide) => (
        <CarouselSlide key={slide.id} id={slide.id} src={slide.src}>
          <CarouselContent>
            <div className="p-4 flex flex-col font-figtree text-xl font-semibold">
              {slide.title}
              <div className="pl-2">
                {slide.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="text-xs font-light mt-2 text-black-200"
                  >
                    {spec.label}
                    <div className="text-sm font-thin mt-1 text-black">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CarouselContent>
        </CarouselSlide>
      ))}
    </div>
  );
}
