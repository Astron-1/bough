import React from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import { StaticImageData } from "next/image";

interface CaseStudyHeadingsProps {
  heading: string;
  description: string;
  coverImage: string | StaticImageData;
}

const CaseStudyHeadings = ({
  heading,
  description,
  coverImage,
}: CaseStudyHeadingsProps) => {
  return (
    <div className="w-full">
      {/* Cover Photo Section */}
      <div className="w-full h-[400px] relative">
        <Image
          src={coverImage} 
          alt="Case Study Cover"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Heading and Description Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="w-full text-left">
          <Text
            type={Font.GARAMOND}
            className="text-4xl text-black md:text-5xl font-bold mb-4"
          >
            {heading}
          </Text>
          <Text
            type={Font.SOURCE_SANS}
            className="text-black text-lg"
          >
            {description}
          </Text>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyHeadings;
