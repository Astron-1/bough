/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Image from 'next/image';
import Text, { Font } from '@app/components/Text';
import { StaticImageData } from 'next/image';

interface BlogHeaderProps {
  title: string;
  description: string;
  date?: string | null;
  coverImage: string | StaticImageData;
  readTime?: string;
  tags?: string[];
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  title,
  description,
  date,
  coverImage,
  readTime,
  tags,
}) => {
  // Format date if it exists and is not null
  const formattedDate = date && date !== null
    ? new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <div className="w-full">
      {/* Cover Image */}
      <div className="w-full h-[500px] relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 z-10" />
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title and Description */}
      {/* <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {formattedDate && (
          <div className="mb-4">
            <Text type={Font.SOURCE_SANS} className="text-gray-500">
              {formattedDate} {readTime && `· ${readTime} min read`}
            </Text>
          </div>
        )}
        
        <Text
          type={Font.GARAMOND}
          className="text-4xl text-black md:text-5xl font-bold mb-6"
        >
          {title}
        </Text>
        
        <Text
          type={Font.SOURCE_SANS}
          className="text-black text-xl leading-relaxed"
        >
          {description}
        </Text>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default BlogHeader; 