import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import Text, { Font } from "./Text";
import BackgroundPattern from "./BackgroundPattern";

export default function Hero() {
  return (
    <section
      className="relative bg-white text-black w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-20"
      id="hero-section"
    >
      <BackgroundPattern />

      <div className="relative z-40 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium  leading-tight tracking-tight">
            <Text type={Font.GARAMOND} className="-mt-32">
              <span className="">We co-create</span> <br />
              <span className="">transformative solutions</span>
            </Text>
          </h1>

          <Text>
            <h4 className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-gray-600 leading-snug">
              <span className="block">Embracing change,</span>
              <span className="block">elevating performance</span>
            </h4>
          </Text>
        </div>

        {/* DNA-style image placeholder could be added here */}

        <Button href="/connect" className="mt-10">
          <Text>
            <ShinyText
              text="Connect"
              speed={3}
              className="font-medium text-sm sm:text-base md:text-lg"
            />
          </Text>
        </Button>
      </div>
    </section>
  );
}
