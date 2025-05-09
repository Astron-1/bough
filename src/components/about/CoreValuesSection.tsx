"use client";

import React from "react";
import Text, { Font } from "@app/components/Text";
import { figmaSectionContainer } from "@app/utils/figmaUtils";
import { Compass, HeartHandshake, Landmark, TrendingUp, Lock, LucideProps } from "lucide-react";
import IconWithHover from "@app/components/common/IconWithHover";

interface CoreValueProps {
  icon: React.ReactElement<LucideProps>;
  title: string;
}

interface CoreValuesSectionProps {
  title: string;
  description: string;
}

const CoreValuesSection: React.FC<CoreValuesSectionProps> = ({
  title,
  description,
}) => {
  const coreValues: CoreValueProps[] = [
    {
      icon: <Compass size={40} />,
      title: "Better is not by chance",
    },
    {
      icon: <HeartHandshake size={40} />,
      title: "Relations are not entitlements",
    },
    {
      icon: <Landmark size={40} />,
      title: "Values are not convenience",
    },
    {
      icon: <Lock size={40} />,
      title: "Trust is not a coincidence",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Profitability is not a reckless pursuit",
    },
  ];

  return (
    <div
      id="our-values"
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={figmaSectionContainer()}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <Text
          type={Font.GARAMOND}
          className="text-4xl md:text-5xl font-semibold text-center text-black mb-8"
        >
          {title}
        </Text>

        {/* Description */}
        <Text
          type={Font.SOURCE_SANS}
          className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-16 text-black"
        >
          {description}
        </Text>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-12">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center px-4"
            >
              <IconWithHover 
                icon={value.icon}
                size="5rem"
                iconSize={40}
              />
              <Text
                type={Font.SOURCE_SANS}
                className="text-base font-medium text-[#001F63] mt-6"
              >
                {value.title}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;
