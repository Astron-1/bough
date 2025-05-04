import Hero from "@app/components/Hero";
import Header from "@app/components/Header";

import Image from "next/image";
import BodyComponent from "@app/components/BodyComponent";

export default function Home() {
  return (
    <section className=" bg-white  w-full relative">
      {/* Header and Hero with gradients */}
      <Header />

      <div className="relative z-40">
        {/* Gradient Overlays specifically for Header and Hero */}

        <Image
          src="/left.svg"
          alt="left gradient"
          width={1100}
          height={800}
          className="absolute z-30 -top-20 md:-top-52 left-0  pointer-events-none"
          priority
        />
        <Image
          src="/right.svg"
          alt="right gradient"
          width={1100}
          height={800}
          className="absolute z-30 -top-20 md:-top-64 right-0  pointer-events-none"
          priority
        />

        {/* Hero with gradients */}
      </div>

      <Hero />

      {/* Content Below Gradients */}
      <BodyComponent />
    </section>
  );
}
