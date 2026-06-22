'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, SlidersHorizontal, ChevronRight, FileText, 
  ShieldCheck, HelpCircle, ArrowRight, X, Check, MapPin, 
  Calendar, Layers, CheckSquare, Square, Info, ChevronDown, ChevronUp
} from 'lucide-react';
import { sections, products, Product, Category } from '../marketplace/data';

// Reusable premium blueprint/CAD placeholder container
const BlueprintPlaceholder = ({ label, height = '180px', minWidth = '100%' }: { label: string; height?: string; minWidth?: string }) => {
  return (
    <div style={{
      width: '100%',
      minWidth: minWidth,
      height: height,
      backgroundColor: '#EAE5DB',
      borderBottom: '1px solid rgba(17, 17, 17, 0.08)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Blueprint grid overlay */}
      <div style={{
        position: 'absolute',
        inset: '0',
        backgroundImage: 'radial-gradient(rgba(17, 17, 17, 0.04) 1px, transparent 1px)',
        backgroundSize: '15px 15px',
        pointerEvents: 'none'
      }} />
      
      {/* CAD drafting marks */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '8px',
        color: '#8C857B',
        opacity: 0.7
      }}>
        COORD: X-104 / Y-89
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '10px',
        right: '10px',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '7px',
        color: '#8C857B',
        opacity: 0.7,
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {label}
      </div>

      <svg width="50" height="50" viewBox="0 0 100 100" fill="none" style={{ color: 'rgba(17, 17, 17, 0.35)' }}>
        <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="1.2" />
        <line x1="20" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="0.8" />
        <line x1="20" y1="60" x2="80" y2="60" stroke="currentColor" strokeWidth="0.8" />
        <line x1="40" y1="20" x2="40" y2="80" stroke="currentColor" strokeWidth="0.8" />
        <line x1="60" y1="20" x2="60" y2="80" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="40" cy="40" r="3" fill="var(--accent)" />
      </svg>
      
      {/* Blueprint corner crosshairs */}
      <div style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRight: '1px solid rgba(17,17,17,0.15)', borderTop: '1px solid rgba(17,17,17,0.15)' }} />
      <div style={{ position: 'absolute', bottom: 5, left: 5, width: 6, height: 6, borderLeft: '1px solid rgba(17,17,17,0.15)', borderBottom: '1px solid rgba(17,17,17,0.15)' }} />
    </div>
  );
};

// Helper component that maps categories to the premium blueprint/CAD placeholder
const ProductImage = ({ slug, alt }: { slug: string; alt: string }) => {
  return <BlueprintPlaceholder label={slug} />;
};

