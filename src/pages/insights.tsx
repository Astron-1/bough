import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "@app/components/Header";

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
}

export default function InsightsPage() {
  // Sample data for the slider
  const insights: InsightItem[] = [
    {
      id: 1,
      title: "Delivering better insights with better data",
      description:
        "Bough helps a global technology company implement an effective data governance program to support data migration for SAP RAR implementation and ongoing business operations",
    },
    {
      id: 2,
      title: "Delivering change at the speed of light",
      description:
        "Bough helps develop an agile and adaptive accounting solution for a global technology company to meet the ASC 606 revenue reporting requirements",
    },
    {
      id: 3,
      title: "Developing a robust revenue assurance function",
      description:
        "Bough helps a global technology company implement an effective and a cost-effective revenue assurance program to ensure regulatory compliance and meet audit requirements.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
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
        setActiveIndex((prevIndex) => (prevIndex + 1) % insights.length);
      }, 6000);
    }
  }, [clearAutoRotation, insights.length]);

  const handleIndexChange = useCallback(
    (index: number) => {
      userInteractedRef.current = true;
      clearAutoRotation();

      setActiveIndex(index);

      setTimeout(() => {
        userInteractedRef.current = false;
        startAutoRotation();
      }, 10000);
    },
    [clearAutoRotation, startAutoRotation]
  );

  useEffect(() => {
    startAutoRotation();

    return () => {
      clearAutoRotation();
    };
  }, [startAutoRotation, clearAutoRotation]);

  // Get current insight data
  const currentInsight = insights[activeIndex];

  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative w-full">
      {/* Add Header with transparent prop */}
      <Header transparent={true} />

      {/* Hero Section with InsightHero Background - Full Viewport Height */}
      <div className="relative w-full h-screen -mt-24">
        {/* Background Image */}
        <Image
          src="/insights-bg.png"
          alt="Insight Hero"
          fill
          className="object-cover z-0"
          priority
        />

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
                  <button className="bg-[#1143E8] text-white py-2.5 px-8 rounded-full text-sm hover:bg-[#0035d9] transition-colors shadow-md">
                    Read more
                  </button>
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
          className="md:px-12"
        />
      </div>
    </main>
  );
}
