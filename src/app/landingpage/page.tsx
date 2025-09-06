"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function LandingPage() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    Promise.all(
      Array(8)
        .fill(null)
        .map(() => fetch("/api/unsplashes").then((res) => res.json()))
    ).then((results) => {
      const urls = results
        .map((data) => data.urls && data.urls.regular)
        .filter(Boolean);
      setImgUrls(urls);
    });
  }, []);

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
    <div>
      <div id="hero-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-center font-figtree italic mix-blend-color-dodge text-[#56AD3B]">
          Where Every{" "}
          <span className="font-forum not-italic text-[56px] inline">Picture</span>
          <br />
          Tells Its{" "}
          <span className="font-forum not-italic text-[56px]">Recipe</span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-center font-figtree italic mix-blend-exclusion text-white">
          Where Every{" "}
          <span className="font-forum not-italic text-[56px]">Picture</span>
          <br />
          Tells Its{" "}
          <span className="font-forum not-italic text-[56px]">Recipe</span>
        </div>

        <div className="relative w-screen h-screen -z-10">
          <div
            id="container-1"
            className="absolute top-[12vh] left-[8vw] w-[28vw] h-[36vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[0] && (
              <img
                src={imgUrls[0]}
                alt="Random 1"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-2"
            className="absolute top-[54vh] left-[18vw] w-[16vw] h-[40vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[1] && (
              <img
                src={imgUrls[1]}
                alt="Random 2"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-3"
            className="absolute top-[16vh] right-[14vw] w-[32vw] h-[40vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[2] && (
              <img
                src={imgUrls[2]}
                alt="Random 3"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div
            id="container-4"
            className="absolute bottom-[6vh] right-[16vw] w-[20vw] h-[36vh]  rounded-lg bg-gray-100"
          >
            {imgUrls[3] && (
              <img
                src={imgUrls[3]}
                alt="Random 3"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>
      <div
        id="idea-content"
        className="static flex flex-row w-screen h-screen p-40 justify-between items-center"
      >
        <div className="flex flex-col gap-0 pb-[28vh]">
          <div className="text-3xl font-figtree font-medium text-black-500 pb-[4vh]">
            Get an Idea
            <br />
            of What You Should
            <br />
            Shoot Tomorrow
          </div>
          <div className="font-figtree font-light text-black-300 w-[28vw]">
            <p>
              {" "}
              Stuck on what to capture next? Explore fresh perspectives from the
              community – each photo comes with a detailed recipe, so you can
              recreate the vibe or twist it your own way.
            </p>
          </div>
        </div>

        <div className="carousel w-[40vw] h-[76vh]">
          {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-[40vw] h-[52vh]">
            {/* Image wrapper */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="absolute top-[32vh] left-[18vw] w-[20vw] h-[40vh] bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
              <p className="p-4">This is Slide 1 content</p>
            </div>
            {/* Controls */}
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-[40vw] h-[52vh]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-[32vh] left-[18vw] w-[20vw] h-[40vh] bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
              <p className="p-4">This is Slide 2 content</p>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-[40vw] h-[52vh]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-[32vh] left-[18vw] w-[20vw] h-[40vh] bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
              <p className="p-4">This is Slide 3 content</p>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>

          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-[40vw] h-[52vh]">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-[32vh] left-[18vw] w-[20vw] h-[40vh] bg-[#fafafa] z-20 rounded-3xl shadow-lg overflow-visible">
              <p className="p-4">This is Slide 4 content</p>
            </div>
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
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
              className="absolute top-[12vh] left-[8vw] w-[28vw] h-[36vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard1Y }}
            >
              {imgUrls[0] && (
                <img
                  src={imgUrls[0]}
                  alt="Random 1"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 2 */}
            <motion.div
              className="absolute top-[72vh] left-[4vw] w-[16vw] h-[32vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard2Y }}
            >
              {imgUrls[1] && (
                <img
                  src={imgUrls[1]}
                  alt="Random 2"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 3 */}
            <motion.div
              className="absolute top-[32vh] right-[14vw] w-[32vw] h-[40vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard3Y }}
            >
              {imgUrls[2] && (
                <img
                  src={imgUrls[2]}
                  alt="Random 3"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Gambar 4 */}
            <motion.div
              className="absolute top-[92vh] right-[8vw] w-[20vw] h-[36vh] rounded-lg bg-gray-100 overflow-hidden"
              style={{ y: smoothCard4Y }}
            >
              {imgUrls[3] && (
                <img
                  src={imgUrls[3]}
                  alt="Random 4"
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {/* Text CTA */}
            <motion.div
              className="absolute top-[40vh] left-1/2 -translate-x-1/2 z-20 text-center px-6"
              style={{ y: smoothTextY, opacity: smoothTextOpacity }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Every Picture Holds a Secret.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                Behind every frame lies a quiet formula — the shutter's breath,
                the lens's sigh, the light's gentle fall.{" "}
                <span className="font-semibold">Rensa</span> lets you see it
                all, so tomorrow, your own story can be told the same way.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
