import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import WhyInfraaSection from './components/WhyInfraaSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <WhyInfraaSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
