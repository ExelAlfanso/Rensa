import React from "react";
import Image from "next/image";
const ForestSection = () => {
  return (
    <div className="relative h-full font-serif text-white text-3xl">
      <Image
        src={"/forest.jpg"}
        priority
        fill
        sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
        alt={""}
      ></Image>
      <div className="absolute bottom-0 left-0 flex flex-col items-start justify-end w-full h-full text-center p-15">
        <h1>A Beautiful Day to Escape</h1>
        <p className="text-[16px]">@alfredawn</p>
      </div>
    </div>
  );
};

export default ForestSection;
