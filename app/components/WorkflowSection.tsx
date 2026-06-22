'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    id: '01',
    title: 'Upload BOQ',
    description: 'Upload your Bill of Quantities in any format. INFRAA parses material types, quantities, and specifications automatically.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="2" width="16" height="22" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M22 18v6M19 21l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Material Analysis',
    description: 'Platform analyzes your BOQ, identifies material categories, and maps them against the verified supplier database.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6 6l3 3M22 6l-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Supplier Matching',
    description: 'INFRAA matches your requirements to verified suppliers with relevant certifications, capacity, and track record.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="9" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="20" cy="10" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 10h2M4 22c0-3.314 2.239-6 5-6M20 16c2.761 0 5 2.686 5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Quote Comparison',
    description: 'Receive structured quotations from multiple suppliers. Compare pricing, lead times, and terms on a single dashboard.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="6" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="15" y="3" width="10" height="19" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M6 10h4M6 13h4M6 16h4M18 8h4M18 11h4M18 14h4M18 17h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: '05',
    title: 'Procurement Support',
    description: 'Execute procurement through the platform with workflow tracking, document management, and optional flexible payment options.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5 14l6 6L23 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
      </svg>
    ),
  },
];

export default function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ backgroundColor: 'var(--warm-stone)', position: 'relative', overflow: 'hidden' }}
      aria-labelledby="workflow-heading"
    >
      <div className="container-narrow">
        {/* Header */}
        <div style={{ marginBottom: '5rem', maxWidth: '540px' }}>
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            BOQ-Centric Workflow
          </motion.span>
          <motion.h2
            id="workflow-heading"
            className="font-display"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 600,
              color: 'var(--graphite)',
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              marginTop: '0.75rem',
            }}
          >
            How INFRAA works.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--concrete-dark)', marginTop: '1rem' }}
          >
            A procurement workflow built around your Bill of Quantities. From discovery to delivery, every step is managed through one platform.
          </motion.p>
        </div>

        {/* Progress connector line (desktop) */}
        <div style={{ position: 'relative', marginBottom: '1.5rem' }} className="progress-bar-wrapper">
          <div style={{ height: '1px', backgroundColor: 'var(--warm-stone-dark)', width: '100%' }} />
          <motion.div style={{ height: '1px', backgroundColor: 'var(--terracotta)', position: 'absolute', top: 0, left: 0, width: lineWidth }} />
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', gap: '0', position: 'relative' }} className="steps-container">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                flex: 1,
                padding: '2rem 1.5rem 2rem 0',
                borderRight: i < steps.length - 1 ? '1px solid var(--warm-stone-dark)' : 'none',
                paddingRight: i < steps.length - 1 ? '1.5rem' : '0',
                paddingLeft: i > 0 ? '1.5rem' : '0',
              }}
              className="workflow-step"
            >
              {/* Step number dot */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    color: 'white',
                    letterSpacing: '0.05em',
                  }}>
                    {step.id}
                  </span>
                </div>
                <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--terracotta)', opacity: 0.25 }} />
              </div>

              {/* Icon */}
              <div style={{ color: 'var(--terracotta)', marginBottom: '1rem' }}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-display" style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--graphite)',
                lineHeight: 1.3,
                marginBottom: '0.75rem',
                letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '0.8rem',
                lineHeight: 1.7,
                color: 'var(--concrete-dark)',
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          style={{
            marginTop: '4rem',
            padding: '2.5rem',
            backgroundColor: 'var(--graphite)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--terracotta)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Start Your Procurement Journey
            </div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem', fontWeight: 600, color: 'white', lineHeight: 1.3 }}>
              Upload your first BOQ and see INFRAA in action.
            </p>
          </div>
          <a
            href="/marketplace"
            id="workflow-cta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '0.875rem 1.75rem',
              backgroundColor: 'var(--terracotta)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.875rem',
              borderRadius: '7px',
              textDecoration: 'none',
              flexShrink: 0,
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta-dark)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta)'; }}
          >
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          .steps-container {
            flex-direction: column !important;
          }
          .steps-container > div {
            border-right: none !important;
            border-bottom: 1px solid var(--warm-stone-dark) !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .progress-bar-wrapper {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
