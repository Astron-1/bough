"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import Text, { Font } from "./Text";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useRouter, useSearchParams } from "next/navigation";

interface CaseStudyCarouselProps {
  filter?: {
    ids?: string[];
    excludeIds?: string[];
    limit?: number;
  };
}

export default function CaseStudyCarousel({ filter }: CaseStudyCarouselProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const isInitialMount = useRef(true);
  const slideTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const queuedIndex = useRef<number | null>(null);
  const queuedDirection = useRef<"left" | "right" | null>(null);
  const ANIMATION_DURATION = 200;

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (slideTimeout.current) {
        clearTimeout(slideTimeout.current);
      }
    };
  }, []);

  // Only render current, previous, and next images
  const getVisibleIndexes = () => {
    const prev = current > 0 ? current - 1 : null;
    const next = current < filteredCaseStudies.length - 1 ? current + 1 : null;
    return [prev, current, next].filter(idx => idx !== null) as number[];
  };

  const handleSlideChange = useCallback((newIndex: number, dir: "left" | "right") => {
    if (isAnimating) {
      // Only queue if different from current and last queued
      if (
        (queuedIndex.current === null && newIndex !== current) ||
        (queuedIndex.current !== null && newIndex !== queuedIndex.current)
      ) {
        queuedIndex.current = newIndex;
        queuedDirection.current = dir;
      }
      return;
    }
    if (newIndex === current) return; // Prevent animating to the same slide
    setIsAnimating(true);
    setDirection(dir);
    setCurrent(newIndex); 
    if (slideTimeout.current) {
      clearTimeout(slideTimeout.current);
    }
    slideTimeout.current = setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
      // If a slide is queued, process only the latest one and clear
      if (queuedIndex.current !== null && queuedDirection.current !== null) {
        const nextIdx = queuedIndex.current;
        const nextDir = queuedDirection.current;
        queuedIndex.current = null;
        queuedDirection.current = null;
        handleSlideChange(nextIdx, nextDir);
      }
    }, ANIMATION_DURATION);
  }, [isAnimating, current]);

  const nextSlide = useCallback(() => {
    if (current === filteredCaseStudies.length - 1) return;
    handleSlideChange(current + 1, "right");
  }, [current, filteredCaseStudies.length, handleSlideChange]);

  const prevSlide = useCallback(() => {
    if (current === 0) return;
    handleSlideChange(current - 1, "left");
  }, [current, handleSlideChange]);

  const progressPercent = useMemo(() => 
    ((current + 1) / filteredCaseStudies.length) * 100
  , [current, filteredCaseStudies.length]);

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
                    className="absolute bottom-0 left-0 w-full bg-[#53FBFB] transition-all duration-200 ease-linear will-change-transform"
                    style={{
                      height: `${progressPercent}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex-col flex justify-between items-start max-h-[450px]">
                <div className="ml-7 mt-2 relative min-h-[250px] h-auto">
                  <div
                    className="transition-transform duration-200 ease-linear will-change-transform"
                    style={{
                      opacity: isAnimating ? 0 : 1,
                      transform: `translateY(${isAnimating ? "20px" : "0"})`,
                    }}
                  >
                    <h2 className="text-black text-2xl md:text-3xl font-bold leading-tight flex flex-col gap-1">
                      {filteredCaseStudies[current].heading
                        .split(" ")
                        .reduce(
                          (acc: string[], word: string, i: number, arr: string[]) => {
                            if (i % 3 === 0) {
                              const group = arr.slice(i, i + 3).join(" ");
                              if (group.trim()) acc.push(group);
                            }
                            return acc;
                          },
                          []
                        )
                        .map((line, index) => (
                          <Text key={index} className="max-w-[300px]" type={Font.GARAMOND}>
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
                      href={`/case-study?name=${filteredCaseStudies[current].route}&returnSlide=${current}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShinyText text="Know More" speed={3} />
                    </Button>
                    <div className="flex space-x-4 select-none">
                      <button
                        onClick={prevSlide}
                        disabled={isAnimating || current === 0}
                        className={`w-10 h-10 rounded-full border transition-colors ${
                          current === 0
                            ? "border-gray-300 text-gray-300"
                            : "border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white"
                        } flex items-center justify-center`}
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                      </button>
                      
                      <button
                        onClick={nextSlide}
                        disabled={isAnimating || current === filteredCaseStudies.length - 1}
                        className={`w-10 h-10 rounded-full border transition-colors ${
                          current === filteredCaseStudies.length - 1
                            ? "border-gray-300 text-gray-300"
                            : "border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white"
                        } flex items-center justify-center`}
                        aria-label="Next Slide"
                      >
                        <ChevronRight size={20} strokeWidth={2.5} />
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
              {getVisibleIndexes().map(index => {
                const content = filteredCaseStudies[index];
                return (
                  <div
                    key={content.id}
                    className={`absolute inset-0 transition-opacity duration-200 ease-linear ${
                      index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    aria-hidden={index !== current}
                  >
                    <Image
                      src={content.image}
                      alt={content.heading}
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 600px"
                      priority={index === current}
                      loading={index === current ? "eager" : "lazy"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
