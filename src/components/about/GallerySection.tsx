"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import { figmaSectionContainer } from "@app/utils/figmaUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Keyboard } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper";
import styles from "./GallerySection.module.css";

// Import required Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

interface GalleryItem {
  id: number;
  imagePath: string;
  altText: string;
  caption?: string;
}

interface GallerySectionProps {
  title: string;
  description: string;
  images?: GalleryItem[];
}

// Fallback images that will be used initially and if API fails
const fallbackImages: GalleryItem[] = [
  {
    id: 1,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 15.30.33_fd052234.jpg",
    altText: "Team collaboration session",
    caption: "Team collaboration"
  },
  {
    id: 2,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 15.29.20_2fb6715a.jpg",
    altText: "Company office space",
    caption: "Our workspace"
  },
  {
    id: 3,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 15.29.18_1b80b0d4.jpg",
    altText: "Team event",
    caption: "Community engagement"
  },
  {
    id: 4,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 14.57.22_01f59abc.jpg",
    altText: "Team building event",
    caption: "Team building"
  },
  {
    id: 5,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 14.29.57_06c97f4c.jpg",
    altText: "Team meeting",
    caption: "Innovation sessions"
  },
  {
    id: 6,
    imagePath: "/galleryShowcase/WhatsApp Image 2025-04-29 at 14.28.47_d9d9da00.jpg",
    altText: "Company celebration",
    caption: "Celebrating success"
  }
];

// Captions to use for dynamically loaded images
const captions = [
  "Team collaboration",
  "Our workspace",
  "Community engagement",
  "Team building",
  "Innovation sessions",
  "Celebrating success",
  "Leadership meeting",
  "Training workshop",
  "Company offsite",
  "Client engagement"
];

const GallerySection: React.FC<GallerySectionProps> = ({ 
  title, 
  description,
  images: propImages
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  
  // Initialize with fallback images to avoid hydration mismatch
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>(fallbackImages);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setGalleryImages(propImages);
      return;
    }
    const loadMoreImages = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/gallery-images');
        const data = await response.json();
        
        if (data.images && Array.isArray(data.images) && data.images.length > fallbackImages.length) {
          const formattedImages = data.images.map((img: { id: number, path: string }, index: number) => ({
            id: img.id,
            imagePath: img.path,
            altText: `Bough team photo ${index + 1}`,
            caption: captions[index % captions.length]
          }));
          
          setGalleryImages(formattedImages);
        }
      } catch (error) {
        console.error("Error fetching additional gallery images:", error);
        // Already using fallback images, so nothing more needed here
      } finally {
        setLoading(false);
      }
    };

    // Load more images after initial render
    loadMoreImages();
  }, [propImages]);

  // Handle hover state to pause/resume autoplay
  useEffect(() => {
    if (!swiperRef.current) return;
    
    if (isHovered) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
  }, [isHovered]);

  // Ensure autoplay continues after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (swiperRef.current && !isHovered) {
        swiperRef.current.autoplay.start();
      }
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <div className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={figmaSectionContainer()}>
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <Text 
          type={Font.GARAMOND} 
          className="text-4xl md:text-5xl font-semibold text-left text-black mb-8"
        >
          {title}
        </Text>

        {/* Description */}
        <Text 
          type={Font.SOURCE_SANS} 
          className="text-lg md:text-xl text-left max-w-4xl mb-12 text-black"
        >
          {description}
        </Text>

        {/* Gallery Swiper */}
        <div 
          className={styles.galleryContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
          )}
          
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            spaceBetween={20}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1.5,
              slideShadows: true
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, EffectCoverflow, Keyboard]}
            className="gallery-swiper"
          >
            {galleryImages.map((image) => (
              <SwiperSlide key={image.id} className="gallery-slide">
                <div className={styles.imageWrapper}>
                  <Image
                    src={image.imagePath}
                    alt={image.altText}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 70vw, 600px"
                    className="object-cover"
                    priority={image.id <= 2}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/bough.png'; 
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Bottom Navigation Arrows */}
          <div className={styles.navigationContainer}>
            <div 
              className={styles.navigationPrev}
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <div 
              className={styles.navigationNext}
              onClick={() => swiperRef.current?.slideNext()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallerySection; 