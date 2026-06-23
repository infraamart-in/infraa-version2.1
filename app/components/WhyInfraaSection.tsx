'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Desaturated chaotic elements (Procurement noise)
const chaoticElements = [
  {
    id: 1,
    tag: 'WhatsApp',
    content: '💬 Supplier A: "Cement rates increased by ₹15/bag. Let me know by 12 PM."',
    scatteredColor: 'rgba(250, 249, 245, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 2,
    tag: 'Excel BOQ',
    content: '📊 Project_BOQ_v3.xlsx: Column AG mismatch with steel spec',
    scatteredColor: 'rgba(245, 248, 246, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 3,
    tag: 'Email',
    content: '✉️ RE: Quote Aditya Steel: Freight and IGST terms not specified',
    scatteredColor: 'rgba(253, 245, 245, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 4,
    tag: 'Call Log',
    content: '📞 Call: Balaji Bricks (6 Missed Calls - Price negotiation pending)',
    scatteredColor: 'rgba(253, 247, 243, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 5,
    tag: 'Site Note',
    content: '📝 Advance of ₹3,0,0,000 required before sand dispatch from yard',
    scatteredColor: 'rgba(243, 248, 252, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 6,
    tag: 'Vendor Directory',
    content: '📄 Scribble: 18 tile vendors in Hyd (Contacted 9, only 2 responded)',
    scatteredColor: 'rgba(249, 245, 252, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 7,
    tag: 'Quotation Alert',
    content: '⚠️ Quote from Supplier B lacks unloading charges at site entry',
    scatteredColor: 'rgba(253, 250, 243, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  },
  {
    id: 8,
    tag: 'Logistics',
    content: '🚚 Truck Driver: "Stuck at state border checkpost. Delayed by 24h."',
    scatteredColor: 'rgba(253, 245, 245, 0.75)',
    scatteredBorder: '1px solid rgba(17, 17, 17, 0.04)',
  }
];

// Timeline steps for Chapter 4
const timelineSteps = [
  { label: 'Supplier Search', time: '1-2 Days', desc: 'Calling phone contacts & searching online directories.' },
  { label: 'Quotation Collection', time: '3-5 Days', desc: 'Compiling fragmented pricing sheets across WhatsApp & email.' },
  { label: 'Negotiation', time: '2-3 Days', desc: 'Back-and-forth negotiations for pricing, payment, and tax terms.' },
  { label: 'Approval Cycle', time: '2-4 Days', desc: 'Awaiting signature approvals from engineers & finance directors.' },
  { label: 'Procurement Booking', time: '1-2 Days', desc: 'Releasing advance payments and coordinating truck bookings.' },
  { label: 'Delivery & Gate Entry', time: '2-5 Days', desc: 'Managing transport issues and manual gate unloading clearances.' }
];

// Workflow steps for Chapter 7 (Meet INFRAA / Solution phase)
const workflowSteps = [
  { label: 'Upload BOQ', desc: 'Drag & drop your Excel or PDF material list.' },
  { label: 'Material Analysis', desc: 'INFRAA extracts and standardizes your project specs.' },
  { label: 'Supplier Matching', desc: 'Instantly matches with our network of verified vendors.' },
  { label: 'Quote Comparison', desc: 'Compiles itemized quotations side-by-side on your screen.' },
  { label: 'Procurement Support', desc: 'Coordinates bookings, payments, and dispatch tracking.' },
  { label: 'Flexible Payment Options', desc: 'Eligible projects may access flexible payment solutions, procurement credit, deferred payments, and structured purchasing support.' }
];

// Headlines for single focal text layer
const headlines = [
  "Construction Procurement<br />Shouldn't Be This <em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Hard.</em>",
  "Procurement <em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Chaos</em>",
  "One Project. Multiple Suppliers.<br />Too Many <em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Conversations.</em>",
  "<em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Delays</em> Start Before<br />Construction Begins.",
  "Meet <em style='color: var(--accent); font-style: italic; font-weight: inherit;'>INFRAA.</em>",
  "BOQ <em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Workflow.</em>",
  "Built For The Way Construction<br /><em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Actually Works.</em>",
  "Construction Procurement.<br /><em style='color: var(--accent); font-style: italic; font-weight: inherit;'>Made Smarter.</em>"
];

// Coordinate helpers for chaotic notes
const getScatteredCoords = (id: number, type: 'left' | 'top' | 'rotate', isMobile: boolean) => {
  if (isMobile) {
    const mobileCoords: any = {
      1: { top: 22, left: 6, rotate: -3 },
      2: { top: 30, left: 8, rotate: 2 },
      3: { top: 38, left: 5, rotate: -2 },
      4: { top: 46, left: 7, rotate: 3 },
      5: { top: 54, left: 6, rotate: -2 },
      6: { top: 62, left: 8, rotate: 2 },
      7: { top: 70, left: 5, rotate: -3 },
      8: { top: 78, left: 7, rotate: 2 }
    };
    return mobileCoords[id]?.[type] ?? 0;
  } else {
    const desktopCoords: any = {
      1: { top: 15, left: 6, rotate: -5 },
      2: { top: 24, left: 71, rotate: 4 },
      3: { top: 70, left: 7, rotate: -4 },
      4: { top: 72, left: 72, rotate: 5 },
      5: { top: 42, left: 5, rotate: 3 },
      6: { top: 44, left: 73, rotate: -4 },
      7: { top: 56, left: 6, rotate: -3 },
      8: { top: 58, left: 71, rotate: 3 }
    };
    return desktopCoords[id]?.[type] ?? 0;
  }
};

const getOrganizedCoords = (id: number, type: 'left' | 'top' | 'rotate', isMobile: boolean) => {
  if (isMobile) {
    const mobileCoords: any = {
      1: { top: 24, left: 6, rotate: 0 },
      2: { top: 32, left: 6, rotate: 0 },
      3: { top: 40, left: 6, rotate: 0 },
      4: { top: 48, left: 6, rotate: 0 },
      5: { top: 56, left: 6, rotate: 0 },
      6: { top: 64, left: 6, rotate: 0 },
      7: { top: 72, left: 6, rotate: 0 },
      8: { top: 80, left: 6, rotate: 0 }
    };
    return mobileCoords[id]?.[type] ?? 0;
  } else {
    const desktopCoords: any = {
      1: { top: 18, left: 6, rotate: 0 },
      2: { top: 36, left: 6, rotate: 0 },
      3: { top: 54, left: 6, rotate: 0 },
      4: { top: 72, left: 6, rotate: 0 },
      5: { top: 18, left: 71, rotate: 0 },
      6: { top: 36, left: 71, rotate: 0 },
      7: { top: 54, left: 71, rotate: 0 },
      8: { top: 72, left: 71, rotate: 0 }
    };
    return desktopCoords[id]?.[type] ?? 0;
  }
};

// Sub-Component: ChaosCards
const ChaosCards = ({ isOrganized, step, isMobile }: { isOrganized: boolean; step: number; isMobile: boolean }) => {
  // Step 1 shows only cards 1-5, step 2 shows all cards 1-8 (complexity scenes removed)
  const visibleCards = chaoticElements.filter((item) => {
    if (step === 1) return item.id <= 5;
    return true;
  });

  return (
    <>
      {visibleCards.map((item, idx) => {
        const left = isOrganized ? getOrganizedCoords(item.id, 'left', isMobile) : getScatteredCoords(item.id, 'left', isMobile);
        const top = isOrganized ? getOrganizedCoords(item.id, 'top', isMobile) : getScatteredCoords(item.id, 'top', isMobile);
        const rotate = isOrganized ? getOrganizedCoords(item.id, 'rotate', isMobile) : getScatteredCoords(item.id, 'rotate', isMobile);
        
        const background = isOrganized ? '#FFFFFF' : item.scatteredColor;
        const border = isOrganized ? '1px solid rgba(17, 17, 17, 0.08)' : item.scatteredBorder;
        const boxShadow = isOrganized ? '0px 8px 30px rgba(17, 17, 17, 0.04)' : '0px 2px 8px rgba(17, 17, 17, 0.01)';
        const opacity = isOrganized ? 0.85 : 0.45;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ 
              opacity: opacity, 
              scale: 1, 
              left: `${left}%`, 
              top: `${top}%`, 
              rotate: `${rotate}deg`,
              background,
              border,
              boxShadow,
              y: 0
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
              delay: idx * 0.04
            }}
            style={{
              position: 'absolute',
              width: isMobile ? '88vw' : '23%',
              padding: '1rem',
              borderRadius: '8px',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4 + (item.id % 3) * 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--concrete)',
                  fontWeight: 600,
                  opacity: 0.6
                }}>
                  {item.tag}
                </span>
                <span style={{ fontSize: '0.5rem', color: 'rgba(17, 17, 17, 0.2)' }}>
                  • Active
                </span>
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                lineHeight: 1.4,
                color: 'var(--graphite)',
                opacity: 0.85,
                margin: 0,
              }}>
                {item.content}
              </p>
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
};

