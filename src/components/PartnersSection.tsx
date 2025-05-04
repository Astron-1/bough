"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
// Import required modules
import { Autoplay } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";

interface PartnerLogo {
  id: number;
  name: string;
  logoPath: string;
  website: string;
}

interface SwiperRefType {
  swiper: SwiperClass;
}

interface PartnersSectionProps {
  className?: string;
}

// Using logoipsum placeholder logos
const partnerLogos: PartnerLogo[] = [
  {
    id: 1,
    name: "Klarity",
    logoPath: "/partner/klarity.svg",
    website: "https://www.klarity.ai",
  },
  {
    id: 2,
    name: "Vic.ai",
    logoPath: "/partner/vic.ai.svg",
    website: "https://www.vic.ai",
  },
  {
    id: 3,
    name: "Trullion",
    logoPath: "/partner/trullion.svg",
    website: "https://trullion.com",
  },
  {
    id: 4,
    name: "Ramp",
    logoPath: "/partner/ramp.svg",
    website: "https://ramp.com/intelligence",
  },
  {
    id: 5,
    name: "Numeric",
    logoPath: "/partner/numeric.svg",
    website: "https://www.numeric.io",
  },
];

// Second row has different logos in different order
const secondRowLogos = [
  {
    id: 11,
    name: "Uipath",
    logoPath: "/capabilities/uipath.svg",
    website: "https://www.uipath.com/",
  },
  {
    id: 12,
    name: "Tableau",
    logoPath: "/capabilities/tableau.svg",
    website: "https://www.tableau.com/",
  },
  {
    id: 13,
    name: "Power BI",
    logoPath: "/capabilities/powerbi.svg",
    website: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
  },
  {
    id: 14,
    name: "Celonis",
    logoPath: "/capabilities/celonis.svg",
    website: "https://www.celonis.com/",
  },
  {
    id: 15,
    name: "Onestream",
    logoPath: "/capabilities/onestream.svg",
    website: "https://www.onestream.com/",
  },
  {
    id: 16,
    name: "Automation Anywhere",
    logoPath: "/capabilities/automation-anywhere.svg",
    website: "https://www.automationanywhere.com/",
  },
  {
    id: 17,
    name: "Power Automate",
    logoPath: "/capabilities/powerautomate.svg",
    website: "https://www.microsoft.com/en-us/power-platform/products/power-automate",
  },
  {
    id: 18,
    name: "Alteryx",
    logoPath: "/capabilities/alteryx.svg",
    website: "https://www.alteryx.com/",
  },
  {
    id: 19,
    name: "Workiva",
    logoPath: "/capabilities/workiva.svg",
    website: "https://www.workiva.com/en-in/",
  },
];

// Duplicate the logos many times to ensure continuous scrolling
const firstRowLogos = [...Array(5)].flatMap(() => partnerLogos);
const secondRowLogos2 = [...Array(5)].flatMap(() => secondRowLogos);

