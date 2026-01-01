import { motion } from "framer-motion";

interface InfinityLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const InfinityLogo = ({ size = 60, className = "", animated = true }: InfinityLogoProps) => {
  return (
    <motion.svg
      width={size}
      height={size * 0.5}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <defs>
        <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(320, 100%, 60%)" />
          <stop offset="50%" stopColor="hsl(270, 100%, 65%)" />
          <stop offset="100%" stopColor="hsl(180, 100%, 50%)" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background glow path */}
      <motion.path
        d="M30 30 C30 15, 45 15, 60 30 C75 45, 90 45, 90 30 C90 15, 75 15, 60 30 C45 45, 30 45, 30 30"
        stroke="url(#infinityGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        filter="url(#glow)"
        opacity={0.5}
      />
      
      {/* Main animated path */}
      <motion.path
        d="M30 30 C30 15, 45 15, 60 30 C75 45, 90 45, 90 30 C90 15, 75 15, 60 30 C45 45, 30 45, 30 30"
        stroke="url(#infinityGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={animated ? { 
          pathLength: [0, 1, 0],
          opacity: 1
        } : { pathLength: 1, opacity: 1 }}
        transition={animated ? {
          pathLength: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          opacity: {
            duration: 0.5
          }
        } : {}}
      />
    </motion.svg>
  );
};

export default InfinityLogo;
