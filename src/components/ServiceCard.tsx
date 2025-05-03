import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Link from "next/link";

interface ServiceCardProps {
  image: StaticImageData;
  serviceType: string;
  position?: "left" | "right";
}

export default function ServiceCard({ image, serviceType, position = "left" }: ServiceCardProps) {
  return (
    <Link className="w-full block" href={"/services/" + serviceType}>
      <div
        className={`relative h-[180px] sm:h-[220px] md:h-[270px] overflow-hidden bg-gray-200 ${
          position === "left" 
            ? "rounded-tr-[20px] rounded-br-[20px]" 
            : "rounded-tl-[20px] rounded-bl-[20px]"
        }`}
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

        {/* Text */}
        <Text
          type={Font.GARAMOND}
          className="absolute bottom-6 left-6 text-white text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          {serviceType}
        </Text>
      </div>
    </Link>
  );
}
