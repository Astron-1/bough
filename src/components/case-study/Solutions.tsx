import React from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
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

  return (
    <div className="w-full py-6">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Text
          type={Font.GARAMOND}
          className="text-2xl font-bold mb-6 text-gray-800"
        >
          Solutions
        </Text>
        
        <div className="space-y-10">
          {solutions.map((solution, index) => (
            <div key={index} className="border-b border-gray-100 pb-10 last:border-0 last:pb-0">
              <Text
                type={Font.GARAMOND}
                className="text-xl font-semibold mb-4 text-gray-800"
              >
                {solution.heading}
              </Text>
              
              <div className="space-y-6">
                {solution.description.map((desc, descIndex) => (
                  <div key={descIndex} className="mb-6">
                    <Text
                      type={Font.SOURCE_SANS}
                      className="text-lg font-medium mb-2 text-gray-800"
                    >
                      {desc.subHeading}
                    </Text>
                    
                    {desc.subDescription && (
                      <ul className="list-disc list-inside space-y-2 pl-4 mb-4">
                        {desc.subDescription.map((point, pointIndex) => (
                          <li key={pointIndex} className="text-base">
                            <Text type={Font.SOURCE_SANS} className="inline text-gray-700">
                              {point}
                            </Text>
                          </li>
                        ))}
                      </ul>
                    )}
                    
                    {desc.image && (
                      <div className="mt-4 mb-6">
                        <div className="rounded-lg overflow-hidden">
                          <Image 
                            src={desc.image.src}
                            alt={desc.image.heading || "Solution image"}
                            width={800}
                            height={450}
                            className="w-full h-auto"
                          />
                          {desc.image.heading && (
                            <Text
                              type={Font.SOURCE_SANS}
                              className="mt-2 text-sm text-gray-500 italic"
                            >
                              {desc.image.heading}
                            </Text>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Solutions;
