import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "@app/components/Header";
import Link from "next/link";
import InsightsSlider from "@app/components/InsightsSlider";

import ConnectCTA from "../../public/careersCTA.png";
import Image from "next/image";
import CaseStudyCarousel from "@app/components/CaseStudyCarousel";
import Text from "@app/components/Text";
import { Font } from "@app/components/Text";
import BottomSection from "@app/components/BottomSection";

// Define the data structure for slider items
interface InsightItem {
  id: number;
  title: string;
  description: string;
  backgroundImage: string;
  url: string;
}

export default function InsightsPage() {
  // Sample data for the slider
  const insights: InsightItem[] = [
    {
      id: 1,
      title: "Delivering better insights with better data",
      description:
        "Bough helps a global technology company implement an effective data governance program to support data migration for SAP RAR implementation and ongoing business operations",
      backgroundImage: "/insights-bg.png",
      url: "/case-study?name=CASE%20STUDY%201%20%E2%80%93%20Data%20optimization%20and%20governance",
    },
    {
      id: 2,
      title: "Delivering change at the speed of light",
      description:
        "Bough helps develop an agile and adaptive accounting solution for a global technology company to meet the ASC 606 revenue reporting requirements",
      backgroundImage: "/insights-bg-2.jpg",
      url: "/case-study?name=CASE%20STUDY%202%20%E2%80%93%20ASC%20606%20Reporting%20Solution%20(Plan%20B)",
    },
    {
      id: 3,
      title: "Developing a robust revenue assurance function",
      description:
        "Bough helps a global technology company implement an effective and a cost-effective revenue assurance program to ensure regulatory compliance and meet audit requirements.",
      backgroundImage: "/insights-bg-3.jpg",
      url: "/case-study?name=CASE%20STUDY%203%20%E2%80%93%20Revenue%20Assurance%20and%20audit%20readiness",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const userInteractedRef = useRef(false);

  // Clear the existing interval
  const clearAutoRotation = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start a new interval
  const startAutoRotation = useCallback(() => {
    clearAutoRotation();

    if (!userInteractedRef.current) {
      intervalRef.current = setInterval(() => {
        setPrevIndex(activeIndex);
        setIsTransitioning(true);
        setActiveIndex((prevIndex) => (prevIndex + 1) % insights.length);
      }, 6000);
    }
  }, [clearAutoRotation, insights.length, activeIndex]);

  const handleIndexChange = useCallback(
    (index: number) => {
      userInteractedRef.current = true;
      clearAutoRotation();

      setPrevIndex(activeIndex);
      setIsTransitioning(true);
      setActiveIndex(index);

      setTimeout(() => {
        userInteractedRef.current = false;
        startAutoRotation();
      }, 10000);
    },
    [clearAutoRotation, startAutoRotation, activeIndex]
  );

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    startAutoRotation();

    return () => {
      clearAutoRotation();
    };
  }, [startAutoRotation, clearAutoRotation]);

  // Get current insight data
  const currentInsight = insights[activeIndex];
  const prevInsight = insights[prevIndex];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative w-full">
      {/* Add Header with transparent prop */}
      <Header transparent={true} />

      {/* Hero Section with InsightHero Background - Full Viewport Height */}
      <div className="relative w-full h-screen -mt-24 overflow-hidden">
        {/* Previous Background Image */}
        {isTransitioning && (
          <div className="absolute inset-0 z-0">
            <Image
              src={prevInsight.backgroundImage}
              alt="Previous Insight"
              fill
              className="object-cover fade-out"
              priority
            />
          </div>
        )}
        
        {/* Current Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={currentInsight.backgroundImage}
            alt="Current Insight"
            fill
            className={`object-cover ${isTransitioning ? 'fade-in' : ''}`}
            priority
          />
        </div>

        {/* Content Container - Centered vertically and horizontally */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full">
          <div className="mx-auto" style={{ width: "728px", maxWidth: "95%" }}>
            <div className="bg-white/75 backdrop-blur-sm rounded-[20px] p-8 shadow-xl border border-gray-50 h-96 flex flex-col justify-center overflow-hidden">
              <div
                key={activeIndex}
                className="flex flex-col items-center"
                style={{
                  animation:
                    "fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
                }}
              >
                <Text
                  type={Font.GARAMOND}
                  className="text-center text-[#111827] text-3xl md:text-5xl font-semibold leading-[40px] md:leading-[60px] mb-5 w-[648px] max-w-full mx-auto"
                >
                  {currentInsight.title}
                </Text>
                <Text
                  type={Font.SOURCE_SANS}
                  className="text-center text-[#333333] text-xl font-normal leading-relaxed mb-8 w-[648px] max-w-full mx-auto"
                >
                  {currentInsight.description}
                </Text>

                {/* Read More Button */}
                <div className="flex justify-center">
                  <Link href={currentInsight.url}>
                    <button className="bg-[#1143E8] text-white py-2.5 px-8 rounded-full text-sm hover:bg-[#0035d9] transition-colors shadow-md">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add keyframe animation for content transitions */}
        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(15px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeOut {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }

          @keyframes fadeInBg {
            0% {
              opacity: 0;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          :global(.fade-in) {
            animation: fadeInBg 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          }

          :global(.fade-out) {
            animation: fadeOut 1.2s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
          }
        `}</style>

        {/* Slider positioned at the bottom of the screen with improved visibility */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 bg-gradient-to-t from-black/60 to-transparent pt-20">
          <InsightsSlider
            insights={insights}
            activeIndex={activeIndex}
            onIndexChange={handleIndexChange}
          />
        </div>
      </div>

      {/* Fixed width container for content below hero */}
      <div className="">
        {/* Featured Case Studies */}
        <CaseStudyCarousel />
      </div>

      {/* Connect CTA Section */}
      <div className="mt-16">
        <BottomSection
          content="Let's drive outcomes by crafting changes
for a meaningful tomorrow, now"
          backgroundImage={ConnectCTA}
          className="md:px-4 text-xl md:text-2xl"
        />
      </div>
    </main>
  );
}
