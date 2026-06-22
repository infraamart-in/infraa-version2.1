'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  angle: number;
}

const NODES: Node[] = [
  { id: 'architect', label: 'Architects', x: 0, y: 0, angle: -60 },
  { id: 'contractor', label: 'Contractors', x: 0, y: 0, angle: 30 },
  { id: 'developer', label: 'Developers', x: 0, y: 0, angle: 150 },
  { id: 'supplier', label: 'Suppliers', x: 0, y: 0, angle: 240 },
];

function getNodePosition(angle: number, radius: number, cx: number, cy: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

export default function EcosystemAnimation() {
  const [dimensions, setDimensions] = useState({ width: 600, height: 520 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: Math.min(rect.height, 520) });
      }
    };
    updateDimensions();
    const observer = new ResizeObserver(updateDimensions);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const cx = dimensions.width / 2;
  const cy = dimensions.height / 2;
  const radius = Math.min(cx, cy) * 0.62;
  const nodeRadius = 40;

  const nodes = NODES.map((n) => ({
    ...n,
    ...getNodePosition(n.angle, radius, cx, cy),
  }));

  // Bezier curve control point toward center
  function getCurvePath(from: { x: number; y: number }, center: { x: number; y: number }) {
    const mx = (from.x + center.x) / 2;
    const my = (from.y + center.y) / 2;
    return `M ${from.x} ${from.y} Q ${mx} ${my} ${center.x} ${center.y}`;
  }

  if (!mounted) return <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px' }} />;

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '400px', position: 'relative' }}
      role="img"
      aria-label="INFRAA ecosystem connecting architects, contractors, developers, and suppliers"
    >
      <svg width={dimensions.width} height={dimensions.height} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          {/* Gradient for connection lines */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C96A45" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C96A45" stopOpacity="0.05" />
          </linearGradient>
          {/* Center glow */}
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C96A45" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#C96A45" stopOpacity="0" />
          </radialGradient>
          {/* Node glow */}
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C96A45" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C96A45" stopOpacity="0" />
          </radialGradient>
          {/* Particle gradient */}
          <radialGradient id="particleGrad">
            <stop offset="0%" stopColor="#C96A45" stopOpacity="1" />
            <stop offset="100%" stopColor="#C96A45" stopOpacity="0" />
          </radialGradient>
          
          {/* Animated dash pattern */}
          <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
            <circle cx="2" cy="2" r="1.5" fill="#C96A45" opacity="0.5" />
          </marker>
        </defs>

        {/* Outer ring */}
        <circle
          cx={cx} cy={cy} r={radius + nodeRadius}
          fill="none"
          stroke="rgba(201, 106, 69, 0.06)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        
        {/* Background glow */}
        <circle cx={cx} cy={cy} r={radius * 0.5} fill="url(#centerGlow)" />

        {/* Connection paths — static base lines */}
        {nodes.map((node) => (
          <path
            key={`base-${node.id}`}
            d={getCurvePath(node, { x: cx, y: cy })}
            fill="none"
            stroke="rgba(201, 106, 69, 0.1)"
            strokeWidth="1.5"
          />
        ))}

        {/* Animated connection lines (dashed flow) */}
        {nodes.map((node, i) => (
          <motion.path
            key={`animated-${node.id}`}
            d={getCurvePath(node, { x: cx, y: cy })}
            fill="none"
            stroke="#C96A45"
            strokeWidth="1.5"
            strokeDasharray="5 12"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.6,
            }}
            opacity={0.45}
          />
        ))}

        {/* Traveling particles along paths */}
        {nodes.map((node, i) => (
          <motion.circle
            key={`particle-${node.id}`}
            r={3}
            fill="#C96A45"
            initial={{ offsetDistance: '0%', opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
            style={{
              offsetPath: `path("${getCurvePath(node, { x: cx, y: cy })}")`,
            }}
          >
            <animateMotion
              dur={`${2.8}s`}
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
              path={getCurvePath(node, { x: cx, y: cy })}
            />
          </motion.circle>
        ))}

        {/* Center INFRAA hub */}
        <motion.circle
          cx={cx} cy={cy} r={52}
          fill="var(--graphite)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        />
        {/* Pulsing ring */}
        <motion.circle
          cx={cx} cy={cy} r={52}
          fill="none"
          stroke="#C96A45"
          strokeWidth="2"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={cx} cy={cy} r={52}
          fill="none"
          stroke="#C96A45"
          strokeWidth="1.5"
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
        />

        {/* INFRAA text in center */}
        <motion.text
          x={cx} y={cy - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="700"
          fontSize="14"
          letterSpacing="0.15em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          INFRAA
        </motion.text>
        <motion.text
          x={cx} y={cy + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,0.5)"
          fontFamily="JetBrains Mono, monospace"
          fontSize="7"
          letterSpacing="0.12em"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          PLATFORM
        </motion.text>

        {/* Satellite nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Node glow */}
            <circle cx={node.x} cy={node.y} r={nodeRadius + 16} fill="url(#nodeGlow)" />
            
            {/* Node circle */}
            <motion.circle
              cx={node.x} cy={node.y} r={nodeRadius}
              fill="var(--warm-stone)"
              stroke="#C96A45"
              strokeWidth="1.5"
              whileHover={{ scale: 1.05 }}
              style={{ cursor: 'default' }}
            />
            {/* Inner circle accent */}
            <circle cx={node.x} cy={node.y} r={nodeRadius - 8} fill="none" stroke="rgba(201,106,69,0.2)" strokeWidth="1" />
            
            {/* Node label */}
            <text
              x={node.x} y={node.y + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="var(--graphite)"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              fontSize="9"
              letterSpacing="0.04em"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
