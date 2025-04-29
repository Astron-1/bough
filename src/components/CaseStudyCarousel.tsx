"use client";
import Image, { StaticImageData } from "next/image";
import sample from "../../public/corporate.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Text, { Font } from "./Text";

export default function CaseStudyCarousel() {
  interface CaseStudyProps {
    heading: string;
    body: string;
    image: StaticImageData;
  }

  const data: CaseStudyProps[] = [
    {
      heading: "Our results defines who we are",
      body: "We help companies become more resilient and future-ready by effectively managing their operational challenges, emergent accounting & regulatory complexities, and transformational intricacies.",
      image: sample,
    },
    {
      heading: "Next-gen transformation solutions",
      body: "Empowering brands to automate, scale, and unlock new value using strategy, tech, and experience.",
      image: sample,
    },
    {
      heading: "Impact that compounds",
      body: "We create measurable outcomes by aligning with the business goals of our partners.",
      image: sample,
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % data.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + data.length) % data.length);

  const progressPercent = ((current + 1) / data.length) * 100;

  return (
    <div className="relative  overflow-hidden my-32 min-w-full">
      {/* Background Accent (if needed) */}
      <div className="absolute left-0 top-0 h-full w-full -skew-x-12 origin-top-left z-0 " />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-stretch justify-between max-w-7xl  mx-auto md:space-x-10 px-6 md:px-16 space-y-12 md:space-y-0">
        {/* Progress Bar */}
        <div className="relative h-96 w-6 flex justify-center items-start mt-4">
          {/* Progress Container */}
          <div className="relative h-full  rounded bg-[#53FBFB] overflow-hidden w-10">
            {/* Fill */}
            <div
              className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-700"
              style={{ height: `${progressPercent}%` }}
            />
          </div>

          {/* Moving Percentage Text */}
          <div
            className="absolute mr-20  text-sm font-semibold text-black transition-all duration-700"
            style={{ bottom: `calc(${progressPercent}% - 1rem)` }} // adjusts position
          >
            {Math.round(progressPercent)}%
          </div>
        </div>

        {/* Text Content + Arrows at Bottom */}
        <div className="flex flex-col justify-between flex-1 max-w-wd">
          <div className="space-y-6">
            <h2 className="text-black text-4xl font-bold leading-tight">
              <Text className="max-w-[300px]" type={Font.GARAMOND}>
                {data[current].heading}
              </Text>
            </h2>
            <div className="text-gray-700 max-h-32">
              <Text type={Font.SOURCE_SANS}>{data[current].body}</Text>
            </div>
          </div>

          <div className="flex space-x-4 mt-8 font-bold">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border font-bold  border-black text-black flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ChevronLeft size={20} strokeWidth={3} />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-black text-black flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ChevronRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[600px] h-auto flex items-center justify-center">
          <Image
            src={data[current].image}
            alt="Case study image"
            width={400}
            height={400}
            className="w-full h-full object-contain float-right absolute"
          />
        </div>
      </div>
    </div>
  );
}
