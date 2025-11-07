"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { heroImagesData } from "@/app/datas/homeDatas";

export default function HeroSection() {
  return (
    <div id="hero-section" className="relative w-full h-screen overflow-hidden">
      {/* Top green text (color-dodge effect) */}
      <motion.div
        className="w-full absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[32px] md:text-4xl lg:text-7xl xl:text-8xl 
                   text-center font-figtree italic mix-blend-color-dodge text-[#56AD3B]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Where Every{" "}
        <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl inline">
          Picture
        </span>
        <br />
        Tells Its{" "}
        <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
          Recipe
        </span>
      </motion.div>

      {/* White overlay text (exclusion effect) */}
      <motion.div
        className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   text-[32px] md:text-4xl lg:text-7xl xl:text-8xl 
                   text-center font-figtree italic mix-blend-exclusion text-white"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        Where Every{" "}
        <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
          Picture
        </span>
        <br />
        Tells Its{" "}
        <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
          Recipe
        </span>
      </motion.div>

      {/* Background images */}
      <div className="relative w-screen h-screen z-10">
        {heroImagesData.map((data, i) => (
          <motion.div
            key={data.id}
            className={`absolute ${data.className} bg-gray-100`}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5 + i * 0.2, // staggered by index
              ease: "easeOut",
            }}
          >
            <Image
              alt="photo"
              fill
              src={data.src}
              className="w-full h-full object-cover rounded-lg"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
