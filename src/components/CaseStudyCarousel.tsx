"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import Text, { Font } from "./Text";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface CaseStudyCarouselProps {
  filter?: {
    ids?: string[];
    excludeIds?: string[];
    limit?: number;
  };
}

export default function CaseStudyCarousel({ filter }: CaseStudyCarouselProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const swiperRef = useRef<SwiperType | undefined>(undefined);
  const isInitialMount = useRef(true);

  // Memoize filtered case studies to prevent unnecessary recalculations
  const filteredCaseStudies = useMemo(() => {
    let studies = [...caseStudyContent];
    
    if (filter?.ids) {
      studies = studies.filter(study => filter.ids!.includes(study.id));
    } else if (filter?.excludeIds) {
      studies = studies.filter(study => !filter.excludeIds!.includes(study.id));
    }
    
    if (filter?.limit) {
      studies = studies.slice(0, filter.limit);
    }
    
    return studies;
  }, [filter]);

  // Initialize current slide from URL on mount
  useEffect(() => {
    const slideIndex = searchParams.get('slide');
    if (slideIndex && !isNaN(Number(slideIndex))) {
      const index = Number(slideIndex);
      if (index >= 0 && index < filteredCaseStudies.length) {
        setCurrent(index);
        swiperRef.current?.slideTo(index, 0);
      }
    }
  }, [searchParams, filteredCaseStudies.length]);

  // Update URL when slide changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('slide', current.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [current, router, searchParams]);

  const nextSlide = useCallback(() => {
    if (isAnimating || current === filteredCaseStudies.length - 1) return;
    setIsAnimating(true);
    swiperRef.current?.slideNext();
  }, [current, isAnimating, filteredCaseStudies.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating || current === 0) return;
    setIsAnimating(true);
    swiperRef.current?.slidePrev();
  }, [current, isAnimating]);

  const progressPercent = ((current + 1) / filteredCaseStudies.length) * 100;

  if (filteredCaseStudies.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 md:py-16">
      <div className="w-full pl-4 md:pl-0">
        <div className="flex flex-col md:flex-row items-center justify-end gap-8 md:gap-16 lg:gap-20">
          {/* Left: Content */}
          <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%]">
            <div className="flex flex-row justify-between flex-1 max-w-lg z-10 ml-auto pr-4 md:pr-12 lg:pr-16">
              {/* Progress Bar */}
              <div className="relative h-[400px] w-6 flex justify-center items-start mt-4 md:ml-0">
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
                <div className="ml-7 mt-2 relative min-h-[250px] h-auto">
                  <div
                    className="transition-transform duration-500 ease-out will-change-transform"
                    style={{
                      opacity: isAnimating ? 0 : 1,
                      transform: `translateY(${isAnimating ? "20px" : "0"})`,
                    }}
                  >
                    <h2 className="text-black text-2xl md:text-3xl font-bold leading-tight flex flex-col gap-1">
                      {filteredCaseStudies[current].heading
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
                    <div className="text-gray-700 mt-4">
                      <Text type={Font.SOURCE_SANS} className="text-xs md:text-sm lg:text-base">
                        {filteredCaseStudies[current].at_a_glance}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Buttons fixed to bottom */}
                <div className="ml-7 mb-2">
                  <div className="flex flex-col gap-6">
                    <Button
                      className="outline-1 px-7 relative overflow-hidden group bg-[#0047FF] text-white hover:bg-[#0047FF]/90 transition-all duration-300"
                      href={`/case-study?name=${encodeURIComponent(filteredCaseStudies[current].route)}&returnSlide=${current}&returnPath=${encodeURIComponent(pathname)}`}
                    >
                      <ShinyText text="Know More" speed={3} />
                    </Button>
                    <div className="flex space-x-4">
                      <button
                        onClick={prevSlide}
                        disabled={isAnimating || current === 0}
                        className="w-10 h-10 rounded-full border border-[#0047FF] text-[#0047FF] flex items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0047FF] disabled:border-gray-300 disabled:text-gray-300"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft
                          size={20}
                          strokeWidth={2.5}
                          className="transition-transform duration-300"
                        />
                      </button>
                      <button
                        onClick={nextSlide}
                        disabled={
                          isAnimating || current === filteredCaseStudies.length - 1
                        }
                        className="w-10 h-10 rounded-full border border-[#0047FF] text-[#0047FF] flex items-center justify-center transition-all duration-300 hover:bg-[#0047FF] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#0047FF] disabled:border-gray-300 disabled:text-gray-300"
                        aria-label="Next Slide"
                      >
                        <ChevronRight
                          size={20}
                          strokeWidth={2.5}
                          className="transition-transform duration-300"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden md:block w-full md:w-[55%] lg:w-[60%] xl:w-[65%] h-[400px]">
            <div className="relative w-full h-full">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setCurrent(swiper.activeIndex);
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
                initialSlide={current}
              >
                {filteredCaseStudies.map((content, index) => (
                  <SwiperSlide key={content.id} className="w-full h-full">
                    <Image
                      src={content.image}
                      alt={content.heading}
                      fill
                      quality={100}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                      priority={index === current}
                      loading={index === current ? "eager" : "lazy"}
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
