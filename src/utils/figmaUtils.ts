/**
 * Figma Utilities for consistent handling of dimensions across the application
 */

// Base width from Figma design in rem (for scaling calculations)
export const FIGMA_BASE_WIDTH = 80; // rem

// Scaling factors for different screen sizes
export const SCALE_FACTORS = {
  base: 1,      // Mobile (no scaling)
  sm: 1.1,      // Small screens
  md: 1.2,      // Medium screens
  lg: 1.3,      // Large screens
  xl: 1.4,      // Extra large screens
} as const;

/**
 * Convert a size from Figma to a responsive rem value
 * @param size Size in rem or px from Figma
 * @returns Formatted CSS size value with unit
 */
export function figmaSize(size: string | number): string {
  // If size is already a string with units, return it formatted
  if (typeof size === 'string') {
    // Extract number and unit
    const match = size.match(/^([\d.]+)([a-z%]+)$/);
    if (match) {
      const [, value, unit] = match;
      return `${parseFloat(value)}${unit}`;
    }
    // If it's a string but doesn't match the pattern, try to parse it as a number
    const num = parseFloat(size);
    if (!isNaN(num)) {
      return `${num}rem`;
    }
    // If parsing fails, return the original string
    return size;
  }
  
  // If size is a number, assume it's in rem
  return `${size}rem`;
}

/**
 * Create a set of CSS variables for responsive scaling of Figma dimensions
 * @param baseValues Object with base values from Figma
 * @returns CSS properties string that can be used in a style tag
 */
export function createResponsiveVars(baseValues: Record<string, string | number>): string {
  const cssVars: string[] = [];
  
  // Generate base variables
  Object.entries(baseValues).forEach(([key, value]) => {
    cssVars.push(`--${key}: ${figmaSize(value)};`);
  });
  
  // Generate responsive variables for each breakpoint
  Object.entries(SCALE_FACTORS).forEach(([breakpoint, factor]) => {
    if (breakpoint === 'base') return; // Skip base, already handled
    
    const mediaQuery = getBreakpointMediaQuery(breakpoint as keyof typeof SCALE_FACTORS);
    
    let breakpointVars = `@media ${mediaQuery} {\n`;
    Object.entries(baseValues).forEach(([key, value]) => {
      const originalSize = typeof value === 'string' 
        ? parseFloat(value.match(/^([\d.]+)/)![0]) 
        : value;
        
      const unit = typeof value === 'string' && value.match(/([a-z%]+)$/) 
        ? value.match(/([a-z%]+)$/)![0] 
        : 'rem';
      
      breakpointVars += `  --${key}: ${(originalSize * factor)}${unit};\n`;
    });
    breakpointVars += '}';
    
    cssVars.push(breakpointVars);
  });
  
  return cssVars.join('\n');
}

/**
 * Get the media query for a specific breakpoint
 */
function getBreakpointMediaQuery(breakpoint: keyof typeof SCALE_FACTORS): string {
  switch (breakpoint) {
    case 'sm': return '(min-width: 640px)';
    case 'md': return '(min-width: 768px)';
    case 'lg': return '(min-width: 1024px)';
    case 'xl': return '(min-width: 1280px)';
    default: return '';
  }
}

/**
 * Generate a CSS style object for a Figma element with responsive scaling
 * @param dimensions Width and height from Figma
 * @returns Style object that can be used with React style prop
 */
export function figmaElementStyle(dimensions: { width: string | number, height: string | number }): React.CSSProperties {
  return {
    width: figmaSize(dimensions.width),
    height: figmaSize(dimensions.height),
  };
}

/**
 * Generate a full section container style based on Figma page width
 * @returns Style object for a section container
 */
export function figmaSectionContainer(): React.CSSProperties {
  return {
    maxWidth: `95%`,
    margin: '0 auto',
    width: '100%',
    
  };
} 