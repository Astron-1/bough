"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Text, { Font } from "@app/components/Text";
import GallerySkeleton from "./GallerySkeleton";
import styles from "./BentoGallery.module.css";

interface GalleryItem {
  id: number | string;
  imagePath: string;
  altText: string;
  height?: number;
  aspectRatio?: number;
  priority?: boolean;
}

interface BentoGalleryProps {
  title: string;
  description: string;
  images?: GalleryItem[];
}

// Predefined layout configuration for the exact layout shown
const defaultGalleryLayout: GalleryItem[] = [
  {
    id: 1,
    imagePath: "/collage/1.jpg",
    altText: "Team members in office",
    aspectRatio: 4/3,
    priority: true
  },
  {
    id: 2,
    imagePath: "/collage/2.jpg",
    altText: "Better Together banner",
    aspectRatio: 1,
    priority: true
  },
  {
    id: 3,
    imagePath: "/collage/3.jpg",
    altText: "Large team group photo",
    aspectRatio: 16/9,
    priority: true
  },
  {
    id: 4,
    imagePath: "/collage/4.jpg",
    altText: "Team member with pet",
    aspectRatio: 1
  },
  {
    id: 5,
    imagePath: "/collage/5.jpg",
    altText: "Team meeting",
    aspectRatio: 16/9
  },
  {
    id: 6,
    imagePath: "/collage/6.jpg",
    altText: "Office dog",
    aspectRatio: 1
  },
  {
    id: 7,
    imagePath: "/collage/7.jpg",
    altText: "Office space",
    aspectRatio: 16/9
  },
  {
    id: 8,
    imagePath: "/collage/8.jpg",
    altText: "Team casual meeting",
    aspectRatio: 4/3
  },
  {
    id: 9,
    imagePath: "/collage/9.jpg",
    altText: "Team at event",
    aspectRatio: 3/2
  },
  {
    id: 10,
    imagePath: "/collage/10.jpg",
    altText: "Office view",
    aspectRatio: 1
  },
  {
    id: 11,
    imagePath: "/collage/11.jpg",
    altText: "Team event banner",
    aspectRatio: 1
  },
  {
    id: 12,
    imagePath: "/collage/12.jpg",
    altText: "Team lunch",
    aspectRatio: 3/2
  },
  {
    id: 13,
    imagePath: "/collage/13.jpg",
    altText: "Pet in office",
    aspectRatio: 1
  },
  {
    id: 14,
    imagePath: "/collage/14.jpg",
    altText: "Team working",
    aspectRatio: 16/9
  },
  {
    id: 15,
    imagePath: "/collage/15.jpg",
    altText: "Individual working",
    aspectRatio: 4/3
  },
  {
    id: 16,
    imagePath: "/collage/16.jpg",
    altText: "Team celebration",
    aspectRatio: 16/9
  },
  {
    id: 17,
    imagePath: "/collage/17.jpg",
    altText: "Team bonding",
    aspectRatio: 3/2
  }
];

const BentoGallery: React.FC<BentoGalleryProps> = ({
  title,
  description,
  images: propImages,
}) => {
  const [columns, setColumns] = useState<number>(3);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Handle responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 1200px)").matches) {
        setColumns(3);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Load and process images
  useEffect(() => {
    setLoading(true);
    const processedImages = propImages || defaultGalleryLayout;
    setGalleryImages(processedImages);
    setLoading(false);
  }, [propImages]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto">
        <Text
          type={Font.GARAMOND}
          className="text-[3.5rem] leading-[1.2] font-medium text-left text-black mb-6"
        >
          {title}
        </Text>

        <Text
          type={Font.SOURCE_SANS}
          className="text-xl leading-relaxed text-left max-w-4xl mb-12 text-gray-700"
        >
          {description}
        </Text>

        <div ref={galleryRef} className={styles.galleryContainer}>
          {loading ? (
            <GallerySkeleton columns={columns} items={17} />
          ) : (
            <div className={styles.galleryGrid}>
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className={styles.galleryItem}
                  style={{
                    '--aspect-ratio': item.aspectRatio
                  } as React.CSSProperties}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.imagePath}
                      alt={item.altText}
                      fill
                      sizes="(max-width: 500px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className={styles.image}
                      priority={item.priority}
                      loading={item.priority ? "eager" : "lazy"}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoGallery;
