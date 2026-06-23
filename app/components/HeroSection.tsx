'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ProcurementWorkflowAnimation = dynamic(
  () => import('./ProcurementWorkflowAnimation'),
  { ssr: false }
);

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="home"
      style={{
        minHeight: '100dvh',
        backgroundColor: 'var(--bg-page)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '72px',
        transition: 'background-color 0.4s ease',
        scrollSnapAlign: 'start',
      }}
      aria-label="INFRAA Hero"
    >
      {/* Architectural grid background */}
      <div className="architectural-grid" />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: '4rem',
            alignItems: 'center',
            padding: '4rem 0',
          }}
          className="hero-grid"
        >
          {/* Left: Text Content */}
          <div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
                marginBottom: '1.75rem',
              }}
            >
              Construction
              <br />
              Procurement
              <br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Made Smarter.</em>
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--text-secondary)',
                maxWidth: '480px',
                marginBottom: '2.5rem',
              }}
            >
              Connect with verified suppliers, discover innovative building materials, manage procurement workflows, and access flexible payment solutions through one unified platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hero-ctas"
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
            >
              <Link
                href="/marketplace"
                id="hero-explore-marketplace"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.875rem 1.75rem',
                  backgroundColor: 'var(--accent)',
                  color: 'white',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease',
                  boxShadow: '0 4px 16px rgba(201, 106, 69, 0.25)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = 'var(--terracotta-dark)';
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = '0 8px 24px rgba(201, 106, 69, 0.35)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.backgroundColor = 'var(--accent)';
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 16px rgba(201, 106, 69, 0.25)';
                }}
              >
                Explore Marketplace
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
               </Link>
              <Link
                href="/partners"
                id="hero-partner-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.875rem 1.75rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9rem',
                  letterSpacing: '0.02em',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  border: '1.5px solid var(--border-color)',
                  transition: 'border-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--accent)';
                  el.style.color = 'var(--accent)';
                  el.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'var(--border-color)';
                  el.style.color = 'var(--text-primary)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                Partner With INFRAA
              </Link>
            </motion.div>

            {/* Status indicator area */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--border-color)',
                maxWidth: '480px',
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                marginBottom: '0.625rem',
              }}>
                LAUNCHING SOON
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                margin: 0,
              }}>
                Building a smarter way for construction professionals to discover materials, connect with suppliers, and manage procurement workflows.
              </p>
            </motion.div>
          </div>

          {/* Right: Procurement Workflow Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-animation"
          >
            <ProcurementWorkflowAnimation />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.15em',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            height: '28px',
            background: 'linear-gradient(to bottom, var(--text-secondary), transparent)',
          }}
        />
      </motion.div>

      <style jsx>{`
        .hero-animation {
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-ctas {
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .hero-ctas {
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }
          .hero-ctas > :global(a) {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
