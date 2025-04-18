import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import Text, { Font } from "./Text";
import Image from "next/image";
import BackgroundPattern from "./BackgroundPattern";

export default function Hero() {
  const titleStyle = {
    textAlign: "center" as const,
    fontSize: "4rem",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "4.375rem",
    margin: "0 auto",
  };

  return (
    <section
      className=" bg-white text-black relative w-full flex flex-col items-center h-screen justify-center overflow-hidden p-0 m-0"
      id="hero-section"
    >
      <BackgroundPattern />

      <Text type={Font.GARAMOND}>
        <div className="text-center w-full px-4 relative z-40 flex flex-col items-center -mt-56">
          <div className="flex-row justify-between flex"></div>
          <div className="flex flex-col gap-4 z-10">
            <h1 style={titleStyle} className="flex flex-col items-center gap-2">
              <span>We co-create</span>
              <span>transformative solutions</span>
            </h1>
            <Text>
              <h4 style={{ fontFamily: "font-sans" }}>
                <span>Embracing change,</span>
                <br />
                <span>elevating performance</span>
              </h4>
            </Text>
          </div>

          <Button
            href="#connect"
            className="bg-[#0052FF] mt-10 px-12 py-3 rounded-full text-black font-medium hover:bg-[#0040CC] transition-colors z-10"
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
