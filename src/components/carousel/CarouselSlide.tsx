import Image from "next/image";

interface CarouselSlideProps {
  id: string;
  children: React.ReactNode;
  src: string;
  className?: string;
}
const CarouselSlide: React.FC<CarouselSlideProps> = ({
  id,
  children,
  src,
  className,
}) => {
  const handleNext = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };
  return (
    <div
      id={id}
      className={`carousel-item relative w-full h-[20vh] lg:h-full ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          alt="photo"
          src={src}
          fill
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute right-30 -bottom-10 w-[20vw] h-fit bg-[#fafafa] z-10 rounded-3xl shadow-lg overflow-visible">
        {children}
      </div>
      <div className="absolute z-30 flex justify-between -translate-y-1/2 left-5 right-5 top-1/2">
        <button
          onClick={() => handleNext(`slide${Number(id.slice(-1)) - 1}`)}
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => handleNext(`slide${Number(id.slice(-1)) + 1}`)}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
    </div>
  );
};
export default CarouselSlide;
