"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const smoothWrapper = useRef<HTMLDivElement>(null);
  const smoothContent = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const wrapper = smoothWrapper.current;
    const content = smoothContent.current;
    
    if (!wrapper || !content) return;

    // Set initial styles
    gsap.set(wrapper, {
      height: "100vh",
      width: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden"
    });

    // Create virtual scroll space
    const setHeight = () => {
      document.body.style.height = `${content.scrollHeight}px`;
    };
    setHeight();

    // Smooth scroll animation
    const smoothScroll = gsap.to(content, {
      y: () => -(content.scrollHeight - window.innerHeight),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Adjust this value to control smoothness (higher = smoother)
        invalidateOnRefresh: true,
        markers: false
      }
    });

    tween.current = smoothScroll;

    // Update on resize
    const handleResize = () => {
      setHeight();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    
    // Cleanup
    return () => {
      if (tween.current) {
        tween.current.kill();
      }
      window.removeEventListener("resize", handleResize);
      document.body.style.height = "";
    };
  }, []);

  return (
    <div ref={smoothWrapper} className="smooth-wrapper">
      <div ref={smoothContent} className="smooth-content">
        {children}
      </div>
    </div>
  );
} 