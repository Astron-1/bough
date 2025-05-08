"use client";

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block ${
        disabled ? "" : "animate-shine"
      } ${className} max-w-full`}
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Static visible text */}
      <span className="relative z-10 break-words">{text}</span>

      {/* Shiny overlay */}
      <span
        className="absolute inset-0 z-20 break-words"
        style={{
          backgroundImage:
            "linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animationDuration: animationDuration,
          mixBlendMode: "overlay",
        }}
      >
        {text}
      </span>
    </span>
  );
};

export default ShinyText;
