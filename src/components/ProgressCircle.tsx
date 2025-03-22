import React from 'react';
import { cn } from '../lib/utils';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  progressColor?: string;
  className?: string;
  children?: React.ReactNode;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  circleColor = '#E5E7EB', // Default Tailwind gray-200 color
  progressColor = 'url(#gradient)',
  className,
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" /> {/* Tailwind blue-500 */}
            <stop offset="100%" stopColor="#2563EB" /> {/* Tailwind blue-600 */}
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle
          className="transition-all duration-300"
          stroke={circleColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className="progress-ring-circle transition-all duration-500"
          stroke={progressColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Children (for text or other content inside the circle) */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ProgressCircle;
