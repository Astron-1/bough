import React from "react";
import Image from "next/image";

interface SolutionProps {
  solutions?: {
    heading: string;
    description: {
      subHeading: string;
      subDescription?: string[];
      image?: {
        heading: string;
        src: string;
      };
    }[];
  };
}

const Solutions = ({ solutions }: SolutionProps) => {
  if (!solutions) {
    return null;
  }

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {solutions.heading}
      </h2>
      {solutions.description.map((desc, index) => (
        <div key={index} className="mb-8 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{desc.subHeading}</h3>
            {desc.subDescription?.map((subDesc, subIndex) => (
              <p key={subIndex} className="text-gray-700 mb-2">
                {subDesc}
              </p>
            ))}
          </div>
          {desc.image && (
            <div className="flex-1">
              <Image
                src={desc.image.src}
                alt={desc.image.heading}
                className="rounded-lg shadow-lg"
                width={500}
                height={300}
              />
              <h4 className="text-lg font-semibold mt-2">
                {desc.image.heading}
              </h4>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Solutions;
