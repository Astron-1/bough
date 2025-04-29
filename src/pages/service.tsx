import Image from "next/image";
import Link from "next/link";
import Text, { Font } from "@app/components/Text";
import BoughServices from "@app/components/Services";
import coin1 from "../../public/service-hero-1.png";
import coin2 from "../../public/service-hero-2.png";
import Header from "@app/components/Header";
import CaseStudies from "@app/components/CaseStudies";

export default function ServicesPage() {
  return (
    <section className=" bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Header/Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="relative w-full px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center">
        {/* Left Image */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0">
          <Image
            src={coin1}
            alt="Plant growing from coins"
            width={300}
            height={400}
            className="object-contain h-full w-auto"
          />
        </div>

        {/* Center Text */}
        <div className="w-full md:w-2/4 text-center py-12 z-10">
          <Text
            type={Font.GARAMOND}
            className="text-4xl text-black m-12 md:text-5xl font-bold mb-4"
          >
            Tailored services, for your unique needs
          </Text>
          <Text
            type={Font.SOURCE_SANS}
            className="text-black max-w-2xl mx-auto mb-8"
          >
            We are advisors, thought leaders, and problem solvers, dedicated to
            creating long-term value and sustainable solutions.
          </Text>
          <Link href="/careers">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full">
              View current openings
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="hidden md:block absolute right-0 top-0 bottom-0">
          <Image
            src={coin2}
            alt="Plant growing from coins"
            width={300}
            height={400}
            className="object-contain h-full w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <BoughServices />
      </section>

      {/* Featured Case Studies */}
      <div className="mx-auto" style={{ width: "70rem", maxWidth: "100%" }}>
        <CaseStudies />
      </div>
    </section>
  );
}
