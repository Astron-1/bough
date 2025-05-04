import Image from "next/image";
import Text, { Font } from "./Text";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";

export default function BottomSection() {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden min-h-[400px]">
      {/* Background Image */}
      <Image
        src="/bottomImage.png"
        alt="bottom image"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay Content */}
      <div className="z-10 flex flex-col justify-center items-center space-y-4 px-6 py-16 text-center">
        <Text className="text-white text-3xl md:text-5xl font-bold">
          Shape tomorrow,
        </Text>
        <Text
          type={Font.SOURCE_SANS}
          className="text-white text-3xl md:text-5xl font-bold"
        >
          Starting today
        </Text>

        <Button href="/connect" className="outline-1 px-7 mt-8">
          <ShinyText text="Connect" speed={3} />
        </Button>
      </div>
    </div>
  );
}
