'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Why INFRAA', href: '/#why-infraa' },
  { label: 'About Us', href: '/#about-us' },
];

const getSlug = (item: string) => {
  const mapping: { [key: string]: string } = {
    'Cement & Concrete': 'cement-concrete',
    'Structural Steel': 'structural-steel',
    'Aggregates & Sand': 'aggregates-sand',
    'Blocks & Masonry': 'masonry-enclosures',
    'Waterproofing Systems': 'waterproofing',
    'Roofing Systems': 'roofing-systems',
    'Insulation Materials': 'insulation-materials',
    'Pipes & Plumbing': 'pipes-plumbing',
    'Cladding Systems': 'cladding-systems',
    'Louvers & Facades': 'louvers-facades',
    'Flooring Systems': 'flooring-systems',
    'Ceiling Systems': 'ceiling-systems',
    'Glass & Glazing': 'glass-glazing',
    'Acoustic Systems': 'acoustic-systems',
    'Doors & Partitions': 'doors-partitions',
    'Lighting Solutions': 'lighting-solutions',
    'Recycled Materials': 'recycled-materials',
    'Engineered Bamboo': 'engineered-bamboo',
    'Low Carbon Concrete': 'low-carbon-concrete',
    'Bio-Composites': 'bio-composites',
    'C&D Waste Products': 'cd-waste-products',
    'Sustainable Insulation': 'sustainable-insulation',
    'Green Facade Systems': 'green-facade-systems',
    'Water Conservation Systems': 'water-conservation'
  };
  return mapping[item] || item.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-');
};

