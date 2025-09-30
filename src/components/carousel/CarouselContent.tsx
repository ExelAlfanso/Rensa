interface CarouselContentProps {
  children: React.ReactNode;
}
const CarouselContent: React.FC<CarouselContentProps> = ({ children }) => {
  return (
    <div className="absolute right-30 -bottom-10 w-50 bg-[#fafafa] rounded-3xl shadow-lg overflow-visible">
      {children}
    </div>
  );
};
export default CarouselContent;
