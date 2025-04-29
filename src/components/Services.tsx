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

      const centerX = 50;
      const offsetX = 20;
      const offsetY = 20;

      let path = `M${centerX},0 `;

      cards.forEach((card, index) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const cardTop = rect.top + window.scrollY - sectionTop;
        const cardBottom = cardTop + rect.height;
        const cardLeft = rect.left - sectionRect.left;
        const cardRight = cardLeft + rect.width;

        const midY = cardTop + rect.height / 2;
        const isLeft = index % 2 !== 0;

        const textSideX = isLeft ? cardLeft : cardRight;
        const entryX = isLeft ? textSideX - offsetX : textSideX + offsetX;
        const frontX = isLeft ? textSideX + 5 : textSideX - 5;

        path += `L${centerX},${cardTop - offsetY} `;
        path += `L${entryX},${cardTop - offsetY} `;
        path += `L${entryX},${midY - 20} `;
        path += `L${frontX},${midY} `;
        path += `L${entryX},${midY + 20} `;
        path += `L${entryX},${cardBottom + offsetY} `;
        path += `L${centerX},${cardBottom + offsetY} `;
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
        className="absolute left-0 top-0 z-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 2000"
        preserveAspectRatio="none"
      >
        <path ref={pathRef} d={pathData} strokeWidth="2" fill="none" />
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
