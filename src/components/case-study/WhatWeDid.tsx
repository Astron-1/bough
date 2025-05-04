import React from "react";
import Image from "next/image";
import sampleImage from "../../../public/caseStudies/sample.png";

interface WhatWeDidProps {
  whatWeDid: string[];
}

const WhatWeDid = ({ whatWeDid }: WhatWeDidProps) => {
  return (
    <div className="w-full relative flex items-center justify-center">
      <div className="absolute z-10 lg:11/12 w-8/12 mx-auto flex flex-col md:flex-row items-center md:items-start gap-8">
        <Image
          src={sampleImage}
          alt="What we did ?"
          className="rounded-lg shadow-lg"
          width={250}
          height={250}
        />
        {/* Right: Bullet Points */}
        <div className="w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            What We Did ?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {whatWeDid.map((item, index) => (
              <li key={index} className="text-lg">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Image
        src="/boughVector.svg"
        alt="Dot Pattern"
        width={400}
        height={400}
        className="w-10/12 -rotate-[30deg] z-0"
        priority
      />
    </div>
  );
};

export default WhatWeDid;
