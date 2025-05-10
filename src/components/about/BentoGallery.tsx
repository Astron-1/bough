"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import styles from "./BentoGallery.module.css";

interface GalleryItem {
  id: string;
  imagePath: string;
  altText: string;
  priority?: boolean;
}

interface BentoGalleryProps {
  title: string;
  description: string;
  images?: GalleryItem[];
}

const defaultGalleryLayout: GalleryItem[] = [
  {
    id: "frame1",
    imagePath: "/collage/1.jpg",
    altText: "Gallery image 1",
    priority: true,
  },
  {
    id: "frame2",
    imagePath: "/collage/2.jpg",
    altText: "Gallery image 2",
    priority: true,
  },
  {
    id: "frame3",
    imagePath: "/collage/3.jpg",
    altText: "Gallery image 3",
    priority: true,
  },
  {
    id: "frame4",
    imagePath: "/collage/4.jpg",
    altText: "Gallery image 4",
  },
  {
    id: "frame5",
    imagePath: "/collage/5.jpg",
    altText: "Gallery image 5",
  },
  {
    id: "frame6",
    imagePath: "/collage/6.jpg",
    altText: "Gallery image 6",
  },
  {
    id: "frame7",
    imagePath: "/collage/7.jpg",
    altText: "Gallery image 7",
  },
  {
    id: "frame8",
    imagePath: "/collage/8.jpg",
    altText: "Gallery image 8",
  },
  {
    id: "frame9",
    imagePath: "/collage/9.jpg",
    altText: "Gallery image 9",
  },
  {
    id: "frame10",
    imagePath: "/collage/10.jpg",
    altText: "Gallery image 10",
  },
  {
    id: "frame11",
    imagePath: "/collage/11.jpg",
    altText: "Gallery image 11",
  },
  {
    id: "frame12",
    imagePath: "/collage/12.jpg",
    altText: "Gallery image 12",
  },
  {
    id: "frame13",
    imagePath: "/collage/13.jpg",
    altText: "Gallery image 13",
  },
  {
    id: "frame14",
    imagePath: "/collage/14.jpg",
    altText: "Gallery image 14",
  },
  {
    id: "frame15",
    imagePath: "/collage/15.jpg",
    altText: "Gallery image 15",
  },
  {
    id: "frame16",
    imagePath: "/collage/16.jpg",
    altText: "Gallery image 16",
  },
  {
    id: "frame17",
    imagePath: "/collage/17.jpg",
    altText: "Gallery image 17",
  }
];

const BentoGallery: React.FC<BentoGalleryProps> = ({
  title = "Our journey in pictures",
  description = "Explore our visual story — moments of collaboration, innovation, and growth that define Bough's culture and commitment to excellence.",
  images: propImages,
}) => {
  const galleryImages = propImages || defaultGalleryLayout;
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [gsapLoaded, setGsapLoaded] = useState(false);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  // Initialize GSAP and ScrollTrigger
  useEffect(() => {
    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
      gsap.registerPlugin(ScrollTrigger);
      setGsapLoaded(true);
    };

    initGSAP();
  }, []);

  // Handle animations after GSAP is loaded
  useEffect(() => {
    if (!gsapLoaded || !gridRef.current) return;

    const initAnimations = async () => {
      const { default: gsap } = await import('gsap');
      const { default: ScrollTrigger } = await import('gsap/ScrollTrigger');

      // Create a timeline for smooth orchestration
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        }
      });

      // Animate title and description
      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
      })
      .from(descRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
      }, "-=0.7");

      // Set initial state of grid items
      gsap.set(".gridItem", {
        opacity: 0,
        scale: 0.8,
        y: 50,
        rotateX: -15,
        transformOrigin: "50% 50% -100",
        filter: "blur(10px)",
      });

      // Create a separate timeline for grid items
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });

      // Animate grid items with premium effects
      gridTl.to(".gridItem", {
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: {
          amount: 1.2,
          grid: "auto",
          from: "random",
          ease: "power3.out"
        }
      });

      // Add hover animations
      const gridItems = document.querySelectorAll(".gridItem");
      gridItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 2,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            zIndex: 1,
            boxShadow: "none"
          });
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    initAnimations();
  }, [gsapLoaded]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className={styles.galleryContainer}>
        <div ref={titleRef} className="text-center max-w-4xl mx-auto">
          <Text
            type={Font.GARAMOND}
            className="text-[3.5rem] leading-[1.2] font-medium text-black mb-6"
          >
            {title}
          </Text>
        </div>

        <div ref={descRef} className="text-center max-w-3xl mx-auto">
          <Text
            type={Font.SOURCE_SANS}
            className="text-xl leading-relaxed mb-16 text-gray-700"
          >
            {description}
          </Text>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.gridLayout} ref={gridRef}>
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`${styles.gridItem} gridItem ${styles[`item${index + 1}`]}`}
              >
                <div className={styles.imageWrapper}>
                  {!loadedImages.has(image.id) && (
                    <div className={styles.skeleton} />
                  )}
                  <Image
                    src={image.imagePath}
                    alt={image.altText}
                    fill
                    className={`${styles.image} ${
                      loadedImages.has(image.id) ? styles.loaded : ""
                    }`}
                    sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    priority={image.priority}
                    onLoad={() => handleImageLoad(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGallery;
