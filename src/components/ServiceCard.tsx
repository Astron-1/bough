import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";

interface ServiceCardProps {
  image: StaticImageData;
  serviceType: string;
}

export default function ServiceCard({ image, serviceType }: ServiceCardProps) {
  return (
    <div
      className="relative group w-full h-[200px] md:w-[1000px] md:h-[270px] rounded-br-lg"
      style={{
        backgroundImage: `url(${image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
      <Text
        type={Font.GARAMOND}
        className="absolute bottom-1 left-2 text-white text-6xl"
      >
        {serviceType}
      </Text>
    </div>
  );
}
