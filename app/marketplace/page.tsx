import { Suspense } from 'react';
import Navbar from '../components/Navbar';
import MarketplaceLayout from '../components/MarketplaceLayout';
import Footer from '../components/Footer';

export default function MarketplacePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" style={{ backgroundColor: 'var(--bg-page)', paddingTop: '72px' }}>
        <Suspense fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              LOADING_MARKETPLACE_CATALOG...
            </div>
          </div>
        }>
          <MarketplaceLayout />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