// Sub-Component: DelayTimeline
const DelayTimeline = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '850px',
      position: 'relative',
      height: isMobile ? '55vh' : '45vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '0 2rem'
    }}>
      {/* Stretching line */}
      <div style={{
        position: 'absolute',
        left: isMobile ? '2.5rem' : '50%',
        top: '5%',
        bottom: '5%',
        width: '2px',
        backgroundColor: 'rgba(17, 17, 17, 0.06)',
        transform: isMobile ? 'none' : 'translateX(-50%)'
      }}>
        <motion.div 
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          style={{ width: '100%', backgroundColor: 'var(--terracotta)' }} 
        />
      </div>

      {/* Timeline elements */}
      {timelineSteps.map((step, idx) => {
        const isLeft = idx % 2 === 0;

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 + idx * 0.08, ease: "easeOut" }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: isMobile ? '100%' : '50%',
              alignSelf: isMobile ? 'flex-start' : (isLeft ? 'flex-start' : 'flex-end'),
              paddingLeft: isMobile ? '4.5rem' : (isLeft ? '0' : '2.5rem'),
              paddingRight: isMobile ? '0' : (isLeft ? '2.5rem' : '0'),
              textAlign: isMobile ? 'left' : (isLeft ? 'right' : 'left'),
              position: 'relative',
            }}
          >
            {/* Circle Indicator */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 + idx * 0.08 }}
              style={{
                position: 'absolute',
                left: isMobile ? '2.15rem' : (isLeft ? 'auto' : '-8px'),
                right: isMobile ? 'auto' : (isLeft ? '-8px' : 'auto'),
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: 'var(--terracotta)',
                border: '3.5px solid var(--bg-page)',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 3
              }} 
            />

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <span style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'var(--terracotta)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}>
                {step.time} — {step.label}
              </span>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.75rem',
                color: 'var(--concrete)',
                margin: '2px 0 0',
                lineHeight: 1.35
              }}>
                {step.desc}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Sub-Component: WorkflowCards
