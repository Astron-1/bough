import React, { useEffect, useRef, useMemo, ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealWrapperProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  opacity?: number;
  className?: string;
  wordClassName?: string;
}

const TextRevealWrapper: React.FC<TextRevealWrapperProps> = ({
  children,
  delay = 0,
  stagger = 0.05,
  y = 20,
  opacity = 0,
  className = "",
  wordClassName = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  const splitText = useMemo(() => {
    // Convert children to string, handling both direct text and Text component children
    const text = React.Children.toArray(children)
      .map(child => {
        if (typeof child === "string") return child;
        if (React.isValidElement(child)) {
          const childProps = child.props as { children?: ReactNode };
          return childProps.children || "";
        }
        return "";
      })
      .join(" ");

    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span 
          className={`inline-block word opacity-0 ${wordClassName}`} 
          key={index}
          style={{ display: 'inline-block' }}
        >
          {word}
        </span>
      );
    });
  }, [children, wordClassName]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const element = elementRef.current;
    if (!element) return;

    const words = element.querySelectorAll('.word');
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y,
          opacity,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: stagger,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=10%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, stagger, y, opacity]);

  return (
    <div ref={elementRef} className={className}>
      {splitText}
    </div>
  );
};

export default TextRevealWrapper; 