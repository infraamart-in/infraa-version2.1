'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Stage data ---

const materials = [
  { name: 'Structural Steel', spec: 'Fe500D TMT · 420 MT' },
  { name: 'Waterproofing', spec: 'APP Membrane · 8,200 sqft' },
  { name: 'Facade Systems', spec: 'ACP Cladding · 12,400 sqft' },
  { name: 'Acoustic Panels', spec: 'Class A · 3,600 sqft' },
  { name: 'Insulation', spec: 'XPS Board · 6,100 sqft' },
];

const suppliers = [
  { name: 'Supplier A', price: '₹48.2L', delivery: '18 days', match: '94%' },
  { name: 'Supplier B', price: '₹47.8L', delivery: '22 days', match: '91%' },
  { name: 'Supplier C', price: '₹49.1L', delivery: '15 days', match: '88%' },
];

const summaryItems = [
  { label: 'BOQ Processed', delay: 0 },
  { label: '12 Suppliers Matched', delay: 0.3 },
  { label: '8 Quotations Received', delay: 0.6 },
  { label: 'Best Match Identified', delay: 0.9 },
];

// --- Timings (ms) ---
const STAGE_DURATIONS = [2400, 3200, 3400, 2800, 3200, 3600];
const TOTAL_STAGES = 6;

// --- Subcomponents ---

function WindowChrome({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: '100%',
      backgroundColor: 'var(--dashboard-bg)',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.03)',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)' }} />
        </div>
        <div style={{
          flex: 1,
          textAlign: 'center',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
        }}>
          INFRAA · Procurement Engine
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '24px 20px',
        minHeight: '340px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

function StageLabel({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.6rem',
        letterSpacing: '0.14em',
        color: 'var(--terracotta)',
        textTransform: 'uppercase',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span style={{
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        backgroundColor: 'var(--terracotta)',
        flexShrink: 0,
      }} />
      {text}
    </motion.div>
  );
}

function ProgressBar({ progress, label }: { progress: number; label: string }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '6px',
      }}>
        <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>{label}</span>
        <span style={{ fontSize: '0.65rem', fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.3)' }}>
          {Math.round(progress * 100)}%
        </span>
      </div>
      <div style={{
        height: '3px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            height: '100%',
            backgroundColor: 'var(--terracotta)',
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
}

// --- Stage Views ---

function Stage1Upload() {
  return (
    <>
      <StageLabel text="BOQ Upload" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          padding: '20px',
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px dashed rgba(255,255,255,0.1)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* File icon */}
        <div style={{
          width: '44px',
          height: '52px',
          backgroundColor: 'rgba(201,106,69,0.12)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          border: '1px solid rgba(201,106,69,0.18)',
        }}>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M2 2h10l6 6v14a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="#C96A45" strokeWidth="1.3"/>
            <path d="M12 2v6h6" stroke="#C96A45" strokeWidth="1.3"/>
            <path d="M6 13h8M6 16h5" stroke="#C96A45" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)', marginBottom: '3px' }}>
            Residential Tower BOQ.xlsx
          </div>
          <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>
            342 line items · 24 material categories
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{
            padding: '5px 12px',
            backgroundColor: 'rgba(201,106,69,0.15)',
            borderRadius: '100px',
            fontSize: '0.65rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--terracotta)',
            letterSpacing: '0.06em',
            flexShrink: 0,
          }}
        >
          Ready
        </motion.div>
      </motion.div>
    </>
  );
}

function Stage2Processing() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = ['Reading BOQ...', 'Analyzing Quantities...', 'Identifying Materials...'];

  return (
    <>
      <StageLabel text="Processing" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
      >
        {steps.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: i <= step ? 1 : 0.2, x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.35 }}
          >
            <ProgressBar progress={i < step ? 1 : i === step ? 0.6 : 0} label={label} />
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: '8px',
            padding: '12px 16px',
            backgroundColor: 'rgba(255,255,255,0.025)',
            borderRadius: '6px',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)' }}>Materials identified</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 600, color: 'var(--terracotta)' }}>24</span>
        </motion.div>
      </motion.div>
    </>
  );
}

