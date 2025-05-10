import React, { useEffect, useRef, useState } from "react";
import Text, { Font } from "@app/components/Text";
import TeamMemberCard, { TeamMemberProps } from "./TeamMemberCard";
import { figmaSectionContainer } from "@app/utils/figmaUtils";

interface TeamSectionProps {
  title: string;
  description?: string;
  members: TeamMemberProps[];
  showMeasurements?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  description,
  members,
  showMeasurements = false,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Exact spacing measurements from Figma (kept for measurement indicators)
  const spacing = {
    horizontalGap: "3.48rem",
    verticalGap: "9.56rem", // Exact from Figma
    leftMargin: "3.9rem", // Exact from Figma
    rightMargin: "4.1rem", // Exact from Figma
  };

  // Initialize GSAP
  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      setGsapLoaded(true);
    };

    initGSAP();
  }, []);

  // Setup animations after GSAP is loaded
  useEffect(() => {
    if (!gsapLoaded || !sectionRef.current) return;

    const setupAnimations = async () => {
      const { default: gsap } = await import('gsap');
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Reset any existing animations
      ScrollTrigger.getAll().forEach(t => t.kill());

      // Set initial states
      gsap.set(".team-member-card", { 
        opacity: 0,
        y: 100,
        scale: 0.9,
        rotateX: -15,
        transformPerspective: 1000,
        transformOrigin: "center center"
      });

      // Create main timeline for section entrance
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "center center",
          toggleActions: "play none none reverse",
          markers: false
        }
      });

      // Title animation with text split effect
      mainTl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });

      // Description animation if exists
      if (description && descriptionRef.current) {
        mainTl.from(descriptionRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out"
        }, "-=0.6");
      }

      // Create separate timelines for each card with individual scroll triggers
      const cards = document.querySelectorAll(".team-member-card");
      cards.forEach((card, index) => {
        const cardTl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "top center",
            toggleActions: "play none none reverse",
            markers: false
          }
        });

        cardTl.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: index * 0.1
        });

        // Add hover animations
        const image = card.querySelector(".card-image");
        const content = card.querySelector(".card-content");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            y: -8,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 2
          });
          gsap.to(image, {
            scale: 1.1,
            duration: 0.4,
            ease: "power2.out"
          });
          gsap.to(content, {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 1
          });
          gsap.to(image, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
          gsap.to(content, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    };

    setupAnimations();

    return () => {
      if (gsapLoaded) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [gsapLoaded, description]);

  return (
    <div
      ref={sectionRef}
      id="meet-the-team"
      className="relative z-10 py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={figmaSectionContainer()}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef}>
          <Text
            type={Font.GARAMOND}
            className="text-4xl md:text-5xl font-semibold text-black mb-12 md:mb-16 text-left"
          >
            {title}
          </Text>
        </div>

        {/* Team Members Grid */}
        <div ref={gridRef} className="relative">
          {/* Measurement indicators */}
          {showMeasurements && (
            <>
              <div className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-full">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.leftMargin}
                </div>
              </div>
              <div className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-full">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.rightMargin}
                </div>
              </div>
              <div className="absolute left-1/3 top-1/2">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap">
                  {spacing.horizontalGap}
                </div>
              </div>
              <div className="absolute left-1/2 top-[43%]">
                <div className="bg-red-500 text-white px-1 py-0.5 text-xs rounded whitespace-nowrap flex items-center justify-center h-[9.56rem]">
                  {spacing.verticalGap}
                </div>
              </div>
            </>
          )}

          {/* Grid layout with responsive columns and proper gap values */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-[9.56rem] gap-x-[3.48rem]">
            {members.map((member) => (
              <div key={member.id} className="team-member-card">
                <TeamMemberCard
                  id={member.id}
                  name={member.name}
                  title={member.title}
                  image={member.image}
                  alt={member.alt}
                  linkedIn={member.linkedIn}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description (optional) */}
        {description && (
          <div ref={descriptionRef} className="max-w-3xl text-left mt-16 mb-8">
            <Text type={Font.SOURCE_SANS} className="text-lg text-black/80">
              {description}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamSection;
