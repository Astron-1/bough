import { StaticImageData } from "next/image";
import React from "react";
import ImageCard from "./ImageCard";
import Text, { Font } from "../Text";

interface CommonCardProps {
  heading: string;
  description?: string[];
  image?: {
    heading?: string;
    description?: string;
    src: string | StaticImageData;
  };
  headingStyle?: string;
  descStyle?: string;
}
const CommonCard = ({ heading, description, image, headingStyle, descStyle }: CommonCardProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-0 lg:gap-4 items-start">
      {/* Text Content */}
      <Text type={Font.SOURCE_SANS}>
        <div className="">
          <div className={`text-lg font-medium text-gray-800 ${headingStyle}`}>{heading}</div>
          {description && (
            <ul className={`mt-3 list-disc list-inside text-gray-700 mb-4 lg:mb-0 ${descStyle}`}>
              {description?.map((desc, descIndex) => (
                <li key={descIndex} className="leading-relaxed">
                  {desc}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Text>

      {image && <ImageCard imageData={image} />}
    </div>
  );
};

export default CommonCard;
