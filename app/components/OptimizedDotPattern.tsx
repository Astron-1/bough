"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface OptimizedDotPatternProps {
  className?: string;
}

export default function OptimizedDotPattern({ 
  className = ''
}: OptimizedDotPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Track mouse movement for hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if mouse is within the hero section
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          setIsHovering(true);
        } else {
          setIsHovering(false);
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
    >
      {/* Original SVG pattern with smooth CSS animation */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{
          transform: 'translateZ(0)', // Hardware acceleration
        }}
      >
        <div className="relative w-[150%] h-[150%] -ml-[10%] -mt-[10%] wave-animation">
          <Image
            src="/bgSVG/DotPattern.svg"
            alt="Dot Pattern"
            fill
            className="object-cover opacity-80"
            priority
            style={{
              filter: 'blur(0px)'
            }}
          />
        </div>
      </div>

      {/* Interactive hover effect - positioned absolutely to the mouse position */}
      {isHovering && (
        <motion.div
          className="fixed z-50 pointer-events-none mix-blend-screen"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 150, 255, 0.5) 0%, rgba(0, 82, 255, 0) 70%)',
            boxShadow: '0 0 60px rgba(0, 82, 255, 0.3)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      )}
      
      {/* Ambient glow effect - simpler animation */}
      <div className="absolute inset-0 z-1 pointer-events-none pulse-animation">
        <div
          className="absolute top-1/2 left-1/2 w-[80%] h-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(20, 100, 255, 0.4) 0%, rgba(0, 82, 255, 0) 70%)',
          }}
        />
      </div>

      {/* Add CSS animations via a style tag for better performance */}
      <style jsx global>{`
        @keyframes wave-flow {
          0% {
            transform: translate(-3%, 1%) rotate(-0.5deg) scale(1.02);
          }
          50% {
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
          100% {
            transform: translate(3%, 1%) rotate(0.5deg) scale(1.02);
          }
        }
        
        .wave-animation {
          animation: wave-flow 30s ease-in-out infinite alternate;
          will-change: transform;
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.05;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1.05);
          }
          100% {
            opacity: 0.05;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        .pulse-animation {
          animation: pulse 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
} 