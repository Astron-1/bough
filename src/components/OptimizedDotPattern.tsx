"use client";

import { useRef } from "react";

import Image from "next/image";

interface OptimizedDotPatternProps {
  className?: string;
}

export default function OptimizedDotPattern({
  className = "",
}: OptimizedDotPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse movement for hover effect

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {/* Original SVG pattern with smooth CSS animation */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: "translateZ(0)", // Hardware acceleration
        }}
      >
        <div className="relative w-[150%] h-[150%] -ml-[10%] -mt-[10%] wave-animation">
          <Image
            src="/boughVector.svg"
            alt="Dot Pattern"
            width={100}
            height={100}
            className=" opacity-100 h-[100%] w-[80%] -mt-52"
            priority
          />
        </div>
      </div>

      {/* Interactive hover effect - positioned absolutely to the mouse position */}

      {/* Ambient glow effect - simpler animation */}
      <div className=" inset-0 z-1 pointer-events-none pulse-animation">
        <div
          className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 100, 255, 0.4) 0%, rgba(0, 82, 255, 0) 70%)",
          }}
        />
      </div>

      {/* Add CSS animations via a style tag for better performance */}
    </div>
  );
}
