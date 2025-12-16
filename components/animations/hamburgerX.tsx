'use client';

import { motion } from 'motion/react';

interface HamburgerXProps {
  isOpen: boolean;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export default function HamburgerX({
  isOpen,
  size = 38,
  strokeWidth = 2,
  color = '#000000',
}: HamburgerXProps) {
  const viewBoxSize = 24;
  const padding = 4;
  const lineLength = viewBoxSize - padding * 2;
  const centerY = viewBoxSize / 2;
  const topY = 6;
  const bottomY = 18;

  const transition = {
    type: 'tween' as const,
    ease: 'easeInOut' as const,
    duration: 0.2,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top line - becomes one arm of X */}
      <motion.line
        x1={padding}
        x2={padding + lineLength}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={false}
        animate={{
          y1: isOpen ? centerY : topY,
          y2: isOpen ? centerY : topY,
          rotate: isOpen ? 45 : 0,
        }}
        style={{ originX: '50%', originY: '50%' }}
        transition={transition}
      />

      {/* Middle line - fades out */}
      <motion.line
        x1={padding}
        y1={centerY}
        x2={padding + lineLength}
        y2={centerY}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        style={{ originX: '50%', originY: '50%' }}
        transition={transition}
      />

      {/* Bottom line - becomes other arm of X */}
      <motion.line
        x1={padding}
        x2={padding + lineLength}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        initial={false}
        animate={{
          y1: isOpen ? centerY : bottomY,
          y2: isOpen ? centerY : bottomY,
          rotate: isOpen ? -45 : 0,
        }}
        style={{ originX: '50%', originY: '50%' }}
        transition={transition}
      />
    </svg>
  );
}

