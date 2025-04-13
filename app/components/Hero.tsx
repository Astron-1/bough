"use client";

import Button from './ui/Button';
import BackgroundPattern from './BackgroundPattern';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ShinyText from './ui/ShinyText';

export default function Hero() {
  const [showScrollContent, setShowScrollContent] = useState(false);
  const scrollTriggeredRef = useRef(false);
  const originalScrollPosRef = useRef(0);
  const lockScrollRef = useRef(true);
  const heroRef = useRef<HTMLElement>(null);
  const lastToggleTimeRef = useRef(0);
  const isTransitioningRef = useRef(false);

  // Use wheel events instead of scroll position
  useEffect(() => {
    // Reset scroll position to top on initial load
    window.scrollTo(0, 0);
    
    // Save original scroll position
    originalScrollPosRef.current = 0;
    
    // Debounce function to prevent multiple rapid toggles
    const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return function(this: unknown, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    };

    // Prevent default scroll behavior and listen for wheel events
    const handleWheel = (e: WheelEvent) => {
      // If currently transitioning, prevent any additional triggers
      if (isTransitioningRef.current) return;
      
      // Only trigger once per second to prevent multiple toggles
      const now = Date.now();
      if (now - lastToggleTimeRef.current < 1000) return;
      
      // If at the top of the page and trying to scroll down, show the transition
      if (window.scrollY <= originalScrollPosRef.current + 10 && e.deltaY > 0 && !showScrollContent) {
        e.preventDefault();
        
        // Mark as transitioning to block further triggers
        isTransitioningRef.current = true;
        lastToggleTimeRef.current = now;
        
        scrollTriggeredRef.current = true;
        setShowScrollContent(true);
        lockScrollRef.current = true;
        
        // Temporarily disable scrolling
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling after animation and reset transition flag
        setTimeout(() => {
          document.body.style.overflow = '';
          lockScrollRef.current = false;
          isTransitioningRef.current = false;
        }, 1000); // Increased to 1000ms for better stability
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle scrolling back up with debouncing
    const handleScroll = debounce(() => {
      // If currently transitioning, skip
      if (isTransitioningRef.current) return;
      
      const now = Date.now();
      if (now - lastToggleTimeRef.current < 1000) return;
      
      // If user scrolls back to the top (or close to it)
      if (window.scrollY <= originalScrollPosRef.current + 10) {
        if (showScrollContent) {
          isTransitioningRef.current = true;
          lastToggleTimeRef.current = now;
          setShowScrollContent(false);
          
          // Reset transition flag after animation
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 1000);
        }
        // Reset scroll triggered state when at the top
        scrollTriggeredRef.current = false;
      } else if (window.scrollY > originalScrollPosRef.current + 50 && !isTransitioningRef.current) {
        if (!showScrollContent) {
          isTransitioningRef.current = true;
          lastToggleTimeRef.current = now;
          setShowScrollContent(true);
          
          // Reset transition flag after animation
          setTimeout(() => {
            isTransitioningRef.current = false;
          }, 1000);
        }
      }
    }, 100); // 100ms debounce

    window.addEventListener('scroll', handleScroll);
    
    // Also handle touchmove for mobile
    const handleTouchMove = (e: TouchEvent) => {
      // If currently transitioning, prevent any additional triggers
      if (isTransitioningRef.current) return;
      
      // Only trigger once per second
      const now = Date.now();
      if (now - lastToggleTimeRef.current < 1000) return;
      
      if (window.scrollY <= originalScrollPosRef.current + 10 && !showScrollContent && lockScrollRef.current) {
        e.preventDefault();
        
        // Mark as transitioning
        isTransitioningRef.current = true;
        lastToggleTimeRef.current = now;
        
        scrollTriggeredRef.current = true;
        setShowScrollContent(true);
        
        // Temporarily disable scrolling
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling after animation
        setTimeout(() => {
          document.body.style.overflow = '';
          lockScrollRef.current = false;
          isTransitioningRef.current = false;
        }, 1000);
      }
    };
    
    // Initially lock scroll
    if (lockScrollRef.current) {
      document.body.style.overflow = 'hidden';
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleTouchMove);
      document.body.style.overflow = '';
    };
  }, [showScrollContent]);

  const titleStyle = {
    color: "#FFF",
    textAlign: "center" as const,
    fontFamily: "Source Sans 3",
    fontSize: "4rem",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "4.375rem",
    margin: "0 auto",
  };

  const descriptionStyle = {
    color: "#FFF",
    textAlign: "center" as const,
    fontFamily: "SF Pro",
    fontSize: "1rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.375rem",
    margin: "1.5rem auto",
    maxWidth: "42rem",
  };

  const serviceButtonStyle = "border-2 border-[#0074ff] bg-transparent text-white px-8 py-2.5 rounded-full text-sm transition-all duration-300 hover:bg-[#0074ff] hover:font-bold hover:-translate-y-0.5 hover:shadow-md hover:shadow-[#0074ff]/30";

  return (
    <section 
      ref={heroRef}
      className="relative w-full flex flex-col items-center text-white h-screen justify-center overflow-hidden"
      id="hero-section"
    >
      <BackgroundPattern />

      {/* Hero content */}
      <div className="text-center w-full px-4 py-8 relative z-40 flex flex-col items-center">
        <div className="flex flex-col gap-4">
          <h1 
            style={titleStyle}
            className="flex flex-col items-center gap-2"
          >
            <span>Building resilience</span>
            <span>through better</span>
            <span>governance</span>
          </h1>
          
          <div className="relative h-28 overflow-hidden">
            <AnimatePresence mode="wait">
              {!showScrollContent ? (
                <motion.p 
                  key="initial-desc"
                  style={descriptionStyle}
                  className="max-w-[42rem] mx-auto"
                  exit={{ opacity: 0 }}
                >
                  Bough helps a global media and entertainment company assess<br />
                  effectiveness of its Disaster Recovery / Business Continuity<br />
                  Program (&apos;DRBCP&apos;)
                </motion.p>
              ) : (
                <motion.p 
                  key="scrolled-desc"
                  style={descriptionStyle}
                  className="max-w-[42rem] mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  We see ourselves as an extension of your<br />
                  organization, that main branch – the<br />
                  &apos;bough&apos;, you can rely on to thrive and build a<br />
                  brighter future, together.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {!showScrollContent ? (
            <motion.div 
              key="connect-button"
              className="mt-10"
              exit={{ opacity: 0 }}
            >
              <Button 
                href="#connect" 
                className="bg-[#0052FF] text-white px-12 py-3 rounded-full text-base font-medium hover:bg-[#0040CC] transition-colors"
              >
                <ShinyText text="Connect" speed={3} className="font-medium" />
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="service-buttons"
              className="flex justify-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Button 
                href="#accounting" 
                className={serviceButtonStyle}
              >
                Accounting
              </Button>
              <Button 
                href="#risk" 
                className={serviceButtonStyle}
              >
                Risk
              </Button>
              <Button 
                href="#transformation" 
                className={serviceButtonStyle}
              >
                Transformation
              </Button>
              <Button 
                href="#esg" 
                className={serviceButtonStyle}
              >
                ESG
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 