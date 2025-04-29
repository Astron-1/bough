"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Text, { Font } from "@app/components/Text";

export default function Careers() {
  return (
    <>
      <Head>
        <title>Careers | Bough Consulting</title>
        <meta
          name="description"
          content="Join the Bough team. We offer value-driven work with flexibility, discipline, and balance."
        />
      </Head>

      <div className="relative min-h-screen overflow-hidden bg-[#F8FBFF]">
        <Header />

        {/* Hero section with background shapes and CTA */}
        <section className="relative pt-20 pb-32 md:pt-32 md:pb-40">
          {/* Background blur shapes */}
          <div className="absolute w-[496px] h-[594px] -left-[197px] top-[192px] bg-blue-600/30 rounded-full blur-[312px]" />
          <div className="absolute w-[493px] h-[590px] right-0 top-[157px] bg-blue-600/30 rounded-full blur-[312px]" />

          {/* Left city image */}
          <div className="absolute w-full md:w-96 h-96 left-0 top-[186px] overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/bottomImage.png"
                alt="City skyline"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right city image */}
          <div className="absolute w-full md:w-96 h-96 right-0 top-[326px] overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/insightheroImage.jpg"
                alt="City skyline"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Main content */}
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

        <div className="relative mt-12">
          {/* SVG Background - positioned to match Figma design */}
          <div
            className="absolute left-0 w-full overflow-visible pointer-events-none"
            style={{
              zIndex: 0,
              top: "280px",
              height: "calc(100% - 200px)",
            }}
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

          {/* The Bough Way section */}
          <section
            className="pt-24 pb-16 md:pt-32 md:py-24 relative"
            style={{ zIndex: 1 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="lg:w-1/3">
                  <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-black">
                    The Bough way
                  </h2>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-lg md:text-xl leading-relaxed mb-6 text-black">
                    At Bough, we&apos;re not your typical 9 to 5 job. We focus
                    on value-driven, cutting-edge work, offering flexibility,
                    discipline, and balance so you can thrive both
                    professionally and personally.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed mb-6 text-black">
                    From day one, everyone at Bough is an owner. We empower our
                    team members, helping them realize their potential. Our
                    non-hierarchical approach ensures everyone has a voice in
                    taking us to new heights.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    Our mission goes beyond business; it&apos;s about becoming
                    better humans. We create a humane and happy workspace where
                    growth, creativity, passion, and success flourish. Diverse
                    talents come together at Bough to deliver collective good,
                    with every employee playing a crucial role in shaping a
                    trusting and an inspiring work environment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team image section */}
          <section className="py-12 md:py-16 relative" style={{ zIndex: 1 }}>
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

          {/* Hiring process section */}
          <section className="py-16 md:py-24 relative" style={{ zIndex: 1 }}>
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-black">
                Hiring process
              </h2>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                {/* Step 1 */}
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-2xl md:text-3xl font-semibold mb-1">
                    01.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-4"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
                    Application Submission
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    The first step is to submit your application through our
                    careers portal. Our team conducts a thorough evaluation to
                    identify the best potential matches. We carefully review
                    each application to shortlist candidates whose skills and
                    experiences align closely with the role&apos;s requirements.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-2xl md:text-3xl font-semibold mb-1">
                    02.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-4"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
                    Video Introduction
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    After your application is shortlisted, you&apos;ll be asked
                    to record a brief 3-5 minute video introduction. In this
                    video, tell us about yourself, your journey so far, and why
                    you&apos;re excited about this opportunity. We value
                    authenticity over perfection, so just be yourself.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-2xl md:text-3xl font-semibold mb-1">
                    03.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-4"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
                    Assessment
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    Depending on the role, you may be asked to complete an
                    assessment that demonstrates your skills and problem-solving
                    abilities. This assessment could include tasks, case
                    studies, or projects designed to gauge your suitability for
                    the position.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col">
                  <span className="text-zinc-400 text-2xl md:text-3xl font-semibold mb-1">
                    04.
                  </span>
                  <div className="w-full h-px bg-zinc-400 mb-4"></div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black">
                    Interview
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-black">
                    Selected candidates are invited for virtual and in-person
                    interviews tailored to the specific role. During these
                    interviews, you&apos;ll have the opportunity to showcase
                    your strengths, discuss your experiences, and learn more
                    about our company culture and values. Our interview process
                    may include multiple rounds to ensure a comprehensive
                    evaluation.
                  </p>
                </div>
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
        </div>

        {/* Footer with higher z-index to hide SVG */}
        <div
          className="relative"
          style={{ zIndex: 10, position: "relative", backgroundColor: "black" }}
        >
          <Footer />
        </div>
      </div>
    </>
  );
}
