import React, { ReactNode } from "react";
import ValueCard from "./ValueCard";
import Text, { Font } from "@app/components/Text";
import { figmaSectionContainer } from "@app/utils/figmaUtils";

interface ValueItem {
  title: string;
  description: string;
  icon: ReactNode;
  measurementLeftValue?: string;
  measurementRightValue?: string;
  measurementBottomValue?: string;
}

interface ValuesSectionProps {
  values: ValueItem[];
  showMeasurements?: boolean;
  sectionTitle?: string;
}

export default function ValuesSection({ 
  values, 
  showMeasurements = false, 
  sectionTitle = "What we believe" 
}: ValuesSectionProps) {
  return (
    <div className="relative z-10 py-16 md:py-20 px-4 sm:px-6 lg:px-8" style={figmaSectionContainer()}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <Text 
          type={Font.GARAMOND} 
          className="text-4xl md:text-5xl font-semibold text-black mb-14 md:mb-16"
        >
          {sectionTitle}
        </Text>

        {/* Values Cards */}
        <div className="space-y-12 md:space-y-16">
          {values.map((value, index) => (
            <ValueCard
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
              measurementLeftValue={value.measurementLeftValue}
              measurementRightValue={value.measurementRightValue}
              measurementBottomValue={value.measurementBottomValue}
              showMeasurements={showMeasurements}
              iconSize={index === 0 ? "4.5rem" : "4.5rem"}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 