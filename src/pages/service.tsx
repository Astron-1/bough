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
import ShinyText from "@app/components/ui/ShinyText";

export default function ServicesPage() {
  return (
    <section className=" bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      <Header />

      <section className="md:h-screen relative w-full px-4 py-16 md:py-24 flex flex-col md:flex-row items-center justify-center">
        {/* Decorative Background Path */}
        <div
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{
            zIndex: 0,
            top: "200px",
            height: "calc(100% - 200px)",
            opacity: 0.4,
          }}
        >
          <svg
            width="150%"
            height="3000"
            viewBox="0 0 1720 3000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginLeft: "-10%" }}
          >
            <path
              opacity="0.2"
              d="M-250 460C-112.5 671.999 356.8 685.899 1250 431.4995C2100 177.1 1300 1143.5 638 1389.5C-218.5 1910.5 219.4 3345.9 683 3423.5"
              stroke="#6fa3e1"
              strokeWidth="200"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

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
            creating long-term value and sustainable solutions
          </Text>

          <div className="text-center flex-row flex justify-center">
            <Button href="/connect" className="px-7">
              <ShinyText text="Connect" speed={3} />
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
            className="h-screen object-contain w-auto"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16" id="serviceslist">
        <BoughServices servicePage />
      </section>

      {/* Featured Case Studies */}
      <div className="relative w-full overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 mb-16">
          <h2 className="text-center text-black text-[2.5rem] font-semibold leading-[2.5rem]">
            <Text type={Font.GARAMOND}>Highlights of our work</Text>
          </h2>
        </div>
        <div className="container-fluid">
          <div className="relative md:pr-0">
            <div className="ml-auto md:w-[95%] lg:w-[90%] xl:w-[85%]">
              <CaseStudyCarousel />
            </div>
          </div>
        </div>
      </div>
      <BottomSection
        content="Let's drive outcomes by crafting changes for a meaningful tomorrow, now"
        backgroundImage={serviceCTA}
        className="px-4 md:px-12 lg:px-32 text-xl md:text-2xl lg:text-3xl"
      />
    </section>
  );
}
