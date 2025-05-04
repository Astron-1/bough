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
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 sm:px-8 md:px-12 lg:px-32 space-y-24">
        <Header />
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 relative py-12">
          {/* Left Image */}
          <div className="w-full md:w-1/4 h-[200px] sm:h-[250px] md:h-[300px] relative">
            <Image
              src={content.heroImage}
              alt="heroImage left"
              className="h-full w-full object-cover hidden md:block"
              style={{ clipPath: "inset(0 50% 0 0)" }}
              width={400}
              height={400}
            />
            <Image
              src={content.heroImage}
              alt="heroImage left"
              className="h-full w-full object-cover block md:hidden"
              width={400}
              height={400}
            />
          </div>

          {/* Center Text */}
          <div className="text-center md:w-2/4 space-y-4 z-10 px-2">
            <Text
              type={Font.SOURCE_SANS}
              className="text-blue-900 text-xs sm:text-sm font-semibold"
            >
              {content?.topHeading}
            </Text>
            <Text
              type={Font.GARAMOND}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-black"
            >
              {serviceName}
            </Text>
            <Text
              type={Font.SOURCE_SANS}
              className="text-gray-700 text-sm sm:text-base"
            >
              {content?.topSubHeading}
            </Text>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/4 h-[200px] sm:h-[250px] md:h-[300px] relative hidden md:block">
            <Image
              src={content.heroImage}
              alt="heroImage right"
              className="h-full w-full object-cover hidden md:block"
              style={{ clipPath: "inset(0 0 0 50%)" }}
              width={400}
              height={400}
            />
          </div>
        </section>

        {/* The Bough Way */}
        <section className="text-center ">
          <div className="space-y-4 px-4 sm:px-12 md:px-24 lg:px-32 mt-32">
            <Text
              type={Font.SOURCE_SANS}
              className="font-bold text-lg sm:text-xl md:text-2xl text-black"
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

        {/* Our Offerings */}
        <section className="space-y-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          <div className="space-y-4 w-full md:w-1/2 ml-auto">
            {content.body?.offerings.sections?.map((item, index) => (
              <details
                key={index}
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
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
      </section>
      <section className="w-full px-4 sm:px-8 py-10 flex flex-col items-center justify-center bg-gradient-to-r from-[#13294C] to-[#1043e8] relative">
        <Image
          src={vector2}
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
      </section>
    </section>
  );
}
