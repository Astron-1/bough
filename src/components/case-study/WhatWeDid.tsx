import React from "react";
import Image from "next/image";
import sampleImage from "../../../public/caseStudies/sample.png";

interface WhatWeDidProps {
  whatWeDid: string[];
}

const WhatWeDid = ({ whatWeDid }: WhatWeDidProps) => {
  return (
    <div className="lg:11/12 w-8/12 mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 my-24">
      <Image
        src={sampleImage}
        alt="What we did ?"
        className="rounded-lg shadow-lg"
        width={250}
        height={250}
      />
      {/* Right: Bullet Points */}
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">What We Did ?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {whatWeDid.map((item, index) => (
            <li key={index} className="text-lg">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhatWeDid;