const WorkflowCards = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '1240px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '0.75rem' : '0.75rem', // Clean gaps between steps
      alignItems: 'stretch',
      justifyContent: 'space-between',
      padding: '0 2rem',
      overflowY: isMobile ? 'auto' : 'visible',
      maxHeight: isMobile ? '60vh' : 'none',
      WebkitOverflowScrolling: 'touch'
    }}>
      {workflowSteps.map((step, idx) => {
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'stretch', flex: isMobile ? 'none' : 1, width: isMobile ? '100%' : 'auto' }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.12, ease: "easeOut" }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(201, 106, 69, 0.18)',
                padding: '1.5rem 1rem', // Compact padding for 6 cards
                borderRadius: '10px',
                flex: 1,
                boxShadow: '0 6px 20px rgba(17,17,17,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.7rem',
                color: 'var(--terracotta)',
                fontWeight: 600,
                marginBottom: '0.75rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(201, 106, 69, 0.08)'
              }}>
                {idx + 1}
              </div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.95rem', color: 'var(--graphite)', marginBottom: '0.4rem', lineHeight: 1.2 }}>
                {step.label}
              </h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: 'var(--concrete-dark)', lineHeight: 1.45, margin: 0 }}>
                {step.desc}
              </p>
            </motion.div>

            {!isMobile && idx < workflowSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 + idx * 0.12 }}
                style={{
                  alignSelf: 'center',
                  marginLeft: '0.5rem',
                  marginRight: '0.25rem',
                  color: 'var(--terracotta)',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Sub-Component: DashboardDemo
const DashboardDemo = ({ isMobile }: { isMobile: boolean }) => {
  const [activeChecks, setActiveChecks] = useState([false, false, false, false]);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveChecks([true, false, false, false]), 300),
      setTimeout(() => setActiveChecks([true, true, false, false]), 750),
      setTimeout(() => setActiveChecks([true, true, true, false]), 1200),
      setTimeout(() => setActiveChecks([true, true, true, true]), 1650),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '750px', padding: '0 2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(17, 17, 17, 0.08)',
          borderRadius: '12px',
          boxShadow: '0 20px 48px rgba(17, 17, 17, 0.05)',
          overflow: 'hidden'
        }}
      >
        {/* Chrome Header */}
        <div style={{
          height: '40px',
          backgroundColor: '#F4F0E8',
          borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.25rem',
          gap: '6px'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E16A6A' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F0B85E' }} />
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#75C175' }} />
          <div style={{
            marginLeft: '1.5rem',
            backgroundColor: '#FFFFFF',
            fontSize: '0.65rem',
            fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--concrete)',
            padding: '2px 12px',
            borderRadius: '4px',
            border: '1px solid rgba(17, 17, 17, 0.04)',
            width: '180px',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}>
            app.infraa.in/procurement
          </div>
        </div>

        {/* Dashboard Layout */}
        <div style={{ display: 'flex', minHeight: isMobile ? '230px' : '260px', flexDirection: isMobile ? 'column' : 'row' }}>
          {/* Minimal Side Controls */}
          <div style={{
            width: isMobile ? '100%' : '180px',
            backgroundColor: '#FAF8F5',
            borderRight: isMobile ? 'none' : '1px solid rgba(17, 17, 17, 0.06)',
            borderBottom: isMobile ? '1px solid rgba(17, 17, 17, 0.06)' : 'none',
            padding: '1rem',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            gap: '0.5rem',
            justifyContent: isMobile ? 'space-around' : 'flex-start'
          }}>
            {['Active BOQ', 'Suppliers', 'Quotations', 'Logistics'].map((item, idx) => (
              <div key={item} style={{
                fontSize: '0.7rem',
                fontFamily: 'Inter, sans-serif',
                fontWeight: idx === 0 ? 600 : 400,
                color: idx === 0 ? 'var(--terracotta)' : 'var(--concrete)',
                padding: '4px 8px',
                borderRadius: '4px',
                backgroundColor: idx === 0 ? 'rgba(201, 106, 69, 0.06)' : 'transparent',
              }}>
                {item}
              </div>
            ))}
          </div>

          {/* Dashboard content */}
          <div style={{ flex: 1, padding: isMobile ? '1rem' : '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: 600, color: 'var(--graphite)', margin: 0 }}>
                Project: Hyderabad IT Park Ph1
              </h4>
              <span style={{ fontSize: '0.55rem', fontFamily: 'JetBrains Mono, monospace', backgroundColor: 'rgba(201, 106, 69, 0.1)', color: 'var(--terracotta)', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                BOQ ACTIVE
              </span>
            </div>

            {/* Task indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'BOQ Uploaded & Standardized', sub: 'Project_ITPark_BOQ.xlsx (420 line items matched)' },
                { label: 'Verified Suppliers Matched', sub: '14 regional suppliers identified for steel, cement & stone' },
                { label: 'Quotations Received & Compared', sub: '3 itemized vendor bids compiled side-by-side (Saved 8.4%)' },
                { label: 'Procurement Organized & Dispatched', sub: 'Transit timeline locked and logistic tracking enabled' }
              ].map((task, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    <AnimatePresence>
                      {activeChecks[idx] && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          style={{ color: '#4AA366', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--graphite)', lineHeight: 1.2 }}>
                      {task.label}
                    </span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--concrete-dark)', marginTop: '1px' }}>
                      {task.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Sub-Component: PipelineEcosystem
const PipelineEcosystem = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: isMobile ? '38%' : '52%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 20
    }}>
      {/* Centered header workflow label above cards */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
      }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.65rem',
          color: 'var(--accent)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 600,
          display: 'inline-block'
        }}>
          INFRAA PIPELINE
        </span>
        <motion.div 
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            width: '1px',
            height: '24px',
            backgroundColor: 'var(--accent)',
            marginTop: '0.625rem',
            opacity: 0.35,
            originY: 0
          }} 
        />
      </div>

      <div style={{ width: '100%', maxWidth: '960px', position: 'relative', padding: '0 2rem' }}>
        {/* Continuous workflow line running behind cards on mobile */}
        {isMobile && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '1rem',
            bottom: '1rem',
            width: '1px',
            backgroundColor: 'rgba(17, 17, 17, 0.08)',
            transform: 'translateX(-50%)',
            zIndex: 1
          }}>
            <motion.div 
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ width: '100%', backgroundColor: 'var(--accent)' }} 
            />
          </div>
        )}

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'center' : 'stretch',
          position: 'relative',
          zIndex: 2,
          gap: isMobile ? '1rem' : '1.5rem'
        }}>
          {/* Continuous horizontal workflow line running behind cards on desktop */}
          {!isMobile && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              right: '5%',
              height: '1px',
              backgroundColor: 'rgba(17, 17, 17, 0.08)',
              transform: 'translateY(-50%)',
              zIndex: 1
            }}>
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                style={{ height: '100%', width: '100%', backgroundColor: 'var(--accent)' }} 
              />
            </div>
          )}

          {[
            { title: 'Architects', role: 'Specifiers', action: 'Lock material specs & upload structural drafts.' },
            { title: 'Developers', role: 'Owners', action: 'Approve itemized quotes & manage overall cashflow.' },
            { title: 'Contractors', role: 'Builders', action: 'Track delivery timelines & call off daily dispatches.' },
            { title: 'Suppliers', role: 'Partners', action: 'Receive orders & coordinate dispatch logistics.' }
          ].map((role, idx) => {
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                style={{
                  width: isMobile ? '84vw' : '23%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  borderRadius: '8px',
                  padding: isMobile ? '0.75rem 1rem' : '1.5rem 1.25rem',
                  textAlign: isMobile ? 'left' : 'center',
                  boxShadow: '0 4px 20px rgba(17, 17, 17, 0.02)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: isMobile ? 'flex-start' : 'center'
                }}
              >
                {isMobile ? (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%', marginBottom: '0.25rem' }}>
                    <h4 style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontWeight: 600,
                      fontSize: '1.15rem',
                      color: 'var(--text-primary)',
                      margin: 0
                    }}>
                      {role.title}
                    </h4>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.55rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      {role.role}
                    </span>
                  </div>
                ) : (
                  <>
                    <h4 style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontWeight: 600,
                      fontSize: '1.35rem',
                      color: 'var(--text-primary)',
                      margin: '0 0 0.15rem 0',
                      lineHeight: 1.2
                    }}>
                      {role.title}
                    </h4>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.65rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      display: 'block',
                      marginBottom: '0.75rem'
                    }}>
                      {role.role}
                    </span>
                  </>
                )}
                
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: isMobile ? '0.675rem' : '0.725rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                  margin: 0,
                  opacity: 0.85
                }}>
                  {role.action}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Sub-Component: CTAPanel
