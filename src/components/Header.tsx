"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "./ui/Button";
import ShinyText from "./ui/ShinyText";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Text, { Font } from "./Text";

interface HeaderProps {
  transparent?: boolean;
  customClassName?: string;
}

export default function Header({
  transparent = false,
  customClassName,
}: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textColor = transparent && !isSticky ? "text-white" : "text-black";
  const borderColor = transparent && !isSticky ? "bg-white/60" : "bg-gray-300";
  const logoFilter = transparent && !isSticky ? "brightness-0 invert" : "";

  const navLinks = [
    { href: "/service", name: "Services" },
    { href: "/insights", name: "Insights" },
    { href: "/careers", name: "Careers" },
    { href: "/about-us", name: "About us" },
  ];

  const services = [
    {
      title: "Accounting",
      href: "/services/Accounting",
      subheading:
        "Craft nimble accounting solutions that adapt to the standards and your business, alike.",
    },
    {
      title: "Risk",
      href: "/services/Risk",
      subheading:
        "Build agile and risk aware organization and transform the way you manage risk.",
    },
    {
      title: "Transformation",
      href: "/services/Transformation",
      subheading: "Let us put you ahead of tomorrow.",
    },
    {
      title: "ESG",
      href: "/services/ESG",
      subheading: "We focus on doing the right thing for a better planet.",
    },
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
        className={
          `w-full z-[100] transition-all duration-300 ${
            isSticky
              ? "fixed top-0 backdrop-blur-md bg-white/30 py-5"
              : "relative py-6 pt-5"
          } ` + customClassName
        }
        style={{
          boxShadow: isSticky ? "0 2px 10px rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div
          className={`max-w-[1280px] mx-auto flex justify-between items-center px-6`}
        >
          {/* Logo */}
          <div className="flex items-center relative">
            <Link href="/" className="flex items-center" aria-label="Homepage">
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
              className={`hidden lg:block absolute h-[1px] w-44 ${borderColor}`}
              style={{ left: "120%", top: "50%" }}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-14 relative">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex items-center space-x-1 cursor-pointer">
                <Link href="/service">
                  <span className={`${textColor}`} style={navLinkStyle}>
                    Services
                  </span>
                </Link>
                <ChevronDown size={16} className={textColor} />
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-10 -left-[300px] top-full w-[1000px] bg-[#d9e6fc] rounded-lg shadow-md z-50 flex justify-center"
                  >
                    <div className="w-full px-6 py-6 flex gap-8 max-w-[1280px]">
                      <div className="min-w-[120px] pr-8 border-r border-gray-300">
                        <Text
                          type={Font.GARAMOND}
                          className="text-2xl font-semibold text-black"
                        >
                          Services
                        </Text>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {services.map((item) => (
                          <div key={item.title} className="text-sm text-black">
                            <h4 className="font-semibold text-sm md:text-lg">
                              {item.title}
                            </h4>
                            <p className="text-[6px] md:text-[13px]  leading-5 mt-1">
                              {item.subheading}
                            </p>
                            <Link
                              href={item.href}
                              className="mt-2 inline-block text-black text-sm underline"
                            >
                              View more
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other Links */}
            {navLinks
              .filter((link) => link.name !== "Services")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:opacity-80 ${textColor}`}
                >
                  <span style={navLinkStyle}>{link.name}</span>
                </Link>
              ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Button href="/connect" className=" px-7">
              <ShinyText text="Connect" speed={3} />
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="lg:hidden z-[100]">
            <button
              onClick={() => {
                setMenuOpen(!menuOpen);
                if (menuOpen) setServiceDropdownOpen(false);
              }}
              aria-expanded={menuOpen}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <X className={`w-6 h-6 ${textColor}`} />
              ) : (
                <Menu className={`w-6 h-6 ${textColor}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`lg:hidden px-4 pb-6 bg-white py-6 shadow-md `}
            >
              <nav className="flex flex-col space-y-4">
                <div className="flex flex-col">
                  <button
                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                    className="flex justify-between items-center w-full text-black text-base font-medium"
                    aria-expanded={serviceDropdownOpen}
                  >
                    Services
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        serviceDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {serviceDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 mt-2 border-l border-gray-200 ml-2 flex flex-col space-y-3 overflow-hidden"
                      >
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

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

                {/* CTA Button */}
                <Button href="/connect" className="">
                  <ShinyText text="Connect" speed={3} />
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sticky Spacer */}
      {isSticky && <div className="h-20" />}
    </>
  );
}
