"use client";

import React, { useState } from "react";

// Define the data structure for slider items
interface InsightItem {
  id: number;
  title: string;
  description: string;
}

export default function InsightsSlider() {
  // Sample data for the slider
  const insights: InsightItem[] = [
    {
      id: 1,
      title: "Delivering better insights with better data",
      description: "Using advanced analytics and data visualization to transform complex data into actionable insights."
    },
    {
      id: 2,
      title: "Delivering change at the speed of light",
      description: "Agile methodologies and rapid deployment to implement solutions faster than traditional approaches."
    },
    {
      id: 3,
      title: "Developing a robust revenue assurance function",
      description: "Building reliable revenue tracking and management systems for sustainable business growth."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Function to handle clicking on a number
  const handleNumberClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full relative h-[160px] flex items-center bg-transparent">
      <div className="max-w-[70rem] w-full mx-auto relative px-4">
        {/* Line container to ensure proper alignment */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 w-full">
          {/* Base translucent line with proper styling */}
          <div className="absolute inset-0 w-full" style={{ 
            height: "0.125rem", 
            background: "rgba(255, 255, 255, 0.60)",
            zIndex: 10 
          }} />
          
          {/* Active/highlighted section with rounded ends */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2" style={{ 
            width: `${23.33331 * (activeIndex + 1)}rem`, 
            height: "0.25rem",
            background: "#FFF",
            zIndex: 15,
            borderRadius: "0.125rem"
          }} />
        </div>
        
        {/* Slider indicator circles and text */}
        <div className="w-full flex justify-between items-center relative z-20">
          {insights.map((item, index) => (
            <div 
              key={item.id}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleNumberClick(index)}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-medium cursor-pointer transition-all duration-300 ${
                  activeIndex === index 
                    ? "bg-white text-blue-800 shadow-md" 
                    : "bg-transparent text-white border-2 border-white"
                }`}
              >
                {item.id}
              </div>
              {/* Title below the number with enhanced visibility */}
              <p className="mt-4 text-white text-sm font-medium text-center max-w-[220px] whitespace-normal" 
                 style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.9)" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 