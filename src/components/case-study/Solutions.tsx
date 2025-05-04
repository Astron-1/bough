import React from "react";
import { StaticImageData } from "next/image";
import CommonCard from "./CommonCard";
import Text, { Font } from "../Text";

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
  }[];
}

const Solutions = ({ solutions }: SolutionProps) => {
  if (!solutions) {
    return null;
  }

  console.log("Solutions : ", solutions);

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12">
      <Text
        type={Font.GARAMOND}
        className="text-4xl font-bold mb-8 text-gray-800 text-center"
      >
        Solutions
      </Text>
      <div>
        {solutions.map((solution, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 md:p-8">
            <Text
              type={Font.SOURCE_SANS}
              className="text-xl font-semibold mb-6 text-gray-800"
            >
              {solution.heading}
            </Text>
            <div className="flex flex-col gap-8">
              {solution.description.map((desc, desIndex) => (
                <CommonCard
                  key={desIndex}
                  heading={desc.subHeading}
                  description={desc.subDescription}
                  image={desc.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Solutions;
