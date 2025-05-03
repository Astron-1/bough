import React from "react";
import { StaticImageData } from "next/image";
import CommonCard from "./CommonCard";

interface SolutionProps {
  solutions?: {
    heading: string;
    description: {
      subHeading: string;
      subDescription?: string[];
      image?: {
        heading?: string;
        description?: string;
        src: string | StaticImageData;
      };
    }[];
  };
}

const Solutions = ({ solutions }: SolutionProps) => {
  if (!solutions) {
    return null;
  }

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Solutions
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          {solutions.heading}
        </h2>
        <div className="flex flex-col gap-8">
          {solutions.description.map((desc, index) => (
            <CommonCard
              key={index}
              heading={desc.subHeading}
              description={desc.subDescription}
              image={desc.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
