"use client";
import Image from "next/image";
import sample from "../../public/corporate.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Text, { Font } from "./Text";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";

export default function CaseStudyCarousel() {
  const [current, setCurrent] = useState<number>(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % caseStudyContent.length);
  const prevSlide = () =>
    setCurrent(
      (prev) => (prev - 1 + caseStudyContent.length) % caseStudyContent.length
    );

  const progressPercent = ((current + 1) / caseStudyContent.length) * 100;

  return (
    <div className="my-32 w-full px-6 md:px-12 mx-auto">
      <div className="flex flex-col md:flex-row items-stretch justify-between w-full gap-4">
        {/* Left: Content */}
        <div className="flex flex-row justify-between flex-1 max-w-xl z-10">
          {/* Progress Bar */}
          <div className="relative h-96 w-6 flex justify-center items-start mt-4 ml-6">
            <div className="relative h-full w-2 rounded bg-gray-200 overflow-hidden">
              <div
                className="absolute bottom-0 left-0 w-full transition-all duration-500"
                style={{
                  height: `${progressPercent}%`,
                  backgroundColor: "#53FBFB",
                }}
              />
            </div>
          </div>

          <div className="flex-col flex justify-start items-start">
            <div className="ml-7 mt-2">
              <h2 className="text-black text-4xl font-bold leading-tight">
                <Text className="max-w-[200px]" type={Font.GARAMOND}>
                  {caseStudyContent[current].heading}
                </Text>
              </h2>
              <div className="text-gray-700 max-h-32 mt-4">
                <Text type={Font.SOURCE_SANS}>
                  {caseStudyContent[current].at_a_glance}
                </Text>
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-2">
              <div className="flex flex-col space-y-4 font-bold ml-3">
                <Button
                  className="outline-1 px-7"
                  href={`/case-study?name=${caseStudyContent[current].route}`}
                >
                  <ShinyText text="Know More" speed={3} />
                </Button>
                <div className="flex space-x-4 ml-2 mt-5">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border font-bold border-black text-black flex items-center justify-center hover:bg-gray-200 transition"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft size={20} strokeWidth={3} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-black text-black flex items-center justify-center hover:bg-gray-200 transition"
                    aria-label="Next Slide"
                  >
                    <ChevronRight size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block absolute right-0 z-0 w-[600px] h-auto">
          <Image
            src={sample}
            alt="Case study image"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
