"use client";
import { useRef, useState, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Text, { Font } from "./Text";
import { caseStudyContent } from "@app/lib/caseStudyContent";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";

interface CaseStudyCarouselProps {
  filter?: {
    ids?: string[];
    excludeIds?: string[];
    limit?: number;
  };
}

const IMAGE_SIZES = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

export default function CaseStudyCarousel({ filter }: CaseStudyCarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const carouselRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const ANIMATION_DURATION = 400;

  // Clear timeout on unmount
  useEffect(() => {
    const cleanup = () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
    return cleanup;
  }, []);

  // Add error boundary state
  const [hasError, setHasError] = useState(false);

  // Error recovery
  useEffect(() => {
    if (hasError) {
      setIsAnimating(false);
      setIsImageLoading(false);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }
  }, [hasError]);

  // Memoize filtered case studies to prevent unnecessary recalculations
  const filteredCaseStudies = useMemo(() => {
    try {
      let studies = [...caseStudyContent];

      if (filter?.ids) {
        studies = studies.filter((study) => filter.ids!.includes(study.id));
      } else if (filter?.excludeIds) {
        studies = studies.filter(
          (study) => !filter.excludeIds!.includes(study.id)
        );
      }

      if (filter?.limit) {
        studies = studies.slice(0, filter.limit);
      }

      return studies;
    } catch (error) {
      console.error("Error filtering case studies:", error);
      setHasError(true);
      return [];
    }
  }, [filter]);

  // Reset current index when filtered case studies change
  useEffect(() => {
    try {
      setCurrent(0);
      setIsAnimating(false);
      setIsImageLoading(true);
      setHasError(false);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    } catch (error) {
      console.error("Error resetting carousel state:", error);
      setHasError(true);
    }
  }, [filteredCaseStudies]);

  // Preload next and previous images with error handling
  useEffect(() => {
    if (!filteredCaseStudies.length) return;

    const preloadImage = (src: string): Promise<Event> => {
      return new Promise((resolve, reject) => {
        try {
          const img = new globalThis.Image();
          img.onload = (event: Event) => resolve(event);
          img.onerror = (event: Event | string) => {
            console.error("Error preloading image:", src, event);
            reject(new Error("Failed to load image"));
          };
          img.src = src;
        } catch (error) {
          console.error("Error creating image:", error);
          reject(new Error("Failed to create image"));
        }
      });
    };

    const preloadNextAndPrev = async () => {
      try {
        const promises: Promise<Event>[] = [];

        // Always preload current image first
        if (filteredCaseStudies[current]?.image) {
          promises.push(preloadImage(filteredCaseStudies[current].image));
        }

        // Preload next image
        if (
          current < filteredCaseStudies.length - 1 &&
          filteredCaseStudies[current + 1]?.image
        ) {
          promises.push(preloadImage(filteredCaseStudies[current + 1].image));
        }
        // Preload previous image
        if (current > 0 && filteredCaseStudies[current - 1]?.image) {
          promises.push(preloadImage(filteredCaseStudies[current - 1].image));
        }

        await Promise.all(promises);
      } catch (error) {
        console.error("Error preloading images:", error);
        setHasError(true);
      }
    };

    preloadNextAndPrev();
  }, [current, filteredCaseStudies]);

  // Handle touch events for swipe
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      carousel.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      carousel.addEventListener("touchend", handleTouchEnd);

      return () => {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;

      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSlideChange = useCallback(
    (newIndex: number) => {
      try {
        if (
          isAnimating ||
          newIndex === current ||
          newIndex < 0 ||
          newIndex >= filteredCaseStudies.length
        )
          return;

        // Clear any existing animation timeout
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }

        setIsAnimating(true);
        setSlideDirection(newIndex > current ? "next" : "prev");
        setIsImageLoading(true);

        // Wait till animation ends, then set index
        requestAnimationFrame(() => {
          animationTimeoutRef.current = setTimeout(() => {
            setCurrent(newIndex); // ⬅ move here
            setIsAnimating(false);
          }, ANIMATION_DURATION);
        });
      } catch (error) {
        console.error("Error changing slide:", error);
        setHasError(true);
      }
    },
    [isAnimating, current, filteredCaseStudies.length]
  );

  const nextSlide = useCallback(() => {
    if (current >= filteredCaseStudies.length - 1) return;
    handleSlideChange(current + 1);
  }, [current, filteredCaseStudies.length, handleSlideChange]);

  const prevSlide = useCallback(() => {
    if (current <= 0) return;
    handleSlideChange(current - 1);
  }, [current, handleSlideChange]);

  const progressPercent = useMemo(
    () => ((current + 1) / filteredCaseStudies.length) * 100,
    [current, filteredCaseStudies.length]
  );

  const handleImageLoad = useCallback(() => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setIsImageLoading(false);
    }, 50);
  }, []);

  if (hasError) {
    return (
      <div className="w-full py-6 md:py-12 lg:py-16 text-center">
        <Text type={Font.SOURCE_SANS} className="text-gray-600">
          An error occurred while loading the case studies. Please refresh the
          page to try again.
        </Text>
      </div>
    );
  }

  // Ensure current index is within bounds
  const safeCurrentIndex = Math.min(current, filteredCaseStudies.length - 1);
  const currentCaseStudy = filteredCaseStudies[safeCurrentIndex];

  if (!currentCaseStudy) {
    return (
      <div className="w-full py-6 md:py-12 lg:py-16 text-center">
        <Text type={Font.SOURCE_SANS} className="text-gray-600">
          Error loading case study. Please try again later.
        </Text>
      </div>
    );
  }

  return (
    <div className="w-full py-6 md:py-12 lg:py-16" ref={carouselRef}>
      <div className="w-full pl-2 md:pl-4 lg:pl-0">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 md:gap-8 lg:gap-16 xl:gap-20">
          {/* Left: Content */}
          <div className="w-full md:w-[45%] lg:w-[40%] xl:w-[35%]">
            <div className="flex flex-row justify-between flex-1 max-w-lg z-10 ml-auto pr-2 md:pr-4 lg:pr-12 xl:pr-16">
              {/* Progress Bar */}
              <div className="relative h-[300px] md:h-[400px] w-4 md:w-6 flex justify-center items-start mt-2 md:mt-4">
                <div className="relative h-full w-3 md:w-5 rounded bg-[#0074FF] overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[#53FBFB] transition-all duration-150 ease-out will-change-transform"
                    style={{
                      height: `${progressPercent}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex-col flex justify-between items-start max-h-[350px] md:max-h-[450px]">
                <div
                  className="ml-4 md:ml-7 mt-0 md:mt-2 relative min-h-[150px] md:min-h-[200px] h-auto"
                  ref={contentRef}
                >
                  <div
                    key={safeCurrentIndex}
                    className="transition-all duration-150 ease-out will-change-transform"
                    style={{
                      opacity: isAnimating ? 0 : 1,
                      transform: `translateY(${isAnimating ? "20px" : "0"})`,
                    }}
                  >
                    <h2 className="text-black text-xl sm:text-2xl md:text-3xl font-bold leading-tight flex flex-col gap-1">
                      {currentCaseStudy.heading
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
                              if (group.trim()) acc.push(group);
                            }
                            return acc;
                          },
                          []
                        )
                        .map((line, index) => (
                          <Text
                            key={`${safeCurrentIndex}-${index}`}
                            className="max-w-[300px] text-[clamp(20px,5vw,24px)] md:text-[24px] leading-tight"
                            type={Font.GARAMOND}
                          >
                            {line}
                          </Text>
                        ))}
                    </h2>
                    <div className="text-gray-700 mt-2 md:mt-3">
                      <Text
                        type={Font.SOURCE_SANS}
                        className="text-[clamp(14px,3.5vw,16px)] md:text-sm lg:text-base"
                      >
                        {currentCaseStudy.at_a_glance}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Buttons fixed to bottom */}
                <div className="ml-4 md:ml-7 mt-2 md:mt-3">
                  <div className="flex flex-col gap-2 md:gap-4">
                    <Button
                      className="outline-1 px-4 md:px-7 py-2 md:py-3 relative overflow-hidden group bg-[#0047FF] text-white hover:bg-[#0047FF]/90 transition-all duration-300 text-sm md:text-base"
                      href={`/case-study?name=${currentCaseStudy.route}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShinyText text="Know More" speed={3} />
                    </Button>
                    <div className="flex space-x-2 md:space-x-4 select-none">
                      <button
                        onClick={prevSlide}
                        disabled={isAnimating || safeCurrentIndex === 0}
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border transition-colors ${
                          safeCurrentIndex === 0
                            ? "border-gray-300 text-gray-300"
                            : "border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white"
                        } flex items-center justify-center`}
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft
                          size={16}
                          strokeWidth={2.5}
                          className="md:hidden"
                        />
                        <ChevronLeft
                          size={20}
                          strokeWidth={2.5}
                          className="hidden md:block"
                        />
                      </button>

                      <button
                        onClick={nextSlide}
                        disabled={
                          isAnimating ||
                          safeCurrentIndex === filteredCaseStudies.length - 1
                        }
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-full border transition-colors ${
                          safeCurrentIndex === filteredCaseStudies.length - 1
                            ? "border-gray-300 text-gray-300"
                            : "border-[#0047FF] text-[#0047FF] hover:bg-[#0047FF] hover:text-white"
                        } flex items-center justify-center`}
                        aria-label="Next Slide"
                      >
                        <ChevronRight
                          size={16}
                          strokeWidth={2.5}
                          className="md:hidden"
                        />
                        <ChevronRight
                          size={20}
                          strokeWidth={2.5}
                          className="hidden md:block"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden md:block w-full md:w-[55%] lg:w-[60%] xl:w-[65%] md:h-[400px] overflow-hidden">
            <div className="relative w-full h-full">
              <div
                key={`image-${safeCurrentIndex}`}
                className={`absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isImageLoading ? "opacity-0" : "opacity-100"
                } ${
                  isAnimating
                    ? slideDirection === "next"
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
                style={{
                  willChange: "transform, opacity",
                  transform: isAnimating
                    ? slideDirection === "next"
                      ? "translateX(100%)"
                      : "translateX(-100%)"
                    : "translateX(0)",
                  transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                <Image
                  src={currentCaseStudy.image}
                  alt={currentCaseStudy.heading}
                  fill
                  quality={75}
                  className="object-cover"
                  sizes={`(max-width: ${IMAGE_SIZES.tablet}px) 45vw,
                         ${IMAGE_SIZES.desktop}px`}
                  priority={true}
                  onLoad={handleImageLoad}
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
              {/* Previous Image for Smooth Transition */}
              {isAnimating && safeCurrentIndex > 0 && (
                <div
                  className="absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    transform: "translateX(-100%)",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={filteredCaseStudies[safeCurrentIndex - 1].image}
                    alt={filteredCaseStudies[safeCurrentIndex - 1].heading}
                    fill
                    quality={75}
                    className="object-cover"
                    sizes={`(max-width: ${IMAGE_SIZES.tablet}px) 45vw,
                           ${IMAGE_SIZES.desktop}px`}
                    priority={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                </div>
              )}
              {/* Next Image for Smooth Transition */}
              {isAnimating &&
                safeCurrentIndex < filteredCaseStudies.length - 1 && (
                  <div
                    className="absolute inset-0 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      transform: "translateX(100%)",
                      willChange: "transform",
                    }}
                  >
                    <Image
                      src={filteredCaseStudies[safeCurrentIndex + 1].image}
                      alt={filteredCaseStudies[safeCurrentIndex + 1].heading}
                      fill
                      quality={75}
                      className="object-cover"
                      sizes={`(max-width: ${IMAGE_SIZES.tablet}px) 45vw,
                           ${IMAGE_SIZES.desktop}px`}
                      priority={false}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                    />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
