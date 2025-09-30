"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import IconButton from "@/components/buttons/IconButton";
import { ArrowArcRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/carousel/Carousel";

import { cardData } from "@/app/datas/homeDatas";
import HeroSection from "@/sections/HeroSection";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import Footer from "@/components/footer/Footer";

export default function LandingPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const motions = [
    useSpring(useTransform(scrollYProgress, [0, 0.4], ["100vh", "0vh"]), {
      stiffness: 100,
      damping: 20,
    }),
    useSpring(useTransform(scrollYProgress, [0, 0.62], ["120vh", "-20vh"]), {
      stiffness: 100,
      damping: 20,
    }),
    useSpring(useTransform(scrollYProgress, [0, 0.75], ["80vh", "-40vh"]), {
      stiffness: 100,
      damping: 20,
    }),
    useSpring(useTransform(scrollYProgress, [0, 0.9], ["140vh", "-60vh"]), {
      stiffness: 100,
      damping: 20,
    }),
  ];

  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "0vh"]);
  const textOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 20 });
  const smoothTextOpacity = useSpring(textOpacity, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <div className="bg-white-100 w-full">
      <HomeNavbar></HomeNavbar>
      <HeroSection></HeroSection>
      <div
        id="idea-content"
        className="static flex flex-col xl:flex-row w-full h-[50%] xl:h-screen p-10 xl:p-40 justfify-center lg:justify-between items-center"
      >
        <div className="flex flex-col pr-10 pb-8 xl:pb-[28vh]">
          <div className="text-[32px] md:text-4xl lg:text-5xl xl:text-7xl font-figtree font-medium text-black-500 pb-[4vh] text-center xl:text-left">
            Get an <span className="font-forum">Idea</span>
            <br />
            <span className="ml-[16px] lg:text-right">of What You Should </span>
            <br />
            <span className="font-forum">Shoot </span>
            Tomorrow
          </div>
          <div className="font-figtree font-light text-[10px] md:text-[1rem] text-center xl:text-left text-black-300 mx-4">
            <p>
              Stuck on what to capture next? Explore fresh perspectives from the
              community – each photo comes with a detailed recipe, so you can
              recreate the vibe or twist it your own way.
            </p>
          </div>
        </div>
        <Carousel />
      </div>
      <div className="h-[50vh] pt-30">
        <section
          ref={sectionRef}
          className="relative z-0 h-[400vh] bg-white text-center text-black"
        >
          <div className="sticky left-0 top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
            {cardData.map((card, index) => (
              <motion.div
                key={card.id}
                className={`${card.position} rounded-lg bg-gray-100 overflow-hidden`}
                style={{ y: motions[index] }}
              >
                <Image
                  alt="photo"
                  fill
                  src={card.src}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            {/* Text CTA */}
            <motion.div
              className="absolute top-[35vh] left-1/2 -translate-x-1/2 z-20 text-center px-6 w-[75%] "
              style={{ y: smoothTextY, opacity: smoothTextOpacity }}
            >
              <h1 className="text-[40px] lg:text-6xl font-figtree font-medium mb-4 text-black-500 w-fit mx-auto">
                Every <span className="font-forum">Picture</span> Holds a
                <span className="font-forum"> Secret</span>.
              </h1>
              <p className="text-[12px] md:text-xl leading-relaxed font-figtree font-light text-black-300x  ">
                Behind every frame lies a quiet formula — the shutter&apos;s
                breath, the lens&apos;s sigh, the light&apos;s gentle fall.{" "}
                <span className="font-semibold">Rensa</span> lets you see it
                all, so tomorrow, your own story can be told the same way.
              </p>
              <div className="mt-4 flex justify-center items-center">
                <Link href="/explore">
                  <IconButton
                    iconPosition="left"
                    Icon={ArrowArcRightIcon}
                    paddingX={16}
                    color="primary"
                    type="button"
                  >
                    Explore Now
                  </IconButton>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
