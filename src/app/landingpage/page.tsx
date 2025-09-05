"use client";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/api/unsplashes").then((res) => res.json()),
      fetch("/api/unsplashes").then((res) => res.json()),
      fetch("/api/unsplashes").then((res) => res.json()),
      fetch("/api/unsplashes").then((res) => res.json()),
      fetch("/api/unsplashes").then((res) => res.json()),
    ]).then((results) => {
      const urls = results
        .map((data) => data.urls && data.urls.regular)
        .filter(Boolean);
      setImgUrls(urls);
    });
  }, []);

  return (
    <div>
      <div id="hero-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-center font-bold mix-blend-color-dodge  text-[#000000]">
          Where Every Picture
          <br />
          Tells Its Recipe
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-center font-bold mix-blend-exclusion text-white">
          Where Every Picture
          <br />
          Tells Its Recipe
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
      <div id="idea-content"className="static flex flex-row w-screen h-screen p-40 justify-between items-center">
        <div className="text-3xl font-semibold  text-[#031602] pb-[24vh]">
          Get an Idea
          <br />
          of What You Should
          <br />
          Shoot Tomorrow
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
      <div id="cta" className="w-screen h-[40vh] bg-[#031602] flex flex-col justify-center items-center text-white text-3xl font-semibold">

      </div>
    </div>
  );
}
