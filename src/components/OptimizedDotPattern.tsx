"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface OptimizedDotPatternProps {
  className?: string;
}

export default function OptimizedDotPattern({
  className = "",
}: OptimizedDotPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, z: 0 });
  const vectorRef = useRef<HTMLDivElement>(null);

  // Track mouse movement for hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      // Get container dimensions and position
      const rect = containerRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the center of the container
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      // Calculate z value based on distance from center (for scale effect)
      const distanceFromCenter = Math.sqrt(x * x + y * y);
      const z = 1 - distanceFromCenter * 0.05; // Subtle scale factor

      // Update mouse position with more noticeable movement factor
      setMousePosition({
        x: x * 15, // Increased movement factor
        y: y * 15, // Increased movement factor
        z: z, // Z factor for scale
      });
    };

    // Add mouse move event listener to the document
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Apply the transformation to the SVG based on mouse position
  useEffect(() => {
    if (vectorRef.current) {
      // Apply transform with translation and scale for z-direction
      vectorRef.current.style.transform = `
        translate(${mousePosition.x}px, ${mousePosition.y}px) 
        scale(${mousePosition.z})
      `;
    }
  }, [mousePosition]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ perspective: "1000px" }} // Add perspective for 3D effect
    >
      {/* Original SVG pattern with smooth CSS animation and enhanced mouse interaction */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: "translateZ(0)", // Hardware acceleration
        }}
      >
        <div
          ref={vectorRef}
          className="relative w-[150%] h-[150%] -ml-[10%] -mt-[10%] wave-animation transition-all duration-700 ease-out"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/boughVector.svg"
            alt="Dot Pattern"
            width={100}
            height={100}
            className="opacity-100 h-[100%] w-[80%] -mt-52"
            priority
          />
        </div>
      </div>

      {/* Ambient glow effect - simpler animation */}
      <div className="inset-0 z-1 pointer-events-none pulse-animation">
        <div
          className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 100, 255, 0.4) 0%, rgba(0, 82, 255, 0) 70%)",
          }}
        />
      </div>

      {/* Add CSS for smooth transitions */}
      <style jsx global>{`
        .transition-all {
          transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
