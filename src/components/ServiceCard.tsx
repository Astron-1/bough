import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Link from "next/link";

interface ServiceCardProps {
  image: StaticImageData;
  serviceType: string;
}

export default function ServiceCard({ image, serviceType }: ServiceCardProps) {
  return (
    <Link className="w-full px-4" href={"/services/" + serviceType}>
      <div
        className="relative group h-[180px] sm:h-[220px] md:h-[270px] rounded-2xl overflow-hidden bg-gray-200"
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Text */}
        <Text
          type={Font.GARAMOND}
          className="absolute bottom-4 left-4 text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          {serviceType}
        </Text>
      </div>
    </Link>
  );
}
