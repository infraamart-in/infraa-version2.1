'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EarlyAccess() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F4F0E8', // Warm stone background (#F4F0E8 / off-white)
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2.5rem 1.5rem',
      textAlign: 'center',
    }}>
      {/* Architectural grid background */}
      <div className="architectural-grid" style={{ zIndex: 1 }} />

      {/* Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          maxWidth: '640px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        {/* Early Access Label */}
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent)', // Terracotta Orange
          marginBottom: '1.5rem',
          fontWeight: 600,
        }}>
          Early Access
        </span>

        {/* Main Headline */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: '2rem',
          }}
        >
          INFRAA Is
          <br />
          <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Launching Soon.</em>
        </h1>

        {/* Supporting Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.05rem',
            fontWeight: 500,
            lineHeight: 1.6,
            color: 'var(--text-primary)',
          }}>
            We're building the procurement infrastructure layer for modern construction.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}>
            Our mission is to simplify how construction professionals discover materials, connect with suppliers, compare quotations, and manage procurement workflows.
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}>
            INFRAA is currently under development and will be available soon.
          </p>
        </div>

        {/* Contact Section */}
        <div style={{
          width: '100%',
          padding: '2rem 1.5rem',
          borderTop: '1px solid rgba(17, 17, 17, 0.06)',
          borderBottom: '1px solid rgba(17, 17, 17, 0.06)',
          marginBottom: '3rem',
        }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            marginBottom: '1rem',
          }}>
            For any questions, partnership discussions, or supplier inquiries, please contact:
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
          }}>
            <a
              href="mailto:contact@infraa.in"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              contact@infraa.in
            </a>
            <a
              href="mailto:infraamart@gmail.com"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              infraamart@gmail.com
            </a>
          </div>
        </div>

        {/* Return Button */}
        <Link
          href="/#home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.875rem 2rem',
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
          Return To Homepage
        </Link>
      </motion.div>
    </div>
  );
}
