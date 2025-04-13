import Hero from './components/Hero';
import Header from './components/Header';
import CircuitSection from './components/CircuitSection';
import ServicesSection from './components/ServicesSection';
import PartnersSection from './components/PartnersSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* This empty div ensures the background gradients span the entire page */}
      </div>
      <Header />
      <Hero />
      <CircuitSection className="z-10" />
      <ServicesSection className="z-10" />
      <PartnersSection className="z-10" />
      <CaseStudiesSection className="z-10" />
      
      <Footer />
    </main>
  );
}
