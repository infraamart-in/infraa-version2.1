'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const categories = [
  {
    id: 'cladding',
    label: 'Cladding Systems',
    description: 'Façade panels, rain-screen systems, composite cladding solutions from certified manufacturers.',
    count: '48 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="11" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="18" y="8" width="11" height="16" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12h2M8 16h2M8 20h2M23 12h2M23 16h2M23 20h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'waterproofing',
    label: 'Waterproofing Solutions',
    description: 'Membrane systems, crystalline treatments, and injection-based waterproofing technologies.',
    count: '35 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4c0 0-10 10-10 16a10 10 0 0020 0C26 14 16 4 16 4z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 22c0 2.76 2.24 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'structural',
    label: 'Structural Systems',
    description: 'TMT steel, AAC blocks, pre-engineered structures, and reinforcement materials.',
    count: '62 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4v24M8 12h16M8 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: 'acoustic',
    label: 'Acoustic Systems',
    description: 'Sound insulation, acoustic panels, vibration dampening, and noise-control solutions.',
    count: '28 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M10 11v10M14 7v18M18 11v10M22 9v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 16h20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.2"/>
      </svg>
    ),
  },
  {
    id: 'green',
    label: 'Green Materials',
    description: 'Sustainable materials with low embodied carbon, recycled content, and green certifications.',
    count: '41 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 28V16M16 16c0 0-10-2-10-12 6 0 10 4 10 12zM16 16c0 0 10-2 10-12-6 0-10 4-10 12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'smart',
    label: 'Smart Materials',
    description: 'Intelligent building materials — adaptive glazing, self-healing concrete, phase-change materials.',
    count: '19 products',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 10v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function MarketplaceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="marketplace"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-section)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease',
      }}
      aria-labelledby="marketplace-heading"
    >
      {/* Background pattern */}
      <div className="architectural-grid" />

      <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              Material Marketplace
            </motion.span>
            <motion.h2
              id="marketplace-heading"
              className="font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                lineHeight: 1.12,
                letterSpacing: '-0.01em',
                marginTop: '0.75rem',
              }}
            >
              Discover materials. <br />
              <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Connect with suppliers.</em>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/marketplace"
              id="marketplace-view-all"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '7px',
                textDecoration: 'none',
                border: '1.5px solid var(--border-color)',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--accent)';
                el.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'var(--border-color)';
                el.style.color = 'var(--text-primary)';
              }}
            >
              View All Categories
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </motion.div>
        </div>

        {/* Category Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5px',
        }}
        className="marketplace-grid">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Link
                href={`/marketplace/${cat.id}`}
                id={`marketplace-${cat.id}`}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  display: 'block',
                  padding: '2.5rem',
                  backgroundColor: hoveredId === cat.id ? 'var(--text-primary)' : 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  textDecoration: 'none',
                  transition: 'background-color 0.25s ease, border-color 0.25s ease',
                  height: '100%',
                  cursor: 'pointer',
                }}
              >
                {/* Icon */}
                <div style={{
                  color: hoveredId === cat.id ? 'var(--bg-page)' : 'var(--accent)',
                  marginBottom: '1.5rem',
                  transition: 'color 0.25s ease',
                }}>
                  {cat.icon}
                </div>

                {/* Category label */}
                <h3 className="font-display" style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: hoveredId === cat.id ? 'var(--bg-page)' : 'var(--text-primary)',
                  lineHeight: 1.25,
                  marginBottom: '0.75rem',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.25s ease',
                }}>
                  {cat.label}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.8rem',
                  lineHeight: 1.7,
                  color: hoveredId === cat.id ? 'var(--bg-page)' : 'var(--text-secondary)',
                  opacity: hoveredId === cat.id ? 0.75 : 1,
                  marginBottom: '1.5rem',
                  transition: 'color 0.25s ease, opacity 0.25s ease',
                }}>
                  {cat.description}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-color)',
                  transition: 'border-color 0.25s ease',
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    color: hoveredId === cat.id ? 'var(--bg-page)' : 'var(--text-secondary)',
                    opacity: hoveredId === cat.id ? 0.6 : 1,
                    textTransform: 'uppercase',
                    transition: 'color 0.25s ease, opacity 0.25s ease',
                  }}>
                    {cat.count}
                  </span>
                  <svg
                     width="18" height="18" viewBox="0 0 18 18" fill="none"
                     style={{ color: hoveredId === cat.id ? 'var(--bg-page)' : 'var(--border-color)', transition: 'color 0.25s ease' }}
                  >
                    <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            marginTop: '5rem',
            padding: '3rem',
            backgroundColor: '#181818',
            borderRadius: '16px',
            display: 'flex',
            gap: '3rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--terracotta)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Platform Preview
            </div>
            <h3 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 600, color: 'white', lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.01em' }}>
              A procurement dashboard built for construction professionals.
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>
              Track procurement value, compare quotes, manage deliveries, and access payment options — all in one place.
            </p>
            <Link
              href="/login"
              id="platform-preview-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--terracotta)',
                color: 'white',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                borderRadius: '7px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta-dark)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta)'; }}
            >
              Access Platform
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
          <div style={{ flex: 1.5, minWidth: '280px', maxWidth: '600px' }}>
            <div style={{
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/dashboard-preview.jpeg"
                alt="INFRAA procurement dashboard showing material tracking, delivery status, and payment management"
                style={{ width: '100%', display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .marketplace-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .marketplace-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
