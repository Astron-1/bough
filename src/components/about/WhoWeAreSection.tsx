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
  // Define base dimensions from Figma
  const bentoGridDimensions = {
    grid1Width: "12.77344rem",
    grid1Height: "8.29519rem",
    grid2Width: "12.7735rem",
    grid2Height: "13.24163rem",
    grid3Width: "12.77344rem",
    grid3Height: "13.24163rem",
    grid4Width: "12.7735rem",
    grid4Height: "8.29513rem",
    grid5Width: "17.19463rem",
    grid5Height: "6.97394rem",
    grid6Width: "8.08713rem",
    grid6Height: "6.97394rem",
    spacingH: "0.85rem",
    spacingV: "0.85rem",
  };

  // Generate CSS variables for all screen sizes
  const responsiveVars = createResponsiveVars(bentoGridDimensions);

  return (
    <div
      id="who-we-are"
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-10"
      style={figmaSectionContainer()}
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-12 gap-y-12 gap-x-10 lg:gap-x-20">
        {/* Left side - Bento grid layout for photos */}
        <div className="relative md:col-span-5 flex justify-center md:justify-start">
          {/* Create custom bento grid with responsive dimensions */}
          <div className="relative w-full max-w-[26rem]">
            {/* Use CSS variables for responsive scaling */}
            <style jsx>{`
              .bento-container {
                ${responsiveVars}
              }
            `}</style>

            <div className="bento-container relative">
              {/* Top row - left image */}
              <div className="absolute top-0 left-0">
                <TeamPhoto
                  alt={photos[0]?.alt || "Team Photo 1"}
                  src={photos[0]?.src}
                  placeholderText={photos[0]?.placeholderText}
                  style={{
                    width: "var(--grid1Width)",
                    height: "var(--grid1Height)",
                  }}
                />
              </div>

              {/* Top row - right image */}
              <div
                className="absolute top-0"
                style={{ left: "calc(var(--grid1Width) + var(--spacingH))" }}
              >
                <TeamPhoto
                  alt={photos[1]?.alt || "Team Photo 2"}
                  src={photos[1]?.src}
                  placeholderText={photos[1]?.placeholderText}
                  style={{
                    width: "var(--grid2Width)",
                    height: "var(--grid2Height)",
                  }}
                />
              </div>

              {/* Middle row - left image */}
              <div
                className="absolute"
                style={{
                  top: "calc(var(--grid1Height) + var(--spacingV))",
                  left: "0",
                }}
              >
                <TeamPhoto
                  alt={photos[2]?.alt || "Team Photo 3"}
                  src={photos[2]?.src}
                  placeholderText={photos[2]?.placeholderText}
                  style={{
                    width: "var(--grid3Width)",
                    height: "var(--grid3Height)",
                  }}
                />
              </div>

              {/* Middle row - right image */}
              <div
                className="absolute"
                style={{
                  top: "calc(var(--grid2Height) + var(--spacingV))",
                  left: "calc(var(--grid3Width) + var(--spacingH))",
                }}
              >
                <TeamPhoto
                  alt={photos[3]?.alt || "Team Photo 4"}
                  src={photos[3]?.src}
                  placeholderText={photos[3]?.placeholderText}
                  style={{
                    width: "var(--grid4Width)",
                    height: "var(--grid4Height)",
                  }}
                />
              </div>

              {/* Bottom row - left image */}
              <div
                className="absolute"
                style={{
                  top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                  left: "0",
                }}
              >
                <TeamPhoto
                  alt={photos[4]?.alt || "Team Photo 5"}
                  src={photos[4]?.src}
                  placeholderText={photos[4]?.placeholderText}
                  style={{
                    width: "var(--grid5Width)",
                    height: "var(--grid5Height)",
                  }}
                />
              </div>

              {/* Bottom row - right image - Aligning with the bottom of the grid5 */}
              <div
                className="absolute"
                style={{
                  top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                  left: "calc(var(--grid5Width) + var(--spacingH))",
                }}
              >
                <TeamPhoto
                  alt={photos[5]?.alt || "Team Photo 6"}
                  src={photos[5]?.src}
                  placeholderText={photos[5]?.placeholderText}
                  style={{
                    width: "var(--grid6Width)",
                    height: "var(--grid6Height)",
                  }}
                />
              </div>

              {/* Spacer to ensure container maintains proper height */}
              <div
                style={{
                  height:
                    "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV) + var(--grid5Height))",
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right side - Text content */}
        <div className="md:col-span-6 flex flex-col justify-start md:pl-10 lg:pl-16">
          <div className="md:max-w-[45rem]">
            <Text
              type={Font.GARAMOND}
              className="text-3xl md:text-[2.5rem] lg:text-[2.75rem] font-semibold text-black mb-5 md:leading-[1.2]"
            >
              {title}
            </Text>

            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <Text
                  key={index}
                  type={Font.SOURCE_SANS}
                  className="text-base md:text-[1.125rem] lg:text-[1.120rem] text-black/90 md:leading-[1.75]"
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
