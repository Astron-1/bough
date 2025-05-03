import Image from "next/image";
import React from "react";

interface ImagesProps {
  heading?: string;
  description?: string;
  src: string;
}

interface CaseStoryProps {
  caseStory: {
    heading: string;
    description?: {
      subHeading: string;
      subDescription?: string[];
      images?: ImagesProps[];
    }[];
    images?: ImagesProps[];
  }[];
}

const CaseStory = ({ caseStory }: CaseStoryProps) => {
  console.log("Data", caseStory);
  return (
    <div>
      {caseStory.map((story, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{story.heading}</h2>
          <div>
            {story.description?.map((desc, descIndex) => (
              <div key={descIndex} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  {desc.subHeading}
                </h3>
                {desc.subDescription?.map((subDesc, subDescIndex) => (
                  <p key={subDescIndex} className="mb-2">
                    {subDesc}
                  </p>
                ))}
                {desc.images?.map((image, imageIndex) => (
                  <div key={imageIndex} className="mb-4">
                    <Image
                      src={image.src}
                      alt={image.heading || "Image"}
                      className="w-full h-auto rounded-lg"
                    />
                    <h4 className="text-lg font-semibold mt-2">
                      {image.heading}
                    </h4>
                    {image.description && (
                      <p className="text-gray-600">{image.description}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseStory;
