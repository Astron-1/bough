"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";
import Text, { Font } from "./Text";
import { useRouter } from "next/router";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const isConnectPage = router.pathname === "/connect";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Start being sticky after scrolling past 100px
      setIsSticky(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#services", name: "Services" },
    { href: transparent ? "/insights" : "#insights", name: "Insights" },
    { href: "#careers", name: "Careers" },
    { href: "#about", name: "About us" },
  ];

  const navLinkStyle = {
    fontFamily: "var(--font-sf-pro)",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",
  };

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 backdrop-blur-md bg-white/30 py-2"
            : transparent ? "relative bg-transparent py-6" : "relative bg-transparent py-6"
        }`}
        style={{ 
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
          borderBottom: "none"
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 relative">
          {/* Logo on the left */}
          <div className="flex items-center relative">
            <Image
              src={transparent && !isSticky ? "/boughWhite.svg" : "/bough.png"}
              alt="Bough Consulting"
              width={150}
              height={50}
              className="object-contain"
              priority
            />
            
            {/* Absolutely positioned horizontal line */}
            <div 
              className={`absolute h-[1px] w-[8rem] ${transparent && !isSticky ? "bg-white/60" : "bg-gray-300"}`}
              style={{ left: '100%', top: '50%' }}
            ></div>
          </div>

          {/* Nav links centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <nav className="flex space-x-10 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:opacity-80 transition-opacity ${
                    transparent && !isSticky ? "text-white" : "text-black"
                  }`}
                  style={navLinkStyle}
                >
                  <Text type={Font.SOURCE_SANS}>{link.name}</Text>
                </Link>
              ))}
            </nav>
          </div>

          {/* Button on the right */}
          <div>
            {isConnectPage ? (
              <div className="px-7 py-2.5 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed">
                <Text type={Font.SOURCE_SANS} className="font-semibold">Connect</Text>
              </div>
            ) : (
              <Button
                href="/connect"
                className="bg-[#1143E8] hover:bg-[#0035d9] px-7"
              >
                <ShinyText text="Connect" speed={3} />
              </Button>
            )}
          </div>
        </div>
      </header>
      {/* Add a spacer when header is fixed to prevent content jumps */}
      {isSticky && <div className="h-20"></div>}
    </>
  );
}
