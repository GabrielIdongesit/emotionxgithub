import React from "react";
import BIKE from "../assets/bike.png";

const Hero = () => {
  return (
    <div className="max-w-[1640px] mx-auto p-4">
      <div className="relative h-[420px] sm:h-[480px] lg:h-[520px] bg-black/ rounded-lg overflow-hidden">
        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={BIKE}
            alt="Bike"
            className="max-w-[95%] max-h-full object-contain"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center text-center text-gray-200">
          <h1 className="px-4 text-xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            WELCOME TO E-MOTIONX
          </h1>
          <h2 className="px-4 text-sm pt-3 font-bold lg:text-xl">
            Where Business Comes Alive And Community Thrives.
          </h2>
          <div>
            <button className="bg-[#5390ec] hover:scale-105 duration-300 hover:bg-white hover:text-blue mt-10 border p-3 rounded-md shadow uppercase font-bold text-white italic">
              Embrace Our Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
