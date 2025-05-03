"use client";
import Image, { StaticImageData } from "next/image";
import sample from "../../public/corporate.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Text, { Font } from "./Text";

interface MainCarouselProps {
  heading: string;
  body: string;
  image: StaticImageData;
}

const data: MainCarouselProps[] = [
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

export default function MainCarousel() {
  const [current, setCurrent] = useState<number>(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % data.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + data.length) % data.length);

  const progressPercent = ((current + 1) / data.length) * 100;

  return (
    <div className="my-32 w-full px-6 md:px-12">
      <div className="flex flex-col md:flex-row items-stretch justify-between w-full space-y-12 md:space-y-0">
        {/* Left: Content */}
        <div className="flex flex-row justify-between flex-1 max-w-xl z-10">
          {/* Progress Bar */}

          <div className="relative h-96 w-6 flex justify-center items-start mt-4 ml-6">
            <div className="relative h-full rounded bg-[#53FBFB] overflow-hidden w-10">
              <div
                className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-700"
                style={{ height: `${progressPercent}%` }}
              />
            </div>
            <div
              className="absolute text-sm font-semibold text-black transition-all duration-700"
              style={{
                bottom: `calc(${progressPercent}% - 2rem)`,
                marginRight: 50,
              }}
            >
              {current + 1}
            </div>
          </div>
          <div className="flex-col flex justify-start items-start space-y-20">
            <div className="space-y-6 ml-7 mt-2">
              <h2 className="text-black text-4xl font-bold leading-tight">
                <Text className="max-w-[200px]" type={Font.GARAMOND}>
                  {data[current].heading}
                </Text>
              </h2>
              <div className="text-gray-700 max-h-32">
                <Text type={Font.SOURCE_SANS}>{data[current].body}</Text>
              </div>
            </div>
            <div className="flex space-x-4 mt-8 font-bold ml-7">
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
        {/* Right: Image */}
        <div className="hidden md:block absolute right-0   z-0 w-[600px] h-auto">
          <Image
            src={data[current].image}
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