function Stage3Materials() {
  return (
    <>
      <StageLabel text="Material Extraction" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
      >
        {materials.map((mat, i) => (
          <motion.div
            key={mat.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              padding: '10px 14px',
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '2px',
                backgroundColor: 'var(--terracotta)',
                opacity: 0.7,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>{mat.name}</span>
            </div>
            <span style={{
              fontSize: '0.65rem',
              fontFamily: 'JetBrains Mono, monospace',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.03em',
            }}>
              {mat.spec}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

function Stage4Matching() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let c = 0;
    const interval = setInterval(() => {
      c += 1;
      if (c > 12) { clearInterval(interval); return; }
      setCount(c);
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <StageLabel text="Supplier Matching" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        {/* Counter */}
        <div style={{
          textAlign: 'center',
          padding: '28px 20px',
          backgroundColor: 'rgba(255,255,255,0.025)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '3rem',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1,
          }}>
            {count}
          </div>
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            marginTop: '6px',
          }}>
            Verified Suppliers Found
          </div>
        </div>

        {/* Loading dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--terracotta)',
              }}
            />
          ))}
        </div>

        {/* Category breakdown */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Structural', 'Waterproofing', 'Facade', 'Acoustic'].map((cat, i) => (
            <motion.span
              key={cat}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.3 }}
              style={{
                padding: '4px 10px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '100px',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.02em',
              }}
            >
              {cat}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function Stage5Quotes() {
  return (
    <>
      <StageLabel text="Quote Comparison" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -10 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {suppliers.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.18, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              padding: '14px 16px',
              backgroundColor: i === 1 ? 'rgba(201,106,69,0.08)' : 'rgba(255,255,255,0.025)',
              borderRadius: '8px',
              border: i === 1 ? '1px solid rgba(201,106,69,0.2)' : '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '3px',
              }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{s.name}</span>
                {i === 1 && (
                  <span style={{
                    padding: '1px 6px',
                    backgroundColor: 'rgba(201,106,69,0.2)',
                    borderRadius: '3px',
                    fontSize: '0.55rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: 'var(--terracotta)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    Best Price
                  </span>
                )}
              </div>
              <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>
                {s.delivery} · {s.match} match
              </span>
            </div>
            <div style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.35rem',
              fontWeight: 700,
              color: i === 1 ? 'var(--terracotta)' : 'rgba(255,255,255,0.7)',
            }}>
              {s.price}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

function Stage6Summary() {
  return (
    <>
      <StageLabel text="Procurement Ready" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        {summaryItems.map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: item.delay, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.025)',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: item.delay + 0.2, duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201,106,69,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 3" stroke="#C96A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'rgba(255,255,255,0.75)' }}>
              {item.label}
            </span>
          </motion.div>
        ))}

        {/* Restart hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.15)',
            textTransform: 'uppercase',
          }}
        >
          Restarting demo...
        </motion.div>
      </motion.div>
    </>
  );
}

// --- Stage indicator ---
function StageIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      justifyContent: 'center',
      marginTop: 'auto',
      paddingTop: '16px',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? '20px' : '4px',
            height: '3px',
            borderRadius: '2px',
            backgroundColor: i === current ? 'var(--terracotta)' : 'rgba(255,255,255,0.08)',
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </div>
  );
}

// --- Main Component ---

export default function ProcurementWorkflowAnimation() {
  const [stage, setStage] = useState(0);

  const advanceStage = useCallback(() => {
    setStage((s) => (s + 1) % TOTAL_STAGES);
  }, []);

  useEffect(() => {
    const timer = setTimeout(advanceStage, STAGE_DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage, advanceStage]);

  const stageComponents = [
    <Stage1Upload key="s1" />,
    <Stage2Processing key="s2" />,
    <Stage3Materials key="s3" />,
    <Stage4Matching key="s4" />,
    <Stage5Quotes key="s5" />,
    <Stage6Summary key="s6" />,
  ];

  return (
    <WindowChrome>
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', flex: 1 }}
        >
          {stageComponents[stage]}
        </motion.div>
      </AnimatePresence>
      <StageIndicator current={stage} total={TOTAL_STAGES} />
    </WindowChrome>
  );
}
