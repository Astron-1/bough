"use client";

import React from "react";
import BentoGallery from "./BentoGallery";

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

const GallerySection: React.FC<GallerySectionProps> = ({ 
  title, 
  description,
}) => {
  // Convert regular gallery items to bento gallery items with height
  return (
    <BentoGallery
      title={title}
      description={description}
    />
  );

  /* Original Gallery implementation - temporarily hidden
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
        
        <Text 
          type={Font.GARAMOND} 
          className="text-4xl md:text-5xl font-semibold text-left text-black mb-8"
        >
          {title}
        </Text>

        
        <Text 
          type={Font.SOURCE_SANS} 
          className="text-lg md:text-xl text-left max-w-4xl mb-12 text-black"
        >
          {description}
        </Text>

        
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
            loop={galleryImages.length >= 3}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: Math.min(2, galleryImages.length),
              },
              768: {
                slidesPerView: Math.min(2.5, galleryImages.length),
              },
              1024: {
                slidesPerView: Math.min(3, galleryImages.length),
              },
            }}
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
                    className="object-cover rounded-lg"
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
  */
};

export default GallerySection; 