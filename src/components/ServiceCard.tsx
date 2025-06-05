"use client";
import { StaticImageData } from "next/image";
import Text, { Font } from "./Text";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link className="w-full block group" href={"/services/" + serviceType}>
      <div
        suppressHydrationWarning
        className={`relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden bg-gray-200 transition-all duration-300 ${
          isMounted ? "transform-gpu" : ""
        }`}
        style={{
          boxShadow: isMounted
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            : "none",
        }}
      >
        <div className="absolute inset-0">
          <Image 
            src={image}
            alt={serviceType}
            fill
            priority
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-[1.01]"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
            placeholder="blur"
          />
        </div>
        
        <div 
          suppressHydrationWarning
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
        ></div>

        <div 
          suppressHydrationWarning
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent px-4 py-5 md:px-5 md:py-6 transform transition-all duration-500 ease-in-out translate-y-[calc(100%-4.5rem)] sm:translate-y-[calc(100%-5rem)] md:translate-y-[calc(100%-5.5rem)] group-hover:translate-y-0 min-h-[200px] flex flex-col justify-end"
        >
          <div className="mb-2 md:mb-3">
            <Text
              type={Font.GARAMOND}
              className="text-white text-2xl sm:text-3xl md:text-4xl font-bold transform transition-transform duration-500 ease-in-out leading-tight"
            >
              {serviceType}
            </Text>
          </div>
          
          <div className="overflow-hidden flex flex-col justify-between h-full">
            <Text
              className="text-gray-200 text-sm sm:text-[15px] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out delay-100 group-hover:delay-150 mb-4 leading-relaxed line-clamp-none"
            >
              {description}
            </Text>
            
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-in-out flex justify-center mt-auto">
              <Button asChild className="!min-w-0 !px-5 !py-1.5 !ml-0 text-sm">
                <ShinyText text="Know More" speed={3} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
