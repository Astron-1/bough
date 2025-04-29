import Header from "@app/components/Header";
import Text, { Font } from "@app/components/Text";

export default function AccountingPage() {
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
            Record, recognize, and report, confidently
          </Text>
          <Text
            type={Font.GARAMOND}
            className="text-4xl text-black md:text-5xl font-bold"
          >
            Accounting
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700 text-base">
            Modern accounting challenges demand agility, precision, and
            strategic foresight. Our Accounting Advisory services integrate
            finance and accounting operations, navigate complex regulatory
            landscapes, and implement best practices that drive financial
            clarity and operational excellence.
          </Text>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/4">
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
            The Bough way’s Accounting
          </Text>
        </div>
        <div className="space-y-4">
          <Text type={Font.SOURCE_SANS} className="font-bold text-black">
            We dive deep into your toughest accounting challenges, offering
            hands-on expertise to ensure your finance and accounting operations
            run smoothly and with integrity.
          </Text>
          <Text type={Font.SOURCE_SANS} className="text-gray-700">
            From implementing complex accounting standards to managing risks and
            uncertainties, we don’t just consult—we roll up our sleeves and work
            alongside you. Our goal is straightforward: to handle the
            complexities of accounting and regulations so you can stay focused
            on confidently moving your business forward.
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
            Our specialized services are designed for CFOs, CAOs, and Corporate
            Controllers, addressing your most pressing challenges and unlocking
            your organization’s full financial potential
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
