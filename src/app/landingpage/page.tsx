"use client";
import { useState } from "react";
import { useEffect } from "react";

export default function LandingPage() {
  return (
    <div>
      {/* <div className="-z-100">
        <div id="container-1">
          <img
            src="https://source.unsplash.com/random/"
            alt="Random"
            className="w-404 h-504"
          />
        </div>
      </div> */}
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
