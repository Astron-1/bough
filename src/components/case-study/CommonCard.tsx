import { StaticImageData } from "next/image";
import React from "react";
import ImageCard from "./ImageCard";

interface CommonCardProps {
  heading: string;
  description?: string[];
  image?: {
    heading?: string;
    description?: string;
    src: string | StaticImageData;
  };
}
const CommonCard = ({ heading, description, image }: CommonCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 items-start">
      {/* Text Content */}
      <div className="">
        <h3 className="text-lg font-medium text-gray-700">{heading}</h3>
        {description && (
          <ul className="mt-3 list-disc list-inside text-gray-700 mb-4 lg:mb-0">
            {description?.map((desc, descIndex) => (
              <li key={descIndex} className="text-gray-600 leading-relaxed">
                {desc}
              </li>
            ))}
          </ul>
        )}
      </div>

      {image && <ImageCard imageData={image} />}
    </div>
  );
};

export default CommonCard;
