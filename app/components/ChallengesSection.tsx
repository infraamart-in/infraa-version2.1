'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const challenges = [
  {
    number: '01',
    title: 'Supplier Fragmentation',
    description: 'Hundreds of suppliers across categories with no unified discovery layer. Architects and contractors rely on personal networks, limiting access to innovative materials and competitive pricing.',
    metric: '200+ supplier calls',
    metricLabel: 'per project average',
  },
  {
    number: '02',
    title: 'Procurement Delays',
    description: 'Manual procurement workflows operating through WhatsApp, spreadsheets, and PDF catalogues add weeks to project timelines. Every delay compounds across the supply chain.',
    metric: '3–6 weeks',
    metricLabel: 'average procurement lag',
  },
  {
    number: '03',
    title: 'Limited Material Visibility',
    description: 'Technical specifications, datasheets, and performance data are scattered across disconnected sources. Informed material decisions require disproportionate research effort.',
    metric: '60%',
    metricLabel: 'time lost in discovery',
  },
  {
    number: '04',
    title: 'Inefficient Quotation',
    description: 'Collecting, comparing, and negotiating quotes across suppliers is a manual and error-prone process. Without a standardized system, procurement costs remain opaque and unoptimized.',
    metric: '60–120 days',
    metricLabel: 'payment cycle strain',
  },
];

export default function ChallengesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{
        backgroundColor: 'var(--graphite)',
        position: 'relative',
        overflow: 'hidden',
      }}
      aria-labelledby="challenges-heading"
    >
      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--terracotta), transparent)' }} />

      <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="eyebrow" style={{ color: 'var(--terracotta)' }}>
              Industry Challenges
            </span>
          </motion.div>
          <motion.h2
            id="challenges-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginTop: '0.75rem',
              maxWidth: '560px',
            }}
          >
            Why procurement needs a better system.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.5)',
              marginTop: '1rem',
              maxWidth: '480px',
            }}
          >
            Construction procurement remains fragmented, manual, and financially inefficient. Every project pays the cost.
          </motion.p>
        </div>

        {/* Challenge cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5px',
        }}
        className="challenges-grid">
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: '2.5rem',
                backgroundColor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
                cursor: 'default',
                transition: 'background-color 0.25s ease',
              }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.055)' } as any}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'var(--terracotta)',
                marginBottom: '1.25rem',
              }}>
                {challenge.number}
              </div>

              {/* Title */}
              <h3 className="font-display" style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}>
                {challenge.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.875rem',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '2rem',
              }}>
                {challenge.description}
              </p>

              {/* Metric */}
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'var(--terracotta)',
                }}>
                  {challenge.metric}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                }}>
                  {challenge.metricLabel}
                </span>
              </div>

              {/* Corner accent */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '40px',
                height: '40px',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '1px',
                  height: '24px',
                  backgroundColor: 'var(--terracotta)',
                  opacity: 0.4,
                }} />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '24px',
                  height: '1px',
                  backgroundColor: 'var(--terracotta)',
                  opacity: 0.4,
                }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 680px) {
          .challenges-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
