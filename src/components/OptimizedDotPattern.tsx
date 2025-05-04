"use client";

import { useRef, useEffect, useState } from "react";

// Possible particle distribution patterns
type PatternType = 'random' | 'flowField' | 'phyllotaxis' | 'grid' | 'wave' | 'lineWaves';

// Define props interface for better reusability
interface AnimatedParticlesProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  particleOpacityRange?: [number, number];
  particleSizeRange?: [number, number];
  waveAmplitude?: number;
  waveSpeed?: number;
  mouseInteractionRadius?: number;
  mouseForce?: number;
  returnSpeed?: number;
  avoidCenter?: boolean;
  centerAvoidanceRadius?: number;
  pattern?: PatternType;
  patternDensity?: number;
  lineColor?: string;
  lineWidth?: number;
  xGap?: number;
  yGap?: number;
  friction?: number;
  tension?: number;
  horizontalWaves?: boolean;
}

// Simplified Perlin noise implementation for wave effect
class Noise {
  private p: number[];

  constructor(seed: number = 0) {
    this.p = new Array(512);
    this.seed(seed || Math.random());
  }

  seed(seed: number): void {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    const p = this.p;
    
    // Fill the permutation array
    for (let i = 0; i < 256; i++) {
      p[i] = p[i + 256] = Math.floor(Math.random() * 256);
    }
  }

  // Simplified 2D noise function
  perlin2(x: number, y: number): number {
    return Math.sin(x * 0.1) * Math.cos(y * 0.1) * 0.5;
  }
}

