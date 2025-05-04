import React from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import coin1 from "../../../public/service-hero-1.png";
import coin2 from "../../../public/service-hero-2.png";

interface CaseStudyHeadingsProps {
  heading: string;
  description: string;
}

const CaseStudyHeadings = ({
  heading,
  description,
}: CaseStudyHeadingsProps) => {
  return (
    <div>
      <section className="relative w-full px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center">
        <div className="hidden md:block absolute left-0 top-0 bottom-0">
          <Image
            src={coin1}
            alt="Plant growing from coins"
            width={300}
            height={400}
            className="object-contain h-full w-auto"
          />
        </div>

        <div className="w-full md:w-2/4 text-center py-12 z-10">
          <Text
            type={Font.GARAMOND}
            className="text-4xl text-black m-12 md:text-5xl font-bold mb-4"
          >
            {heading}
          </Text>
          <Text
            type={Font.SOURCE_SANS}
            className="text-black max-w-2xl mx-auto mb-8"
          >
            {description}
          </Text>
        </div>

        <div className="hidden md:block absolute right-0 top-0 bottom-0">
          <Image
            src={coin2}
            alt="Plant growing from coins"
            width={300}
            height={400}
            className="object-contain h-full w-full"
          />
        </div>
      </section>
    </div>
  );
};

export default CaseStudyHeadings;
