import Header from "@app/components/Header";
import Text, { Font } from "@app/components/Text";
import { serviceContent } from "@app/lib/serviceContent";
import Image from "next/image";
import { useRouter } from "next/router";
import vector2 from "../../../public/boughVector2.png";

export default function AccountingPage() {
  const router = useRouter();
  const { name } = router.query;
  let content;
  if (name) content = serviceContent[name];
  if (!content) {
    return null;
  }

  return (
    <section className=" bg-gradient-to-b from-blue-50 to-white px-4 md:px-12 lg:px-32 py-12 space-y-24">
      <Header />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Image */}
        <div className="w-full md:w-1/4">
          {/* Replace src below with actual image */}
          <div className="w-full h-60 bg-gray-200 rounded-xl" />
        </div>

        {/* Center Text */}
        <div className="text-center md:w-2/4 space-y-4">
          <Text
            type={Font.SOURCE_SANS}
            className="text-blue-900 text-sm font-semibold"
          >
            {content?.topHeading}
          </Text>
          <Text
            type={Font.GARAMOND}
            className="text-4xl text-black md:text-5xl font-bold"
          >
            {name}
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700 text-base">
            {content?.topSubHeading}
          </Text>
        </div>
        <div className="absolute hidden md:block  md:w-full md:h-[1000px] z-0">
          <Image
            src={vector2}
            alt="DNA visual placeholder"
            className="object-cover absolute mt-44 mr-32 -ml-32"
            fill
            priority
          />
        </div>
        {/* Right Image */}
        <div className="w-full md:w-1/4 z-1">
          {/* Replace src below with actual image */}
          <div className="w-full h-60 bg-gray-200 rounded-xl" />
        </div>
      </section>

      {/* The Bough Way */}
      <section className="grid md:grid-cols-2 gap-12">
        <div>
          <Text
            type={Font.GARAMOND}
            className="text-2xl font-semibold text-black"
          >
            {content.body?.heading1}
          </Text>
        </div>
        <div className="space-y-4">
          <Text type={Font.SOURCE_SANS} className="font-bold text-black">
            {content.body?.contentHeading1}
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700">
            {content.body?.contentHeading2}
          </Text>
        </div>
      </section>

      {/* Our Offerings */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Text
            type={Font.GARAMOND}
            className="text-2xl font-semibold text-black"
          >
            Our offerings
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700">
            {content.body?.offerings}
          </Text>
        </div>

        {/* Accordions (UI Placeholder) */}
        <div className="space-y-4 right-0 w-1/2">
          <div className="bg-blue-100 rounded-lg p-4">
            <Text type={Font.SOURCE_SANS} className="font-semibold">
              Technical accounting and new standard implementation
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-sm text-gray-700 mt-1"
            >
              Navigate complex accounting standards with confidence. We provide
              expert guidance on technical accounting issues and new
              regulations, ensuring precise and compliant financial reporting
            </Text>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <Text type={Font.SOURCE_SANS} className="font-semibold">
              Revenue recognition and assurance
            </Text>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <Text type={Font.SOURCE_SANS} className="font-semibold">
              Accounting process improvement and optimization
            </Text>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <Text type={Font.SOURCE_SANS} className="font-semibold">
              Budgeting, forecasting, & modelling
            </Text>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-row justify-center">
        <section className="text-center border border-dashed border-gray-300 rounded-xl p-8 w-[70%]">
          <Text
            type={Font.GARAMOND}
            className="text-xl font-semibold text-black m-10"
          >
            Craft nimble accounting solutions that adapt to the standards and
            your business, alike
          </Text>
        </section>
      </section>
    </section>
  );
}
