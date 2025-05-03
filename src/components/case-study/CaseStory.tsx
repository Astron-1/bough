import React from "react";
import { StaticImageData } from "next/image";
import ImageCard from "./ImageCard";
import CommonCard from "./CommonCard";

interface ImagesProps {
  heading?: string;
  description?: string;
  src: string | StaticImageData;
}

interface CaseStoryProps {
  caseStory: {
    heading: string;
    description?: {
      subHeading: string;
      subDescription?: string[];
      image?: ImagesProps;
    }[];
    images?: ImagesProps[];
  }[];
}

const CaseStory = ({ caseStory }: CaseStoryProps) => {
  return (
    <div className="relative bg-gray-50 py-12 px-6 md:px-12 z-20">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
        Case Story
      </h1>
      {caseStory.map((story, index) => (
        <div
          key={index}
          className="mb-12 bg-white shadow-lg rounded-lg p-6 md:p-8"
        >
          {/* Story Heading */}
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {story.heading}
          </h2>

          {/* Story Description */}
          <div className="flex flex-col gap-6">
            {story.description?.map((desc, descIndex) => (
              <CommonCard
                key={descIndex}
                heading={desc.subHeading}
                description={desc.subDescription}
                image={desc.image}
              />
            ))}
          </div>

          {/* Additional Images */}
          {story.images && story.images.length > 0 && (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {story.images.map((image, imageIndex) => (
                <ImageCard key={imageIndex} imageData={image} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CaseStory;
