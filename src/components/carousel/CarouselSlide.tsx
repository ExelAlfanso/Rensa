import Image from "next/image";

interface CarouselSlideProps {
  id: string;
  children: React.ReactNode;
  src: string;
}
const CarouselSlide: React.FC<CarouselSlideProps> = ({ id, children, src }) => {
  return (
    <div id={id} className="carousel-item relative w-full h-full">
      <div className="absolute inset-0">
        <Image
          alt="photo"
          src={src}
          fill
          className="w-full h-full object-cover"
        />
      </div>

      {children}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
        <a
          href={`#slide${Number(id.slice(-1)) - 1}`}
          className="btn btn-circle"
        >
          ❮
        </a>
        <a
          href={`#slide${Number(id.slice(-1)) + 1}`}
          className="btn btn-circle"
        >
          ❯
        </a>
      </div>
    </div>
  );
};
export default CarouselSlide;
