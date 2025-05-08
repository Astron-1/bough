import Image, { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";

interface BottomCTAInterface {
  content: string;
  backgroundImage: string | StaticImageData;
  buttonText?: string;
  className?: string;
}

export default function BottomSection({
  content,
  backgroundImage,
  buttonText,
  className,
}: BottomCTAInterface) {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden min-h-[400px] py-24">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="bottom image"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay Content */}
      <div className="z-10 flex flex-col justify-center items-center space-y-4 px-6 py-16 text-center">
        <Text
          type={Font.GARAMOND}
          className={"text-white text-3xl md:text-5xl font-bold " + className}
        >
          {content}
        </Text>

        <Button href="/connect" className="outline-1 px-7 mt-8">
          <ShinyText text={buttonText || "Connect"} speed={3} />
        </Button>
      </div>
    </div>
  );
}
