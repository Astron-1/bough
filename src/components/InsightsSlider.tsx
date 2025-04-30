"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Define the data structure for slider items
interface InsightItem {
  id: number;
  title: string;
  description: string;
}

interface InsightsSliderProps {
  insights: InsightItem[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

export default function InsightsSlider({ insights, activeIndex, onIndexChange }: InsightsSliderProps) {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Add custom styles for smoother transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .insights-slider .progress-bar {
        transition: width 0.9s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      .insights-slider .bullet-indicator {
        transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      .insights-slider .bullet-active {
        transform: scale(1.05);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }
      .insights-slider .bullet-text {
        transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      .insights-slider .bullet-text-active {
        transform: translateY(-1px);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Sync the swiper with the activeIndex from parent
  useEffect(() => {
    if (swiper && swiper.activeIndex !== activeIndex && !isTransitioning) {
      setIsTransitioning(true);
      swiper.slideTo(activeIndex);
      setTimeout(() => setIsTransitioning(false), 900); // Match transition duration
    }
  }, [activeIndex, swiper]);

  // Handle slide change from Swiper
  const handleSlideChange = (swiper: SwiperType) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      onIndexChange(swiper.activeIndex);
      setTimeout(() => setIsTransitioning(false), 900); // Match transition duration
    }
  };

  return (
    <div className="w-full relative h-[160px] flex items-center bg-transparent insights-slider">
      <div className="max-w-[70rem] w-full mx-auto relative px-4">
        <Swiper
          modules={[Pagination, Navigation, EffectFade]}
          slidesPerView={1}
          spaceBetween={30}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={700}
          initialSlide={activeIndex}
          allowTouchMove={true}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          className="hidden" // Hide the slides but keep the functionality
        >
          {insights.map((item) => (
            <SwiperSlide key={item.id}>
              {/* Each slide is invisible but maintains the Swiper functionality */}
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Custom navigation/indicators that work with Swiper */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 w-full">
          {/* Base translucent line */}
          <div className="absolute inset-0 w-full" style={{ 
            height: "0.125rem", 
            background: "rgba(255, 255, 255, 0.60)",
            zIndex: 10 
          }} />
          
          {/* Progress bar */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 progress-bar" style={{ 
            width: `${(100 / insights.length) * (activeIndex + 1)}%`, 
            height: "0.25rem",
            background: "#FFF",
            zIndex: 15,
            borderRadius: "0.125rem"
          }} />
        </div>
        
        {/* Custom bullet indicators */}
        <div className="w-full flex justify-between items-center relative z-20">
          {insights.map((item, index) => (
            <div 
              key={item.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => !isTransitioning && swiper && swiper.slideTo(index)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium cursor-pointer bullet-indicator ${
                  activeIndex === index ? "bullet-active bg-white text-blue-800" : "bg-transparent text-white border-2 border-white hover:bg-white/20"
                }`}
              >
                {item.id}
              </div>
              <p className={`mt-4 text-white text-sm font-medium text-center max-w-[220px] whitespace-normal bullet-text ${
                activeIndex === index ? "bullet-text-active opacity-100" : "opacity-70"
              }`} 
                 style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.9)" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 