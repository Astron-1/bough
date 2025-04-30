"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ServiceCard from "./ServiceCard";
import accountingImage from "../../public/accounting.png";
import esgImage from "../../public/esg.png";
import transformationImage from "../../public/transformation.png";
import riskImage from "../../public/risk.png";

// Services array with names and images
const services = [
  { name: "Accounting", image: accountingImage },
  { name: "ESG", image: esgImage },
  { name: "Transformation", image: transformationImage },
  { name: "Risk", image: riskImage },
];

export default function BoughServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathLength, setPathLength] = useState(0);
  const [pathData, setPathData] = useState("");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const calculatePath = () => {
      const cards = cardRefs.current.filter(Boolean);
      if (!cards.length || !sectionRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top + window.scrollY;

      // Starting point at the top center
      let path = "M50,0 ";

      // Add initial vertical line
      path += "C50,50 50,100 50,150 ";

      // Create smooth curved path around each card
      cards.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY - sectionTop;
        const cardBottom = cardTop + rect.height;
        const isLeft = index % 2 === 0; // Left or right aligned card

        // Control points for smooth curves
        const controlPointY1 = cardTop - 100;
        const controlPointY2 = cardTop - 50;

        // Calculate x positions based on card alignment
        const curveStartX = 50; // Center
        const curveEndX = isLeft ? 80 : 20; // Left or right side
        const cardSideX = isLeft ? 85 : 15; // Further left or right for card edge

        // Curve from center to card top
        path += `C${curveStartX},${controlPointY1} ${curveEndX},${controlPointY2} ${curveEndX},${cardTop} `;

        // Curve around the card (following the contour)
        if (isLeft) {
          // Right-aligned card, curve goes around left side
          path += `C${curveEndX - 5},${cardTop + 50} ${cardSideX},${
            cardTop + 100
          } ${cardSideX},${cardTop + rect.height / 2} `;
          path += `C${cardSideX},${cardBottom - 100} ${curveEndX - 5},${
            cardBottom - 50
          } ${curveEndX},${cardBottom} `;
        } else {
          // Left-aligned card, curve goes around right side
          path += `C${curveEndX + 5},${cardTop + 50} ${cardSideX},${
            cardTop + 100
          } ${cardSideX},${cardTop + rect.height / 2} `;
          path += `C${cardSideX},${cardBottom - 100} ${curveEndX + 5},${
            cardBottom - 50
          } ${curveEndX},${cardBottom} `;
        }

        // Curve back to center for next card
        const nextControlY1 = cardBottom + 50;
        const nextControlY2 = cardBottom + 100;
        path += `C${curveEndX},${nextControlY1} ${curveStartX},${nextControlY2} ${curveStartX},${
          cardBottom + 150
        } `;
      });

      // End at the bottom center
      path += `L50,${sectionRect.height}`;
      setPathData(path);
    };

    calculatePath();
    window.addEventListener("resize", calculatePath);
    return () => window.removeEventListener("resize", calculatePath);
  }, []);

  useEffect(() => {
    if (pathRef.current && pathData) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathData]);

  useEffect(() => {
    return progress.on("change", (v) => {
      if (pathRef.current) {
        const length = v * pathLength;
        const point = pathRef.current.getPointAtLength(length);
        setPosition({ x: point.x, y: point.y });
      }
    });
  }, [progress, pathLength]);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center gap-20 px-4 py-40"
    >
      {/* SVG Path */}
      <svg
        className="absolute left-0 top-0 z-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 2000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={pathData}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Moving Ball */}
      <motion.div
        className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg z-50 absolute"
        style={{
          top: position.y,
          left: position.x,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Service Cards */}
      {services.map((service, i) => (
        <div
          key={service.name}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`relative w-full md:w-[1000px] ${
            i % 2 === 0 ? "md:self-end" : "md:self-start"
          } z-10`}
        >
          <ServiceCard image={service.image} serviceType={service.name} />
        </div>
      ))}
    </div>
  );
}
