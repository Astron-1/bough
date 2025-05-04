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
    <section className=" bg-gradient-to-b from-blue-50 to-white px-4 md:px-12 lg:px-32 py-12 space-y-24">
      <Header />
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Image */}

        {/* Replace src below with actual image */}
        <div className="w-full md:w-1/4 overflow-hidden relative h-[200px]">
          <Image
            src={content.heroImage}
            alt="heroImage top"
            width={400}
            height={400}
            className="object-cover object-top"
            style={{ clipPath: "inset(0 0 50% 0)" }}
          />
        </div>
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
            {serviceName}
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700 text-base">
            {content?.topSubHeading}
          </Text>
        </div>
        {/* Right Image: Bottom half */}
        <div className="w-full md:w-1/4 overflow-hidden relative h-[200px]">
          <Image
            src={content.heroImage}
            alt="heroImage bottom"
            width={400}
            height={400}
            className="object-cover object-bottom"
            style={{ clipPath: "inset(50% 0 0 0)" }}
          />
        </div>

        {/* Right Image: Bottom half */}

        {/* Center Text */}

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
        {/* Accordions (UI Placeholder) */}
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
              {content.body?.offerings.subheading}
            </Text>
          </div>

          {/* Dynamic Accordion */}
          <div className="space-y-4 right-0 w-1/2 ml-auto">
            {content.body?.offerings.sections?.map((item, index) => (
              <details
                key={index}
                className="bg-blue-50 rounded-lg p-4 group open:bg-blue-100 transition-all duration-200"
              >
                <summary className="font-semibold cursor-pointer text-black marker:text-blue-500">
                  <Text type={Font.SOURCE_SANS}>{item.heading}</Text>
                </summary>
                <div className="mt-2 text-sm text-gray-700">
                  <Text type={Font.SOURCE_SANS}>{item.content}</Text>
                </div>
              </details>
            ))}
          </div>
        </section>
      </section>

      {/* Final CTA */}
      <section className="flex flex-row justify-center">
        <section className="text-center border border-dashed border-gray-300 rounded-xl p-8 w-[70%]">
          <Text
            type={Font.GARAMOND}
            className="text-xl font-semibold text-black m-10"
          >
            {content.bottomText}
          </Text>
        </section>
      </section>
    </section>
  );
}
