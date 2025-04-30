import React from "react";
import Header from "@app/components/Header";

import InsightsSlider from "@app/components/InsightsSlider";

import ConnectCTA from "@app/components/ConnectCTA";
import Image from "next/image";
import CaseStudyCarousel from "@app/components/CaseStudyCarousel";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative w-full">
      {/* Hero Section with InsightHero Background - Full Viewport Height */}
      <div className="relative w-full h-screen">
        {/* Background Image */}
        <Image
          src="/insightheroImage.jpg"
          alt="Insight Hero"
          fill
          className="object-cover z-0"
          priority
        />

        {/* Navbar overlay positioned absolute with transparent background */}
        <div className="absolute top-0 left-0 right-0 z-50 pt-4">
          <Header transparent={true} />
        </div>

        {/* Content Container - Centered vertically and horizontally */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full">
          <div className="mx-auto w-[45.5rem] max-w-[90%]">
            <div className="bg-white/95 backdrop-blur-md rounded-[1.25rem] p-8 shadow-xl border border-gray-100">
              <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
                Delivering better
                <br /> insights with better data
              </h1>
              <p className="text-center mb-6 mx-auto text-base max-w-xl text-gray-700">
                Bough helps a global technology company implement an effective
                and a cost-effective revenue assurance program to ensure
                regulatory compliance and meet audit requirements
              </p>

              {/* Read More Button */}
              <div className="flex justify-center">
                <button className="bg-[#1143E8] text-white py-2.5 px-8 rounded-full text-sm hover:bg-[#0035d9] transition-colors shadow-md">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slider positioned at the bottom of the screen with improved visibility */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pb-4 bg-gradient-to-t from-black/60 to-transparent pt-20">
          <InsightsSlider />
        </div>
      </div>

      {/* Fixed width container for content below hero */}
      <div style={{ width: "70rem", maxWidth: "100%" }}>
        {/* Featured Case Studies */}
        <CaseStudyCarousel />
      </div>

      {/* Connect CTA Section */}
      <div className="mt-16">
        <ConnectCTA />
      </div>
    </main>
  );
}
