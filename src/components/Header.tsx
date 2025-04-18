"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);

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

  const navLinkStyle = {
    fontFamily: "var(--font-sf-pro)",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",
  };

  return (
    <>
      <header
        className={`w-full fixed z-50 transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 bg-[#0a1b3a]/95 backdrop-blur-sm py-3"
            : "relative bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo on the left */}
          <div
            className={`flex-row flex items-center justify-center space-x-32${
              isSticky ? "w-[11rem]" : "w-[13.33331rem]"
            } transition-all duration-300`}
          >
            <Image
              src="/bough.png"
              alt="Bough Consulting"
              width={150}
              height={100}
              priority
            />
            <div className=" bg-gray-400 h-[0.5] w-44 ml-5"></div>
          </div>

          {/* Nav links centered */}
          <div className="flex-1 -ml-44 flex justify-center">
            <nav className="flex space-x-6 text-black items-center">
              <Link
                href="#services"
                className="hover:opacity-80 transition-opacity"
                style={navLinkStyle}
              >
                Services
              </Link>
              <Link
                href="#insights"
                className="hover:opacity-80 transition-opacity"
                style={navLinkStyle}
              >
                Insights
              </Link>
              <Link
                href="#careers"
                className="hover:opacity-80 transition-opacity"
                style={navLinkStyle}
              >
                Careers
              </Link>
              <Link
                href="#about"
                className="hover:opacity-80 transition-opacity"
                style={navLinkStyle}
              >
                About us
              </Link>
            </nav>
          </div>

          {/* Button on the right */}
          <div className="flex-shrink-0">
            <Button
              href="#connect"
              className="ml-2 bg-[#1143E8] hover:bg-[#0035d9] px-7"
            >
              <ShinyText text="Connect" speed={3} />
            </Button>
          </div>
        </div>
      </header>
      {/* Add a spacer when header is fixed to prevent content jumps */}
      {isSticky && <div className="h-[5rem]"></div>}
    </>
  );
}
