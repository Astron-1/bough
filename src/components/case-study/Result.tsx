import React from "react";
import { StaticImageData } from "next/image";
import CommonCard from "./CommonCard";
import Text, { Font } from "../Text";

interface ResultProps {
  results: {
    heading: string;
    description?: string[];
    image?: {
      heading?: string;
      description?: string;
      src: string | StaticImageData;
    };
  }[];
}

const Result = ({ results }: ResultProps) => {
  return (
    <div className="bg-gray-50 py-24 px-6 md:px-12 "
    style={{
      backgroundImage: "url('/bg-wave-img-for-above-footer.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
    >
      <Text
        type={Font.GARAMOND}
        className="text-4xl font-bold mb-8 text-gray-100 text-center"
      >
        Results
      </Text>
      <div className="flex flex-col gap-12 mt-16">
        {results.map((result, index) => (
          <CommonCard
            key={index}
            heading={result.heading}
            description={result.description}
            image={result.image}
            headingStyle="!text-gray-100"
            descStyle="!text-gray-200"
          />
        ))}
      </div>
    </div>
  );
};

export default Result;
