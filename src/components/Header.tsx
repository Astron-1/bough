"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";
import Text, { Font } from "./Text";
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
    { href: "/about", name: "About us" },
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
            : transparent
            ? "relative bg-transparent py-6"
            : "relative bg-transparent py-6"
        }`}
        style={{
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 relative">
          {/* Logo and Line */}
          <div className="flex items-center relative">
            <Link href="/">
              <Image
                src={
                  transparent && !isSticky ? "/boughWhite.svg" : "/bough.png"
                }
                alt="Bough Consulting"
                width={150}
                height={50}
                className="object-contain"
                priority
              />
            </Link>
            {/* Line hidden on small screens */}
            <div
              className={`hidden sm:block absolute h-[1px] w-[8rem] ${
                transparent && !isSticky ? "bg-white/60" : "bg-gray-300"
              }`}
              style={{ left: "100%", top: "50%" }}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 space-x-10 items-center">
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
          </div>

          {/* Button on desktop */}
          <div className="hidden md:block">
            <Button
              href="/connect"
              className="bg-[#1143E8] hover:bg-[#0035d9] px-7"
            >
              <ShinyText text="Connect" speed={3} />
            </Button>
          </div>

          {/* Hamburger on mobile */}
          <div className="md:hidden z-50">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    transparent && !isSticky ? "text-white" : "text-black"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    transparent && !isSticky ? "text-white" : "text-black"
                  }`}
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
