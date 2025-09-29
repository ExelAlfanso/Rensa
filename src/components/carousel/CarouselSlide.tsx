interface CarouselSlideProps {
  id: string;
  children: React.ReactNode;
}
const CarouselSlide: React.FC<CarouselSlideProps> = ({ id, children }) => {
  return (
    <div id={id} className="carousel-item relative w-[60vw] h-[50vh]">
      {children}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
        <a href="#slide4" className="btn btn-circle">
          ❮
        </a>
        <a href="#slide2" className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
};
export default CarouselSlide;
