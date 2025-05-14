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
  const bentoGridDimensions = {
    mobileGrid1Width: "8.77rem",
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

    // Extra small overrides
    xsGrid1Width: "6.5rem",
    xsGrid1Height: "5rem",
    xsGrid2Width: "6.5rem",
    xsGrid2Height: "6.5rem",
    xsGrid3Width: "6.5rem",
    xsGrid3Height: "6.5rem",
    xsGrid4Width: "6.5rem",
    xsGrid4Height: "5rem",
    xsGrid5Width: "10rem",
    xsGrid5Height: "4rem",
    xsGrid6Width: "5rem",
    xsGrid6Height: "4rem",
  };

  const responsiveVars = createResponsiveVars(bentoGridDimensions);

  return (
    <div
      id="who-we-are"
      className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 xl:px-10"
      style={figmaSectionContainer()}
    >
      <div className="mx-auto max-w-xl  sm:max-w-7xl grid grid-cols-1 xl:grid-cols-12 gap-y-12 gap-x-10 lg:gap-x-20">
        <div className="relative col-span-3 md:col-span-5 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[26rem]">
            <style jsx>{`
              .bento-container {
                ${responsiveVars}
              }
              @media (max-width: 639px) {
                :root {
                  --grid1Width: var(--xsGrid1Width);
                  --grid1Height: var(--xsGrid1Height);
                  --grid2Width: var(--xsGrid2Width);
                  --grid2Height: var(--xsGrid2Height);
                  --grid3Width: var(--xsGrid3Width);
                  --grid3Height: var(--xsGrid3Height);
                  --grid4Width: var(--xsGrid4Width);
                  --grid4Height: var(--xsGrid4Height);
                  --grid5Width: var(--xsGrid5Width);
                  --grid5Height: var(--xsGrid5Height);
                  --grid6Width: var(--xsGrid6Width);
                  --grid6Height: var(--xsGrid6Height);
                }
              }
            `}</style>

            <div className="bento-container relative">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const positions = [
                  { top: "0", left: "0" },
                  {
                    top: "0",
                    left: "calc(var(--grid1Width) + var(--spacingH))",
                  },
                  {
                    top: "calc(var(--grid1Height) + var(--spacingV))",
                    left: "0",
                  },
                  {
                    top: "calc(var(--grid2Height) + var(--spacingV))",
                    left: "calc(var(--grid3Width) + var(--spacingH))",
                  },
                  {
                    top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                    left: "0",
                  },
                  {
                    top: "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV))",
                    left: "calc(var(--grid5Width) + var(--spacingH))",
                  },
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
                      style={{ width: widths[index], height: heights[index] }}
                      className={`w-[${widths[index]}] h-[${heights[index]}] sm:w-auto sm:h-auto`}
                    />
                  </div>
                );
              })}

              <div
                style={{
                  height:
                    "calc(var(--grid1Height) + var(--spacingV) + var(--grid3Height) + var(--spacingV) + var(--grid5Height))",
                }}
              ></div>
            </div>
          </div>
        </div>

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
