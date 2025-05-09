import React from 'react';
import Skeleton from '@app/components/common/Skeleton';
import styles from './BentoGallery.module.css';

interface GallerySkeletonProps {
  columns: number;
  items?: number;
}

const GallerySkeleton: React.FC<GallerySkeletonProps> = ({ columns = 3, items = 6 }) => {
  const getRandomHeight = () => Math.floor(Math.random() * (400 - 250) + 250);
  const getRandomSpan = () => Math.random() > 0.7 ? 2 : 1;

  // Calculate layout similar to the actual gallery
  const calculateLayout = () => {
    const columnWidth = 100 / columns;
    const columnHeights = new Array(columns).fill(0);
    
    return Array.from({ length: items }).map(() => {
      const height = getRandomHeight();
      const columnSpan = columns > 2 ? getRandomSpan() : 1;
      
      // Find the column with minimum height
      let startColumn = 0;
      let minHeight = Infinity;
      
      for (let i = 0; i <= columns - columnSpan; i++) {
        const maxColumnHeight = Math.max(...columnHeights.slice(i, i + columnSpan));
        if (maxColumnHeight < minHeight) {
          minHeight = maxColumnHeight;
          startColumn = i;
        }
      }

      // Update column heights
      const newHeight = columnHeights[startColumn] + height + 20; // 20px gap
      for (let i = 0; i < columnSpan; i++) {
        columnHeights[startColumn + i] = newHeight;
      }

      return {
        height,
        width: columnWidth * columnSpan,
        x: columnWidth * startColumn,
        y: columnHeights[startColumn] - height - 20,
        columnSpan,
      };
    });
  };

  const skeletonItems = calculateLayout();
  const containerHeight = Math.max(...skeletonItems.map(item => item.y + item.height));

  return (
    <div className="relative w-full" style={{ height: `${containerHeight + 40}px` }}>
      {skeletonItems.map((item, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            transform: `translate3d(${item.x}%, ${item.y}px, 0)`,
            width: `${item.width}%`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          <div className={styles.galleryItem}>
            <div className={styles.imageWrapper}>
              <Skeleton
                variant="rounded"
                animation="wave"
                height={item.height}
                className="w-full"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <Skeleton
                  variant="rounded"
                  animation="wave"
                  height={20}
                  className="w-2/3"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GallerySkeleton; 