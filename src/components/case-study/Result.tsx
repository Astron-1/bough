import React from "react";
import { StaticImageData } from "next/image";
import Text, { Font } from "../Text";
import Image from "next/image";

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
    <div className="w-full py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Text
          type={Font.GARAMOND}
          className="text-2xl font-bold mb-6 text-gray-800"
        >
          Results
        </Text>
        
        <div className="space-y-10">
          {results.map((result, index) => (
            <div key={index} className={index !== results.length - 1 ? "border-b border-gray-100 pb-10" : ""}>
              <Text
                type={Font.GARAMOND}
                className="text-xl font-semibold mb-4 text-gray-800"
              >
                {result.heading}
              </Text>
              
              {result.description && (
                <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
                  {result.description.map((desc, i) => (
                    <li key={i} className="text-base">
                      <Text
                        type={Font.SOURCE_SANS}
                        className="inline text-gray-700"
                      >
                        {desc}
                      </Text>
                    </li>
                  ))}
                </ul>
              )}
              
              {result.image && (
                <div className="mt-4 mb-4">
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src={result.image.src}
                      alt={result.image.heading || "Result image"}
                      width={800}
                      height={450}
                      className="w-full h-auto"
                    />
                    {result.image.heading && (
                      <Text
                        type={Font.SOURCE_SANS}
                        className="mt-2 text-sm text-gray-500 italic"
                      >
                        {result.image.heading}
                      </Text>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
