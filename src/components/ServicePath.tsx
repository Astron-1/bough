"use client";

import React, { useState, useEffect, useRef } from "react";

interface ServicePathProps {
  animate?: boolean;
  className?: string;
  pathColor?: string;
  strokeWidth?: number;
  verticalOffset?: number;
  card1LeftSpace?: number;
  card2RightSpace?: number;
  card3LeftSpace?: number;
  card4RightSpace?: number;
  card1Top?: number;
  card2Top?: number;
  card3Top?: number;
  card4Top?: number;
  showBall?: boolean;
  ballColor?: string;
  ballSize?: number;
}

const ServicePath: React.FC<ServicePathProps> = ({
  animate = false,
  className = "",
  pathColor = "#0066FF",
  strokeWidth = 70,
  verticalOffset = 0,
  card1LeftSpace = 260,
  card2RightSpace = 1020,
  card3LeftSpace = 270,
  card4RightSpace = 1030,
  card1Top = -10,
  card2Top = 380,
  card3Top = 757,
  card4Top = 1145,
  showBall = true,
  ballColor = "#0066FF",
  ballSize = 40,
}) => {
  const [ballPosition, setBallPosition] = useState({
    x: 1283,
    y: card1Top + verticalOffset,
  });
  const [isVisible, setIsVisible] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const lastScrollY = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Vertical spacing calculations with offsets
  const y1 = card1Top + verticalOffset;
  const y2 = card2Top + verticalOffset;
  const y3 = card3Top + verticalOffset;
  const y4 = card4Top + verticalOffset;
  const y5 = 1550 + verticalOffset; // Increased bottom position to ensure full path is drawn and colored

  // Path definition with smoother curves
  const pathD = `
    M1283 ${y1} 
    H300.465
    C261.488 ${y1} ${card1LeftSpace} ${y1 + 40} ${card1LeftSpace} ${y1 + 119}
    V${y1 + 239}
    C${card1LeftSpace} ${y1 + 318} 261.488 ${y2} 300.465 ${y2}
    H982.558
    C1021.53 ${y2} ${card2RightSpace} ${y2 + 40} ${card2RightSpace} ${y2 + 119}
    V${y2 + 239}
    C${card2RightSpace} ${y2 + 318} 1021.53 ${y3} 982.558 ${y3}
    H300.465
    C261.488 ${y3} ${card3LeftSpace} ${y3 + 40} ${card3LeftSpace} ${y3 + 119}
    V${y3 + 239}
    C${card3LeftSpace} ${y3 + 318} 261.488 ${y4} 300.465 ${y4}
    H983
    C1031.67 ${y4} ${card4RightSpace} ${y4 + 31} ${card4RightSpace} ${y4 + 118}
    V${y4 + 236}
    C${card4RightSpace} ${y4 + 323} 1031.67 ${y5} 983 ${y5}
    H0.5
  `;

  // Function to calculate ball position at a given percentage along the path
  const calculateBallPosition = (percentage: number) => {
    if (!pathRef.current) return { x: 0, y: 0 };

    // Ensure percentage is between 0 and 1
    const safePercentage = Math.max(0, Math.min(1, percentage));

    // Get path length and calculate position
    const pathLength = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(pathLength * safePercentage);
    return { x: point.x, y: point.y };
  };

  // Improved fixed anchor points with better distribution
  const fixedPositions = [
    { scrollPercent: 0, pathPercent: 0 },
    { scrollPercent: 0.1, pathPercent: 0.15 },
    { scrollPercent: 0.2, pathPercent: 0.25 },
    { scrollPercent: 0.3, pathPercent: 0.35 },
    { scrollPercent: 0.4, pathPercent: 0.45 },
    { scrollPercent: 0.5, pathPercent: 0.55 },
    { scrollPercent: 0.6, pathPercent: 0.65 },
    { scrollPercent: 0.7, pathPercent: 0.75 },
    { scrollPercent: 0.8, pathPercent: 0.85 },
    { scrollPercent: 0.9, pathPercent: 0.95 },
    { scrollPercent: 1, pathPercent: 1 },
  ];

  // Function to map scroll percentage to path percentage using fixed positions with easing
  const mapScrollToPath = (scrollPercent: number) => {
    // Find the two fixed positions that our scroll percentage falls between
    let lower = fixedPositions[0];
    let upper = fixedPositions[fixedPositions.length - 1];

    for (let i = 0; i < fixedPositions.length - 1; i++) {
      if (
        scrollPercent >= fixedPositions[i].scrollPercent &&
        scrollPercent <= fixedPositions[i + 1].scrollPercent
      ) {
        lower = fixedPositions[i];
        upper = fixedPositions[i + 1];
        break;
      }
    }

    // Interpolate between the two fixed positions with easing
    const scrollRange = upper.scrollPercent - lower.scrollPercent;
    const pathRange = upper.pathPercent - lower.pathPercent;

    // Calculate the percentage with easing function (ease-out-cubic)
    const percentBetween =
      scrollRange === 0
        ? 0
        : (scrollPercent - lower.scrollPercent) / scrollRange;

    // Apply easing function (ease-out-cubic: t*(2-t))
    const easedPercent = percentBetween * (2 - percentBetween);

    // Calculate the path percentage
    const result = lower.pathPercent + easedPercent * pathRange;

    // Ensure result stays in bounds
    return Math.min(Math.max(result, 0), 1);
  };

  // Check if element is in viewport
  const isInViewport = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  };

  // Improved scroll handler with smooth animation using requestAnimationFrame
  useEffect(() => {
    if (!pathRef.current) return;

    const handleScroll = () => {
      if (isInViewport()) {
        // Make ball visible when in viewport
        setIsVisible(true);
        
        // Use requestAnimationFrame for smoother animation
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }

        animationFrameId.current = requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const scrollY = window.scrollY;
          lastScrollY.current = scrollY;

          const documentHeight =
            document.documentElement.scrollHeight - windowHeight;

          // Calculate scroll percentage
          const scrollPercentage = Math.min(
            Math.max(scrollY / documentHeight, 0),
            1
          );

          // Map scroll percentage to path percentage with easing
          const pathPercentage = mapScrollToPath(scrollPercentage);

          // Get position on path
          const position = calculateBallPosition(pathPercentage);
          setBallPosition(position);
        });
      } else {
        // Set visibility to false when not in viewport
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Call initially and also after a short delay to ensure path is loaded
    handleScroll();
    setTimeout(handleScroll, 200);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [showBall]);

  return (
    <div
      ref={containerRef}
      className={`absolute z-50 pointer-events-none ${className}`}
      style={{
        position: "absolute",
        top: -30,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1283 1450"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        {/* Define filters and animations */}
        <defs>
          {/* Improved glow filter for the ball */}
          <filter id="ball-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feFlood floodColor={ballColor} floodOpacity="0.7" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>

          {/* Improved ball gradient */}
          <radialGradient
            id="ballGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor={ballColor} />
            <stop offset="100%" stopColor="#0044BB" />
          </radialGradient>

          {/* Path glow effect */}
          <filter id="path-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feFlood floodColor={pathColor} floodOpacity="0.3" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>

          {/* Trail effect for the ball */}
          <filter
            id="trail-effect"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="trail"
            />
            <feComposite in="SourceGraphic" in2="trail" operator="over" />
          </filter>
        </defs>

        {/* Background path with subtle glow */}
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={strokeWidth * 1.5}
          strokeLinecap="round"
          strokeOpacity="0.15"
          fill="none"
          strokeDasharray="10000"
          strokeDashoffset="0"
        />

        {/* Main path with improved styling */}
        <path
          ref={pathRef}
          d={pathD}
          stroke={pathColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeOpacity="0.8"
          filter="url(#path-glow)"
          fill="none"
          className={animate ? "path-animation" : ""}
          style={{
            vectorEffect: "non-scaling-stroke",
          }}
        />

        {/* Ball with trail and glow effects */}
        {showBall && isVisible && (
          <>
            {/* Ball trail/shadow effect */}
            <circle
              cx={ballPosition.x}
              cy={ballPosition.y}
              r={ballSize * 0.7}
              fill={`${ballColor}40`} // Semi-transparent version of ball color
              filter="url(#trail-effect)"
              style={{
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />

            {/* Main ball */}
            <circle
              ref={ballRef}
              cx={ballPosition.x}
              cy={ballPosition.y}
              r={ballSize / 2}
              fill="url(#ballGradient)"
              filter="url(#ball-glow)"
              style={{
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                transformOrigin: "center",
              }}
            />

            {/* Inner highlight for 3D effect */}
            <circle
              cx={ballPosition.x - ballSize * 0.15}
              cy={ballPosition.y - ballSize * 0.15}
              r={ballSize * 0.2}
              fill="rgba(255, 255, 255, 0.7)"
              style={{
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </>
        )}
      </svg>

      {/* CSS animations */}
      <style jsx global>{`
        @keyframes drawPath {
          0% {
            stroke-dashoffset: 10000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .path-animation {
          stroke-dasharray: 10000;
          stroke-dashoffset: 10000;
          animation: drawPath 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ServicePath;
