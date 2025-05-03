import React, { useState, useEffect, useRef } from 'react';

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
  className = '',
  pathColor = '#0066FF',
  strokeWidth = 70,
  verticalOffset = 0,
  card1LeftSpace = 242,    // Controls left side space of first card
  card2RightSpace = 1061,  // Controls right side curve of second card
  card3LeftSpace = 242,    // Controls left side space of third card
  card4RightSpace = 1061,  // Controls right side curve of fourth card
  card1Top = 11,           // Controls top position of first card
  card2Top = 369,          // Controls top position of second card
  card3Top = 757,          // Controls top position of third card
  card4Top = 1145,         // Controls top position of fourth card
  showBall = true,         // Controls if ball is visible
  ballColor = '#0066FF',   // Ball color
  ballSize = 40            // Ball size in pixels - increased for better visibility
}) => {
  const [ballPosition, setBallPosition] = useState({ x: 1283, y: card1Top + verticalOffset });
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Vertical spacing calculations with offsets
  const y1 = card1Top + verticalOffset;
  const y2 = card2Top + verticalOffset;
  const y3 = card3Top + verticalOffset;
  const y4 = card4Top + verticalOffset;
  const y5 = 1499 + verticalOffset; // Bottom position
  
  // Path classes for animation
  const pathClass = animate ? 'path-animation' : '';

  // Path definition - we keep it as a variable to use it for both the path and ball positioning
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

  // Fixed anchor points throughout the path - adjusted for better alignment with cards
  const fixedPositions = [
    { scrollPercent: 0, pathPercent: 0 },       // Start
    { scrollPercent: 0.15, pathPercent: 0.20 }, // First card middle
    { scrollPercent: 0.25, pathPercent: 0.33 }, // First to second transition
    { scrollPercent: 0.4, pathPercent: 0.50 },  // Second card middle
    { scrollPercent: 0.5, pathPercent: 0.62 },  // Second to third transition
    // Adjusted third card positioning to ensure ball is in middle of card
    { scrollPercent: 0.6, pathPercent: 0.70 },  // Third card early
    { scrollPercent: 0.65, pathPercent: 0.75 }, // Third card middle
    { scrollPercent: 0.7, pathPercent: 0.80 },  // Third card late
    // Adjusted fourth card positioning for better visibility
    { scrollPercent: 0.75, pathPercent: 0.82 }, // Third to fourth transition
    { scrollPercent: 0.85, pathPercent: 0.90 }, // Fourth card middle
    { scrollPercent: 0.9, pathPercent: 0.92 },  // Fourth card middle-late
    { scrollPercent: 0.95, pathPercent: 0.96 }, // Fourth card late
    { scrollPercent: 1, pathPercent: 1 }        // End
  ];

  // Function to check if we're in the third or fourth card region and adjust positioning
  const getSpecialCardAdjustment = (scrollPercent: number) => {
    // Add extra adjustment for third card middle
    if (scrollPercent >= 0.55 && scrollPercent <= 0.7) {
      return 0.09; // 15% boost for the third card
    }
    
    // Add extra adjustment for fourth card to keep ball with visible content
    if (scrollPercent >= 0.75) {
      return 0.15; // 15% boost for the fourth card
    }
    
    return 0;
  };

  // Function to map scroll percentage to path percentage using fixed positions
  const mapScrollToPath = (scrollPercent: number) => {
    // Find the two fixed positions that our scroll percentage falls between
    let lower = fixedPositions[0];
    let upper = fixedPositions[fixedPositions.length - 1];
    
    for (let i = 0; i < fixedPositions.length - 1; i++) {
      if (scrollPercent >= fixedPositions[i].scrollPercent && 
          scrollPercent <= fixedPositions[i + 1].scrollPercent) {
        lower = fixedPositions[i];
        upper = fixedPositions[i + 1];
        break;
      }
    }
    
    // Interpolate between the two fixed positions
    const scrollRange = upper.scrollPercent - lower.scrollPercent;
    const pathRange = upper.pathPercent - lower.pathPercent;
    
    // Calculate the percentage of the way between lower and upper
    const percentBetween = scrollRange === 0 
      ? 0 
      : (scrollPercent - lower.scrollPercent) / scrollRange;
    
    // Calculate the path percentage
    let result = lower.pathPercent + (percentBetween * pathRange);
    
    // Apply special adjustments for problematic regions
    result += getSpecialCardAdjustment(scrollPercent);
    
    // Ensure result stays in bounds
    return Math.min(Math.max(result, 0), 1);
  };

  // Improved scroll handler with better card-specific handling
  useEffect(() => {
    if (!showBall || !pathRef.current) return;
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = Math.min(Math.max(scrollY / documentHeight, 0), 1);
      
      // Map scroll percentage to path percentage using our fixed positions
      const pathPercentage = mapScrollToPath(scrollPercentage);
      
      // Get position on path
      const position = calculateBallPosition(pathPercentage);
      setBallPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call initially and also after a short delay to ensure path is loaded
    handleScroll();
    setTimeout(handleScroll, 200);
    setTimeout(handleScroll, 500);
    setTimeout(handleScroll, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showBall]);

  return (
    <div 
      ref={containerRef}
      className={`absolute z-50 pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: -30,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1283 1450"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Define filters and animations */}
        <defs>
          {/* Glow filter for the ball */}
          <filter id="ball-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          Ball pulse animation
          <radialGradient id="ballGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor={ballColor} />
            <stop offset="100%" stopColor="#0044BB" />
          </radialGradient>
          
          {/* Trail effect for the ball */}
          <filter id="trail-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="trail" />
            <feComposite in="SourceGraphic" in2="trail" operator="over" />
          </filter>
        </defs>
        
        {/* Background path with extra thickness */}
        <path
          d={pathD}
          stroke={pathColor}
          strokeWidth={strokeWidth * 2}
          strokeDasharray="none"
          strokeLinecap="round"
          strokeOpacity="0.9"
          filter="none"
          fill="none"
        />
        
        {/* Main path with subtle shadow instead of glow */}
        <path
          ref={pathRef}
          d={pathD}
          stroke={pathColor}
          strokeWidth={strokeWidth}
          strokeDasharray="none"
          strokeLinecap="round"
          strokeOpacity="1"
          strokeMiterlimit="4"
          filter="drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))"
          fill="none"
          className={pathClass}
          style={{
            vectorEffect: 'non-scaling-stroke'
          }}
        />
        
        {/* Ball trail effect */}
        {showBall && (
          <circle
            cx={ballPosition.x}
            cy={ballPosition.y}
            r={ballSize * 0.6}
            fill="rgba(0, 102, 255, 0.3)"
            filter="url(#trail-effect)"
            style={{
              transition: 'all 0.3s ease-out',
              transformOrigin: 'center'
            }}
          />
        )}
        
        {/* Ball with pulsing effect */}
        {showBall && (
          <circle
            cx={ballPosition.x}
            cy={ballPosition.y}
            r={ballSize / 2}
            fill="url(#ballGradient)"
            filter="url(#ball-glow)"
            style={{
              transition: 'all 0.15s ease-out',
              transformOrigin: 'center'
            }}
          />
        )}
      </svg>
    </div>
  );
};

export default ServicePath; 