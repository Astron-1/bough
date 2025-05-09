"use client";

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  Icon,
  size = 24,
  className = '',
  strokeWidth = 2,
}) => {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: '#0066FF',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1.1) rotate(360deg)';
        target.style.backgroundColor = '#FFFFFF';
        const icon = target.querySelector('svg');
        if (icon) {
          icon.style.color = '#0066FF';
        }
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.transform = 'scale(1) rotate(0deg)';
        target.style.backgroundColor = '#0066FF';
        const icon = target.querySelector('svg');
        if (icon) {
          icon.style.color = '#FFFFFF';
        }
      }}
    >
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        style={{
          color: '#FFFFFF',
          transition: 'all 0.3s ease',
        }}
      />
    </div>
  );
};

export default AnimatedIcon; 