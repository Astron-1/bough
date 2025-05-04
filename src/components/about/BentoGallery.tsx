"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { useSpring } from "react-spring";
import Text, { Font } from "@app/components/Text";
import { figmaSectionContainer } from "@app/utils/figmaUtils";
import styles from "./BentoGallery.module.css";

interface GalleryItem {
  id: number | string;
  imagePath: string;
  altText: string;
  caption?: string;
  height: number;
  width?: number;
  aspectRatio?: number;
  priority?: boolean;
}

interface BentoGalleryProps {
  title: string;
  description: string;
  images?: GalleryItem[];
}

const fallbackImages: GalleryItem[] = [
  {
    id: 1,
    imagePath: "/bough.png",
    altText: "Team collaboration session",
    caption: "Team collaboration",
    height: 400,
    aspectRatio: 4 / 3,
    priority: true,
  },
  {
    id: 2,
    imagePath: "/bough.png",
    altText: "Company office space",
    caption: "Our workspace",
    height: 300,
    aspectRatio: 16 / 9,
  },
  {
    id: 3,
    imagePath: "/bough.png",
    altText: "Team event",
    caption: "Community engagement",
    height: 350,
    aspectRatio: 1,
  },
  {
    id: 4,
    imagePath: "/bough.png",
    altText: "Innovation session",
    caption: "Innovation in action",
    height: 280,
    aspectRatio: 3 / 2,
  },
  {
    id: 5,
    imagePath: "/bough.png",
    altText: "Team building",
    caption: "Building connections",
    height: 320,
    aspectRatio: 4 / 3,
  },
];

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
  "Client engagement",
];

// Using a type for the gridItems which is an array of calculated layout items
type CalculatedGridItem = GalleryItem & {
  x: number;
  y: number;
  width: number;
  columnSpan?: number;
};