export default function MarketplaceLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Parse initial query params
  const paramCategory = searchParams.get('category');
  const paramSection = searchParams.get('section');

  // Filter State
  const [selectedSection, setSelectedSection] = useState<string | null>(paramSection);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(paramCategory);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  
  // Accordion Expand/Collapse States
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isLocationsExpanded, setIsLocationsExpanded] = useState(true);
  const [isRatingsExpanded, setIsRatingsExpanded] = useState(true);

  // Streamlined Technical ratings states
  const [filterPremium, setFilterPremium] = useState(false);
  const [filterStandard, setFilterStandard] = useState(false);
  const [filterGreen, setFilterGreen] = useState(false);
  const [filterFire, setFilterFire] = useState(false);
  const [filterAcoustic, setFilterAcoustic] = useState(false);
  const [filterHighStrength, setFilterHighStrength] = useState(false);
  const [filterLowCarbon, setFilterLowCarbon] = useState(false);
  const [filterRecycled, setFilterRecycled] = useState(false);
  const [filterISCompliant, setFilterISCompliant] = useState(false);

  // Sync state with URL search params when they change
  useEffect(() => {
    const cat = searchParams.get('category');
    const sec = searchParams.get('section');
    if (cat) {
      const matchedCat = sections.flatMap(s => s.categories).find(c => c.slug === cat || c.label === cat);
      if (matchedCat) {
        setSelectedCategory(matchedCat.slug);
        const sectionId = sections.find(s => s.categories.some(c => c.slug === matchedCat.slug))?.id;
        setSelectedSection(sectionId || null);
      }
    } else if (sec) {
      setSelectedSection(sec);
      setSelectedCategory(null);
    } else {
      setSelectedCategory(null);
      setSelectedSection(null);
    }
  }, [searchParams]);

  // Update URL params
  const updateUrlParams = (section: string | null, category: string | null) => {
    const params = new URLSearchParams();
    if (category) {
      params.set('category', category);
    } else if (section) {
      params.set('section', section);
    }
    router.push(`/marketplace?${params.toString()}`, { scroll: false });
  };

  // Get active Category Guide details
  const activeCategoryObject = sections
    .flatMap(s => s.categories)
    .find(c => c.slug === selectedCategory);

  // Define target Indian markets
  const locationsList = [
    'Mumbai',
    'Delhi NCR',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Pune',
    'Kolkata',
    'Ahmedabad'
  ];

  // Helper to map actual database product locations to simplified metro filters
  const getFilterCity = (location: string): string => {
    const loc = location.toLowerCase();
    if (loc.includes('hyderabad') || loc.includes('gachibowli') || loc.includes('miyapur') || loc.includes('jeedimetla') || loc.includes('secunderabad') || loc.includes('medchal') || loc.includes('malkajgiri') || loc.includes('patancheru') || loc.includes('nalgonda')) {
      return 'Hyderabad';
    }
    if (loc.includes('mumbai') || loc.includes('aurangabad')) {
      return 'Mumbai';
    }
    if (loc.includes('pune')) {
      return 'Pune';
    }
    if (loc.includes('bengaluru') || loc.includes('bellary')) {
      return 'Bengaluru';
    }
    if (loc.includes('chennai')) {
      return 'Chennai';
    }
    if (loc.includes('gurugram') || loc.includes('delhi') || loc.includes('ncr') || loc.includes('noida')) {
      return 'Delhi NCR';
    }
    if (loc.includes('kolkata')) {
      return 'Kolkata';
    }
    if (loc.includes('visakhapatnam')) {
      return 'Visakhapatnam';
    }
    if (loc.includes('coimbatore')) {
      return 'Coimbatore';
    }
    if (loc.includes('kochi')) {
      return 'Kochi';
    }
    if (loc.includes('surat')) {
      return 'Surat';
    }
    if (loc.includes('ahmedabad')) {
      return 'Ahmedabad';
    }
    if (loc.includes('lucknow')) {
      return 'Lucknow';
    }
    if (loc.includes('jaipur')) {
      return 'Jaipur';
    }
    if (loc.includes('guwahati')) {
      return 'Kolkata'; // Represent Eastern region
    }
    return 'Other';
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedLocations([]);
    setFilterPremium(false);
    setFilterStandard(false);
    setFilterGreen(false);
    setFilterFire(false);
    setFilterAcoustic(false);
    setFilterHighStrength(false);
    setFilterLowCarbon(false);
    setFilterRecycled(false);
    setFilterISCompliant(false);
    setSearchQuery('');
  };

  // Filtering Logic
  const filteredProducts = products.filter(product => {
    // 1. Section Filter
    if (selectedSection && product.section !== selectedSection) return false;
    
    // 2. Category Filter
    if (selectedCategory && product.categorySlug !== selectedCategory) return false;
    
    // 3. Search Query (matches name, manufacturer, specifications)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchBrand = product.manufacturer.toLowerCase().includes(q);
      const matchSpecs = Object.entries(product.specifications).some(([key, val]) => 
        key.toLowerCase().includes(q) || val.toLowerCase().includes(q)
      );
      if (!matchName && !matchBrand && !matchSpecs) return false;
    }

    // 4. Location Filter (using the helper to match Indian metropolitan cities)
    if (selectedLocations.length > 0) {
      const city = getFilterCity(product.location);
      if (!selectedLocations.includes(city)) return false;
    }

    // 5. Technical Ratings Filters
    if (filterPremium) {
      const isPremium = product.name.toLowerCase().includes('premium') || 
                        product.description.toLowerCase().includes('premium') || 
                        product.name.toLowerCase().includes('53') || 
                        Object.values(product.specifications).some(val => val.toLowerCase().includes('premium') || val.toLowerCase().includes('53') || val.toLowerCase().includes('class a1') || val.toLowerCase().includes('class i'));
      if (!isPremium) return false;
    }

    if (filterStandard) {
      const isStandard = !product.name.toLowerCase().includes('premium') && 
                         !product.description.toLowerCase().includes('premium') &&
                         !product.name.toLowerCase().includes('53');
      if (!isStandard) return false;
    }

    if (filterGreen) {
      if (!product.isGreen && !product.isLEED && !product.isIGBC && !product.name.toLowerCase().includes('recycled') && !product.description.toLowerCase().includes('recycled')) return false;
    }

    if (filterFire) {
      if (!product.isFireRated) return false;
    }

    if (filterAcoustic) {
      if (!product.isAcoustic) return false;
    }

    if (filterHighStrength) {
      const isHighStrength = product.name.toLowerCase().includes('heavy') ||
                             product.name.toLowerCase().includes('high strength') ||
                             product.description.toLowerCase().includes('high strength') ||
                             product.description.toLowerCase().includes('high-strength') ||
                             product.isStructural ||
                             Object.values(product.specifications).some(val => val.toLowerCase().includes('53 mpa') || val.toLowerCase().includes('70 n/mm²') || val.toLowerCase().includes('45 mpa') || val.toLowerCase().includes('500 mpa') || val.toLowerCase().includes('550 mpa') || val.toLowerCase().includes('600 mpa') || val.toLowerCase().includes('m30') || val.toLowerCase().includes('m25') || val.toLowerCase().includes('heavy duty') || val.toLowerCase().includes('heavy-duty'));
      if (!isHighStrength) return false;
    }

    if (filterLowCarbon) {
      const isLowCarbon = product.description.toLowerCase().includes('low carbon') ||
                          product.description.toLowerCase().includes('low-carbon') ||
                          product.description.toLowerCase().includes('carbon footprint') ||
                          product.description.toLowerCase().includes('geopolymer') ||
                          Object.keys(product.specifications).some(key => key.toLowerCase().includes('co₂') || key.toLowerCase().includes('carbon'));
      if (!isLowCarbon) return false;
    }

    if (filterRecycled) {
      const isRecycled = product.name.toLowerCase().includes('recycled') ||
                         product.description.toLowerCase().includes('recycled') ||
                         product.description.toLowerCase().includes('reprocessed') ||
                         product.description.toLowerCase().includes('upcycled') ||
                         product.categorySlug === 'recycled-materials' ||
                         product.categorySlug === 'cd-waste-products' ||
                         Object.keys(product.specifications).some(key => key.toLowerCase().includes('recycled') || key.toLowerCase().includes('reprocessed')) ||
                         Object.values(product.specifications).some(val => val.toLowerCase().includes('recycled') || val.toLowerCase().includes('reprocessed') || val.toLowerCase().includes('waste'));
      if (!isRecycled) return false;
    }

    if (filterISCompliant) {
      const isISCompliant = Object.keys(product.specifications).some(key => key.toLowerCase().includes('is standard') || key.toLowerCase().includes('standard') || key.toLowerCase().includes('code')) ||
                            Object.values(product.specifications).some(val => val.toLowerCase().includes('is ') || val.toLowerCase().includes('astm') || val.toLowerCase().includes('en ') || val.toLowerCase().includes('compliant'));
      if (!isISCompliant) return false;
    }

    return true;
  });

  const handleSectionClick = (sectionId: string | null) => {
    setSelectedSection(sectionId);
    setSelectedCategory(null);
    updateUrlParams(sectionId, null);
  };

  const handleCategoryClick = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    if (categorySlug) {
      const parentSec = sections.find(s => s.categories.some(c => c.slug === categorySlug))?.id;
      setSelectedSection(parentSec || null);
      updateUrlParams(parentSec || null, categorySlug);
    } else {
      updateUrlParams(selectedSection, null);
    }
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(x => x !== loc) : [...prev, loc]
    );
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Grid Pattern overlay */}
      <div className="architectural-grid" />

      {/* Main Container */}
      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Breadcrumbs Row (Visible only if a section or category is selected) */}
        {(selectedSection || selectedCategory) && (
          <div style={{
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            fontFamily: 'JetBrains Mono, monospace'
          }}>
            {selectedSection && (
              <span 
                onClick={() => { handleSectionClick(selectedSection); }}
                style={{ cursor: 'pointer', opacity: 0.8, color: 'var(--text-primary)', textTransform: 'uppercase' }}
              >
                {selectedSection}
              </span>
            )}
            {selectedCategory && (
              <>
                <ChevronRight size={10} style={{ opacity: 0.4 }} />
                <span style={{ color: 'var(--accent)', textTransform: 'uppercase' }}>
                  {activeCategoryObject?.label}
                </span>
              </>
            )}
          </div>
        )}

        {/* Unified Controls Row (Search on the left, Section Navigation Tabs on the right) */}
        <div style={{
          borderBottom: '1px solid var(--border-color)',
          paddingTop: (selectedSection || selectedCategory) ? '1rem' : '2.5rem',
          paddingBottom: '1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Main search bar on the left */}
          <div style={{
            position: 'relative',
            flex: '1',
            maxWidth: '500px',
            minWidth: '280px'
          }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              opacity: 0.6
            }} />
            <input 
              type="text"
              placeholder="Search specifications, manufacturer or standard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                backgroundColor: 'var(--card-bg)',
                border: '1.5px solid var(--border-color)',
                borderRadius: '8px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Section Selector Tab Pill-Grid on the right */}
          <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(17, 17, 17, 0.03)', padding: '4px', borderRadius: '8px' }}>
            <button 
              onClick={() => handleSectionClick(null)}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: selectedSection === null ? 'var(--card-bg)' : 'transparent',
                color: selectedSection === null ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: selectedSection === null ? '0 1px 3px rgba(17,17,17,0.08)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              All Sections
            </button>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => handleSectionClick(s.id)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedSection === s.id ? 'var(--card-bg)' : 'transparent',
                  color: selectedSection === s.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  boxShadow: selectedSection === s.id ? '0 1px 3px rgba(17,17,17,0.08)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Category overview banner (Detailed view trigger) */}
        {selectedCategory && activeCategoryObject && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '2.5rem',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              marginTop: '2rem',
              marginBottom: '2rem',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', gap: '2.5rem', flexDirection: 'row', alignItems: 'stretch', flexWrap: 'wrap' }}>
              {/* Left Column: Placeholder (30%) */}
              <div style={{
                flex: '0 0 30%',
                minWidth: '240px',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid var(--border-color)',
                height: '240px'
              }}>
                <BlueprintPlaceholder label={activeCategoryObject.slug} height="240px" />
              </div>

              {/* Right Column: Content (70%) */}
              <div style={{
                flex: '1',
                minWidth: '300px',
                display: 'flex',
                gap: '2rem',
                flexDirection: 'row',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '1.5', minWidth: '280px' }}>
                  <span className="eyebrow" style={{ fontSize: '0.65rem' }}>Category Detail</span>
                  <h1 className="font-display" style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0.5rem 0 1rem 0',
                    lineHeight: 1.15
                  }}>
                    {activeCategoryObject.label}
                  </h1>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {activeCategoryObject.description}
                  </p>
                </div>

                {/* Sourcing Intelligence guide */}
                <div style={{ 
                  flex: '1', 
                  minWidth: '260px', 
                  borderLeft: '2px solid var(--accent)', 
                  paddingLeft: '1.5rem',
                  backgroundColor: 'rgba(201, 106, 69, 0.015)',
                  padding: '1.25rem',
                  borderRadius: '0 8px 8px 0'
                }}>
                  <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', color: '#111111', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem' }}>
                    <Info size={14} style={{ color: 'var(--accent)' }} />
                    Technical Sourcing Parameters
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75rem', lineHeight: 1.5 }}>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Applicable Standards:</span>
                      <p style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', marginTop: '0.15rem' }}>{activeCategoryObject.technicalGuide.standards}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Testing Protocols:</span>
                      <p style={{ color: 'var(--text-primary)', marginTop: '0.15rem' }}>{activeCategoryObject.technicalGuide.testingCriteria}</p>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Procurement Rule:</span>
                      <p style={{ color: 'var(--text-primary)', marginTop: '0.15rem', fontStyle: 'italic' }}>{activeCategoryObject.technicalGuide.sourcingKey}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3-Column Sourcing Grid Layout (Sidebar Filters + Products Grid + Verified Suppliers Column) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr 280px',
          gap: '2.5rem',
          alignItems: 'flex-start',
          marginTop: (selectedCategory && activeCategoryObject) ? '0' : '2.5rem'
        }}
        className="marketplace-portal-layout">
          
          {/* Sidebar Column: Left Filters */}
          <aside style={{
            position: 'sticky',
            top: '90px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            paddingRight: '10px'
          }}
          className="filters-sidebar">
            
            {/* Filter Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <SlidersHorizontal size={14} style={{ color: 'var(--accent)' }} />
                Filter Parameters
              </div>
              <button 
                onClick={handleResetFilters}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--accent)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  opacity: 0.8,
                  textDecoration: 'underline'
                }}
              >
                RESET_ALL
              </button>
            </div>

            {/* Accordion 1: Material Categories */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div 
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
              >
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Categories
                </h4>
                {isCategoriesExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-secondary)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />}
              </div>
              <motion.div
                initial={false}
                animate={{ height: isCategoriesExpanded ? 'auto' : 0, opacity: isCategoriesExpanded ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '0.75rem' }}>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li>
                      <button
                        onClick={() => handleCategoryClick(null)}
                        style={{
                          display: 'flex',
                          width: '100%',
                          textAlign: 'left',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8rem',
                          color: selectedCategory === null ? 'var(--accent)' : 'var(--text-secondary)',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: selectedCategory === null ? 600 : 400,
                          padding: '4px 0',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        All Categories
                      </button>
                    </li>
                    {sections.map(sec => (
                      <div key={sec.id} style={{ margin: '0.25rem 0' }}>
                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(17,17,17,0.4)', textTransform: 'uppercase', padding: '4px 0' }}>
                          {sec.title}
                        </div>
                        {sec.categories.map(cat => (
                          <li key={cat.slug}>
                            <button
                              onClick={() => handleCategoryClick(cat.slug)}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.775rem',
                                color: selectedCategory === cat.slug ? 'var(--accent)' : 'var(--text-secondary)',
                                backgroundColor: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: selectedCategory === cat.slug ? 600 : 400,
                                padding: '3px 0 3px 8px',
                                borderLeft: selectedCategory === cat.slug ? '1.5px solid var(--accent)' : '1.5px solid transparent',
                                transition: 'color 0.15s ease'
                              }}
                            >
                              {cat.label}
                            </button>
                          </li>
                        ))}
                      </div>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Accordion 2: Locations */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div 
                onClick={() => setIsLocationsExpanded(!isLocationsExpanded)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
              >
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Locations
                </h4>
                {isLocationsExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-secondary)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />}
              </div>
              <motion.div
                initial={false}
                animate={{ height: isLocationsExpanded ? 'auto' : 0, opacity: isLocationsExpanded ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {locationsList.map(loc => {
                    const checked = selectedLocations.includes(loc);
                    return (
                      <div 
                        key={loc} 
                        onClick={() => toggleLocation(loc)}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)' }}
                      >
                        {checked ? <CheckSquare size={14} style={{ color: 'var(--accent)' }} /> : <Square size={14} style={{ opacity: 0.5 }} />}
                        <span style={{ color: checked ? 'var(--text-primary)' : 'inherit', fontWeight: checked ? 500 : 400 }}>{loc}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Accordion 3: Technical Ratings */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <div 
                onClick={() => setIsRatingsExpanded(!isRatingsExpanded)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
              >
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Technical Ratings
                </h4>
                {isRatingsExpanded ? <ChevronUp size={14} style={{ color: 'var(--text-secondary)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-secondary)' }} />}
              </div>
              <motion.div
                initial={false}
                animate={{ height: isRatingsExpanded ? 'auto' : 0, opacity: isRatingsExpanded ? 1 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    { label: 'Premium Grade', checked: filterPremium, setter: setFilterPremium },
                    { label: 'Standard Grade', checked: filterStandard, setter: setFilterStandard },
                    { label: 'Green Certified', checked: filterGreen, setter: setFilterGreen },
                    { label: 'Fire Rated', checked: filterFire, setter: setFilterFire },
                    { label: 'Acoustic Rated', checked: filterAcoustic, setter: setFilterAcoustic },
                    { label: 'High Strength', checked: filterHighStrength, setter: setFilterHighStrength },
                    { label: 'Low Carbon', checked: filterLowCarbon, setter: setFilterLowCarbon },
                    { label: 'Recycled Content', checked: filterRecycled, setter: setFilterRecycled },
                    { label: 'IS/BIS Compliant', checked: filterISCompliant, setter: setFilterISCompliant }
                  ].map(item => (
                    <div 
                      key={item.label}
                      onClick={() => item.setter(!item.checked)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', color: 'var(--text-secondary)', padding: '2px 0' }}
                    >
                      {item.checked ? <CheckSquare size={14} style={{ color: 'var(--accent)' }} /> : <Square size={14} style={{ opacity: 0.5 }} />}
                      <span style={{ color: item.checked ? 'var(--text-primary)' : 'inherit', fontWeight: item.checked ? 500 : 400 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </aside>

          {/* Central Column: Product Grid */}
          <main style={{ flex: 1 }} className="products-grid-column">
            
            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                borderRadius: '8px'
              }}>
                <SlidersHorizontal size={36} style={{ color: 'var(--text-secondary)', opacity: 0.3, marginBottom: '1rem' }} />
                <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  No Products Match Your Criteria
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Try resetting the filter variables or widening the search terms.
                </p>
                <button 
                  onClick={handleResetFilters}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    padding: '0.5rem 1.25rem',
                    backgroundColor: 'var(--text-primary)',
                    color: 'var(--bg-page)',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem'
              }}>
                <AnimatePresence>
                  {filteredProducts.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.2) }}
                      style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '100%'
                      }}
                      className="card-hover"
                    >
                      {/* Product Illustration */}
                      <div>
                        <ProductImage slug={p.categorySlug} alt={p.name} />
                        
                        {/* Card Meta Content */}
                        <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                              {p.category}
                            </span>
                            {/* Badging */}
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {p.isGreen && (
                                <span style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '8px',
                                  padding: '2px 6px',
                                  backgroundColor: 'rgba(76, 175, 80, 0.08)',
                                  color: '#2E7D32',
                                  borderRadius: '4px',
                                  border: '1px solid rgba(76, 175, 80, 0.15)',
                                  fontWeight: 600
                                }}>
                                  GREEN
                                </span>
                              )}
                              {p.isFireRated && (
                                <span style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '8px',
                                  padding: '2px 6px',
                                  backgroundColor: 'rgba(239, 83, 80, 0.08)',
                                  color: '#C62828',
                                  borderRadius: '4px',
                                  border: '1px solid rgba(239, 83, 80, 0.15)',
                                  fontWeight: 600
                                }}>
                                  FIRE
                                </span>
                              )}
                            </div>
                          </div>

                          <h3 style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.3,
                            marginBottom: '0.5rem'
                          }}>
                            {p.name}
                          </h3>

                          {/* Manufacturer Profile */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{p.manufacturer}</span>
                            <span>•</span>
                            <span>{p.location}</span>
                          </div>

                          {/* Technical Spec Badge Chips */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1rem', borderTop: '1px solid rgba(17,17,17,0.04)', paddingTop: '0.75rem' }}>
                            {Object.entries(p.specifications).slice(0, 3).map(([key, val]) => (
                              <div key={key} style={{
                                backgroundColor: 'rgba(17, 17, 17, 0.03)',
                                padding: '3px 8px',
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'column',
                                fontSize: '0.65rem',
                                border: '1px solid rgba(17,17,17,0.03)'
                              }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '8px', textTransform: 'uppercase', fontFamily: 'JetBrains Mono' }}>{key}</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer pricing & Call-To-Action */}
                      <div style={{
                        padding: '1.25rem 1.5rem',
                        borderTop: '1px solid var(--border-color)',
                        backgroundColor: 'rgba(17, 17, 17, 0.01)'
                      }}>
                        <Link
                          href="/login"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            padding: '0.7rem 1rem',
                            backgroundColor: 'var(--text-primary)',
                            color: '#F8F6F1',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; }}
                        >
                          Get Quotation
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </main>

          {/* Right Column: Verified Supplier Panel */}
          <aside style={{
            position: 'sticky',
            top: '90px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
          className="suppliers-aside">
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Verified Network
              </div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                Verified Supplier Network
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(201, 106, 69, 0.08)', color: 'var(--accent)', flexShrink: 0 }}>
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Direct Manufacturer Access</h5>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Bypassing multiple distributors and local dealers to optimize price.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(201, 106, 69, 0.08)', color: 'var(--accent)', flexShrink: 0 }}>
                  <FileText size={14} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>BOQ-Based Procurement</h5>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Upload complete Bills of Quantities and get consolidated site bidding.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(201, 106, 69, 0.08)', color: 'var(--accent)', flexShrink: 0 }}>
                  <MapPin size={14} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Nationwide Logistics</h5>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Consolidated freight delivery for tier-1 sites and infrastructure projects.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'rgba(201, 106, 69, 0.08)', color: 'var(--accent)', flexShrink: 0 }}>
                  <Layers size={14} />
                </div>
                <div>
                  <h5 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.15rem' }}>Flexible Trade Credit</h5>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Integrated supply chain financing to support 60-120 day working-capital cycles.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
              <Link 
                href="/login"
                style={{
                  width: '100%',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-page)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; }}
              >
                Get Quotation
                <ArrowRight size={14} />
              </Link>

              <button
                onClick={() => router.push('/partners')}
                style={{
                  width: '100%',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.775rem',
                  fontWeight: 500,
                  padding: '0.7rem 1rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-primary)',
                  border: '1.5px solid var(--border-color)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                Become Supplier Partner
              </button>
            </div>
          </aside>

        </div>

      </div>


    </div>
  );
}