const CategoryColumn = ({ heading, description, items, onItemClick }: { heading: string; description: string; items: string[]; onItemClick: () => void }) => {
  return (
    <div style={{ flex: 1, minWidth: '180px', textAlign: 'left' }}>
      <h4 style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontWeight: 600,
        fontSize: '1.15rem',
        color: '#111111',
        margin: '0 0 0.25rem 0',
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
        minHeight: '3rem',
      }}>
        {heading}
      </h4>
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.725rem',
        color: 'var(--text-secondary)',
        margin: '0 0 1.25rem 0',
        lineHeight: 1.4,
        minHeight: '2.1rem',
      }}>
        {description}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
        {items.map((item) => (
          <li key={item}>
            <Link
              href={`/marketplace?category=${getSlug(item)}`}
              onClick={onItemClick}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.825rem',
                color: '#111111',
                textDecoration: 'none',
                opacity: 0.8,
                transition: 'opacity 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.8';
                (e.currentTarget as HTMLElement).style.color = '#111111';
              }}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const leaveTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
      leaveTimeout.current = null;
    }
    setIsMegaOpen(true);
  };

  const handleMouseLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setIsMegaOpen(false);
    }, 150);
  };

  // Close mega menu on click elsewhere
  useEffect(() => {
    const handleWindowClick = () => {
      setIsMegaOpen(false);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  // Track hash on hashchange events
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash when pathname changes
  useEffect(() => {
    setCurrentHash(window.location.hash);
    if (pathname === '/marketplace') {
      setIsMegaOpen(false);
    }
  }, [pathname]);

  // Scrollspy to update active state as user scrolls homepage
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['home', 'why-infraa-container', 'about-us'];
    
    // Initial check when DOM is ready
    const handleInitial = () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top >= -100 && rect.top <= window.innerHeight * 0.4) {
          setCurrentHash(`#${id}`);
        }
      });
    };
    setTimeout(handleInitial, 100);

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setCurrentHash(`#${id}`);
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px', // Centered focus corridor
          threshold: 0
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [pathname]);

  // Close mobile menu on scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isLinkActive = (href: string) => {
    if (pathname === '/marketplace') {
      return href === '/marketplace';
    }
    if (pathname === '/') {
      if (href === '/#home') {
        return currentHash === '' || currentHash === '#home';
      }
      if (href === '/#why-infraa') {
        return currentHash === '#why-infraa' || currentHash === '#why-infraa-container';
      }
      if (href === '/#about-us') {
        return currentHash === '#about-us';
      }
    }
    return false;
  };

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/marketplace') {
      if (pathname === '/marketplace') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const hash = href.split('#')[1];
    if (pathname === '/') {
      e.preventDefault();
      if (hash === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/#home');
        setCurrentHash('#home');
      } else {
        const targetId = hash === 'why-infraa' ? 'why-infraa-container' : hash;
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${hash}`);
          setCurrentHash(`#${hash}`);
        }
      }
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'var(--bg-nav)',
          borderBottom: '1px solid var(--border-color)',
          transition: 'background-color 350ms ease, border-color 350ms ease',
        }}
      >
        <nav className="container-wide">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            
            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }} aria-label="INFRAA Home">
              <div style={{ width: '32px', height: '32px', position: 'relative', flexShrink: 0 }}>
                <Image src="/logo-official.png" alt="INFRAA Logo" fill style={{ objectFit: 'contain' }} />
              </div>
              <span style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '0.08em',
                color: 'var(--text-primary)',
              }}>
                INFRAA
              </span>
            </Link>

            {/* Desktop Nav */}
            <ul style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', listStyle: 'none', margin: 0 }} className="hidden-mobile">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                const isMarketplace = link.label === 'Marketplace';
                const shouldEnableDropdown = isMarketplace && pathname !== '/marketplace';
                return (
                  <li
                    key={link.label}
                    style={{ position: 'relative' }}
                    onMouseEnter={shouldEnableDropdown ? handleMouseEnter : undefined}
                    onMouseLeave={shouldEnableDropdown ? handleMouseLeave : undefined}
                    onClick={shouldEnableDropdown ? (e) => e.stopPropagation() : undefined}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        setIsMegaOpen(false);
                        handleNavLinkClick(e, link.href);
                      }}
                      className={active ? "" : "animated-underline"}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.875rem',
                        letterSpacing: '0.01em',
                        color: active ? 'var(--accent)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        opacity: active ? 1 : 0.75,
                        transition: 'opacity 0.2s ease, color 0.2s ease',
                        display: 'inline-block',
                        position: 'relative',
                        paddingBottom: '4px'
                      }}
                      onMouseEnter={(e) => { if (!active) (e.target as HTMLElement).style.opacity = '1'; }}
                      onMouseLeave={(e) => { if (!active) (e.target as HTMLElement).style.opacity = '0.75'; }}
                    >
                      {link.label}
                      {active && (
                        <motion.div
                          layoutId="activeUnderline"
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '2px',
                            backgroundColor: 'var(--accent)',
                          }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link
                href="/login"
                className="hidden-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '0.5rem 1.25rem',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-page)',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  letterSpacing: '0.02em',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s ease, color 0.2s ease, transform 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--text-primary)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                Login
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="show-mobile"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)',
                  transition: 'background 0.2s ease',
                }}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Dropdown Menu */}
        <AnimatePresence>
          {isMegaOpen && pathname !== '/marketplace' && (
            <motion.div
              initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute',
                top: '72px',
                left: 0,
                right: 0,
                backgroundColor: 'var(--bg-nav)', // Matches Warm Stone nav background
                borderBottom: '1px solid var(--border-color)',
                zIndex: 45,
                padding: '2.5rem 0',
                pointerEvents: 'auto',
              }}
            >
              <div className="container-wide" style={{ display: 'flex', gap: '3rem', justifyContent: 'space-between' }}>
                {/* Column 1: Construction Materials */}
                <CategoryColumn
                  heading="Construction Materials"
                  description="Core structural and construction materials."
                  items={[
                    'Cement & Concrete',
                    'Structural Steel',
                    'Aggregates & Sand',
                    'Blocks & Masonry',
                    'Waterproofing Systems',
                    'Roofing Systems',
                    'Insulation Materials',
                    'Pipes & Plumbing'
                  ]}
                  onItemClick={() => setIsMegaOpen(false)}
                />

                {/* Column 2: Architectural Systems */}
                <CategoryColumn
                  heading="Architectural Systems"
                  description="Materials used for building aesthetics and performance."
                  items={[
                    'Cladding Systems',
                    'Louvers & Facades',
                    'Flooring Systems',
                    'Ceiling Systems',
                    'Glass & Glazing',
                    'Acoustic Systems',
                    'Doors & Partitions',
                    'Lighting Solutions'
                  ]}
                  onItemClick={() => setIsMegaOpen(false)}
                />

                {/* Column 3: Green Building Materials */}
                <CategoryColumn
                  heading="Green Building Materials"
                  description="Sustainable and environmentally responsible materials."
                  items={[
                    'Recycled Materials',
                    'Engineered Bamboo',
                    'Low Carbon Concrete',
                    'Bio-Composites',
                    'C&D Waste Products',
                    'Sustainable Insulation',
                    'Green Facade Systems',
                    'Water Conservation Systems'
                  ]}
                  onItemClick={() => setIsMegaOpen(false)}
                />

                {/* Column 4: Featured Panel */}
                <div style={{
                  flex: 1.2,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(17, 17, 17, 0.08)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textAlign: 'left'
                }}>
                  <div>
                    <h4 style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontWeight: 700,
                      fontSize: '1.25rem',
                      color: '#111111',
                      margin: '0 0 0.5rem 0'
                    }}>
                      Verified Supplier Network
                    </h4>
                    <p style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      lineHeight: 1.45,
                      color: 'var(--text-secondary)',
                      margin: 0
                    }}>
                      Access trusted manufacturers, suppliers, distributors, and material partners through INFRAA's procurement ecosystem.
                    </p>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '1.25rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {[
                        'Verified suppliers',
                        'Direct manufacturer access',
                        'BOQ-based procurement',
                        'Nationwide sourcing network'
                      ].map((bullet) => (
                        <li key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#111111', fontFamily: 'Inter, sans-serif' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" style={{ flexShrink: 0 }}>
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <Link
                      href="/marketplace"
                      onClick={() => setIsMegaOpen(false)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.6rem 1.1rem',
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#A8532C'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)'; }}
                    >
                      Explore Marketplace →
                    </Link>
                    <Link
                      href="/partners"
                      onClick={() => setIsMegaOpen(false)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.6rem 1.1rem',
                        backgroundColor: 'transparent',
                        border: '1px solid rgba(17, 17, 17, 0.12)',
                        color: '#111111',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        textDecoration: 'none',
                        transition: 'background-color 0.2s ease',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#FAF8F5'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                    >
                      Partner With INFRAA
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '320px',
              backgroundColor: 'var(--bg-nav)',
              zIndex: 100,
              padding: '5rem 2rem 2rem',
              boxShadow: '-20px 0 60px rgba(17,17,17,0.15)',
              borderLeft: '1px solid var(--border-color)',
            }}
          >
            <button
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-primary)',
              }}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link, i) => {
                const active = isLinkActive(link.href);
                return (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        setMobileOpen(false);
                        handleNavLinkClick(e, link.href);
                      }}
                      style={{
                        display: 'block',
                        padding: '1rem 0',
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontWeight: 600,
                        fontSize: '1.75rem',
                        color: active ? 'var(--accent)' : 'var(--text-secondary)',
                        textDecoration: 'none',
                        borderBottom: '1px solid var(--border-color)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3 }}
                style={{ paddingTop: '1.5rem' }}
              >
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '0.875rem 1.5rem',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-page)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  Login
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(17,17,17,0.4)',
              zIndex: 90,
            }}
          />
        )}
      </AnimatePresence>

    </>
  );
}
