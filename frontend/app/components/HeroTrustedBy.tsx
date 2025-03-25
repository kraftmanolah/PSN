

"use client";

import React from "react";
import Image from "next/image";

const HeroTrustedBy: React.FC = () => {
  return (
    <div className="bg-black py-8 w-full">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Trusted By Text - Centered on Mobile, Left on Desktop */}
        <div className="text-center md:text-left mb-4">
          <span className="text-xl font-semibold text-gray-400">
            TRUSTED BY:
          </span>
        </div>

        {/* Logos Section */}
        <div className="flex space-x-8 items-center justify-center md:justify-between overflow-x-auto">
          {/* NNPC */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/nnpc-logo.png"
              alt="NNPC"
              width={100}
              height={50}
              className="object-contain"
            />
            <span className="text-white hidden md:block">NNPC</span>
          </div>

          {/* NYSC */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/nysc-logo.png"
              alt="NYSC"
              width={70}
              height={30}
              className="object-contain"
            />
            <span className="text-white hidden md:block">NYSC</span>
          </div>

          {/* Seven30 */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/seven30-logo.png"
              alt="Seven 30"
              width={100}
              height={50}
              className="object-contain"
            />
            <span className="text-white hidden md:block">Seven30</span>
          </div>

          {/* LightersHub */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/lightershub-logo.png"
              alt="Lighters Hub"
              width={100}
              height={50}
              className="object-contain"
            />
            <span className="text-white hidden md:block">LightersHub</span>
          </div>

          {/* PuffnPazz */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/puffnpazz.png"
              alt="Puff n Pass"
              width={100}
              height={50}
              className="object-contain"
            />
            <span className="text-white hidden md:block">PuffnPazz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTrustedBy;