// Simple direct tooltip implementation
const PartnerLogo: React.FC<{
  logo: PartnerLogo;
  onClick: (website: string) => void;
  onHover: (id: number | null) => void;
  hoveredId: number | null;
}> = ({ logo, onClick, onHover, hoveredId }) => {
  const [imageError, setImageError] = useState(false);
  const isHovered = hoveredId === logo.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== logo.id;

  const handleClick = () => {
    onClick(logo.website);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMouseEnter = () => {
    onHover(logo.id);
  };

  const handleMouseLeave = () => {
    onHover(null);
  };

  return (
    <div
      className="cursor-pointer h-32 flex items-center justify-center relative group"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Direct tooltip without component */}
      <div
        className={`absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black   text-xs rounded px-2 py-1 
                      transition-all duration-300 z-50 whitespace-nowrap
                      ${
                        isHovered
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-75 pointer-events-none"
                      }`}
        style={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {logo.name}
        <div className="absolute w-2 h-2 bg-black transform rotate-45 left-1/2 -ml-1 -bottom-1"></div>
      </div>

      <div
        className="w-36 h-32 flex items-center justify-center p-2 overflow-hidden transition-all duration-300 hover:z-10"
        style={{
          transform: isHovered ? "scale(1.15)" : "scale(1)",
          filter: isOtherHovered ? "blur(2px) grayscale(0.7)" : "none",
          opacity: isOtherHovered ? 0.6 : 1,
          transition: "all 0.3s ease",
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {!imageError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={logo.logoPath}
                alt={logo.name}
                width={140}
                height={140}
                className="w-auto h-auto max-h-24 object-contain transition-opacity duration-300"
                priority
                onError={handleImageError}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <span className="text-xl   text-opacity-80">
                  {logo.name.charAt(0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PartnersSection: React.FC<PartnersSectionProps> = ({
  className = "",
}) => {
  const firstSwiperRef = useRef<SwiperRefType>(null);
  const secondSwiperRef = useRef<SwiperRefType>(null);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const animationPausedRef = useRef(false);

  const handleLogoClick = (website: string) => {
    // Open the website in a new tab
    window.open(website, "_blank");
  };

  // Add custom CSS for animations
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .partners-swiper {
        overflow: visible !important;
      }
      .marquee-container {
        overflow: hidden;
      }
      .swiper-wrapper {
        transition-timing-function: linear !important;
      }
      .paused .swiper-wrapper {
        transition: none !important;
      }
      .marquee-animation-left {
        animation: marquee-left 40s linear infinite;
      }
      .marquee-animation-right {
        animation: marquee-right 40s linear infinite;
      }
      .paused .marquee-animation-left,
      .paused .marquee-animation-right {
        animation-play-state: paused;
      }
      @keyframes marquee-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes marquee-right {
        0% { transform: translateX(-50%); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Memoize these functions to prevent recreating them on each render
  const stopAllAnimation = useCallback(() => {
    if (animationPausedRef.current) return;

    if (firstSwiperRef.current?.swiper) {
      firstSwiperRef.current.swiper.autoplay.stop();
    }
    if (secondSwiperRef.current?.swiper) {
      secondSwiperRef.current.swiper.autoplay.stop();
    }

    animationPausedRef.current = true;

    // Add class to parent element
    const container = document.querySelector(".partner-container");
    if (container) {
      container.classList.add("paused");
    }
  }, []);

  const startAllAnimation = useCallback(() => {
    if (!animationPausedRef.current) return;

    if (firstSwiperRef.current?.swiper) {
      firstSwiperRef.current.swiper.autoplay.start();
    }
    if (secondSwiperRef.current?.swiper) {
      secondSwiperRef.current.swiper.autoplay.start();
    }

    animationPausedRef.current = false;

    // Remove class from parent element
    const container = document.querySelector(".partner-container");
    if (container) {
      container.classList.remove("paused");
    }
  }, []);

  // Handle hover state changes more safely
  const handleHoverLogo = useCallback(
    (id: number | null) => {
      setHoveredLogo(id);

      if (id !== null) {
        stopAllAnimation();
      } else {
        startAllAnimation();
      }
    },
    [stopAllAnimation, startAllAnimation]
  );

  return (
    <section className={`py-20 relative overflow-hidden ${className}`}>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2
          className="text-center text-black text-[2.5rem] font-semibold leading-[2.5rem] mb-16  "
          style={{ fontFamily: "var(--font-source-sans)" }}
        >
          Partnerships & capabilities
        </h2>

        <div
          className="w-full mx-auto py-10 px-4 flex flex-col justify-center items-center rounded-[1rem] partner-container backdrop-blur-sm"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.08)",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* First row - moves right to left */}
          <div className="w-full mb-10 marquee-container">
            <div className="marquee-animation-left">
              <Swiper
                ref={firstSwiperRef}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 }
                }}
                loop={true}
                speed={8000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: true,
                  stopOnLastSlide: false,
                }}
                className="partners-swiper"
                allowTouchMove={false}
              >
                {firstRowLogos.map((logo, index) => (
                  <SwiperSlide key={`row1-${logo.id}-${index}`}>
                    <PartnerLogo
                      logo={logo}
                      onClick={handleLogoClick}
                      onHover={handleHoverLogo}
                      hoveredId={hoveredLogo}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Second row - moves left to right */}
          <div className="w-full marquee-container">
            <div className="marquee-animation-right">
              <Swiper
                ref={secondSwiperRef}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 }
                }}
                loop={true}
                speed={8000}
                autoplay={{
                  delay: 0,
                  disableOnInteraction: true,
                  stopOnLastSlide: false,
                  reverseDirection: true,
                }}
                className="partners-swiper"
                allowTouchMove={false}
              >
                {secondRowLogos2.map((logo, index) => (
                  <SwiperSlide key={`row2-${logo.id}-${index}`}>
                    <PartnerLogo
                      logo={logo}
                      onClick={handleLogoClick}
                      onHover={handleHoverLogo}
                      hoveredId={hoveredLogo}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
