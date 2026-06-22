'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <footer
      style={{
        backgroundColor: '#111111', // Graphite Black
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '4rem 0',
      }}
      role="contentinfo"
    >
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.25rem',
          }}
        >
          {/* Logo & Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }} aria-label="INFRAA Home">
            <div style={{ width: '24px', height: '24px', position: 'relative', flexShrink: 0 }}>
              <Image src="/logo-official.png" alt="INFRAA" fill style={{ objectFit: 'contain' }} />
            </div>
            <span style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontWeight: 700,
              fontSize: '1.2rem',
              letterSpacing: '0.08em',
              color: 'white',
            }}>
              INFRAA
            </span>
          </Link>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            color: 'rgba(255, 255, 255, 0.5)',
            margin: 0,
            letterSpacing: '0.01em',
          }}>
            Construction Procurement Platform
          </p>

          {/* Location */}
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.35)',
            margin: 0,
          }}>
            Hyderabad, India
          </p>

          {/* Minimal Divider */}
          <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', margin: '0.25rem 0' }} />

          {/* Copyright */}
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.25)',
            margin: 0,
          }}>
            © INFRAA
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
