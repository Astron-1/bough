import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'rounded' | 'circular';
  animation?: 'pulse' | 'wave';
  width?: string | number;
  height?: string | number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height,
}) => {
  const baseClasses = 'bg-gray-200 relative overflow-hidden';
  const variantClasses = {
    rectangular: '',
    rounded: 'rounded-lg',
    circular: 'rounded-full',
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent',
  };

  const styles: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={styles}
    />
  );
};

export default Skeleton; 