import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import BoughServices from "@app/components/Services";
import coin1 from "../../public/service-hero-1.png";
import coin2 from "../../public/service-hero-2.png";
import Header from "@app/components/Header";
import BottomSection from "@app/components/BottomSection";
import serviceCTA from "../../public/serviceCTA.png";
import CaseStudyCarousel from "@app/components/CaseStudyCarousel";
import Button from "@app/components/ui/Button";

export default function ServicesPage() {
  return (
    <section className=" bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <Header />

      <section className="md:h-screen relative w-full px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center">
        {/* Left Image */}
        <div className="hidden lg:block absolute left-0 top-0 bottom-0 2xl">
          <Image
            src={coin1}
            alt="Plant growing from coins"
            width={300}
            height={400}
            className="h-screen object-contain w-auto"
          />
        </div>

        {/* Center Text */}
        <div className="w-full md:w-2/4 text-center py-12 z-10">
          <Text
            type={Font.GARAMOND}
            className="text-5xl text-black m-12 md:text-5xl font-bold mb-4"
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
          <div className="text-center flex-row flex justify-center">
            <Button href="#servicelist">
              <Text className="font-medium">View Services</Text>
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0">
          <Image
            src={coin2}
            alt="Plant growing from coins"
            width={500}
            height={400}
            className="h-screen object-contain w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" id="serviceslist">
        <BoughServices servicePage />
      </section>

      {/* Featured Case Studies */}
      <div className="" style={{ width: "70rem", maxWidth: "100%" }}>
        <CaseStudyCarousel />
      </div>
      <BottomSection
        content="Let's drive outcomes by crafting changes
for a meaningful tomorrow, now"
        backgroundImage={serviceCTA}
        className="px-32"
      />
    </section>
  );
}
