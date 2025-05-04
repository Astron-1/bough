"use client";

import Header from "@app/components/Header";
import Text, { Font } from "@app/components/Text";
import { serviceContent } from "@app/lib/serviceContent";
import Image from "next/image";
import { useRouter } from "next/router";
import vector2 from "../../../public/boughVector2.png";

export default function ServicePage() {
  const router = useRouter();
  const { name } = router.query;
  let content;

  // Fix type error by ensuring name is a string and a valid key of serviceContent
  const serviceName = Array.isArray(name) ? name[0] : name;
  if (
    serviceName &&
    typeof serviceName === "string" &&
    serviceName in serviceContent
  ) {
    content = serviceContent[serviceName as keyof typeof serviceContent];
  }

  if (!content) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white px-4 md:px-12 lg:px-32 py-12 space-y-24 overflow-hidden min-h-screen">
      {/* Background Vector Image - Full Width */}
      <div className="absolute inset-0 w-screen h-full z-0 opacity-20">
        <Image
          src={vector2 || "/placeholder.svg"}
          alt="Decorative background pattern"
          className="object-cover"
          fill
          priority
          quality={50}
          style={{
            objectPosition: "center",

            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
          }}
        />
      </div>

      {/* Content with higher z-index to appear above the background */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Header />

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12 md:mt-24">
          {/* Left Image - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-1/4">
            <div className="w-full aspect-square bg-gray-200 rounded-xl" />
          </div>

          {/* Center Text */}
          <div className="text-center w-full md:w-2/4 space-y-4 px-4">
            <Text
              type={Font.SOURCE_SANS}
              className="text-blue-900 text-sm font-semibold"
            >
              {content?.topHeading}
            </Text>
            <Text
              type={Font.GARAMOND}
              className="text-3xl md:text-5xl font-bold text-black"
            >
              {serviceName}
            </Text>
            <Text type={Font.SOURCE_SANS} className="text-gray-700 text-base">
              {content?.topSubHeading}
            </Text>
          </div>

          {/* Right Image - Hidden on mobile */}
          <div className="hidden md:block w-full md:w-1/4">
            <div className="w-full aspect-square bg-gray-200 rounded-xl" />
          </div>
        </section>

        {/* The Bough Way */}
        <section className="grid md:grid-cols-2 gap-8 md:gap-12 mt-16 md:mt-24">
          <div>
            <Text
              type={Font.GARAMOND}
              className="text-2xl md:text-3xl font-semibold text-black"
            >
              {content.body?.heading1}
            </Text>
          </div>
          <div className="space-y-4">
            <Text
              type={Font.SOURCE_SANS}
              className="font-bold text-black text-lg"
            >
              {content.body?.contentHeading1}
            </Text>
            <Text type={Font.SOURCE_SANS} className="text-gray-700">
              {content.body?.contentHeading2}
            </Text>
          </div>
        </section>

        {/* Our Offerings */}
        <section className="space-y-8 mt-16 md:mt-24">
          <div className="grid md:grid-cols-2 gap-8">
            <Text
              type={Font.GARAMOND}
              className="text-2xl md:text-3xl font-semibold text-black"
            >
              Our offerings
            </Text>
            <Text type={Font.SOURCE_SANS} className="text-gray-700">
              {Array.isArray(content.body?.offerings)
                ? content.body?.offerings.join(", ")
                : content.body?.offerings}
            </Text>
          </div>

          {/* Accordions */}
          <div className="space-y-4 w-full md:w-3/4 lg:w-1/2 ml-auto">
            <div className="bg-blue-100 rounded-lg p-4 md:p-6 hover:bg-blue-200 transition-colors duration-200">
              <Text type={Font.SOURCE_SANS} className="font-semibold text-lg">
                Technical accounting and new standard implementation
              </Text>
              <Text
                type={Font.SOURCE_SANS}
                className="text-sm text-gray-700 mt-2"
              >
                Navigate complex accounting standards with confidence. We
                provide expert guidance on technical accounting issues and new
                regulations, ensuring precise and compliant financial reporting
              </Text>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 hover:bg-blue-100 transition-colors duration-200">
              <Text type={Font.SOURCE_SANS} className="font-semibold text-lg">
                Revenue recognition and assurance
              </Text>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 hover:bg-blue-100 transition-colors duration-200">
              <Text type={Font.SOURCE_SANS} className="font-semibold text-lg">
                Accounting process improvement and optimization
              </Text>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 md:p-6 hover:bg-blue-100 transition-colors duration-200">
              <Text type={Font.SOURCE_SANS} className="font-semibold text-lg">
                Budgeting, forecasting, & modelling
              </Text>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="flex justify-center mt-16 md:mt-24">
          <section className="text-center border border-dashed border-gray-300 rounded-xl p-6 md:p-8 w-full md:w-3/4 lg:w-2/3">
            <Text
              type={Font.GARAMOND}
              className="text-xl md:text-2xl font-semibold text-black my-8 md:my-10"
            >
              Craft nimble accounting solutions that adapt to the standards and
              your business, alike
            </Text>
          </section>
        </section>
      </div>
    </section>
  );
}
