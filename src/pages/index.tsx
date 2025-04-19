import Hero from "@app/components/Hero";

import Footer from "@app/components/Footer";
import Image from "next/image";
import BodyComponent from "@app/components/BodyComponent";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden relative w-full">
      {/* Header and Hero with gradients */}

      <div className="relative z-50">
        {/* Gradient Overlays specifically for Header and Hero */}

        <Image
          src="/left.svg"
          alt="left gradient"
          width={800}
          height={800}
          className="absolute z-50 -top-52 left-0 lg:block hidden pointer-events-none"
          priority
        />
        <Image
          src="/right.svg"
          alt="right gradient"
          width={800}
          height={800}
          className="absolute z-50 -top-64 right-0 lg:block hidden pointer-events-none"
          priority
        />

        {/* Header and Hero above gradients */}
      </div>

      <Hero />

      {/* Content Below Gradients */}
      <BodyComponent />
      <Footer />
    </main>
  );
}
