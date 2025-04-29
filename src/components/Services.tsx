"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import sample from "../../public/sampleacc.png";
import ServiceCard from "./ServiceCard";

const services = ["Accounting", "Finance", "Legal", "Marketing"];

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

      const centerX = 50;
      const offsetX = 10; // distance away from card horizontally
      const offsetY = 10; // vertical spacing around cards

      let path = `M${centerX},0 `;

      cards.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY - sectionTop;
        const cardBottom = cardTop + rect.height;
        const cardLeft = rect.left - sectionRect.left;
        const cardRight = cardLeft + rect.width;

        if (index % 2 === 0) {
          // Right side
          const xRight = cardRight + offsetX;
          path += `L${centerX},${cardTop - offsetY} `;
          path += `L${xRight},${cardTop - offsetY} `;
          path += `L${xRight},${cardTop} `;
          path += `L${xRight},${cardBottom} `;
          path += `L${xRight},${cardBottom + offsetY} `;
          path += `L${centerX},${cardBottom + offsetY} `;
        } else {
          // Left side
          const xLeft = cardLeft - offsetX;
          path += `L${centerX},${cardTop - offsetY} `;
          path += `L${xLeft},${cardTop - offsetY} `;
          path += `L${xLeft},${cardTop} `;
          path += `L${xLeft},${cardBottom} `;
          path += `L${xLeft},${cardBottom + offsetY} `;
          path += `L${centerX},${cardBottom + offsetY} `;
        }
      });

      path += `L${centerX},${sectionRect.height}`;
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
        className="absolute left-0 top-0 z-0 w-full h-full"
        viewBox="0 0 100 2000"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={pathData}
          stroke="#2563eb"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Moving Ball */}
      <motion.div
        className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg z-20 absolute"
        style={{
          top: position.y,
          left: position.x,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cards */}
      {services.map((service, i) => (
        <div
          key={service}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`relative w-full md:w-[1000px] ${
            i % 2 === 0 ? "md:self-end" : "md:self-start"
          } z-10`}
        >
          <ServiceCard image={sample} serviceType={service} />
        </div>
      ))}
    </div>
  );
}
