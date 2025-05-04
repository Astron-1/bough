"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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

  const services = [
    { title: "Accounting", href: "/services/Accounting" },
    { title: "Risk", href: "/services/Risk" },
    { title: "ESG", href: "/services/ESG" },
    { title: "Transformation", href: "/services/Transformation" },
  ];

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
        <div
          className={`max-w-[1280px] mx-auto flex justify-between items-center ${
            transparent ? "px-0" : "px-6"
          }`}
        >
          {/* Logo */}
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
            <div
              className={`hidden md:block absolute h-[1px] w-44 ${borderColor}`}
              style={{ left: "120%", top: "50%" }}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center space-x-14 relative">
            {/* Services dropdown with hover area */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <span className={`${textColor}`} style={navLinkStyle}>
                  Services
                </span>
                <ChevronDown size={16} className={textColor} />
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full mt-4 w-[900px] bg-[#d9e6fc] shadow-lg rounded-md z-50 flex p-6"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {/* Left Title */}
                    <div className="min-w-[120px] pr-8 border-r border-gray-300">
                      <h3 className="text-2xl font-semibold text-black">
                        Services
                      </h3>
                    </div>

                    {/* Service items */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pl-8">
                      {services.map((item) => (
                        <div key={item.title} className="text-sm text-black">
                          <h4 className="font-semibold text-lg">
                            {item.title}
                          </h4>
                          <p className="text-[13px] leading-5 mt-1">
                            We help companies become more resilient and
                            future-ready by effectively managing.
                          </p>
                          <Link
                            href={item.href}
                            className="mt-2 inline-block text-blue-600 text-sm underline"
                          >
                            View more
                          </Link>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other links */}
            {navLinks
              .filter((link) => link.name !== "Services")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:opacity-80 transition-opacity ${textColor}`}
                >
                  <span className={textColor} style={navLinkStyle}>
                    {link.name}
                  </span>
                </Link>
              ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              href="/connect"
              className="bg-[#1143E8] hover:bg-[#0035d9] px-7"
            >
              <ShinyText text="Connect" speed={3} />
            </Button>
          </div>

          {/* Hamburger */}
          <div className="md:hidden z-[100]">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X className={`w-6 h-6 ${textColor}`} />
              ) : (
                <Menu className={`w-6 h-6 ${textColor}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div
            className={`md:hidden px-4 pt-4 pb-6 bg-white ${
              isSticky ? "shadow-md" : ""
            }`}
          >
            <nav className="flex flex-col space-y-4">
              {/* Services Collapsible */}
              <div className="flex flex-col">
                <button
                  onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                  className="flex justify-between items-center w-full text-black text-base font-medium"
                >
                  Services
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      serviceDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {serviceDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-3">
                    {services.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="text-sm text-gray-700"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other Links */}
              {navLinks
                .filter((link) => link.name !== "Services")
                .map((link) => (
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
      {isSticky && <div className="h-20" />}
    </>
  );
}
