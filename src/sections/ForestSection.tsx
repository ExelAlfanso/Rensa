import React from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
const ForestSection = () => {
  return (
    <div className="relative h-full font-forum text-3xl text-white">
      <Image
        src={"/forest.jpg"}
        priority
        fill
        sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
        alt={""}
      ></Image>
      <div className="absolute bottom-0 left-0 flex flex-col items-start justify-end w-full h-full text-left p-15">
        <Heading size="l">A Beautiful Day to Escape</Heading>
        <p className="text-[16px]">@alfredawn</p>
      </div>
    </div>
  );
};

export default ForestSection;
