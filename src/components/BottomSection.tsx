"use client";

import Image, { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { motion } from "framer-motion";

interface BottomCTAInterface {
  content: string;
  backgroundImage: string | StaticImageData;
  buttonText?: string;
  className?: string;
  href?: string;
}

export default function BottomSection({
  content,
  backgroundImage,
  buttonText,
  className,
  href,
}: BottomCTAInterface) {
  return (
    <div className="relative w-full flex items-center justify-center overflow-hidden py-24">
      {/* Background Image with fade-in */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <Image
          src={backgroundImage}
          alt="bottom image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </motion.div>

      {/* Overlay Content */}
      <motion.div
        className="z-10 flex flex-col justify-center items-center space-y-4  py-16 text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Text
          type={Font.GARAMOND}
          className={"text-white text-3xl md:text-5xl font-bold " + className}
        >
          {content}
        </Text>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button href={href || "/connect"} className="outline-1 px-7 mt-8">
            <ShinyText text={buttonText || "Connect"} speed={3} />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