export default function AnimatedParticles({
  className = "",
  particleCount = 150,
  particleColor = "120, 174, 255", // RGB format
  particleOpacityRange = [0.2, 0.8],
  particleSizeRange = [1, 4],
  waveAmplitude = 15,
  waveSpeed = 0.5,
  mouseInteractionRadius = 150,
  mouseForce = 1,
  returnSpeed = 0.02,
  avoidCenter = false,
  centerAvoidanceRadius = 0.3,
  pattern = 'random',
  patternDensity = 0.6,
  lineColor = "#0074ff",
  lineWidth = 1.5,
  xGap = 12,
  yGap = 36,
  friction = 0.9,
  tension = 0.01,
  horizontalWaves = false
}: AnimatedParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const noiseRef = useRef<Noise>(new Noise(Math.random()));
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // For line waves pattern
  const linesRef = useRef<Array<Array<{
    x: number;
    y: number;
    wave: { x: number; y: number };
    cursor: { x: number; y: number; vx: number; vy: number };
  }>>>([]);
  
  const mouseRef = useRef({
    x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false
  });

  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      
      // If using line waves pattern, initialize the lines
      if (pattern === 'lineWaves') {
        initLineWaves(width, height);
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
      
      // Update mouse reference for line waves
      if (pattern === 'lineWaves') {
        const mouse = mouseRef.current;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        
        if (!mouse.set) {
          mouse.sx = mouse.x;
          mouse.sy = mouse.y;
          mouse.lx = mouse.x;
          mouse.ly = mouse.y;
          mouse.set = true;
        }
      }
      
      // Check if mouse is within the container
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
    };

    // Initialize the line waves pattern
    const initLineWaves = (width: number, height: number) => {
      linesRef.current = [];
      
      if (horizontalWaves) {
        // For horizontal waves, we create rows of points
        const totalRows = Math.ceil(height / yGap);
        const totalPointsPerRow = Math.ceil(width / xGap) + 4; // Add extra points for smoother edges
        const xStart = -xGap * 2; // Start off-screen
        
        for (let j = 0; j < totalRows; j++) {
          const points = [];
          const rowY = j * yGap + yGap / 2;
          
          for (let i = 0; i < totalPointsPerRow; i++) {
            points.push({
              x: xStart + i * xGap,
              y: rowY,
              wave: { x: 0, y: 0 },
              cursor: { x: 0, y: 0, vx: 0, vy: 0 }
            });
          }
          
          linesRef.current.push(points);
        }
      } else {
        // Original grid pattern
        const oWidth = width + 200, oHeight = height + 30;
        const totalLines = Math.ceil(oWidth / xGap);
        const totalPoints = Math.ceil(oHeight / yGap);
        const xStart = (width - xGap * totalLines) / 2;
        const yStart = (height - yGap * totalPoints) / 2;
        
        for (let i = 0; i <= totalLines; i++) {
          const pts = [];
          for (let j = 0; j <= totalPoints; j++) {
            pts.push({
              x: xStart + xGap * i,
              y: yStart + yGap * j,
              wave: { x: 0, y: 0 },
              cursor: { x: 0, y: 0, vx: 0, vy: 0 }
            });
          }
          linesRef.current.push(pts);
        }
      }
    };

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [pattern, xGap, yGap, horizontalWaves]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // If using line waves pattern, we'll use a different animation approach
    if (pattern === 'lineWaves') {
      const animateLineWavesFunction = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const lines = linesRef.current;
        const noise = noiseRef.current;
        const mouse = mouseRef.current;
        
        const animate = (time: number) => {
          ctx.clearRect(0, 0, width, height);
          
          // Update mouse smoothing
          mouse.sx += (mouse.x - mouse.sx) * 0.1;
          mouse.sy += (mouse.y - mouse.sy) * 0.1;
          const dx = mouse.x - mouse.lx;
          const dy = mouse.y - mouse.ly;
          const d = Math.sqrt(dx * dx + dy * dy);
          mouse.v = d;
          mouse.vs += (d - mouse.vs) * 0.1;
          mouse.vs = Math.min(100, mouse.vs);
          mouse.lx = mouse.x;
          mouse.ly = mouse.y;
          mouse.a = Math.atan2(dy, dx);
          
          // Move points with wave motion and mouse interaction
          lines.forEach(points => {
            points.forEach(p => {
              // Apply wave motion using Perlin noise
              let move;
              
              if (horizontalWaves) {
                // For horizontal waves, we mainly want x-axis movement
                move = noise.perlin2(
                  (p.x + time * waveSpeed * 2) * 0.003,
                  (p.y * 0.2) * 0.003
                ) * 8;
                
                // Stronger horizontal movement, subtle vertical
                p.wave.x = Math.cos(move) * waveAmplitude * 0.2;
                p.wave.y = Math.sin(move) * waveAmplitude;
              } else {
                // Standard wave motion
                move = noise.perlin2(
                  (p.x + time * 0.2) * 0.002,
                  (p.y + time * 0.1) * 0.0015
                ) * 12;
                
                p.wave.x = Math.cos(move) * waveAmplitude * 2;
                p.wave.y = Math.sin(move) * waveAmplitude;
              }
              
              // Apply mouse interaction
              const pdx = p.x - mouse.sx;
              const pdy = p.y - mouse.sy;
              const dist = Math.sqrt(pdx * pdx + pdy * pdy);
              const l = Math.max(175, mouse.vs);
              
              if (dist < l) {
                const s = 1 - dist / l;
                const f = Math.cos(dist * 0.001) * s;
                p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00065;
                p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00065;
              }
              
              // Apply physics
              p.cursor.vx += (0 - p.cursor.x) * tension;
              p.cursor.vy += (0 - p.cursor.y) * tension;
              p.cursor.vx *= friction;
              p.cursor.vy *= friction;
              p.cursor.x += p.cursor.vx * 2;
              p.cursor.y += p.cursor.vy * 2;
              
              // Constrain movement
              const maxMove = mouseInteractionRadius;
              p.cursor.x = Math.min(maxMove, Math.max(-maxMove, p.cursor.x));
              p.cursor.y = Math.min(maxMove, Math.max(-maxMove, p.cursor.y));
            });
          });
          
          // Draw the lines
          ctx.beginPath();
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = lineWidth;
          
          // Helper function to get the final position of a point
          const getPointPosition = (point: {
            x: number;
            y: number;
            wave: { x: number; y: number };
            cursor: { x: number; y: number; vx: number; vy: number };
          }, withCursor = true) => {
            const x = point.x + point.wave.x + (withCursor ? point.cursor.x : 0);
            const y = point.y + point.wave.y + (withCursor ? point.cursor.y : 0);
            return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
          };
          
          // Draw each line
          lines.forEach(points => {
            if (points.length === 0) return;
            
            const firstPoint = getPointPosition(points[0], false);
            ctx.moveTo(firstPoint.x, firstPoint.y);
            
            points.forEach((point, idx) => {
              const isLast = idx === points.length - 1;
              const p1 = getPointPosition(point, !isLast);
              
              if (horizontalWaves) {
                // For horizontal waves, just draw a smooth line without additional effects
                ctx.lineTo(p1.x, p1.y);
              } else {
                const p2 = getPointPosition(
                  points[idx + 1] || points[points.length - 1], 
                  !isLast
                );
                
                ctx.lineTo(p1.x, p1.y);
                if (isLast) ctx.moveTo(p2.x, p2.y);
              }
            });
          });
          
          ctx.stroke();
          animationRef.current = requestAnimationFrame(animate);
        };
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animateLineWavesFunction(ctx, canvas.width, canvas.height);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;
      angle?: number | undefined;
      speed?: number | undefined;
    }> = [];

    // Initialize particles based on selected pattern
    const initParticles = () => {
      particles = [];
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * centerAvoidanceRadius;
      
      // Function to determine if a position is in the center area to avoid
      const isInCenter = (x: number, y: number): boolean => {
        if (!avoidCenter) return false;
        
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        return distance < maxRadius;
      };
      
      // Generate particles based on the selected pattern
      switch (pattern) {
        case 'flowField':
          generateFlowFieldPattern(width, height, isInCenter);
          break;
        case 'phyllotaxis':
          generatePhyllotaxisPattern(width, height, isInCenter);
          break;
        case 'grid':
          generateGridPattern(width, height, isInCenter);
          break;
        case 'wave':
          generateWavePattern(width, height, isInCenter);
          break;
        case 'random':
        default:
          generateRandomPattern(width, height, isInCenter);
          break;
      }
      
      // Mix in some random particles for natural feel regardless of pattern
      if (pattern !== 'random' && Math.random() < 0.5) {
        const randomCount = Math.floor(particleCount * (1 - patternDensity));
        addRandomParticles(randomCount, width, height, isInCenter);
      }
    };
    
    // Standard random distribution
    const generateRandomPattern = (width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      let attempts = 0;
      let i = 0;
      
      while (i < particleCount && attempts < particleCount * 3) {
        attempts++;
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Skip this position if it's in the center and we're avoiding the center
        if (isInCenter(x, y)) {
          continue;
        }
        
        addParticle(x, y);
        i++;
      }
    };
    
    // Flow field pattern based on Perlin noise
    const generateFlowFieldPattern = (width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      const noise = noiseRef.current;
      const resolution = Math.sqrt(particleCount) / 8;
      const cellSize = Math.min(width, height) / resolution;
      const centerX = width / 2;
      const centerY = height / 2;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * Math.min(width, height) / 2 * 0.9;
        
        let x = centerX + Math.cos(angle) * radius;
        let y = centerY + Math.sin(angle) * radius;
        
        // Apply a flow field offset based on position
        const noiseValue = noise.perlin2(x * 0.005, y * 0.005);
        const flowAngle = noiseValue * Math.PI * 4;
        
        x += Math.cos(flowAngle) * cellSize * 0.5;
        y += Math.sin(flowAngle) * cellSize * 0.5;
        
        // Make sure the point is within bounds
        x = Math.max(0, Math.min(width, x));
        y = Math.max(0, Math.min(height, y));
        
        // Skip this position if it's in the center and we're avoiding the center
        if (isInCenter(x, y)) {
          continue;
        }
        
        const particle = addParticle(x, y);
        if (particle) {
          particle.angle = flowAngle;
          particle.speed = (noiseValue + 1) * 0.5 * 2; // speed between 0 and 2
        }
      }
    };
    
    // Phyllotaxis pattern (sunflower-like arrangement)
    const generatePhyllotaxisPattern = (width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // golden angle in radians
      const scaleFactor = Math.min(width, height) / 100;
      const centerX = width / 2;
      const centerY = height / 2;
      
      for (let i = 0; i < particleCount; i++) {
        const phylloRadius = scaleFactor * Math.sqrt(i) * 0.8;
        const theta = i * goldenAngle;
        
        // Convert from polar to cartesian coordinates
        let x = centerX + phylloRadius * Math.cos(theta);
        let y = centerY + phylloRadius * Math.sin(theta);
        
        // Add some noise for a more organic feel
        x += (Math.random() - 0.5) * scaleFactor * 2;
        y += (Math.random() - 0.5) * scaleFactor * 2;
        
        // Skip this position if it's in the center and we're avoiding the center
        if (isInCenter(x, y)) {
          continue;
        }
        
        addParticle(x, y);
      }
    };
    
    // Grid pattern with slight variation
    const generateGridPattern = (width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      const cols = Math.ceil(Math.sqrt(particleCount * width / height));
      const rows = Math.ceil(Math.sqrt(particleCount * height / width));
      const cellWidth = width / cols;
      const cellHeight = height / rows;
      
      let count = 0;
      
      for (let i = 0; i < cols && count < particleCount; i++) {
        for (let j = 0; j < rows && count < particleCount; j++) {
          // Add slight variation to the grid positions
          const variation = Math.min(cellWidth, cellHeight) * 0.3;
          
          const x = (i + 0.5) * cellWidth + (Math.random() - 0.5) * variation;
          const y = (j + 0.5) * cellHeight + (Math.random() - 0.5) * variation;
          
          // Skip this position if it's in the center and we're avoiding the center
          if (isInCenter(x, y)) {
            continue;
          }
          
          addParticle(x, y);
          count++;
        }
      }
    };
    
    // Wave pattern inspired by sine waves
    const generateWavePattern = (width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      const waveCount = 5; // Number of waves
      const amplitude = height / 6;
      const period = width / 3;
      const centerY = height / 2;
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        
        // Calculate wave pattern position
        const wavePhase = (i % waveCount) * Math.PI * 2 / waveCount;
        const baseY = centerY + Math.sin(x / period + wavePhase) * amplitude;
        
        // Add some variation to y
        const y = baseY + (Math.random() - 0.5) * amplitude * 0.5;
        
        // Skip this position if it's in the center and we're avoiding the center
        if (isInCenter(x, y)) {
          continue;
        }
        
        addParticle(x, y);
      }
    };
    
    // Add additional random particles
    const addRandomParticles = (count: number, width: number, height: number, isInCenter: (x: number, y: number) => boolean) => {
      let added = 0;
      let attempts = 0;
      
      while (added < count && attempts < count * 3) {
        attempts++;
        
        const x = Math.random() * width;
        const y = Math.random() * height;
        
        // Skip this position if it's in the center and we're avoiding the center
        if (isInCenter(x, y)) {
          continue;
        }
        
        addParticle(x, y);
        added++;
      }
    };
    
    // Helper to add a single particle with common properties
    const addParticle = (x: number, y: number) => {
      const size = Math.random() * (particleSizeRange[1] - particleSizeRange[0]) + particleSizeRange[0];
      const opacity = Math.random() * (particleOpacityRange[1] - particleOpacityRange[0]) + particleOpacityRange[0];
      const color = `rgba(${particleColor}, ${opacity})`;
      const density = Math.random() * 30 + 1;
      
      const particle = {
        x,
        y,
        size,
        color,
        baseX: x,
        baseY: y,
        density,
        angle: undefined as number | undefined,
        speed: undefined as number | undefined
      };
      
      particles.push(particle);
      return particle;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const noise = noiseRef.current;
      const time = Date.now() * 0.001;
      
      // Draw each particle
      particles.forEach((p) => {
        // Calculate wave motion, potentially influenced by the particle's own flow angle
        let nX, nY;
        
        if (p.angle !== undefined && p.speed !== undefined) {
          // If the particle has a flow direction, use it to influence movement
          nX = Math.cos(p.angle + time * 0.1) * p.speed * waveAmplitude;
          nY = Math.sin(p.angle + time * 0.1) * p.speed * waveAmplitude;
        } else {
          // Default wave motion
          nX = noise.perlin2(p.x * 0.01, time * waveSpeed) * waveAmplitude;
          nY = noise.perlin2(p.y * 0.01, time * waveSpeed) * waveAmplitude;
        }
        
        // Add mouse interaction
        const dx = p.x - mousePosition.x * canvas.width;
        const dy = p.y - mousePosition.y * canvas.height;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Maximum distance, past which the force is 0
        let force = (mouseInteractionRadius - distance) / mouseInteractionRadius;
        
        // If we're too far away, no force applies
        if (force < 0) force = 0;
        
        // Apply force if mouse is hovering
        const directionX = forceDirectionX * force * p.density * mouseForce;
        const directionY = forceDirectionY * force * p.density * mouseForce;
        
        if (isHovering) {
          p.x += directionX;
          p.y += directionY;
        }
        
        // Add wave motion
        p.x += nX;
        p.y += nY;
        
        // Draw the particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Return particles slowly to their base position
        if (!isHovering) {
          p.x += (p.baseX - p.x) * returnSpeed;
          p.y += (p.baseY - p.y) * returnSpeed;
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Choose the appropriate initialization based on pattern type
    if (!['lineWaves'].includes(pattern)) {
      initParticles();
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    isHovering, 
    mousePosition, 
    particleCount, 
    particleColor, 
    particleSizeRange, 
    particleOpacityRange, 
    waveAmplitude, 
    waveSpeed, 
    mouseInteractionRadius, 
    mouseForce, 
    returnSpeed,
    avoidCenter,
    centerAvoidanceRadius,
    pattern,
    patternDensity,
    lineColor,
    lineWidth,
    xGap,
    yGap,
    friction,
    tension,
    horizontalWaves
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={pattern === 'lineWaves' ? { '--x': '0px', '--y': '0px' } as React.CSSProperties : undefined}
    >
      {/* Canvas for the animated particles or lines */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
