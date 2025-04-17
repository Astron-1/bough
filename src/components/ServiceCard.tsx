"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceTabProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
  index: number;
  totalTabs: number;
  setTabMeasurements: (index: number, width: number, left: number) => void;
}

interface TabMeasurement {
  width: number;
  left: number;
}

interface ServiceContentProps {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  learnMoreUrl: string;
}

interface ServiceCardProps {
  className?: string;
  tabs: Array<{
    id: string;
    label: string;
  }>;
  contents: ServiceContentProps[];
  defaultActiveTab?: string;
}

const ServiceTab: React.FC<ServiceTabProps> = ({ 
  id, 
  label, 
  isActive, 
  onClick, 
  index, 
  totalTabs,
  setTabMeasurements
}) => {
  // Adjust spacing based on position (first, middle, last)
  const paddingClass = index === 0 ? 'pl-8 pr-10' : index === totalTabs - 1 ? 'pl-10 pr-8' : 'px-10';
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      const parentRect = textRef.current.parentElement?.getBoundingClientRect() || { left: 0 };
      const textWidth = rect.width;
      const textLeft = rect.left - parentRect.left;
      setTabMeasurements(index, textWidth, textLeft);
    }
  }, [index, label, setTabMeasurements]); // Added label back to ensure measurements update when text changes
  
  return (
    <button
      onClick={() => onClick(id)}
      className={`${paddingClass} py-4 text-white transition-all duration-300 relative`}
      style={{ background: 'transparent' }}
    >
      <span 
        ref={textRef}
        className={`${isActive ? 'font-bold' : 'font-normal'} text-[1.5rem] leading-[1.5rem] inline-block`}
        style={{ fontFamily: "var(--font-sf-pro)" }}
      >
        {label}
      </span>
    </button>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  className = '', 
  tabs, 
  contents,
  defaultActiveTab 
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0].id);
  const [tabMeasurements, setTabMeasurements] = useState<TabMeasurement[]>([]);
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // Use useCallback to memoize the function and prevent infinite loops
  const updateTabMeasurement = useCallback((index: number, width: number, left: number) => {
    setTabMeasurements(prev => {
      const newMeasurements = [...prev];
      newMeasurements[index] = { width, left };
      return newMeasurements;
    });
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const activeContent = contents.find(content => content.id === activeTab);
  
  const currentTabMeasurement = tabMeasurements[activeTabIndex] || { width: 0, left: 0 };

  // Calculate the precise position for the tab underline
  const getUnderlinePosition = () => {
    // Sum up widths and paddings of previous tabs
    let position = 0;
    for (let i = 0; i < activeTabIndex; i++) {
      if (tabMeasurements[i]) {
        // Add the width of the tab text
        position += tabMeasurements[i].width;
        // Add the padding
        position += i === 0 ? 72 : 80; // First tab has 32+40, others have 40+40
      }
    }
    // Add the left padding of current tab
    position += activeTabIndex === 0 ? 32 : 40;
    return position;
  };

  return (
    <div className={`relative mx-auto max-w-[65rem] px-0 ${className}`}>
      <div className="relative">
        {/* Tabs Outside Container */}
        <div ref={tabContainerRef} className="flex bg-transparent mb-0 relative z-20">
          {tabs.map((tab, index) => (
            <ServiceTab
              key={tab.id}
              id={tab.id}
              label={tab.label}
              isActive={activeTab === tab.id}
              onClick={handleTabChange}
              index={index}
              totalTabs={tabs.length}
              setTabMeasurements={updateTabMeasurement}
            />
          ))}
          
          {/* Tab Underline with Glow Effect */}
          <div className="absolute" style={{ bottom: '0px', zIndex: 10 }}>
            <motion.div 
              className="absolute h-0.5 bg-[#53fbfb] z-20 rounded-full"
              initial={{ width: tabMeasurements[0]?.width || 0, left: 32 }}
              animate={{ 
                width: currentTabMeasurement.width,
                left: getUnderlinePosition()
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                boxShadow: "0 4px 16px rgba(83, 251, 251, 0.4)",
                filter: "drop-shadow(0 2px 10px rgba(83, 251, 251, 0.25))"
              }}
            />
            
            {/* Semi-circular glow underneath the underline */}
            <motion.div 
              className="absolute rounded-b-full"
              initial={{ 
                width: tabMeasurements[0]?.width || 0, 
                left: 32,
                height: 40
              }}
              animate={{ 
                width: currentTabMeasurement.width,
                left: getUnderlinePosition(),
                height: 40
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              style={{
                top: '0px',
                background: "radial-gradient(ellipse at top, rgba(83, 251, 251, 0.2) 0%, transparent 80%)",
                filter: "blur(6px)",
                zIndex: 15
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Card Container */}
      <div 
        className="w-full h-[26.625rem] flex-shrink-0 rounded-[1.25rem] overflow-hidden flex flex-col mt-[-4px]"
        style={{
          background: "rgba(0, 0, 0, 0.60)",
          boxShadow: "0px 12px 20px 0px rgba(0, 0, 0, 0.30)",
          zIndex: 5
        }}
      >
        {/* Border Line */}
        <div className="w-full border-b border-[#13294c]"></div>

        {/* Content Area */}
        <div className="flex px-14 pt-14 pb-12 flex-1">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex w-full h-full"
            >
              {/* Text content */}
              <div className="w-[55%] pr-6 flex flex-col">
                <h2 
                  className="text-[2rem] font-bold mb-6 leading-[2.25rem] text-white"
                  style={{ fontFamily: "var(--font-sf-pro)" }}
                >
                  {activeContent?.title}
                </h2>
                <p  
                  className="text-[1.125rem] font-normal leading-[1.75rem] text-white opacity-80 mb-auto"
                  style={{ fontFamily: "var(--font-sf-pro)" }}
                >
                  {activeContent?.description}
                </p>
                <div className="mt-8">
                  <Link 
                    href={activeContent?.learnMoreUrl || "#"} 
                    className="inline-block rounded-full bg-[#1143e8] hover:bg-[#0f39cc] text-white font-medium px-8 py-3 transition-colors duration-300"
                  >
                    Learn more
                  </Link>
                </div>
              </div>

              {/* Circle placeholder */}
              <div className="w-[45%] flex items-center">
                <motion.div 
                  className="w-[18rem] h-[18rem] rounded-full overflow-hidden ml-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 0 40px rgba(255, 255, 255, 0.1) inset"
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 