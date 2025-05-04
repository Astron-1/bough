"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/service", name: "Services" },
    { href: "/insights", name: "Insights" },
    { href: "/careers", name: "Careers" },
    { href: "/about-us", name: "About us" },
  ];

  const textColor = transparent && !isSticky ? "text-white" : "text-black";
  const borderColor = transparent && !isSticky ? "bg-white/60" : "bg-gray-300";
  
  const logoFilter = transparent && !isSticky ? "brightness-0 invert" : "";
   
  const navLinkStyle = {
    fontFamily: "var(--font-sf-pro)",
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: "22px",
  };

  return (
    <>
      <header
        className={`w-full z-[100] transition-all duration-300 ${
          isSticky
            ? "fixed top-0 left-0 right-0 backdrop-blur-md bg-white/30 py-5"
            : "relative py-6 pt-5"
        }`}
        style={{
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
        }}
      >
        {/* Main container with consistent width and padding */}
        <div className={`max-w-[1280px] mx-auto flex justify-between items-center ${transparent ? "px-0" : "px-6"}`}>
          {/* Logo container */}
          <div className="flex items-center relative">
            <Link href="/" className="flex items-center">
              <Image
                src="/bough.png"
                alt="Bough Consulting"
                width={155}
                height={45}
                className={`object-contain ${logoFilter}`}
                priority
              />
            </Link>
            {/* Line hidden on small screens */}
            <div
              className={`hidden sm:block absolute h-[1px] w-44 ${borderColor}`}
              style={{ left: "100%", top: "50%" }}
            />
          </div>

          {/* Center-aligned nav - NOT absolute positioned */}
          <div className="hidden md:flex items-center justify-center space-x-14">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:opacity-80 transition-opacity ${textColor}`}
              >
                <span
                  className={textColor}
                  style={navLinkStyle}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Button container */}
          <div className="hidden md:block">
            <Button
              href="/connect"
              className="bg-[#1143E8] hover:bg-[#0035d9] px-7"
            >
              <ShinyText text="Connect" speed={3} />
            </Button>
          </div>

          {/* Hamburger on mobile */}
          <div className="md:hidden z-[100]">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X
                  className={`w-6 h-6 ${textColor}`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${textColor}`}
                />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div
            className={`md:hidden px-4 pt-4 pb-6 bg-white ${
              isSticky ? "shadow-md" : ""
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-black text-base font-medium"
                >
                  {link.name}
                </Link>
              ))}
              <Button
                href="/connect"
                className="mt-4 bg-[#1143E8] hover:bg-[#0035d9]"
              >
                <ShinyText text="Connect" speed={3} />
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Spacer */}
      {isSticky && <div className="h-20"></div>}
    </>
  );
}
