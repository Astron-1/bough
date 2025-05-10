"use client";

import Header from "@app/components/Header";
import Text, { Font } from "@app/components/Text";
import { serviceContent } from "@app/lib/serviceContent";
import Image from "next/image";
import { useRouter } from "next/router";
import vector2 from "../../../public/boughVector2.png";
import careerCTA from "../../../public/serviceCTA.png";
import BottomSection from "@app/components/BottomSection";
import CaseStudyCarousel from "@app/components/CaseStudyCarousel";
import { motion } from "framer-motion";

export default function ServicePage() {
  const router = useRouter();
  const { name } = router.query;
  let content;

  const serviceName = Array.isArray(name) ? name[0] : name;
  if (
    serviceName &&
    typeof serviceName === "string" &&
    serviceName in serviceContent
  ) {
    content = serviceContent[serviceName as keyof typeof serviceContent];
  }

  if (!content) {
    return (
      <>
        <Header />

        <section className=" flex items-center justify-center bg-white px-4 py-12">
          <div className="text-center space-y-4">
            <Text
              type={Font.GARAMOND}
              className="text-6xl font-bold text-blue-900"
            >
              404
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-2xl text-gray-800 font-semibold"
            >
              Service not found
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-gray-600 max-w-md mx-auto"
            >
              {
                "The service you're looking for doesn’t exist or may have been removed. Please check the URL or return to the home page."
              }
            </Text>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Go back home
            </button>
          </div>
        </section>
      </>
    );
  }

  return (
    <section>
      <section className=" bg-gradient-to-b from-blue-50 to-white overflow-hidden">
        <Header transparent />
        <div className="w-full mb-8 md:hidden">
          <Image
            src={content.heroImage || "/placeholder.svg"}
            alt="heroImage mobile full"
            className="w-full h-48 object-cover "
            width={1000}
            height={400}
          />
        </div>

        <section className="md:h-screen relative w-full px-4 py-16 md:py-24 md:-mt-24 flex flex-col-reverse  items-center justify-center">
          <Image
            src={content?.heroImage}
            fill
            priority
            alt="Hero"
            className="w-full h-screen hidden md:block"
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 md:bg-white/85 md:rounded-lg w-full max-w-3xl text-center p-6 md:p-12 space-y-4"
          >
            <Text
              type={Font.GARAMOND}
              className="text-[#1043E8] text-sm sm:text-lg font-semibold"
            >
              {content?.topHeading}
            </Text>
            <Text
              type={Font.GARAMOND}
              className="text-4xl text-black md:text-5xl font-bold"
            >
              {serviceName}
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-black max-w-2xl mx-auto"
            >
              {content?.topSubHeading}
            </Text>
          </motion.div>
        </section>

        <section className="text-center">
          <div className="space-y-4 px-4 sm:px-12 md:px-24 lg:px-32 mt-10 md:mt-32">
            <Text
              type={Font.SOURCE_SANS}
              className="text-lg sm:text-xl md:text-2xl text-black"
            >
              {content.body?.contentHeading1}
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-gray-700 text-sm sm:text-base"
            >
              {content.body?.contentHeading2}
            </Text>
          </div>
        </section>

        <section className="space-y-8 mb-10 mt-20 px-10 md:px-20">
          <div className="md:flex md:justify-between md:items-start gap-10">
            <div className="space-y-6 md:w-1/3">
              <Text
                type={Font.GARAMOND}
                className="text-3xl md:text-4xl font-semibold text-black"
              >
                Our offerings
              </Text>
              <Text
                type={Font.SOURCE_SANS}
                className="text-gray-700 text-sm sm:text-base"
              >
                {content.body?.offerings.subheading}
              </Text>
            </div>

            <div className="space-y-4 w-full md:w-1/2 mt-8 md:mt-0">
              {content.body?.offerings.sections?.map((item, index) => (
                <motion.details
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-blue-50 rounded-lg p-4 group open:bg-blue-100 transition-all duration-200"
                >
                  <summary className="font-semibold cursor-pointer text-black flex justify-between items-center marker:hidden">
                    <Text type={Font.SOURCE_SANS}>{item.heading}</Text>
                    <svg
                      className="w-4 h-4 ml-2 transition-transform duration-200 transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                  <div className="mt-2 text-sm text-gray-700">
                    <Text type={Font.SOURCE_SANS}>{item.content}</Text>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full px-4 sm:px-8 py-10 flex flex-col items-center justify-center bg-gradient-to-r from-[#13294C] to-[#1043e8] relative"
      >
        <Image
          src={vector2 || "/placeholder.svg"}
          alt="vector decoration"
          className="absolute top-0 right-0 w-24 opacity-20"
          width={150}
          height={150}
        />
        <Text
          type={Font.GARAMOND}
          className="text-white p-10 text-xl sm:text-2xl md:text-3xl font-semibold text-center"
        >
          {content.bottomText}
        </Text>
      </motion.section>

      <CaseStudyCarousel />
      <BottomSection
        content="Let's drive outcomes by crafting changes for a meaningful tomorrow, now"
        backgroundImage={careerCTA}
        className="px-4 md:px-12 lg:px-32"
      />
    </section>
  );
}
