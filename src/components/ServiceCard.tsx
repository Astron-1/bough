"use client";
import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useEffect, useState } from "react";

interface ServiceCardProps {
  image: StaticImageData;
  serviceType: string;
  description: string;
}

export default function ServiceCard({
  image,
  serviceType,
  description,
}: ServiceCardProps) {
  // Add client-side only state
  const [isMounted, setIsMounted] = useState(false);

  // Only enable animations after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link className="w-full block group" href={"/services/" + serviceType}>
      <div
        className={`relative h-[280px] sm:h-[320px] md:h-[380px] 2xl:h-[450px] 4xl:h-[500px] 5xl:h-[700px] overflow-hidden bg-gray-200 transition-all duration-300 ${
          isMounted ? "transform-gpu" : ""
        }`}
        style={{
          boxShadow: isMounted
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "none",
        }}
      >
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${image.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 md:p-6 transform transition-all duration-500 ease-in-out translate-y-[calc(100%-5.5rem)] sm:translate-y-[calc(100%-6rem)] md:translate-y-[calc(100%-7rem)] group-hover:translate-y-0">
          <div className="mb-3 md:mb-4">
            <Text
              type={Font.GARAMOND}
              className="text-white text-3xl sm:text-4xl md:text-5xl font-bold transform transition-transform duration-500 ease-in-out leading-tight"
            >
              {serviceType}
            </Text>
          </div>
          
          <div className="overflow-hidden">
            <Text
              className="text-gray-200 text-sm sm:text-base md:text-lg opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[300px] transition-all duration-500 ease-in-out delay-100 group-hover:delay-150 mb-4 leading-relaxed"
            >
              {description}
            </Text>
            
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-in-out flex justify-center">
              <Button href={"/services/" + serviceType} className="!min-w-0 !px-6 !py-2 !ml-0 text-sm">
                <ShinyText text="Know More" speed={3} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
