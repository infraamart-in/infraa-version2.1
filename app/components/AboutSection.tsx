'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="about-us"
      ref={ref}
      className="section-padding"
      style={{
        backgroundColor: '#1F1B18', // Deep warm brown tone
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
      aria-labelledby="about-heading"
    >
      {/* Blueprint grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Top accent divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08) 50%, transparent)',
      }} />

      <div className="container-narrow" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section 1 — About INFRAA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="about-section-block"
        >
          <span className="eyebrow" style={{ display: 'block', marginBottom: '1.5rem' }}>
            ABOUT INFRAA
          </span>
          <h2
            id="about-heading"
            className="font-display"
            style={{
              fontSize: 'clamp(2.0rem, 5vw, 4.8rem)',
              fontWeight: 600,
              color: 'white',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            Building the digital<br />
            infrastructure layer<br />
            for construction.
          </h2>
        </motion.div>

        {/* Section 2 — Mission */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="about-section-block"
          style={{ maxWidth: '780px' }}
        >
          <h3 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            OUR MISSION
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            fontWeight: 400,
          }}>
            To simplify how construction professionals discover materials, connect with suppliers, and manage procurement through one unified platform.
          </p>
        </motion.div>

        {/* Section 3 — Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ marginBottom: '9rem', maxWidth: '850px' }}
        >
          <h3 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            OUR VISION
          </h3>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            margin: 0,
            fontWeight: 400,
          }}>
            To become the infrastructure layer connecting construction materials, suppliers, and procurement workflows across India.
          </p>
        </motion.div>

        {/* Section 4 — The Team Behind INFRAA */}
        {/* Sections 5 & 6 — Founder One & Founder Two */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="about-section-block-large"
        >
          <h3 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            marginBottom: '3.5rem',
          }}>
            THE TEAM BEHIND INFRAA
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4.5rem',
            }}
            className="founders-grid"
          >
            {/* Founder One */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: '2rem',
              }}
            >
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                Co-Founder & CEO
              </span>
              <h4
                className="font-display"
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: 'white',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                T. Naveen Panya
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.925rem',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.55)',
                margin: 0,
              }}>
                Leads business strategy, partnerships, and long-term growth initiatives while building a stronger supplier ecosystem for the construction industry.
              </p>
            </motion.div>

            {/* Founder Two */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                paddingLeft: '2rem',
              }}
            >
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                color: 'rgba(255, 255, 255, 0.4)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem',
              }}>
                Co-Founder & COO
              </span>
              <h4
                className="font-display"
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 600,
                  color: 'white',
                  lineHeight: 1.2,
                  marginBottom: '1.25rem',
                }}
              >
                K. Chetan Dora
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.925rem',
                lineHeight: 1.75,
                color: 'rgba(255, 255, 255, 0.55)',
                margin: 0,
              }}>
                Leads product design, operational systems, and platform development to ensure INFRAA aligns with real construction workflows.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Section 7 — Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ marginBottom: '2rem' }}
        >
          <h3 style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'var(--terracotta)',
            textTransform: 'uppercase',
            marginBottom: '2.5rem',
          }}>
            GET IN TOUCH
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1fr',
              gap: '3rem',
            }}
            className="contact-grid"
          >
            {/* Email */}
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                Email Addresses
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>
                  <a
                    href="mailto:contact@infraa.in"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terracotta)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.75)'; }}
                  >
                    contact@infraa.in
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:infraamart@gmail.com"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '1rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terracotta)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.75)'; }}
                  >
                    infraamart@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                Instagram
              </div>
              <a
                href="https://instagram.com/infraa.india"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--terracotta)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.75)'; }}
              >
                @infraa.india
              </a>
            </div>

            {/* Location */}
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.6rem',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
                marginBottom: '0.75rem',
              }}>
                Location
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                margin: 0,
              }}>
                Hyderabad, Telangana, India
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .about-section-block {
          margin-bottom: 8rem;
        }
        .about-section-block-large {
          margin-bottom: 9rem;
        }
        @media (max-width: 900px) {
          .founders-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 768px) {
          .about-section-block {
            margin-bottom: 4.5rem !important;
          }
          .about-section-block-large {
            margin-bottom: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
