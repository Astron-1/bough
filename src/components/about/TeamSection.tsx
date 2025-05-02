import React from "react";
import Text, { Font } from "@app/components/Text";
import TeamMemberCard, { TeamMemberProps } from "./TeamMemberCard";
import { figmaSectionContainer } from "@app/utils/figmaUtils";

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMemberProps[];
  showMeasurements?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ 
  title, 
  description, 
  members,
  showMeasurements = false
}) => {
  // Exact spacing measurements from Figma
  const spacing = {
    horizontalGap: "3.48rem", // Exact from Figma
    verticalGap: "9.56rem",   // Exact from Figma
    leftMargin: "3.9rem",     // Exact from Figma
    rightMargin: "4.1rem"     // Exact from Figma
  };

  // Card dimensions from Figma
  const cardDimensions = {
    width: "19rem",
    height: "19rem"
  };

  // Calculate width for a row of exactly 3 cards
  const threeCardRowWidth = `calc(${cardDimensions.width} * 3 + ${spacing.horizontalGap} * 2)`;

  return (
    <div className="relative z-10 py-16 md:py-20 px-4 sm:px-6" style={figmaSectionContainer()}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <Text 
          type={Font.GARAMOND} 
          className="text-4xl md:text-5xl font-semibold text-black mb-12 md:mb-16"
        >
          {title}
        </Text>

        {/* Team Members Grid */}
        <div className="relative">
          {/* Measurement indicators */}
          {showMeasurements && (
            <>
              <div className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-full">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.leftMargin}
                </div>
              </div>
              <div className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-full">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.rightMargin}
                </div>
              </div>
              <div className="absolute left-1/3 top-1/2">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.horizontalGap}
                </div>
              </div>
              <div className="absolute left-1/2 top-[43%]">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap flex items-center justify-center h-[9.56rem]">
                  {spacing.verticalGap}
                </div>
              </div>
            </>
          )}

          {/* Fixed grid layout with exactly 3 cards per row */}
          <div className="mx-auto overflow-hidden" style={{
            display: "grid",
            gridTemplateColumns: `repeat(3, ${cardDimensions.width})`,
            gap: spacing.horizontalGap,
            rowGap: spacing.verticalGap,
            width: threeCardRowWidth,
            maxWidth: "100%",
            justifyContent: "center",
            paddingLeft: spacing.leftMargin,
            paddingRight: spacing.rightMargin
          }}>
            {members.map((member) => (
              <div 
                key={member.id} 
                style={{ 
                  flexShrink: 0,
                  width: cardDimensions.width,
                  height: "auto"
                }}
                className="flex justify-center items-start"
              >
                <TeamMemberCard 
                  id={member.id}
                  name={member.name}
                  title={member.title}
                  image={member.image}
                  alt={member.alt}
                  linkedIn={member.linkedIn}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Description (optional) - moved to bottom */}
        {description && (
          <div className="max-w-3xl mx-auto text-center mt-16 mb-8">
            <Text type={Font.SOURCE_SANS} className="text-lg text-black/80">
              {description}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection; 