import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { debounce } from "lodash";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  Component?: React.ElementType;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = false,
  baseOpacity = 0.5,
  baseRotation = 2,
  blurStrength = 2,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  Component = "h2",
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const gsapContextRef = useRef<gsap.Context | null>(null);

  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    
    return children.split(/\s+/).map((word, index) => (
      <span className="inline-block word" key={index}>
        {word}&nbsp;
      </span>
    ));
  }, [children]);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const el = containerRef.current;
    const scroller = scrollContainerRef?.current || window;
    
    gsapContextRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=10%",
          end: wordAnimationEnd,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        el,
        { 
          transformOrigin: "0% 50%",
          rotate: baseRotation,
          opacity: baseOpacity,
        },
        {
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );

      const wordElements = el.querySelectorAll<HTMLElement>(".word");
      if (wordElements.length > 0) {
        tl.fromTo(
          wordElements,
          {
            opacity: baseOpacity,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
          },
          "-=0.4"
        );

        if (enableBlur) {
          tl.fromTo(
            wordElements,
            {
              filter: `blur(${blurStrength}px)`,
            },
            {
              filter: "blur(0px)",
              duration: 0.4,
              stagger: 0.02,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }
      }
    });

    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
      if (gsapContextRef.current) {
        gsapContextRef.current.revert();
      }
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]);

  return (
    <Component ref={containerRef} className={containerClassName}>
      <span className={textClassName}>{splitText}</span>
    </Component>
  );
};

export default ScrollReveal; 