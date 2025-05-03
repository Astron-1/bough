import React from "react";
import Image from "next/image";

interface ResultProps {
  results: {
    heading: string;
    description?: string[];
    image?: {
      heading: string;
      src: string;
    };
  }[];
}

const Result = ({ results }: ResultProps) => {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Results</h2>
      {results.map((result, index) => (
        <div key={index} className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{result.heading}</h3>
            {result.description?.map((desc, descIndex) => (
              <p key={descIndex} className="text-gray-700 mb-2">
                {desc}
              </p>
            ))}
          </div>
          {result.image && (
            <div className="flex-1">
              <Image
                src={result.image.src}
                alt={result.image.heading}
                className="rounded-lg shadow-lg"
                width={500}
                height={300}
              />
              <h4 className="text-lg font-semibold mt-2">
                {result.image.heading}
              </h4>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Result;
