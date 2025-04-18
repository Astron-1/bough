import Hero from "@app/components/Hero";
import Header from "@app/components/Header";
import CircuitSection from "@app/components/CircuitSection";
import ServicesSection from "@app/components/ServicesSection";
import PartnersSection from "@app/components/PartnersSection";
import CaseStudiesSection from "@app/components/CaseStudiesSection";
import Footer from "@app/components/Footer";
import Image from "next/image";
import HeroText from "@app/components/heroText";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative w-full h-full">
      {/* Gradient Overlays */}
      <div className="relative">
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Image
            src="/left.svg"
            alt="left gradient"
            width={800}
            height={100}
            className="absolute top-0 left-0 w-[40%] h-[110%]  opacity-100"
          />
          <Image
            src="/right.svg"
            alt="right gradient"
            width={800}
            height={100}
            className="absolute top-0 right-0 w-[40%] h-[110%]  opacity-100"
          />
        </div>
        <Header />
        <Hero />
      </div>
      {/* Content Below Gradients */}
      <HeroText />
      <Footer />
    </main>
  );
}
