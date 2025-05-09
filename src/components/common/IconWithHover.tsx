"use client";

import React from 'react';
import { LucideProps } from 'lucide-react';

interface IconWithHoverProps {
  icon: React.ReactElement<LucideProps>;
  size?: string;
  className?: string;
  iconSize?: number;
}

const IconWithHover: React.FC<IconWithHoverProps> = ({
  icon,
  size = "4.5rem",
  className = "",
  iconSize = 40
}) => {
  return (
    <div 
      className={`
        group
        relative
        inline-flex
        items-center
        justify-center
        ${className}
      `}
      style={{ 
        width: size, 
        height: size,
      }}
    >
      {/* Background glow effect */}
      <div className="
        absolute 
        inset-0 
        rounded-full 
        bg-gradient-to-r 
        from-[#0074FF]/10 
        to-[#0074FF]/5
        opacity-0
        group-hover:opacity-100
        transition-opacity
        duration-500
        ease-in-out
        blur-xl
      "/>

      {/* Icon container */}
      <div 
        className="
          relative
          flex
          items-center
          justify-center
          w-full
          h-full
          rounded-full
          bg-[#0074FF]
          transition-all
          duration-500
          ease-in-out
          group-hover:bg-white
          group-hover:shadow-[0_4px_20px_rgba(0,116,255,0.2)]
          cursor-pointer
          overflow-hidden
        "
        style={{
          transform: 'translateZ(0)', // Forces GPU acceleration
        }}
        onMouseEnter={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'scale(1.05) rotate(360deg)';
          const svg = target.querySelector('svg');
          if (svg) {
            svg.style.stroke = '#0074FF';
            svg.style.transition = 'stroke 500ms ease-in-out';
          }
        }}
        onMouseLeave={(e) => {
          const target = e.currentTarget;
          target.style.transform = 'scale(1) rotate(0deg)';
          const svg = target.querySelector('svg');
          if (svg) {
            svg.style.stroke = 'white';
          }
        }}
      >
        <div className="
          w-10 
          h-10 
          flex 
          items-center 
          justify-center 
          transition-transform 
          duration-500 
          ease-in-out
        ">
          {React.cloneElement(icon, {
            size: iconSize,
            stroke: "white",
            strokeWidth: 2,
            className: "transition-all duration-500 ease-in-out"
          } as LucideProps)}
        </div>
      </div>
    </div>
  );
};

export default IconWithHover; 