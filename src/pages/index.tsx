import Hero from "@app/components/Hero";
import Header from "@app/components/Header";
import CircuitSection from "@app/components/CircuitSection";
import ServicesSection from "@app/components/ServicesSection";
import PartnersSection from "@app/components/PartnersSection";
import CaseStudiesSection from "@app/components/CaseStudiesSection";
import Footer from "@app/components/Footer";

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