const CTAPanel = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: isMobile ? '48%' : '52%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 20
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '750px', padding: '0 2rem' }}>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          lineHeight: 1.6,
          color: 'var(--concrete)',
          maxWidth: '580px',
          margin: '0 auto 2.5rem'
        }}>
          Discover materials, connect with verified suppliers, compare quotations, and streamline procurement through one unified digital platform.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/marketplace"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.75rem',
              backgroundColor: 'var(--terracotta)',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.01em',
              borderRadius: '6px',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(201, 106, 69, 0.25)',
              transition: 'background-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#A8532C';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--terracotta)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Explore Marketplace
          </Link>
          <Link
            href="/partners"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.75rem',
              backgroundColor: '#FFFFFF',
              color: 'var(--graphite)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '0.9rem',
              letterSpacing: '0.01em',
              borderRadius: '6px',
              border: '1px solid rgba(17, 17, 17, 0.12)',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F5';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17, 17, 17, 0.2)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(17, 17, 17, 0.12)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Partner With INFRAA
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default function WhyInfraaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Monitor resize for responsiveness
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set up Scroll listener bound to window scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Track scroll position to update activeStep for DOM cleanups
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = Math.min(Math.max(Math.round(latest * 7), 0), 7);
      setActiveStep(step);

      // Disable scroll snapping once we scroll past the end of WhyInfraaSection (progress >= 0.98)
      if (latest >= 0.98) {
        document.documentElement.style.scrollSnapType = 'none';
      } else {
        document.documentElement.style.scrollSnapType = ''; // Reverts to stylesheet behavior
      }
    });
    return () => {
      unsubscribe();
      if (typeof document !== 'undefined') {
        document.documentElement.style.scrollSnapType = '';
      }
    };
  }, [scrollYProgress]);

  // Understated progress tracker bar width
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="why-infraa-container"
      style={{
        height: isMobile ? '280vh' : '480vh',
        position: 'relative',
        backgroundColor: 'var(--bg-page)',
      }}
    >
      {/* Sticky viewport container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-page)',
          pointerEvents: 'none',
          zIndex: 10
        }}
      >
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
          {/* Architectural grid background matching homepage hero */}
          <div className="architectural-grid" />

          <div className="noise-overlay" style={{ position: 'absolute', inset: 0 }} />

          {/* PROGRESS AWARENESS INDICATOR (Elegant & Understated horizontal bar) */}
          <div style={{
            position: 'absolute',
            top: '72px', // Sits directly below navigation bar
            left: 0,
            right: 0,
            height: '2px',
            backgroundColor: 'rgba(17, 17, 17, 0.02)',
            zIndex: 100
          }}>
            <motion.div style={{
              width: progressWidth,
              height: '100%',
              backgroundColor: 'var(--terracotta)',
            }} />
          </div>

          {/* AnimatePresence for transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'auto',
                width: '100%',
                height: '100%'
              }}
            >
              {/* Central Safe Reading Zone for Headline */}
              <div style={{
                position: 'absolute',
                top: isMobile ? '12%' : '22%',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '720px',
                padding: '0 2rem',
                zIndex: 30,
                pointerEvents: 'none'
              }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.75rem, 4.5vw, 4.2rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}
                  dangerouslySetInnerHTML={{ __html: headlines[activeStep] }}
                />
              </div>

              {/* Step-specific visuals */}
              {(activeStep === 1 || activeStep === 2) && (
                <ChaosCards isOrganized={false} step={activeStep} isMobile={isMobile} />
              )}
              {activeStep === 3 && (
                <div style={{ position: 'absolute', top: isMobile ? '38%' : '46%', left: 0, right: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <DelayTimeline isMobile={isMobile} />
                </div>
              )}
              {activeStep === 4 && (
                <div style={{ position: 'absolute', top: isMobile ? '32%' : '44%', left: 0, right: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <WorkflowCards isMobile={isMobile} />
                </div>
              )}
              {activeStep === 5 && (
                <div style={{ position: 'absolute', top: isMobile ? '34%' : '44%', left: 0, right: 0, display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <DashboardDemo isMobile={isMobile} />
                </div>
              )}
              {activeStep === 6 && (
                <PipelineEcosystem isMobile={isMobile} />
              )}
              {activeStep === 7 && (
                <CTAPanel isMobile={isMobile} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Snap targets absolute positioned relative to the container */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{ height: isMobile ? '35vh' : '60vh', scrollSnapAlign: 'start' }} />
        ))}
      </div>
    </div>
  );
}
