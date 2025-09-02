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
    ]).then((results) => {
      const urls = results
        .map((data) => data.urls && data.urls.regular)
        .filter(Boolean);
      setImgUrls(urls);
    });
  }, []);

  return (
    <div>
      <div className="-z-10 absolute top-0 left-0 w-full h-full flex justify-around items-center space-x-4 p-10">
        <div
          id="container-1"
          className="w-[300px] h-[400px] overflow-hidden rounded-lg bg-gray-100"
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
          className="w-[404px] h-[450px] overflow-hidden rounded-lg bg-gray-100"
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
          className="w-[350px] h-[500px] overflow-hidden rounded-lg bg-gray-100"
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
          className="w-[350px] h-[500px] overflow-hidden rounded-lg bg-gray-100"
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
      <div className="relative flex justify-center items-center h-96 m-40">
        <div className="absolute text-5xl text-center font-bold mix-blend-color-burn text-[#56AD3B]">
          Where Every Picture
          <br />
          Tells Its Recipe
        </div>
        <div className="absolute text-5xl text-center font-bold mix-blend-exclusion text-white ">
          Where Every Picture
          <br />
          Tells Its Recipe
        </div>
      </div>
    </div>
  );
}
