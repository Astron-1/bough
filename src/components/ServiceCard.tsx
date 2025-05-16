import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  image: StaticImageData;
  serviceType: string;
  position?: "left" | "right";
}

export default function ServiceCard({
  image,
  serviceType,
  position = "left",
}: ServiceCardProps) {
  return (
    <Link className="w-full block" href={"/services/" + serviceType}>
      <motion.div
        whileHover={{
          scale: 1.04,
          boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 12,
          mass: 0.5,
        }}
        className={`relative h-[180px] sm:h-[220px] md:h-[270px] 2xl:h-[380px] 2xl:w-[130%] 4xl:h-[400px] 5xl:h-[600px] 5xl:w-[80%] overflow-hidden bg-gray-200 ${
          position === "left"
            ? "rounded-tr-[20px] rounded-br-[20px]"
            : "rounded-tl-[20px] rounded-bl-[20px]"
        }`}
        style={{
          backgroundImage: `url(${image.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "transform, box-shadow",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

        <Text
          type={Font.GARAMOND}
          className="absolute bottom-6 left-6 text-white text-4xl sm:text-5xl md:text-6xl font-bold"
        >
          {serviceType}
        </Text>
      </motion.div>
    </Link>
  );
}
