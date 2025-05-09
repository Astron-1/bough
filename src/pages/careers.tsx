import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Text, { Font } from "@app/components/Text";
import BottomSection from "@app/components/BottomSection";
import careerCTA from "../../public/careersCTA.png";
import Button from "@app/components/ui/Button";

export default function Careers() {
  const hiringProcedure = [
    {
      step: "01",
      title: "Application Submission",
      description:
        "The first step is to submit your application through our careers portal. Our team conducts a thorough evaluation to identify the best potential matches. We carefully review each application to shortlist candidates whose skills and experiences align closely with the role's requirements",
    },
    {
      step: "02",
      title: "Video Introduction",
      description:
        "After your application is shortlisted, you'll be asked to record a brief 3-5 minute video introduction. In this video, tell us about yourself, your journey so far, and why you're excited about this opportunity. We value authenticity over perfection, so just be yourself.",
    },
    {
      step: "03",
      title: "Assessment",
      description:
        "Depending on the role, you may be asked to complete an assessment that demonstrates your skills and problem-solving abilities. This assessment could include tasks, case studies, or projects designed to gauge your suitability for the position.",
    },
    {
      step: "04",
      title: "Interview",
      description:
        "Selected candidates are invited for virtual and in-person interviews tailored to the specific role. During these interviews, you'll have the opportunity to showcase your strengths, discuss your experiences, and learn more about our company culture and values. Our interview process may include multiple rounds to ensure a comprehensive evaluation.",
    },
  ];

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-[#F8FBFF]">
        <Header />

        {/* Background Wave - positioned to span across hero and part of content */}
        <div className="absolute h-[100px] overflow-visible w-full pt-120 pb-36">
          <div
            className="absolute w-[105%] h-full top-30 z-0 "
            style={{ transform: "rotate(-15deg)" }}
          >
            <Image
              src="/about-us/herosection.svg"
              alt="Wave background"
              fill
              priority
              className="object-cover object-center opacity-15"
            />
          </div>
        </div>

        {/* Hero section */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-40">
          {/* Blur shapes */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <Image
              src="/careerVector.svg"
              alt="Decorative vector background"
              width={200}
              height={200}
              className="w-screen -mt-32 "
              priority
            />
          </div>
          <div className="absolute w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] md:w-[496px] md:h-[594px] -left-[100px] sm:-left-[150px] md:-left-[197px] top-[100px] sm:top-[150px] md:top-[192px] bg-blue-600/30 rounded-full blur-[150px] sm:blur-[200px] md:blur-[312px]" />
          <div className="absolute w-[200px] h-[300px] sm:w-[300px] sm:h-[400px] md:w-[493px] md:h-[590px] -right-[50px] sm:right-0 top-[80px] sm:top-[100px] md:top-[157px] bg-blue-600/30 rounded-full blur-[150px] sm:blur-[200px] md:blur-[312px]" />

          {/* Mobile Images */}
          <div className="md:hidden w-full h-[200px] absolute left-0 top-[50px] overflow-hidden">
            <Image
              src="/career-1.png"
              alt="City skyline"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Desktop Images */}
          <div className="hidden md:block absolute w-full md:w-96 h-96 left-0 top-[10px] overflow-hidden">
            <Image
              src="/career-1.png"
              alt="City skyline"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="hidden md:block absolute w-full md:w-96 h-96 right-0 top-[326px] overflow-hidden">
            <Image
              src="/career-2.png"
              alt="City skyline"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <Text
                type={Font.GARAMOND}
                className='font-["EB_Garamond"] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6 text-black'
              >
                Thinking about
                <br />
                joining Bough?
              </Text>
              <Text className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-black">
                Engage, experience,
                <br />
                and elevate your career
              </Text>
              <Link
                href="https://bough.keka.com/careers/"
                target="_blank"
                className=""
              >
                <Button>View current openings</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Visual spacer to transition between hero and content */}
        <div className="h-16 md:h-32 relative z-0"></div>

        {/* Decorative Background Path */}
        <div
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{
            zIndex: 0,
            top: "600px",
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

        {/* The Bough Way Section */}
        <section className="pt-20 sm:pt-32 md:pt-60 pb-12 md:py-24 relative z-10">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 sm:gap-12">
            <div className="lg:w-1/3">
              <Text
                type={Font.GARAMOND}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-black"
              >
                The Bough way
              </Text>
            </div>
            <div className="lg:w-2/3 space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-black leading-relaxed">
              <Text>
                At Bough, we&apos;re not your typical 9 to 5 job. We focus on
                value-driven, cutting-edge work, offering flexibility,
                discipline, and balance so you can thrive both professionally
                and personally.
              </Text>
              <Text>
                From day one, everyone at Bough is an owner. We empower our team
                members, helping them realize their potential. Our
                non-hierarchical approach ensures everyone has a voice in taking
                us to new heights.
              </Text>
              <Text>
                Our mission goes beyond business; it&apos;s about becoming
                better humans. We create a humane and happy workspace where
                growth, creativity, passion, and success flourish.
              </Text>
            </div>
          </div>
        </section>

        {/* Team Image */}
        <section className="py-8 sm:py-12 md:py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] relative rounded-lg overflow-hidden">
              <Image
                src="/careerbough.png"
                alt="Bough team members collaborating"
                fill
                className="object-cover min-w-full"
                priority
              />
            </div>
          </div>
        </section>

        {/* Hiring Process Section */}
        <section className="py-12 sm:py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <Text
              type={Font.GARAMOND}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 sm:mb-12 text-black"
            >
              Hiring process
            </Text>
            <div className="grid sm:grid-cols-2 gap-x-6 sm:gap-x-12 gap-y-10 sm:gap-y-16">
              {hiringProcedure.map(({ step, title, description }) => (
                <div key={step} className="flex flex-col">
                  <span className="text-zinc-400 text-xl sm:text-2xl md:text-3xl font-semibold mb-1">
                    {step}.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-3 sm:mb-4" />
                  <Text className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-black">
                    {title}
                  </Text>
                  <Text className="text-base sm:text-lg md:text-xl leading-relaxed text-black">
                    {description}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </section>

        <BottomSection
          content="Set to thrive in, your future?"
          backgroundImage={careerCTA}
          buttonText="View current openings"
          className=""
        />
      </section>
    </>
  );
}
