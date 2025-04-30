import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import Text, { Font } from "./Text";
import BackgroundPattern from "./BackgroundPattern";

export default function Hero() {
  return (
    <section
      className="relative bg-white text-black w-full h-screen flex items-center justify-center overflow-hidden p-0 m-0"
      id="hero-section"
    >
      <BackgroundPattern />

      <Text type={Font.GARAMOND}>
        <div className="relative z-40 w-full px-4 flex flex-col items-center text-center -mt-40 md:-mt-56">
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
              <span>We co-create</span>
              <br className="hidden sm:block" />
              <span>transformative solutions</span>
            </h1>

            <Text>
              <h4 className="text-base sm:text-lg md:text-xl">
                <span>Embracing change,</span>
                <br />
                <span>elevating performance</span>
              </h4>
            </Text>
          </div>

          {/* DNA-style image placeholder */}

          <Button
            href="#connect"
            className="bg-[#0052FF] mt-10 px-10 sm:px-12 py-3 rounded-full text-black font-medium hover:bg-[#0040CC] transition-colors z-10"
          >
            <Text>
              <ShinyText text="Connect" speed={3} className="font-medium" />
            </Text>
          </Button>
        </div>
      </Text>
    </section>
  );
}
