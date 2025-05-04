import React from "react";
import Text, { Font } from "@app/components/Text";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
      <div className="text-center max-w-3xl mx-auto">
        <Text 
          type={Font.GARAMOND} 
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-6"
        >
          {title}
        </Text>
        <Text 
          type={Font.SOURCE_SANS} 
          className="text-lg md:text-xl text-black/80"
        >
          {subtitle}
        </Text>
      </div>
    </div>
  );
} 