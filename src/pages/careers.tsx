import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

import Text, { Font } from "@app/components/Text";

// Custom Head Component since "next/head" can't be used in client components
const CustomHead = () => {
  React.useEffect(() => {
    document.title = "Careers | Bough Consulting";
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Join the Bough team. We offer value-driven work with flexibility, discipline, and balance.";
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null;
};

export default function Careers() {
  return (
    <>
      <CustomHead />

      <section className="relative min-h-screen overflow-hidden bg-[#F8FBFF]">
        <Header />

        {/* Hero section */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-40">
          {/* Blur shapes */}
          <div className="absolute w-[496px] h-[594px] -left-[197px] top-[192px] bg-blue-600/30 rounded-full blur-[312px]" />
          <div className="absolute w-[493px] h-[590px] right-0 top-[157px] bg-blue-600/30 rounded-full blur-[312px]" />

          {/* Left Image */}
          <div className="absolute w-full md:w-96 h-96 left-0 top-[10px] overflow-hidden">
            <Image
              src="/career-1.png"
              alt="City skyline"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Right Image */}
          <div className="absolute w-full md:w-96 h-96 right-0 top-[326px] overflow-hidden">
            <Image
              src="/career-2.png"
              alt="City skyline"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <Text
                type={Font.GARAMOND}
                className='font-["EB_Garamond"] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-black'
              >
                Thinking about
                <br />
                joining Bough?
              </Text>
              <p className='font-["Source_Sans_Pro"] text-lg md:text-xl mb-8 text-black'>
                Engage, experience,
                <br />
                and elevate your career
              </p>
              <Link
                href="/careers/openings"
                className="bg-blue-600 text-white font-semibold px-12 py-2.5 rounded-full hover:bg-blue-700 transition-colors"
              >
                View current openings
              </Link>
            </div>
          </div>
        </section>

        {/* Decorative Background Path */}
        <div
          className="absolute left-0 w-full overflow-visible pointer-events-none"
          style={{ zIndex: 0, top: "280px", height: "calc(100% - 200px)" }}
        >
          <svg
            width="100%"
            height="3000"
            viewBox="0 0 1440 3000"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M-112.5 60C-97.8333 271.999 356.8 285.899 1080 31.4995C1803.2 -222.899 1117 743.5 638 989.5C-218.5 1510.5 219.4 3345.9 683 3423.5"
              stroke="#6fa3e1"
              strokeWidth="200"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* The Bough Way Section */}
        <section className="pt-24 pb-16 md:pt-32 md:py-24 relative z-10">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <Text className="text-3xl md:text-4xl font-semibold mb-6 text-black ">
                The Bough way
              </Text>
            </div>
            <div className="lg:w-2/3 space-y-6 text-lg md:text-xl text-black leading-relaxed">
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
        <section className="py-12 md:py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="w-full h-[320px] md:h-[400px] relative rounded-lg overflow-hidden">
              <Image
                src="/corporate.jpg"
                alt="Bough team members collaborating"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Hiring Process Section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-black">
              Hiring process
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  step: "01",
                  title: "Application Submission",
                  description:
                    "Submit your application through our careers portal. We evaluate applications to shortlist candidates who align closely with the role.",
                },
                {
                  step: "02",
                  title: "Video Introduction",
                  description:
                    "Shortlisted applicants record a 3–5 min video introducing themselves, their journey, and excitement for the role.",
                },
                {
                  step: "03",
                  title: "Assessment",
                  description:
                    "Depending on the role, an assessment may be required — tasks, case studies, or projects to evaluate your skills.",
                },
                {
                  step: "04",
                  title: "Interview",
                  description:
                    "Selected candidates attend virtual/in-person interviews focused on skills, experience, and team fit.",
                },
              ].map(({ step, title, description }) => (
                <div key={step} className="flex flex-col">
                  <span className="text-zinc-400 text-2xl md:text-3xl font-semibold mb-1">
                    {step}.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-4" />
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
                    {title}
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA section */}
        <section className="relative overflow-hidden" style={{ zIndex: 1 }}>
          <div className="w-full h-[590px] relative bg-blue-700">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-600">
              <Image
                src="/corporate.jpg"
                alt="Corporate background"
                fill
                className="object-cover mix-blend-overlay opacity-30"
                priority
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h2 className='font-["EB_Garamond"] text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center mb-8 drop-shadow-md'>
                Set to thrive in
                <br />
                your future?
              </h2>
              <div>
                <Link
                  href="/careers/openings"
                  className="inline-block bg-transparent border-2 border-white text-white font-semibold px-12 py-2.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  View current openings
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
