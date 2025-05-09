"use client";

import React, { ReactNode } from "react";
import Text, { Font } from "@app/components/Text";
import IconWithHover from "@app/components/common/IconWithHover";
import { LucideProps } from "lucide-react";

interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  showMeasurements?: boolean;
  measurementLeftValue?: string;
  measurementRightValue?: string;
  measurementBottomValue?: string;
  iconSize?: string;
}

export default function ValueCard({ 
  title, 
  description, 
  icon,
  showMeasurements = false,
  measurementLeftValue,
  measurementRightValue,
  measurementBottomValue,
  iconSize = "4.5rem"
}: ValueCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-7 relative">
      {/* Left measurement indicator */}
      {showMeasurements && measurementLeftValue && (
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-2 hidden md:block">
          <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
            {measurementLeftValue}
          </div>
        </div>
      )}
      
      <div className="flex-shrink-0 relative">
        <IconWithHover 
          icon={icon as React.ReactElement<LucideProps>}
          size={iconSize}
        />
        
        {/* Bottom measurement indicator */}
        {showMeasurements && measurementBottomValue && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden md:block">
            <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
              {measurementBottomValue}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex-grow max-w-none relative pt-1">
        <Text type={Font.GARAMOND} className="text-2xl font-semibold text-black mb-3">
          {title}
        </Text>
        <Text type={Font.SOURCE_SANS} className="text-base text-black/80 leading-relaxed">
          {description}
        </Text>
        
        {/* Right measurement indicator */}
        {showMeasurements && measurementRightValue && (
          <div className="absolute top-0 right-0 hidden md:block">
            <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
              {measurementRightValue}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 