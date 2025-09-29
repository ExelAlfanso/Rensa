interface CarouselContentProps {
  children: React.ReactNode;
}
const CarouselContent: React.FC<CarouselContentProps> = ({ children }) => {
  return (
    <div className="absolute top-[32vh] left-[18vw] w-50 bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
      {children}
    </div>
  );
};
export default CarouselContent;
