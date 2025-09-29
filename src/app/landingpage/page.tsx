"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import { ArrowArcRightIcon, CaretRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import CarouselContent from "@/components/carousel/CarouselContent";
import CarouselSlide from "@/components/carousel/CarouselSlide";

export default function LandingPage() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const fetchImages = useCallback(async (page: number) => {
    const newImages = Array.from({ length: 10 }, () => {
      const h = 300 + Math.floor(Math.random() * 200);
      return `https://picsum.photos/200/${h}?random=${Math.random()}`;
    });
    setImgUrls((prev) => [...prev, ...newImages]);
  }, []);
  useEffect(() => {
    fetchImages(8); // load 8 random images at mount
  }, [fetchImages]);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const card1Y = useTransform(scrollYProgress, [0, 0.4], ["100vh", "0vh"]);
  const smoothCard1Y = useSpring(card1Y, { stiffness: 100, damping: 20 });

  const card2Y = useTransform(scrollYProgress, [0, 0.62], ["120vh", "-20vh"]);
  const smoothCard2Y = useSpring(card2Y, { stiffness: 100, damping: 20 });

  const card3Y = useTransform(scrollYProgress, [0, 0.75], ["80vh", "-40vh"]);
  const smoothCard3Y = useSpring(card3Y, { stiffness: 100, damping: 20 });

  const card4Y = useTransform(scrollYProgress, [0, 0.9], ["140vh", "-60vh"]);
  const smoothCard4Y = useSpring(card4Y, { stiffness: 100, damping: 20 });

  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "0vh"]);
  const textOpacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);
  const smoothTextY = useSpring(textY, { stiffness: 100, damping: 20 });
  const smoothTextOpacity = useSpring(textOpacity, {
    stiffness: 100,
    damping: 20,
  });

  return (
    <div className="bg-white-100">
      <div id="hero-section">
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] md:text-4xl lg:text-7xl xl:text-8xl text-center font-figtree italic mix-blend-color-dodge text-[#56AD3B]">
          Where Every{" "}
          <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl inline">
            Picture
          </span>
          <br />
          Tells Its{" "}
          <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
            Recipe
          </span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[32px] md:text-4xl lg:text-7xl xl:text-8xl text-center font-figtree italic mix-blend-exclusion text-white">
          Where Every{" "}
          <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
            Picture
          </span>
          <br />
          Tells Its{" "}
          <span className="font-forum not-italic text-[32px] md:text-4xl lg:text-7xl xl:text-8xl">
            Recipe
          </span>
        </div>

        <div className="relative w-screen h-screen z-10">
          <div
            id="container-1"
            className="absolute top-[12vh] left-[8vw] w-[28vw] h-[36vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[0] && (
              <Image
                alt="photo"
                fill
                src={imgUrls[0]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-2"
            className="absolute top-[54vh] left-[18vw] w-[16vw] h-[40vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[1] && (
              <Image
                fill
                alt="photo"
                src={imgUrls[1]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-3"
            className="absolute top-[16vh] right-[14vw] w-[32vw] h-[40vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[2] && (
              <Image
                alt="photo"
                fill
                src={imgUrls[2]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-4"
            className="absolute bottom-[6vh] right-[16vw] w-[20vw] h-[36vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[3] && (
              <Image
                alt="photo"
                fill
                src={imgUrls[3]}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <div
        id="idea-content"
        className="static flex flex-col lg:flex-row w-screen h-screen p-10 md:p-40 justify-between items-center"
      >
        <div className="flex flex-col gap-0 pb-8 lg:pb-[28vh]">
          <div className="text-[32px] md:text-4xl lg:text-7xl xl:text-8xl font-figtree font-medium text-black-500 pb-[4vh] text-center lg:text-left">
            Get an <span className="font-forum">Idea</span>
            <br />
            <span className="ml-[16px] lg:text-right">of What You Should </span>
            <br />
            <span className="font-forum">Shoot </span>
            Tomorrow
          </div>
          <div className="font-figtree font-light text-[10px] md:text-[1rem] text-center lg:text-left text-black-300 mx-4">
            <p>
              {" "}
              Stuck on what to capture next? Explore fresh perspectives from the
              community – each photo comes with a detailed recipe, so you can
              recreate the vibe or twist it your own way.
            </p>
          </div>
        </div>

        <div className="carousel w-[60vw] h-[50vh]">
          {/* Slide 1 */}
          <CarouselSlide id="slide1">
            {/* Image wrapper */}
            <div className="absolute inset-0">
              <Image
                alt="photo"
                fill
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <CarouselContent>
              <div className="p-4 flex flex-col font-figtree text-xl font-semibold">
                Bloom in Time
                <div className="pl-2">
                  <div className="text-xs font-light mt-2 text-black-200">
                    Film Simulation
                    <div className="text-sm font-thin mt-1 text-black ">
                      Astia
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Dynamic Range
                    <div className="text-sm font-thin mt-1 text-black">
                      DR400
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Highlight
                    <div className="text-sm font-thin mt-1 text-black">+2</div>
                  </div>
                  <div className="text-black-200 text-xs font-light mt-2">
                    White Balance
                    <div className="text-sm font-thin mt-1 text-black">
                      0 Red & -3 Blue
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Noise Reduction
                    <div className="text-sm font-thin mt-1 text-black">-2</div>
                  </div>
                </div>
              </div>
            </CarouselContent>
          </CarouselSlide>

          {/* Slide 2 */}
          <CarouselSlide id="slide2">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                alt="photo"
                fill
                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <CarouselContent>
              <div className="p-4 flex flex-col font-figtree text-xl font-semibold">
                Sunset Reverie
                <div className="pl-2">
                  <div className="text-xs font-light mt-2 text-black-200">
                    Creative Style
                    <div className="text-sm font-thin mt-1 text-black">
                      Portrait
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Dynamic Range Optimizer
                    <div className="text-sm font-thin mt-1 text-black">Lv5</div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Contrast
                    <div className="text-sm font-thin mt-1 text-black">+1</div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    White Balance
                    <div className="text-sm font-thin mt-1 text-black">
                      Daylight, +2 Amber
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Noise Reduction
                    <div className="text-sm font-thin mt-1 text-black">Low</div>
                  </div>
                </div>
              </div>
            </CarouselContent>
          </CarouselSlide>

          {/* Slide 3 */}
          <CarouselSlide id="slide3">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                alt="photo"
                fill
                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <CarouselContent>
              <div className="p-4 flex flex-col font-figtree text-xl font-semibold">
                Crimson Echo
                <div className="pl-2">
                  <div className="text-xs font-light mt-2 text-black-200">
                    Picture Style
                    <div className="text-sm font-thin mt-1 text-black">
                      Faithful
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Auto Lighting Optimizer
                    <div className="text-sm font-thin mt-1 text-black">
                      Standard
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Sharpness
                    <div className="text-sm font-thin mt-1 text-black">+3</div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    White Balance
                    <div className="text-sm font-thin mt-1 text-black">
                      Shade, -1 Blue
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    High ISO Speed NR
                    <div className="text-sm font-thin mt-1 text-black">
                      Standard
                    </div>
                  </div>
                </div>
              </div>
            </CarouselContent>
          </CarouselSlide>

          {/* Slide 4 */}
          <CarouselSlide id="slide4">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                alt="photo"
                fill
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <CarouselContent>
              <div className="p-4 flex flex-col font-figtree text-xl font-semibold">
                Golden Frame
                <div className="pl-2">
                  <div className="text-xs font-light mt-2 text-black-200">
                    Picture Control
                    <div className="text-sm font-thin mt-1 text-black">
                      Neutral
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Active D-Lighting
                    <div className="text-sm font-thin mt-1 text-black">
                      High
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    Contrast
                    <div className="text-sm font-thin mt-1 text-black">-1</div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    White Balance
                    <div className="text-sm font-thin mt-1 text-black">
                      Auto, Warm Bias
                    </div>
                  </div>
                  <div className="text-xs font-light mt-2 text-black-200">
                    High ISO NR
                    <div className="text-sm font-thin mt-1 text-black">
                      Normal
                    </div>
                  </div>
                </div>
              </div>
            </CarouselContent>
          </CarouselSlide>
        </div>
      </div>
      <div className="h-[50vh]">
        <section
          ref={sectionRef}
          className="relative z-0 h-[400vh] bg-white text-center text-black"
        >
          <div className="sticky left-0 top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
            {/* Gambar 1 */}
            <motion.div
              className="absolute top-[4vh] left-[8vw] w-[28vw] h-[36vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard1Y }}
            >
              {imgUrls[0] && (
                <Image
                  alt="photo"
                  fill
                  src={imgUrls[0]}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 2 */}
            <motion.div
              className="absolute top-[72vh] left-[4vw] w-[16vw] h-[32vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard2Y }}
            >
              {imgUrls[4] && (
                <Image
                  alt="photo"
                  fill
                  src={imgUrls[4]}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 3 */}
            <motion.div
              className="absolute top-[32vh] right-[14vw] w-[32vw] h-[40vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard3Y }}
            >
              {imgUrls[5] && (
                <Image
                  alt="photo"
                  fill
                  src={imgUrls[5]}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 4 */}
            <motion.div
              className="absolute top-[92vh] right-[6vw] w-[20vw] h-[36vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard4Y }}
            >
              {imgUrls[6] && (
                <Image
                  alt="photo"
                  fill
                  src={imgUrls[6]}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Text CTA */}
            <motion.div
              className="absolute top-[35vh] left-1/2 -translate-x-1/2 z-20 text-center px-6"
              style={{ y: smoothTextY, opacity: smoothTextOpacity }}
            >
              <h1 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl font-figtree font-medium mb-4 text-black-500 w-fit">
                Every Picture Holds a Secret.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed font-figtree font-light text-black-300x  ">
                Behind every frame lies a quiet formula — the shutter&apos;s
                breath, the lens&apos;s sigh, the light&apos;s gentle fall.{" "}
                <span className="font-semibold">Rensa</span> lets you see it
                all, so tomorrow, your own story can be told the same way.
              </p>
              <div className="mt-4 flex justify-center items-center">
                <IconButton
                  iconPosition="left"
                  Icon={ArrowArcRightIcon}
                  paddingX={16}
                  color="primary"
                  type="button"
                >
                  Explore Now
                </IconButton>
                {/* <Button color="primary" className="mt-8" paddingX={8}>
                  Explore Now
                </Button> */}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
