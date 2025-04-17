"use client";

import OptimizedDotPattern from './OptimizedDotPattern';

export default function BackgroundPattern() {
  return (
    <>
      {/* Original SVG pattern with optimized animation */}
      <OptimizedDotPattern className="z-0" />
      
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-5">
        {/* Circle pattern left */}
        <div 
          className="absolute top-[35%] left-[-15%] w-[700px] h-[700px] rounded-full opacity-40 blur-sm"
          style={{
            background: "radial-gradient(circle, rgba(17, 67, 232, 0.5) 0%, rgba(17, 67, 232, 0) 70%)",
            mixBlendMode: "screen",
          }}
        />
        
        {/* Circle pattern right */}
        <div 
          className="absolute top-[55%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-40 blur-sm"
          style={{
            background: "radial-gradient(circle, rgba(17, 67, 232, 0.5) 0%, rgba(17, 67, 232, 0) 70%)",
            mixBlendMode: "screen",
          }}
        />
        
        {/* Subtle pattern for continuity */}
        <div 
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(17, 67, 232, 0.2) 0%, transparent 25%),
              radial-gradient(circle at 80% 50%, rgba(17, 67, 232, 0.2) 0%, transparent 25%)
            `,
            mixBlendMode: "screen",
          }}
        />
      </div>
    </>
  );
} 