const BentoGallery: React.FC<BentoGalleryProps> = ({
  title,
  description,
  images: propImages,
}) => {
  const [columns, setColumns] = useState<number>(3);
  const [galleryImages, setGalleryImages] =
    useState<GalleryItem[]>(fallbackImages);
  const [loading, setLoading] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  // Parallax effect with react-spring
  const [{ y }, api] = useSpring(() => ({
    y: 0,
  }));

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const rect = galleryRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const scrollProgress =
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height);
          api.start({ y: scrollProgress * 30 }); // Animate the parallax effect
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [api]);

  // Handle responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia("(min-width: 1500px)").matches) {
        setColumns(5);
      } else if (window.matchMedia("(min-width: 1200px)").matches) {
        setColumns(4);
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setColumns(3);
      } else if (window.matchMedia("(min-width: 500px)").matches) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Handle gallery width changes
  useEffect(() => {
    const handleResize = () => {
      if (galleryRef.current) {
        setWidth(galleryRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Process incoming images to add aspect ratios and dimensions
  const processImages = (images: GalleryItem[]) => {
    return images.map((img, idx) => {
      // If image already has aspectRatio and height, use those
      if (img.aspectRatio && img.height) {
        return img;
      }

      // Use a smart approach to determine aspect ratio based on caption or contents
      let aspectRatio = 16 / 9; // Default aspect ratio
      let height = 300; // Default height

      // People/group photos often need more width and slightly less height
      if (
        img.altText.toLowerCase().includes("team") ||
        img.altText.toLowerCase().includes("group") ||
        img.altText.toLowerCase().includes("people") ||
        (img.caption && img.caption.toLowerCase().includes("team"))
      ) {
        aspectRatio = 4 / 3;
        height = 350;
      }

      // Office/workspace photos often look better in wider formats
      if (
        img.altText.toLowerCase().includes("office") ||
        img.altText.toLowerCase().includes("workspace") ||
        (img.caption && img.caption.toLowerCase().includes("workspace"))
      ) {
        aspectRatio = 16 / 9;
        height = 250;
      }

      // Some images might need more vertical space
      if (
        img.altText.toLowerCase().includes("portrait") ||
        (img.caption && img.caption.toLowerCase().includes("leadership"))
      ) {
        aspectRatio = 3 / 4;
        height = 400;
      }

      return {
        ...img,
        aspectRatio,
        height,
        priority: idx < 3, // First 3 images are priority
      };
    });
  };

  // Load images from API or use provided images
  useEffect(() => {
    if (propImages && propImages.length > 0) {
      setGalleryImages(processImages(propImages));
      return;
    }

    const loadMoreImages = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/gallery-images");
        const data = await response.json();

        if (
          data.images &&
          Array.isArray(data.images) &&
          data.images.length > 0
        ) {
          const formattedImages = data.images.map(
            (img: { id: number; path: string }, index: number) => ({
              id: img.id,
              imagePath: img.path,
              altText: `Bough team photo ${index + 1}`,
              caption: captions[index % captions.length],
              height: 200 + Math.random() * 200, // Random height between 200-400px
              aspectRatio: [16 / 9, 4 / 3, 1, 3 / 2][
                Math.floor(Math.random() * 4)
              ], // Random aspect ratio
            })
          );

          setGalleryImages(processImages(formattedImages));
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        // Already using fallback images
      } finally {
        setLoading(false);
      }
    };

    loadMoreImages();
  }, [propImages]);

  // Determine if image should span multiple columns based on content and screen size
  const getColumnSpan = (item: GalleryItem): number => {
    const { altText, caption, aspectRatio = 1 } = item;

    // Only allow spanning on wider screens with enough columns
    if (columns <= 2) return 1;

    // Images with people/teams often need more space
    const hasKeywords = (text: string) => {
      const keywords = [
        "team",
        "group",
        "people",
        "community",
        "offsite",
        "workshop",
      ];
      return keywords.some((keyword) => text.toLowerCase().includes(keyword));
    };

    // Wide aspect ratio images (landscapes, group photos) get more space
    if (
      (aspectRatio > 1.5 && columns >= 4) ||
      (hasKeywords(altText) && columns >= 3) ||
      (caption && hasKeywords(caption) && columns >= 3)
    ) {
      return Math.min(2, columns - 1); // Span at most 2 columns
    }

    return 1;
  };

  // Calculate masonry layout
  const gridItems = useMemo<CalculatedGridItem[]>(() => {
    if (width === 0) return [];
    
    // Create a fixed grid structure with equal column heights
    const columnGap = 10; // Reducing gap to minimize right-side space
    const rowGap = 20;
    const colWidth = width / columns;
    const heights = new Array(columns).fill(0);
    
    return galleryImages.map((item) => {
      // Determine if this image should span multiple columns
      const columnSpan = getColumnSpan(item);
      
      // Find consecutive columns with minimum height
      let startColumn = 0;
      let minHeight = Infinity;
      
      for (let i = 0; i <= columns - columnSpan; i++) {
        // Find the max height among the columns this item would span
        const maxColumnHeight = Math.max(...heights.slice(i, i + columnSpan));
        
        if (maxColumnHeight < minHeight) {
          minHeight = maxColumnHeight;
          startColumn = i;
        }
      }
      
      // Calculate position
      const x = colWidth * startColumn + columnGap / 2;
      const y = heights[startColumn];
      
      // Calculate dimensions - make items slightly wider to fill more space
      const itemWidth = colWidth * columnSpan - columnGap;
      
      // Use aspect ratio or fixed height
      const itemHeight = item.aspectRatio 
        ? Math.round(itemWidth / item.aspectRatio)
        : item.height;
      
      // Update heights for each column this item spans
      const newHeight = y + itemHeight + rowGap;
      for (let i = 0; i < columnSpan; i++) {
        heights[startColumn + i] = newHeight;
      }
      
      return {
        ...item,
        x,
        y,
        width: itemWidth,
        height: itemHeight,
        columnSpan,
      };
    });
  }, [columns, galleryImages, width, getColumnSpan]);

  // Calculate container height
  const containerHeight = useMemo(() => {
    if (gridItems.length === 0) return 400;

    // Find the maximum height
    return Math.max(...gridItems.map((item) => item.y + item.height + 20));
  }, [gridItems]);

  return (
    <div
      className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8"
      style={figmaSectionContainer()}
    >
      <div className="max-w-full mx-auto">
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

        {/* Gallery Container */}
        <div
          ref={galleryRef}
          className={styles.galleryContainer}
          style={{ height: `${containerHeight}px` }}
        >
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50">
              <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
            </div>
          )}

          <div
            className="relative w-full h-full"
            style={{ transform: `translateY(${y.to((v) => `${v}px`)})` }}
          >
            {gridItems.map((item) => {
              // Content-specific class adjustments
              const isGroupPhoto =
                item.altText.toLowerCase().includes("team") ||
                item.altText.toLowerCase().includes("group") ||
                item.altText.toLowerCase().includes("people") ||
                (item.caption &&
                  (item.caption.toLowerCase().includes("team") ||
                    item.caption.toLowerCase().includes("collaboration") ||
                    item.caption.toLowerCase().includes("community") ||
                    item.caption.toLowerCase().includes("engagement")));

              return (
                <div
                  key={item.id}
                  className={styles.galleryItem}
                  style={{
                    transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                  }}
                  data-span={item.columnSpan}
                  data-type={isGroupPhoto ? "people" : undefined}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.imagePath}
                      alt={item.altText}
                      fill
                      sizes={
                        item.columnSpan && item.columnSpan > 1
                          ? "(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                      className={styles.image}
                      priority={item.priority}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/bough.png";
                      }}
                    />
                    {item.caption && (
                      <div className={styles.caption}>
                        <Text
                          type={Font.SOURCE_SANS}
                          className="text-sm text-white"
                        >
                          {item.caption}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGallery;
