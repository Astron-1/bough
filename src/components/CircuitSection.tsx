"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CircuitSectionProps {
  className?: string;
}

const CircuitSection: React.FC<CircuitSectionProps> = ({ className = "" }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const sections = [
    {
      title: "Strategic partnership over prescriptive advice",
      icon: "/icons/handshake.svg",
      description:
        "We believe in collaborative approaches that prioritize your specific needs and goals.",
    },
    {
      title: "Empowering your workforce for sustainable change",
      icon: "/icons/empowerment.svg",
      description:
        "We focus on equipping your teams with the skills and knowledge needed for long-term success and continuous improvement.",
    },
    {
      title: "Technology that enhances, not replaces",
      icon: "/icons/technology.svg",
      description:
        "Our solutions integrate advanced technologies that complement human expertise rather than attempting to replace it.",
    },
  ];

  return (
    <section className={`py-20 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4  ">
            Leveraging leading technologies to maximize impact
          </h2>
          <p className="text-[#a3b3bc] max-w-4xl mx-auto text-lg">
            At Bough, we understand that solving complex challenges goes beyond
            expertise—it requires collaboration. That&apos;s why we continuously
            enhance our capabilities and forge strategic partnerships with
            leading technology providers and industry experts. By leveraging
            best-in-class digital capabilities, we deliver innovative,
            forward-looking solutions that drive measurable results.
          </p>
        </div>

        <div className="relative">
          {/* Circuit Path - This is the SVG that shows the circuit animation */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
            viewBox="0 0 1200 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Starting point dot */}
            <circle
              cx="240"
              cy="120"
              r="8"
              fill={activeSection !== null ? "#53fbfb" : "#13294c"}
              style={{ transition: "fill 0.5s ease" }}
            />

            {/* First section circuit */}
            <path
              d="M240 120 V 280 H 400 V 120"
              stroke={
                activeSection === 0 ||
                activeSection === 1 ||
                activeSection === 2
                  ? "#53fbfb"
                  : "#13294c"
              }
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.5s ease" }}
            />

            {/* Connection dot between first and second section */}
            <circle
              cx="400"
              cy="120"
              r="8"
              fill={
                activeSection === 1 || activeSection === 2
                  ? "#53fbfb"
                  : "#13294c"
              }
              style={{ transition: "fill 0.5s ease" }}
            />

            {/* Second section circuit */}
            <path
              d="M400 120 H 600 V 280 H 800 V 120"
              stroke={
                activeSection === 1 || activeSection === 2
                  ? "#53fbfb"
                  : "#13294c"
              }
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.5s ease" }}
            />

            {/* Connection dot between second and third section */}
            <circle
              cx="800"
              cy="120"
              r="8"
              fill={activeSection === 2 ? "#53fbfb" : "#13294c"}
              style={{ transition: "fill 0.5s ease" }}
            />

            {/* Third section circuit */}
            {/* <path
              d="M800 120 H 960 V 280 H 800"
              stroke={activeSection === 2 ? "#53fbfb" : "#13294c"}
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.5s ease" }}
            /> */}
          </svg>

          {/* Content Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className="rounded-2xl flex flex-col items-center text-center transition-all duration-300  group relative"
                style={{
                  minHeight: "200%",
                  background: "rgba(10, 20, 50, 0.1)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    activeSection === index
                      ? "0 0 30px rgba(83, 251, 251, 0.6)"
                      : "0 0 15px rgba(19, 41, 76, 0.3)",
                  border:
                    activeSection === index
                      ? "2px solid #53fbfb"
                      : "2px solid rgba(83, 251, 251, 0.3)",
                  transition: "all 0.3s ease-in-out",
                  padding: "2.5rem 1.5rem",
                  transform:
                    activeSection === index
                      ? "translateY(-10px)"
                      : "translateY(0)",
                }}
                onMouseEnter={() => setActiveSection(index)}
                onMouseLeave={() => setActiveSection(null)}
              >
                {/* Circuit decorations */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  {/* Top right corner */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 transition-opacity duration-300"
                    style={{
                      borderRight:
                        activeSection === index
                          ? "2px solid #53fbfb"
                          : "2px solid rgba(83, 251, 251, 0.3)",
                      borderTop:
                        activeSection === index
                          ? "2px solid #53fbfb"
                          : "2px solid rgba(83, 251, 251, 0.3)",
                      opacity: activeSection === index ? 1 : 0.5,
                    }}
                  />

                  {/* Bottom left corner */}
                  <div
                    className="absolute bottom-0 left-0 w-16 h-16 transition-opacity duration-300"
                    style={{
                      borderLeft:
                        activeSection === index
                          ? "2px solid #53fbfb"
                          : "2px solid rgba(83, 251, 251, 0.3)",
                      borderBottom:
                        activeSection === index
                          ? "2px solid #53fbfb"
                          : "2px solid rgba(83, 251, 251, 0.3)",
                      opacity: activeSection === index ? 1 : 0.5,
                    }}
                  />

                  {/* Horizontal lines */}
                  <div
                    className="absolute top-1/4 left-0 right-0 h-px transition-opacity duration-300"
                    style={{
                      background:
                        activeSection === index
                          ? "#53fbfb"
                          : "rgba(83, 251, 251, 0.3)",
                      opacity: activeSection === index ? 0.8 : 0.3,
                    }}
                  />

                  <div
                    className="absolute bottom-1/4 left-0 right-0 h-px transition-opacity duration-300"
                    style={{
                      background:
                        activeSection === index
                          ? "#53fbfb"
                          : "rgba(83, 251, 251, 0.3)",
                      opacity: activeSection === index ? 0.8 : 0.3,
                    }}
                  />

                  {/* Circuit dots */}
                  <div
                    className="absolute top-1/4 left-6 w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        activeSection === index
                          ? "#53fbfb"
                          : "rgba(83, 251, 251, 0.5)",
                      boxShadow:
                        activeSection === index ? "0 0 10px #53fbfb" : "none",
                    }}
                  />

                  <div
                    className="absolute bottom-1/4 right-6 w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background:
                        activeSection === index
                          ? "#53fbfb"
                          : "rgba(83, 251, 251, 0.5)",
                      boxShadow:
                        activeSection === index ? "0 0 10px #53fbfb" : "none",
                    }}
                  />
                </div>

                <div className="w-16 h-16 mb-8 flex items-center justify-center z-10">
                  <div
                    className="relative w-16 h-16 transition-all duration-300"
                    style={{
                      filter:
                        activeSection === index
                          ? "drop-shadow(0 0 12px rgba(83, 251, 251, 0.8))"
                          : "none",
                      transform:
                        activeSection === index ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    <Image
                      src={section.icon}
                      alt={section.title}
                      fill
                      className={`object-contain brightness-0 invert transition-all duration-500 ${
                        activeSection === index ? "opacity-100" : "opacity-85"
                      }`}
                    />
                  </div>
                </div>
                <h3
                  className={`text-xl font-medium mb-5 transition-all duration-300 z-10 ${
                    activeSection === index ? "text-[#53fbfb]" : " "
                  }`}
                >
                  {section.title}
                </h3>
                <p
                  className={`text-base transition-all duration-300 z-10 ${
                    activeSection === index ? "  opacity-100" : "  opacity-80"
                  }`}
                >
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircuitSection;
