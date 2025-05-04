import React from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import { figmaSectionContainer } from "@app/utils/figmaUtils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export default function HeroSection({ title, subtitle }: HeroSectionProps) {
  return (
    <div className="relative overflow-visible w-full pt-20 pb-36">
      {/* Background vector image */}
      <div className="absolute inset-0 w-full h-[90%] top-0 z-0">
        <Image
          src="/about-us/herosection.svg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12" style={figmaSectionContainer()}>
        <div className="text-center max-w-3xl mx-auto">
          <Text 
            type={Font.GARAMOND} 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-black mb-8"
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
    </div>
  );
} 