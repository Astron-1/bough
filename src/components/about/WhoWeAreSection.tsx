import React from "react";
import Text, { Font } from "@app/components/Text";
import {
  createResponsiveVars,
  figmaSectionContainer,
} from "@app/utils/figmaUtils";

interface TeamPhotoProps {
  alt: string;
  src?: string;
  placeholderText?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface WhoWeAreSectionProps {
  title: string;
  paragraphs: string[];
  photos: TeamPhotoProps[];
}

const TeamPhoto = ({
  alt,
  src,
  placeholderText,
  className,
  style,
}: TeamPhotoProps) => (
  <div
    className={`bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
    style={style}
  >
    {src ? (
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-500 font-light">
        {placeholderText || "Team Photo"}
      </div>
    )}
  </div>
);

export default function WhoWeAreSection({
  title,
  paragraphs,
  photos,
}: WhoWeAreSectionProps) {
  const SCALE_FACTOR = 0.85; // Desktop scale
  const MOBILE_SCALE = 0.9; // Increased mobile scale
  const bentoGridDimensions = {
    // Grid dimensions with SCALE_FACTOR
    grid1Width: `${205 * SCALE_FACTOR}px`,
    grid1Height: `${133 * SCALE_FACTOR}px`,
    
    grid2Width: `${205 * SCALE_FACTOR}px`,
    grid2Height: `${213 * SCALE_FACTOR}px`,
    
    grid3Width: `${205 * SCALE_FACTOR}px`,
    grid3Height: `${213 * SCALE_FACTOR}px`,
    
    grid4Width: `${205 * SCALE_FACTOR}px`,
    grid4Height: `${134 * SCALE_FACTOR}px`,
    
    grid5Width: `${276 * SCALE_FACTOR}px`,
    grid5Height: `${112 * SCALE_FACTOR}px`,
    
    grid6Width: `${131 * SCALE_FACTOR}px`,
    grid6Height: `${112 * SCALE_FACTOR}px`,
    
    spacingH: "0.75rem",
    spacingV: "0.75rem",
    xsScaleFactor: 0.6,
  };

  const responsiveVars = createResponsiveVars(bentoGridDimensions);

  return (
    <div
      id="who-we-are"
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-10"
      style={figmaSectionContainer()}
    >
      <div className="mx-auto max-w-xl sm:max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-6 lg:gap-x-8">
        <div className="relative flex justify-start w-full">
          <div className="relative w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-full">
            <style jsx>{`
              .bento-container {
                ${responsiveVars}
                width: 100%;
              }
              @media (max-width: 639px) {
                .bento-container {
                  transform: scale(${MOBILE_SCALE});
                  transform-origin: top left;
                  margin-bottom: -80px;
                  width: 92%;
                  margin-right: 1rem;
                }
              }
              @media (min-width: 640px) and (max-width: 767px) {
                .bento-container {
                  transform: scale(0.95);
                  transform-origin: top left;
                  margin-bottom: -60px;
                  width: 95%;
                  margin-right: 1.5rem;
                }
              }
              @media (min-width: 768px) and (max-width: 1279px) {
                .bento-container {
                  transform: scale(1);
                  transform-origin: top left;
                  margin-bottom: -40px;
                  width: 98%;
                  margin-right: 2rem;
                }
              }
              .team-photo {
                border-radius: 0.5rem;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                transition: all 0.3s ease;
              }
              .team-photo:hover {
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                transform: translateY(-2px);
              }
            `}</style>

            <div className="bento-container relative">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const positions = [
                  { top: "0", left: "0" }, // Grid 1
                  { top: "0", left: "calc(var(--grid1Width) + var(--spacingH))" }, // Grid 2
                  { top: "calc(var(--grid1Height) + var(--spacingV))", left: "0" }, // Grid 3
                  {
                    top: "calc(var(--grid2Height) + var(--spacingV))",
                    left: "calc(var(--grid1Width) + var(--spacingH))"
                  }, // Grid 4
                  {
                    top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                    left: "0"
                  }, // Grid 5
                  {
                    top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                    left: "calc(var(--grid5Width) + var(--spacingH))"
                  }, // Grid 6
                ];

                const widths = [
                  "var(--grid1Width)",
                  "var(--grid2Width)",
                  "var(--grid3Width)",
                  "var(--grid4Width)",
                  "var(--grid5Width)",
                  "var(--grid6Width)",
                ];

                const heights = [
                  "var(--grid1Height)",
                  "var(--grid2Height)",
                  "var(--grid3Height)",
                  "var(--grid4Height)",
                  "var(--grid5Height)",
                  "var(--grid6Height)",
                ];

                return (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      top: positions[index].top,
                      left: positions[index].left,
                    }}
                  >
                    <TeamPhoto
                      alt={photos[index]?.alt || `Team Photo ${index + 1}`}
                      src={photos[index]?.src}
                      placeholderText={photos[index]?.placeholderText}
                      style={{
                        width: widths[index],
                        height: heights[index],
                      }}
                      className="team-photo"
                    />
                  </div>
                );
              })}

              <div
                style={{
                  height: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV) + var(--grid5Height))",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start xl:-ml-20">
          <div className="w-full sm:w-[95%] md:w-[90%] lg:w-[85%] xl:max-w-[37rem] space-y-4">
            <Text
              type={Font.GARAMOND}
              className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-semibold text-black mb-4 md:leading-[1.2] mt-8 sm:mt-12 xl:mt-0"
            >
              {title}
            </Text>

            <div className="space-y-4 pr-4 sm:pr-6 md:pr-8 xl:pr-0">
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={index}
                  type={Font.SOURCE_SANS}
                  className="text-base md:text-[1.125rem] lg:text-[1rem] text-black/90 md:leading-[1.75]"
                >
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
