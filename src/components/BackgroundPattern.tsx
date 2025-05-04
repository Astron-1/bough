"use client";

import AnimatedParticles from "./OptimizedDotPattern";

export default function BackgroundPattern() {
  return (
    <>
      {/* Animated particles background with mathematical pattern */}
      <AnimatedParticles 
        className="z-0"
        particleCount={750}
        particleColor="120, 174, 255"
        particleOpacityRange={[0.2, 0.7]}
        particleSizeRange={[1, 4.5]}
        waveAmplitude={2}
        waveSpeed={0.15}
        mouseInteractionRadius={180}
        mouseForce={0.5}
        returnSpeed={0.015}
        avoidCenter={true}
        centerAvoidanceRadius={0.15}
        pattern="wave"
        patternDensity={0.7}
      />
      
        {/* <AnimatedParticles 
        className="z-0"
        particleCount={0}  // No particles in lineWaves mode
        particleColor="120, 174, 255"
        lineColor="#0074ff"
        lineWidth={1.5}
        waveAmplitude={12}
        waveSpeed={0.08}
        mouseInteractionRadius={200}
        mouseForce={0.7}
        xGap={40}    // Wide horizontal spacing
        yGap={55}    // Increased vertical spacing for fewer horizontal lines
        friction={0.92}
        tension={0.012}
        pattern="lineWaves"
        horizontalWaves={true} 
      /> */}
    </>
  );
}
