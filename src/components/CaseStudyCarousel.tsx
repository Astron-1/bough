"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Text, { Font } from "./Text";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

export default function CaseStudyCarousel() {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const swiperRef = useRef<SwiperType | undefined>(undefined);

  const nextSlide = () => {
    if (isAnimating || current === caseStudyContent.length - 1) return;
    setIsAnimating(true);
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    if (isAnimating || current === 0) return;
    setIsAnimating(true);
    swiperRef.current?.slidePrev();
  };

  const progressPercent = ((current + 1) / caseStudyContent.length) * 100;

  return (
    <div className="my-32 w-full px-6 md:px-12 mx-auto relative">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Left: Content */}
          <div className="flex flex-row justify-between flex-1 max-w-xl z-10">
            {/* Progress Bar */}
            <div className="relative h-[400px] w-6 flex justify-center items-start mt-4 md:ml-6">
              <div className="relative h-full w-5 rounded bg-[#0074FF] overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 w-full bg-[#53FBFB] transition-all duration-700 ease-in-out"
                  style={{
                    height: `${progressPercent}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex-col flex justify-between items-start max-h-[450px]">
              <div className="ml-7 mt-2 relative h-[250px] overflow-hidden">
                <div
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    opacity: isAnimating ? 0 : 1,
                    transform: `translateY(${isAnimating ? "20px" : "0"})`,
                  }}
                >
                  <h2 className="text-black text-3xl font-bold leading-tight flex flex-col gap-1">
                    {caseStudyContent[current].heading
                      .split(" ")
                      .reduce(
                        (
                          acc: string[],
                          word: string,
                          i: number,
                          arr: string[]
                        ) => {
                          if (i % 3 === 0) {
                            const group = arr.slice(i, i + 3).join(" ");
                            if (group.trim()) {
                              acc.push(group);
                            }
                          }
                          return acc;
                        },
                        []
                      )
                      .map((line, index) => (
                        <Text
                          key={index}
                          className="max-w-[300px]"
                          type={Font.GARAMOND}
                        >
                          {line}
                        </Text>
                      ))}
                  </h2>
                  <div className="text-gray-700 max-h-32 text-sm md:text-lg mt-4">
                    <Text type={Font.SOURCE_SANS}>
                      {caseStudyContent[current].at_a_glance}
                    </Text>
                  </div>
                </div>
              </div>

              {/* Buttons fixed to bottom */}
              <div className="ml-3 mb-2">
                <Button
                  className="outline-1 px-7 mt-1 -ml-3 relative overflow-hidden group"
                  href={`/case-study?name=${caseStudyContent[current].route}`}
                >
                  <ShinyText text="Know More" speed={3} />
                </Button>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={prevSlide}
                    disabled={isAnimating || current === 0}
                    className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:bg-transparent disabled:hover:text-black group relative overflow-hidden"
                    aria-label="Previous Slide"
                  >
                    <span className="absolute inset-0 w-full h-full bg-black transform scale-0 transition-transform duration-500 ease-in-out group-hover:scale-100 rounded-full" />
                    <ChevronLeft
                      size={20}
                      strokeWidth={3}
                      className="relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={
                      isAnimating || current === caseStudyContent.length - 1
                    }
                    className="w-10 h-10 rounded-full border-2 border-black text-black flex items-center justify-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:bg-transparent disabled:hover:text-black group relative overflow-hidden"
                    aria-label="Next Slide"
                  >
                    <span className="absolute inset-0 w-full h-full bg-black transform scale-0 transition-transform duration-500 ease-in-out group-hover:scale-100 rounded-full" />
                    <ChevronRight
                      size={20}
                      strokeWidth={3}
                      className="relative z-10 transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden md:block w-full md:w-[45%] max-w-[600px] h-[400px]">
            <div className="relative w-full h-full">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrent(swiper.activeIndex);
                  // Reset animation state after transition
                  setTimeout(() => {
                    setIsAnimating(false);
                  }, 700);
                }}
                effect="fade"
                speed={700}
                loop={false}
                modules={[EffectFade]}
                className="!absolute inset-0 h-full"
                allowTouchMove={false}
              >
                {caseStudyContent.map((content, index) => (
                  <SwiperSlide key={index} className="w-full h-full">
                    <Image
                      src={content.image}
                      alt="Case study image"
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                      priority={index === current}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
